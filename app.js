import cookieParser from "cookie-parser";
import authRoute from './modules/./auth/auth.routes.js'
import dotenv from 'dotenv'
import express from 'express'



dotenv.config();

const app = express();
app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoute)





export default app;