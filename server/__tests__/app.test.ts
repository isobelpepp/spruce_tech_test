import request from 'supertest'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import { createApp } from '../app'

let db: any
let app: any

beforeEach(async () => {
  db = await open({
    filename: ':memory:',
    driver: sqlite3.Database,
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      winner TEXT NOT NULL CHECK(winner IN ('X','O','draw')),
      playedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `)

  app = createApp(db)
})

afterEach(async () => {
  await db.close()
})

describe('POST /results', () => {
  it('should return 201 for valid winner "X" and save result', async () => {
    const res = await request(app).post('/results').send({ winner: 'X' })
    expect(res.status).toBe(201)

    const rows = await db.all('SELECT * FROM results WHERE winner = ?', 'X')
    expect(rows.length).toBe(1)
  })

  it('should return 201 for valid winner "O" and save result', async () => {
    const res = await request(app).post('/results').send({ winner: 'O' })
    expect(res.status).toBe(201)

    const rows = await db.all('SELECT * FROM results WHERE winner = ?', 'O')
    expect(rows.length).toBe(1)
  })

  it('should return 201 for valid winner "draw" and save result', async () => {
    const res = await request(app).post('/results').send({ winner: 'draw' })
    expect(res.status).toBe(201)

    const rows = await db.all('SELECT * FROM results WHERE winner = ?', 'draw')
    expect(rows.length).toBe(1)
  })

  it('should return 400 for invalid winner and not save result', async () => {
    const res = await request(app).post('/results').send({ winner: 'invalid' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Invalid winner')

    const rows = await db.all('SELECT * FROM results WHERE winner = ?', 'invalid')
    expect(rows.length).toBe(0)
  })

  it('should return 400 if winner is missing', async () => {
    const res = await request(app).post('/results').send({})
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Invalid winner')
  })
})

describe('GET /stats', () => {
  it('should return zeros if no results exist', async () => {
    const res = await request(app).get('/stats')

    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      X: 0,
      O: 0,
      draw: 0
    })
  })

  it('should return correct stats after posting results', async () => {
    await request(app).post('/results').send({ winner: 'X' })
    await request(app).post('/results').send({ winner: 'draw' })

    const res = await request(app).get('/stats')

    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      X: 1,
      O: 0,
      draw: 1
    })
  })
})
