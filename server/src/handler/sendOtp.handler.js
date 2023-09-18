require("dotenv").config(
    process.env.NODE_ENV === "development"
      ? { path: ".env.dev" }
      : { path: ".env.prod" }
  );
const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_ID,
    process.env.TWILIO_AUTH_TOKEN
);
const sendOtp=(req,res,next)=>{
    client.messages
        .create({
          body: `Your Verification code is ${req.details.otp}`,
          from: process.env.TWILIO_TEST_NUMBER,
          to: req.details.contact,
        })
        .then((message) => {
          if (message) {
            res.status(200).send({ msg: "OTP Sent" });
          }
    });
}
module.exports=sendOtp