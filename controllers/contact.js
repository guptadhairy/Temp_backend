import { Contact } from "../models/contact.js";


export const contactUs = async (req, res) => {
    try {
        const { name, email, message } = req.body;

    await Contact.create({ name, email, message })

    res.status(200).json({
        success: true,
        reply: "Your message sent successfully !"
    });
}catch (error) {
    console.log(error);
}
    } 