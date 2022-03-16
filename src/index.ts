import express from 'express'
import cors from 'cors'
import config from '../config'
import { authRouter } from './routers'

const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use('/auth', authRouter)

app.get('/home', (_, res) => {
  res.json({ message: 'Hello world' })
})

app.listen(config.app.PORT, () => {
  console.log(`Listening to localhost:${config.app.PORT}`)
})
