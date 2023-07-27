import { News } from "../models/news.js";

export const newsLetter = async(req,res)=>{
    try {
        const {email} = req.body;
    const news = await News.create({email});

    console.log(news);

    res.status(200).json({
        success: true,
        message: "Successfully send the email for subscription"
    })
    } catch (error) {
        console.log(error);
    }

}