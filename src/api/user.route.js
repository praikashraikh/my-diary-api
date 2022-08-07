const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

async function registerUser(req, res, next) {
    const newUser = req.body || {};

    try {
        console.log("Creating user: ", newUser);
        const createdUser = await userService.createUser(newUser);
        res.status(200).json(createdUser);
    } catch (err) {
        console.log("Failed creating user:", err);
        res.status(500).json({ message: 'Failed creating user.'})
    }
}

async function login(req, res, next) {
    const user = req.body || {};
    try {
        const token = await userService.login(user);
        res.status(200).json({ token: token });
    } catch(err) {
        console.log("Error while logging in:", err);
        res.status(403).json({ message: 'Invalid username/password'})
    }
}

router.post('/register-user', registerUser);
router.post('/login', login);

module.exports = router;