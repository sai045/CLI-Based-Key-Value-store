const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body)

        const existingUser = await User.findOne({ username });

        if(existingUser){
            res.status(500).json({message:"User Already exists"})
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const token = jwt.sign({ userId: user._id }, 'secret-key', {
                    expiresIn: "1h",
                });

                res.json({ token });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.protectedRoute = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[0];

        const decodedToken = jwt.verify(token, 'secret-key');

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        res.json({ message: 'Protected route accessed successfully' });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};