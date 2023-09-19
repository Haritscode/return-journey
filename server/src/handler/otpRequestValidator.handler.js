const ErrorHandler = require("../config/ErrorHandler.config");
const User=require("../repo/user.repo")
const otpRequestValidator = async (req, res, next) => {
  const { contact } = req.params;
  try {
    const user=new User();
    const userId=await user.getUserId(contact);
    if(userId?.id){
      req.userId=userId
      next();
    }
    else{
      next(new ErrorHandler("user not registered",404))
    }
  } catch (err) {
      next(new ErrorHandler());
    }
};
module.exports = otpRequestValidator;
