import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { Main } from '../main'
import '@testing-library/jest-dom'

describe('Main Component', () => {
  let cells: HTMLElement[]

  const getCells = () =>
    screen.getAllByText((_, el) => el?.className.includes('border-2') ?? false)

  const makePlayerXWin = () => {
    cells = getCells()
    fireEvent.click(cells[0])
    fireEvent.click(cells[3])
    fireEvent.click(cells[1])
    fireEvent.click(cells[4])
    fireEvent.click(cells[2])
  }

  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ X: 1, O: 0, draw: 0 }),
        text: () => Promise.resolve('ok'),
      })
    ) as jest.Mock
  })

  beforeEach(() => {
    render(<Main />)
    cells = getCells()
  })

  test('renders the board', () => {
    expect(screen.getByText('Tic Tac Toe')).toBeInTheDocument()
    expect(cells).toHaveLength(9)
  })

  test('shows that Player X starts', () => {
    expect(screen.getByText('Current turn: X')).toBeInTheDocument()
  })

  test('clicking a cell updates it with X and switches to O', () => {
    fireEvent.click(cells[0])
    expect(cells[0]).toHaveTextContent('X')
    expect(screen.getByText('Current turn: O')).toBeInTheDocument()
  })

  test('clicking the same cell twice does not change it', () => {
    fireEvent.click(cells[0])
    fireEvent.click(cells[0])
    expect(cells[0]).toHaveTextContent('X')
    expect(screen.getByText('Current turn: O')).toBeInTheDocument()
  })

  test('detects a winner and shows winner message', async () => {
    await waitFor(async () => {
      makePlayerXWin()
    })
    expect(screen.getByText('Player X wins!')).toBeInTheDocument()
  })

  test('detects a draw and shows draw message', async () => {
    const drawMoves = [0, 1, 2, 4, 3, 5, 7, 6, 8]
    await waitFor(async () => {
      drawMoves.forEach(index => fireEvent.click(cells[index]))
    })
    expect(screen.getByText("It’s a draw!")).toBeInTheDocument()
  })

  test('shows "Reset Game" during an active game and resets the board', () => {
    fireEvent.click(cells[0])
    const resetButton = screen.getByRole('button', { name: /reset game/i })
    expect(resetButton).toBeInTheDocument()

    fireEvent.click(resetButton)
    getCells().forEach(cell => expect(cell).toHaveTextContent(''))
    expect(screen.getByText('Current turn: X')).toBeInTheDocument()
  })

  test('shows "Start New Game" after game ends and resets everything', async () => {
    await waitFor(async () => {
      makePlayerXWin()
    })
    const startNewButton = screen.getByRole('button', { name: /start new game/i })
    expect(startNewButton).toBeInTheDocument()

    fireEvent.click(startNewButton)
    getCells().forEach(cell => expect(cell).toHaveTextContent(''))
    expect(screen.getByText('Current turn: X')).toBeInTheDocument()
  })

  test('cells are disabled after game ends', async () => {
    await waitFor(async () => {
      makePlayerXWin()
    })

    expect(screen.getByText('Player X wins!')).toBeInTheDocument()

    const updatedCells = getCells()
    const emptyCell = updatedCells.find(cell => cell.textContent === '')

    expect(emptyCell).toBeDefined()

    if (emptyCell) {
      fireEvent.click(emptyCell)
      expect(emptyCell).toBeEmptyDOMElement()
    }
  })

  test('submits result to backend', async () => {
    await waitFor(async () => {
      makePlayerXWin()
    })

    await new Promise(r => setTimeout(r, 100))

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:4000/results',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ winner: 'X' }),
      })
    )
  })
})
