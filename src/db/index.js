import mongoose from 'mongoose'
import {DB_NAME} from '../constant.js'

export const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
        console.log(`MONGOOSE CONNECTED !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("DATABASE CONNECTION ERROR:", error)
        process.exit(1)
    }
}