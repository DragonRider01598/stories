const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes');
const storyRoutes = require('./routes/storyRoutes');
const cors = require('cors');
const path = require("path");
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
   app.use(cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
   }))
}

app.use('/api/auth', authRoutes);
app.use('/api/story', storyRoutes);

app.use('/health', (req, res) => { return res.status(200).send('Server is online') })

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../frontend/build")));

   app.get("*", (req, res) => {
      if (req.path.startsWith("/api")) return; // Prevents API routes from being overridden
      res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
   });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));