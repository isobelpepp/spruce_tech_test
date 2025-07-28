import express from 'express'
import cors from 'cors'
import { Database } from 'sqlite'

export function createApp(db: Database) {
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.post('/results', async (req, res) => {
    const { winner } = req.body as { winner: 'X' | 'O' | 'draw' }
    if (!['X', 'O', 'draw'].includes(winner)) {
      return res.status(400).json({ error: 'Invalid winner' })
    }
    await db.run('INSERT INTO results (winner) VALUES (?);', winner)
    res.sendStatus(201)
  })

  return app
}
