import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'

const signUp = async (req, res,next) => {

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

export default signUp