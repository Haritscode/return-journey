const userdb=require("../models/user.model")
class Users{
    createUser(firstName,lastName,contact,email,password,countryCode){
        const newUser=new userdb({firstName,lastName,contact,email,password,countryCode})
        return newUser.save();
    }
    getUserId(contact){
        return userdb.findOne({contact},{firstName:0,lastName:0,countryCode:0,contact:0,email:0,password:0,isActivated:0,createdAt:0,updatedAt:0,__v:0});
    }
}
module.exports=Users;