import { emptyBoard, checkGameStatus } from '../utils/board'
import { Board, XorO } from '../types'

describe('board utils', () => {
  test('emptyBoard returns a 3x3 board filled with undefined', () => {
    const board = emptyBoard()
    expect(board).toHaveLength(3)
    board.forEach(row => expect(row).toEqual([undefined, undefined, undefined]))
  })

  test('checkGameStatus detects row wins', () => {
    const board: Board = [
      ['X', 'X', 'X'],
      [undefined, 'O', undefined],
      ['O', undefined, 'O'],
    ]
    expect(checkGameStatus(board)).toBe('X')
  })

  test('checkGameStatus detects column wins', () => {
    const board: Board = [
      ['O', 'X', undefined],
      ['O', 'X', undefined],
      ['O', undefined, 'X'],
    ]
    expect(checkGameStatus(board)).toBe('O')
  })

  test('checkGameStatus detects diagonal wins', () => {
    const board1: Board = [
      ['X', 'O', undefined],
      [undefined, 'X', 'O'],
      [undefined, undefined, 'X'],
    ]
    expect(checkGameStatus(board1)).toBe('X')

    const board2: Board = [
      ['O', 'X', 'X'],
      [undefined, 'O', undefined],
      ['X', undefined, 'O'],
    ]
    expect(checkGameStatus(board2)).toBe('O')
  })

  test('checkGameStatus detects draw', () => {
    const board: Board = [
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'X'],
    ]
    expect(checkGameStatus(board)).toBe('draw')
  })

  test('checkGameStatus returns null if game is ongoing', () => {
    const board: Board = [
      ['X', undefined, 'O'],
      [undefined, 'O', undefined],
      ['X', undefined, undefined],
    ]
    expect(checkGameStatus(board)).toBeNull()
  })
})
