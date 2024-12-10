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
   credentials: true
}))

app.use('/api/auth', authRoutes);
app.use('/api/story', storyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));