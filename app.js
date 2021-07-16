import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/product';
import categoryRoutes from './routes/category';
import authRoutes from './routes/auth';
import cors from 'cors';

//Config
const app = express();
dotenv.config();

//Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MONGODB CONNECTED");
});
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

//Middle
app.use(express.json());
app.use(cors({ credentials: 'same-origin' }));


//Routes
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', authRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})