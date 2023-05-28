const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose")
require("dotenv").config()

app.use(express.json());
mongoose
    .connect(
        process.env.MONGODB_URL
    )
    .then(() => {
        console.log("MONGO CONNECTED");
    });

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

app.use((req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[0];

        const decodedToken = jwt.verify(token, 'secret-key');
        req.userData = { userId: decodedToken.userId };

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

const keyValueRoutes = require('./routes/keyValueRoutes');

app.use('/key-value', keyValueRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
