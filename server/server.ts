import { getConnection } from './db'
import { createApp } from './app'

getConnection().then(db => {
  const app = createApp(db)
  const port = process.env.PORT || 4000
  app.listen(port, () => console.log(`Server running on port ${port}`))
})
