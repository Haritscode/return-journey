const {Router}=require("express");
const createUser = require("../controller/createUser.controller");
const getVerificationCode = require("../controller/getVerificationCode");
const verifyOtp = require("../handler/verifyOtp.handler");
const getOtpVerified = require("../controller/getOtpVerified.controller");
const sendOtp = require("../handler/sendOtp.handler");
const routes=Router()
routes.route("/verify/:contact").get(getVerificationCode,sendOtp).post(verifyOtp,getOtpVerified)
routes.route("/").post(createUser);
module.exports=routes;