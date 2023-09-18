const {Router}=require("express");
const createUser = require("../controller/createUser.controller");
const verifyOtp = require("../handler/verifyOtp.handler");
const getOtpVerified = require("../controller/getOtpVerified.controller");
const sendOtp = require("../controller/sendOtp.controller");
const genVerificationCode = require("../handler/generateVerificationCode.handler");
const routes=Router()
routes.route("/").post(createUser);
routes.route("/verify/:contact").get(genVerificationCode,sendOtp).post(verifyOtp,getOtpVerified)
module.exports=routes;