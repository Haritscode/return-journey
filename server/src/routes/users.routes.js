const {Router}=require("express");
const createUser = require("../controller/createUser.controller");
const routes=Router()
routes.route("/").post(createUser)
module.exports=routes;