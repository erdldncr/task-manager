const express = require('express')
const app = express()
const dotenv=require('dotenv')
const connecDB=require('./db/connect')
const port = process.env.PORT||3000
const notFound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/errorHandler')
dotenv.config()
//middleware
app.use(express.static('public'))
app.use(express.json())



//routes
app.use('/api/v1/tasks',require('./routes/tasks'))

app.use('*',notFound)
app.use(errorHandlerMiddleware)



const start=async()=>{
    
    try {
        await connecDB(process.env.URI)
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))

        
    } catch (error) {
        console.log('couldnt cocnnected to DB')
    }
}

start()