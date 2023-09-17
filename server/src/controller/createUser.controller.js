const Users=require("../repo/user.repo");
const ErrorHandler=require('../config/ErrorHandler.config');
const createUser=async(req,res,next)=>{
    try{
        const {firstName="",lastName="",contact="",email="",password="",countryCode="+91"}=req.body;
        if(contact.length!==10){
            next(new ErrorHandler("Contact number must contain 10 digits",400))
        }
        else{
            const user=new Users();
            const data=await user.createUser(firstName,lastName,countryCode+contact,email,password,countryCode)
            res.status(200).json(data);
        }
    }
    catch(err){
        if(err.code == 11000){
            if(err.message.includes('email')){
                next(new ErrorHandler("Email already registered",409))
            }
            else if(err.message.includes('contact')){
                next(new ErrorHandler("Contact already registered",409))
            }
        }
        if(err.message.includes('validation failed')){
            next(new ErrorHandler(`Invalid ${err.message.split(/`/)[1].split(/`/)[0]}`,400))
        }
        next(new ErrorHandler())
    }

}
module.exports=createUser;