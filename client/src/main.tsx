import React, { useState } from 'react'
import { XorO, Board } from './types'
import { emptyBoard, checkGameStatus } from './utils/board'

export const Main = () => {
  const [board, setBoard] = useState<Board>(emptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState<XorO>('X')
  const [winner, setWinner] = useState<XorO | 'draw' | null>(null)

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] || winner) return

    const newBoard = board.map(row => [...row])
    newBoard[rowIndex][colIndex] = currentPlayer
    setBoard(newBoard)

    const gameResult = checkGameStatus(newBoard)
    if (gameResult) {
      setWinner(gameResult)
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  return <div className='flex flex-col mt-10 items-center gap-10'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>

    <div className='text-lg font-semibold'>
        {winner
          ? winner === 'draw'
            ? 'It’s a draw!'
            : `Player ${winner} wins!`
          : `Current turn: ${currentPlayer}`}
    </div>

    <div className='flex flex-col gap-1'>
      {board.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className='flex gap-1'>
          {row.map((column, colIndex) => (
            <div
              key={`col-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex'
            >
              {column}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
}
