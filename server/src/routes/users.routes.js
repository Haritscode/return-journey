const {Router}=require("express");
const createUser = require("../controller/createUser.controller");
const verifyUser = require("../controller/verifyUser.controller");
const verifyOtp = require("../controller/verifyOtp.controlller");
const routes=Router()
routes.route("/verify/:contact").get(verifyUser).post(verifyOtp)
routes.route("/").post(createUser);
module.exports=routes;