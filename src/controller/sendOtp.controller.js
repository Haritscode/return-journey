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
  const { contact }=req.params;
  try{
    client.messages
    .create({
      body: `Your Verification code is ${req.otp}`,
      from: process.env.TWILIO_TEST_NUMBER,
      to: contact,
    })
    .then((message) => {
      if (message) {
        res.status(200).send({ msg: "OTP Sent" });
      }
    });
  }
  catch(err){
    next(new ErrorHandler());
  }
}
module.exports=sendOtp