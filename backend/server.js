const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes');
const storyRoutes = require('./routes/storyRoutes');
const cors = require('cors')
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: process.env.FRONTEND_URL,
   credentials: true,
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true,
}))

app.use('/api/auth', authRoutes);
app.use('/api/story', storyRoutes);

app.use('/', (req, res) => { return res.status(200).send('Server is online') })

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));