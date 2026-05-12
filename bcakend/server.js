import express from 'express';
import connectDB from './Other/Database.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './Router.js/Saldeed.js';
const app = express();
const PORT = 3000;

app.use(cookieParser());

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use('/api/saledeed',router);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // connectDB();
});