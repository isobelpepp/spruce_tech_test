import React from 'react'
import { render, screen } from '@testing-library/react'
import { Main } from '../main'
import '@testing-library/jest-dom'

describe('Main Component', () => {
  test('renders the board', () => {
    render(<Main />)

    expect(screen.getByText('Tic Tac Toe')).toBeInTheDocument()

    const cells = screen.getAllByText((content, element) => {
      return element ? element.className.includes('border-2') : false
    })

    expect(cells).toHaveLength(9)
  })

  test('shows that Player X starts', () => {
    render(<Main />)

    expect(screen.getByText('Current turn: X')).toBeInTheDocument()
  })
})