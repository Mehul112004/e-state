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
            const token = jwt.sign({ email: validUser.email }, process.env.JWT_SECRET)
            console.log(token);
            const { password: pass, ...rest } = validUser._doc;
            res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "none" }).status(200).json({ message: "user signed in", rest });
        }
        catch (error) {
            next(error);

        }
    }
}

export const deleteUser = async (req, res, next) => {
    console.log(`Trying to delete user with details : ${req.body}`);
    const { email } = req.body;
    console.log(email);
    const response = await User.findOneAndDelete({ email });
    console.log(response);
}