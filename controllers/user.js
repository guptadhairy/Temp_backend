import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user)
            return res.status(404).json({
                succuss: false,
                message: "User already exists",
            });

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ _id: user._id }, "asdfghjkkjhg");

        res.status(201).cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "none",
            secure: true,
        }).json({
            success: true,
            message: "Registered successfully",
        });
    } catch (error) {
        console.log(error);
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user)
            return res.status(404).json({
                success: false,
                message: "Invalid email or password",
            });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(404).json({
                success: false,
                message: "Invalid email or password",
            });

        const token = jwt.sign({ _id: user._id }, "asdfghjkkjhg");

        res.status(201).cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax":"none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: `Welcome back,${user.name} `,
        });
    } catch (error) {
        console.log(error);
    }
}


export const getMyProfile = async (req, res) => {
    try {
        const { token } = req.cookies;
        console.log(token);

        if (!token)
            return res.status(404).json({
                success: false,
                message: "Login First",
            });

        const decoded = jwt.verify(token, "asdfghjkkjhg");
        const user = await User.findById(decoded._id);
        res.status(200).json({
            success: true,
            message: "Yes, We find you",
            user
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = (req, res) => {
    res.status(200).cookie("token", "", { expires: new Date(Date.now()),sameSite: process.env.NODE_ENV === "Development" ? "lax":"none",
    secure: process.env.NODE_ENV === "Development" ? false : true, }).json({
        success: true,
        message: "Loged out successfully"
    })
}