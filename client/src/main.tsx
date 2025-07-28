import React, { useState, useEffect } from 'react'
import { XorO, Board } from './types'
import { emptyBoard, checkGameStatus } from './utils/board'
import './assets/index.css';

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
    <div className="main-container">
      <section className="stats-section">
        <h2 className="stats-title">Game Stats</h2>
        <p className="stats-text">Player X wins: <span>{stats.X}</span></p>
        <p className="stats-text">Player O wins: <span>{stats.O}</span></p>
        <p className="stats-text">Draws: <span>{stats.draw}</span></p>
      </section>

      <div className="right-panel">
        <h1 className="game-title">Tic Tac Toe</h1>

        <div
          className={`status-banner ${
            winner
              ? winner === 'draw'
                ? 'status-draw'
                : winner === 'X'
                ? 'status-winner-x'
                : 'status-winner-o'
              : currentPlayer === 'X'
              ? 'status-turn-x'
              : 'status-turn-o'
          }`}
        >
          {winner
            ? winner === 'draw'
              ? 'It’s a draw!'
              : `Player ${winner} wins!`
            : `Current turn: Player ${currentPlayer}`}
        </div>

        <div className="board">
          {board.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="board-row">
              {row.map((cell, colIndex) => (
                <div
                  key={`col-${colIndex}`}
                  data-testid="board-cell"
                  onClick={() => handleClick(rowIndex, colIndex)}
                  className={`board-cell ${cell ? 'filled' : 'empty'}`}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>

        <button
          onClick={resetGame}
          className={`btn-reset ${winner ? 'game-over' : 'in-progress'}`}
        >
          {winner ? 'Start New Game' : 'Reset Game'}
        </button>
      </div>
    </div>
  )
}
