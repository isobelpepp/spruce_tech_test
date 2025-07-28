import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Main } from '../main'
import '@testing-library/jest-dom'

describe('Main Component', () => {
  beforeEach(() => {
    render(<Main />)
  })

  test('renders the board', () => {
    expect(screen.getByText('Tic Tac Toe')).toBeInTheDocument()

    const cells = screen.getAllByText((content, element) => {
      return element ? element.className.includes('border-2') : false
    })

    expect(cells).toHaveLength(9)
  })

  test('shows that Player X starts', () => {
    expect(screen.getByText('Current turn: X')).toBeInTheDocument()
  })

  test('clicking a cell updates it with X and switches to O', () => {
    const cells = screen.getAllByText((_, el) => el?.className.includes('border-2') ?? false)

    fireEvent.click(cells[0])

    expect(cells[0]).toHaveTextContent('X')
    expect(screen.getByText('Current turn: O')).toBeInTheDocument()
  })

  test('clicking the same cell twice does not change it', () => {
    const cells = screen.getAllByText((_, el) => el?.className.includes('border-2') ?? false)

    fireEvent.click(cells[0])
    fireEvent.click(cells[0])

    expect(cells[0]).toHaveTextContent('X')
    expect(screen.getByText('Current turn: O')).toBeInTheDocument()
  })

  test('detects a winner and shows winner message', () => {
    const cells = screen.getAllByText((_, el) => el?.className.includes('border-2') ?? false)

    fireEvent.click(cells[0])
    fireEvent.click(cells[3])
    fireEvent.click(cells[1])
    fireEvent.click(cells[4])
    fireEvent.click(cells[2])

    expect(screen.getByText('Player X wins!')).toBeInTheDocument()

    fireEvent.click(cells[5])
    expect(cells[5]).toHaveTextContent('')
  })

  test('detects a draw and shows draw message', () => {
    const cells = screen.getAllByText((_, el) => el?.className.includes('border-2') ?? false)

    const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8]
    moves.forEach((cellIndex, i) => fireEvent.click(cells[cellIndex]))

    expect(screen.getByText("It’s a draw!")).toBeInTheDocument()
  })
})

