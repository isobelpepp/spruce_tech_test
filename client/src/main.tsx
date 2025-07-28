import React, { useState, useEffect } from 'react'
import { XorO, Board } from './types'
import { emptyBoard, checkGameStatus } from './utils/board'

export const Main = () => {
  const [board, setBoard] = useState<Board>(emptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState<XorO>('X')
  const [winner, setWinner] = useState<XorO | 'draw' | null>(null)
  const [gameOver, setGameOver] = useState(false)
  const [stats, setStats] = useState<{ X: number; O: number; draw: number }>({ X: 0, O: 0, draw: 0 })

  useEffect(() => {
    if (winner && !gameOver) {
      fetch('http://localhost:4000/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ winner }),
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to submit result')
          return res.text()
        })
        .then(() => {
          fetchStats()
          setGameOver(true)
        })
        .catch(console.error)
    }
  }, [winner, gameOver])

  const fetchStats = () => {
    fetch('http://localhost:4000/stats')
      .then(res => res.json())
      .then(setStats)
      .catch(console.error)
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] || gameOver) return

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

  const resetGame = () => {
    setBoard(emptyBoard)
    setCurrentPlayer('X')
    setWinner(null)
    setGameOver(false)
  }

  return (
    <div className='flex flex-col mt-10 items-center gap-10'>
      <div className='font-bold text-2xl'>Tic Tac Toe</div>

      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-2">Game Stats</h2>
        <p>Player X wins: {stats.X}</p>
        <p>Player O wins: {stats.O}</p>
        <p>Draws: {stats.draw}</p>
      </div>

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

       <button
        onClick={resetGame}
        className={`mt-4 px-4 py-2 rounded transition ${
          winner
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 hover:bg-gray-400'
        }`}
      >
        {winner ? 'Start New Game' : 'Reset Game'}
      </button>
    </div>  
  )
}
