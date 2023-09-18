require("dotenv").config(process.env.NODE_ENV==='development'?{path:'.env.dev'}:{path:'.env.prod'});
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_ID,
  process.env.TWILIO_AUTH_TOKEN
);
const generateOtp = require("../assets/optGenerator.assets");
const ErrorHandler = require("../config/ErrorHandler.config");
const otpdb = require("../models/otp.model");
const bcrypt = require("bcryptjs");
const verifyUser = async (req, res, next) => {
    const { contact } = req.params;
    const otp=generateOtp(6);
    const hashOtp = bcrypt.hashSync(otp, bcrypt.genSaltSync());
    try {
        otpdb.findOneAndUpdate({contact},{otp:hashOtp},{upsert:true,new:true}).then((result)=>{
            if(result._id){
                client.messages
                .create({
                    body: `Your Verification code is ${otp}`,
                    from: process.env.TWILIO_TEST_NUMBER,
                    to: contact,
                }).then((message) => {
                    if (message) {
                        res.status(200).send({ msg: "OTP Sent" });
                    }
                })
            }
        })
        .catch(err=>{
            next(new ErrorHandler());
        })
    }
    catch (err) {
        next(new ErrorHandler());
    }
};
module.exports = verifyUser;