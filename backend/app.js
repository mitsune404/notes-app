const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
app.use(cors({
    origin: 'http://127.0.0.1:5500' // Allow requests from this origin
}));
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

module.exports = app;
