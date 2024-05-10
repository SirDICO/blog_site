import express from 'express'
import 'express-async-error'
import dotenv from 'dotenv'
import dbConnect from './db/connect.js'
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
dotenv.config()
const  app = express ()
const PORT = process.env.PORT || 8000


//middleware
app.use(express.json())
app.use('/api/user', userRoute)
app.use('/api/category/', categoryRoute)



const AppServer =  async () =>{
    try {
        await dbConnect(process.env.MONGO_URL)
        app.listen(PORT, ()=>{ console.log(`Server runnng on port ${PORT}`)})
    } catch (error) {
        console.log(error)
    }
}

AppServer();