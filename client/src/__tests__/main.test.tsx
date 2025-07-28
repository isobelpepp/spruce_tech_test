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
})
