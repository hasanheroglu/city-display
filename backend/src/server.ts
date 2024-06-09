import express from 'express'
import cors from 'cors'
import { CityRoute } from './controller/city.controller'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.API_PORT

app.use(cors())
app.use('/api/v1/cities', CityRoute)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
