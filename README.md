# Tic Tac Toe

## Summary

This is a Tic Tac Toe game built with:

- **React + TypeScript** on the frontend
- **Express + SQLite** on the backend

Features include:

- Turn-based play for Player **X** and **O**
- Win/draw detection with restart functionality
- A scoreboard tracking the number of wins for each player and draws
- API to store game results in a database
- Basic testing for both frontend and backend

I completed **Problem 1** (game logic and UI) and **Problem 3** (backend and database integration).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en) installed (v18+ recommended)  

---

### 1. Start the Frontend

```bash
cd client
npm install
npm start
```

The React app will run at: [http://localhost:3000](http://localhost:3000)

---

### 2. Start the Backend

```bash
cd server
npm install
npm start
```

The Express server will run at: [http://localhost:4000](http://localhost:4000)

---

### Testing

Run the tests in both frontend and backend directories:

```bash
npm test
```

The backend tests use `supertest` and an in-memory SQLite database.

---

## Notes

### What I implemented (Problem 1 & 3):

- ✅ Turn-based Tic Tac Toe gameplay
- ✅ Ability to reset UI mid-game or once game has ended
- ✅ Persistent results saved via REST API 
- ✅ `/results` POST endpoint to save game outcomes
- ✅ `/stats` GET endpoint to fetch win/draw counts
- ✅ Tests for API functionality

### Next steps and future considerations:

- Implement dynamic board size (Problem 2)
- Docker set up
- Refactor code to leverage full TypeScript capabilities, especially on backend
- Add user authentication and player profiles to track individual stats
- Improve testing coverage with end-to-end tests

---

## Project Structure

```
root
├── client/     # React + TypeScript frontend
└── server/     # Express + SQLite backend, database connection and setup
```

># Task outline
>The below problems are to allow us a glimpse into your problem solving ability, style and current skill set. Please do problem 1, and optionally problem 2 or 3 depending on where you are most comfortable. We expect this test to take 2-3 hours, if you find yourself spending more than this do not aim to solve all 3 problems! We will not be judging based on number of problems completed only the style and thought process.
>## Problems
>### Problem 1
>We have started a basic game of Tic-Tac-Toe as outlined [here](https://en.wikipedia.org/wiki/Tic-tac-toe) but we don't have anyone good enough to code to finish it! 
>- Please implement a complete basic game of Tic-Tac-Toe
>- Please use React and TypeScript throughout, if you know TailwindCSS please expand on what is already provided, otherwise it is fine to use raw styling 
>- Both players will play out of the same application, it is sufficient to just switch the current player each time a move is played
>- Once a game is completed, I should be able to start another game 
>### Problem 2
>We are bored with the basic game now, can you make it so the board can be scaled to any size? 
>- Add some kind of input which allows me to change the board size
>- The board size should be a number between 3 and 15 
>### Problem 3
>We want to store game results in a database.
>- create a simple backend server (using a simple generator provided by your IDE is fine)
>- use any SQL/noSQL database to store the results
>- return simple stats back to the front-end: number of win/losses for each player.
>Simplification for the task:
>- do not use database migration tools, just an SQL or other script to create tables is fine
>- add comments about what you were thinking about but didn’t implement because of restrictions
>- host the project on your local machine, optional hosting in a public place is fine
>- optionally create a Dockerfile to build both back-end and front-end. Do not create any deployment scripts, if it's not necessary.
>- optional tests are welcome
>## Quickstart
>- Make sure you have **node** installed
>- `cd client`
>- `npm i`
>- `npm start`