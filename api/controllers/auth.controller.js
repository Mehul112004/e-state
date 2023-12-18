import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {

    console.log(req.body)
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    try {
        await user.save();
        res.status(201).json({ message: "user created" });

    } catch (error) {
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    console.log(`Trying to sign in with details : ${req.body}`);
    const { email, password } = req.body;
    if (email && password) {
        console.log(email, password);
        try {
            const validUser = await User.findOne({ email });
            console.log(validUser);
            if (!validUser)
                next(errorHandler(404, "User not found"));
            const validPassword = bcrypt.compareSync(password, validUser.password);
            if (!validPassword)
                next(errorHandler(401, "Invalid credentials"));
            console.log("user signed in successfully ");
            const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET)
            console.log(token);
            const { password: pass, ...rest } = validUser._doc;
            res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "none" }).status(200).json({ message: "user signed in", rest });
        }
        catch (error) {
            next(error);

        }
    }
}

export const google = async (req, res, next) => {
    console.log("Google sign in");
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
            console.log("inside if block")
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie("access_token", token, { httpOnly: true, sameSite: "none", secure: true }).status(200).json({ message: "user signed in", rest })
        } else {
            console.log("inside else block")
            const password = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = new User({ username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8), email: req.body.email, password: hashedPassword, avatar: req.body.photo })
            await newUser.save();

            try {
                const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
                const { password: pass, ...rest } = newUser._doc;
                res.cookie("access_token", token, { httpOnly: true, sameSite: "none", secure: true }).status(200).json({ message: "user signed in", rest })
            } catch (error) {
                console.log("Erorr signing jwt token to newUser", error);
                next(errorHandler(400, "gadbad ho gya"))
            }
        }
    } catch (error) {
        next(errorHandler(400, "kuch toh gadbad hai daya"))
    }
}