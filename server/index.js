import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import kpiRoutes from './routes/kpi.js'
/* CONFIGURATIONS */ 
dotenv.config() 
const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan( "common" ) )
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(cors())

//route setup
app.use('kpi', kpiRoutes)

/* Mongooose setup */  
const PORT = process.env.PORT || 9000;
mongoose 
.connect(process.env.MONGO_URL, { useNewUrlLParser: true, useUnifiedTopology: true, }) 
.then(async () => app.listen(PORT, () => console.log(`Server Port Connected: ${PORT}`)))
.catch((error) => console.log( `${error} did not connect`));


