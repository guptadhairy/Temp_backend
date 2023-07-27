import { Payment } from "../models/payment.js";

export const payment = async(req,res)=>{
    try {
        const {name,email,phone,amount,transaction} = req.body;
    const payments = await Payment.create({name,email,phone,amount,transaction});

    console.log(payments);

    res.status(200).json({
        success: true,
        message: "Payment is succesfull"
    });
    } catch (error) {
        console.log(error);
    }

};