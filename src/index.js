import './utils/config'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import basicAuth from 'express-basic-auth'

import logger from './utils/logger'
import router from './routes'
import { notFound, errorHandler } from './utils/errors'

const port = process.env.PORT || 3000; // Use a default port if process.env.PORT is not defined

const app = express()

app.use(
  basicAuth({
    users: { [process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD },
  }),
)

// Specify a format for Morgan, for example, 'combined'
app.use(morgan('combined'))

app.use(cors({ origin: process.env.CORS_ORIGIN }))
app.use(helmet())
app.use(bodyParser.json())

app.use('/', router)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})
