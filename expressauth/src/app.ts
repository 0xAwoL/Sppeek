import { fileURLToPath } from 'url';
import express from 'express';
import path from 'path';
import cors from 'cors';
import userRouter from './routers/user.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// whitelist of allowed origins
app.use((req, res, next) => {
  // const allowedOrigins = ['http://localhost:5173','http://localhost:80', 'http://localhost:8080', 'https://www.sppeek.online', 'https://www.sppeek.online'];
  const allowedOrigins = process.env.DEBUG ?  ['http://localhost:5173', 'localhost:8080'] : ['https://www.sppeek.online', 'https://sppeek.online'];
  const origin = req.headers.origin!;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  next()
})

app.use(cors())
app.use(express.json())

// static files - resetpassword form
app.use(express.static(path.join(__dirname, 'page', 'form')))
app.use(userRouter)

export default app