import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
dotenv.config()
const  app = express ()
//DB
import dbConnect from './db/connect.js'
//ROUTES
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
//MIDDLEWARE IMPORT
import authenticateUser from './middlewares/auth.js'
import notFoundMiddleware from './middlewares/not-found.js';
import errorHandlerMiddleware from './middlewares/error-handler.js'
//PORT
const PORT = process.env.PORT || 8000


//middleware
app.use(express.json())
app.use('/api/v1/user', userRoute)
app.use('/api/v1/category', authenticateUser, categoryRoute)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const AppServer =  async () =>{
  
        await dbConnect(process.env.MONGO_URL)
        app.listen(PORT, ()=>{ console.log(`Server runnng on port ${PORT}`)})
  
}

AppServer();