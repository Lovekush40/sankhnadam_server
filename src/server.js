import dotenv from 'dotenv'
dotenv.config(
    {path: './.env'}
)

import { app } from './app.js'
import { connectDB } from './db/index.js'

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log("APP is listening on the port 8000")
    })
})
.catch((err) => {
    console.log("MONGODB connection failed !!!", err);
})