import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

dotenv.config({path: './config/.env'});
const port = process.env.PORT || 6000;

connectDB();

app.get('/',(req,res)=> res.send('Server is ready'))

app.listen(port, ()=> console.log(`server started on port: ${port}`))