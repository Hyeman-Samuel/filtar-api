const {User} = require("../model/user")
const ROLES = require("../model/role");

module.exports={
getUserById:async function (userId){
return await User.findById(userId);
},
getUserByPredicate:async function (obj){
    return await User.findOne(obj);
},
getUsersByPredicate:async function (obj){
    return await User.find(obj);
},
createUser:async function (user){
    const _user = new User(
    {"email":user.email,
    "role":ROLES.USER});
    _user.setPassword(user.password);
    await _user.save();
},

validatePassword:async function (email,password){
    const user = await User.findOne({"email":email})
    if(!user) return false;
    return user.validatePassword(password);
}
,authJwt:async function (userId){
    const user = await User.findById(userId)
   return user.toAuthJSON();
}
}