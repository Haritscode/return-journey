const userDb=require("../models/user.model")
class Users{
    async createUser(firstName,lastName,contact,email,password,countryCode){
        const newUser=new userDb({firstName,lastName,contact,email,password,countryCode})
        return newUser.save();
    }
}
module.exports=Users;