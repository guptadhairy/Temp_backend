// import { Contact } from "../models/contact.js";
import nodemailer from 'nodemailer'

export const contactUs = async (req, res) => {
    const { name, email, message } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // You can use other email providers as well
        auth: {
            user: process.env.USER, // Your email address
            pass: process.env.PASS, // Your email password or application-specific password
        },
    });
    const mailOptions = {
        from: process.env.USER, // Your email address
        to: process.env.USER,
        subject: name,
        text: message,
        replyTo: email,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
} 