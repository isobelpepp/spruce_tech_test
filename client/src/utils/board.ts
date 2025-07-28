import { Board, XorO } from '../types'

export const emptyBoard = (): Board => [
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
  [undefined, undefined, undefined]
]

export const checkGameStatus = (board: Board): XorO | 'draw' | null => {
  return (
    checkRows(board) ||
    checkColumns(board) ||
    checkDiagonals(board) ||
    (board.every(row => row.every(cell => cell !== undefined)) ? 'draw' : null)
  )
}

const checkRows = (board: Board): XorO | null => {
  for (const row of board) {
    if (row[0] && row[0] === row[1] && row[0] === row[2]) return row[0]
  }
  return null
}

const checkColumns = (board: Board): XorO | null => {
  for (let col = 0; col < 3; col++) {
    const first = board[0][col]
    if (first && first === board[1][col] && first === board[2][col]) return first
  }
  return null
}

const checkDiagonals = (board: Board): XorO | null => {
  const center = board[1][1]
  if (
    center &&
    ((center === board[0][0] && center === board[2][2]) ||
      (center === board[0][2] && center === board[2][0]))
  ) {
    return center
  }
  return null
}
