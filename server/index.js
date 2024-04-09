import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import kpiRoutes from './routes/kpi.js'
import KPI from './models/KPI.js'
import { kpis } from './data/data.js'

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
app.use('/kpi', kpiRoutes)

/* Mongooose setup */  
const PORT = process.env.PORT || 9000;
mongoose
.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(async () => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

    // Insert data one time only
    try {
        // const inserted = await KPI.insertMany(kpis);
        // console.log(`Inserted ${inserted.length} KPIs`);
    } catch (error) {
        console.error('Failed to insert KPIs:', error);
    }
})
.catch((error) => console.error('MongoDB connection error:', error));

