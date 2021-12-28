//const {User} = require("../model/user")
const User = require("../persistence/mysql").users
const ROLES = require("../models/role");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { uuid } = require('uuidv4');

function generateJWT(user){
const today = new Date();
const expirationDate = new Date(today);
expirationDate.setDate(today.getDate() + 60);

return jwt.sign({
    email:user.email,
    id: user.id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
}, process.env.JWT_SECRET);
}

module.exports={
getUserById:async function (userId){
    const userModel = await (await User.findOne({"id":userId})).toJSON()
    const user={
    "id":userModel.id,
    "email":userModel.email,
    "role":userModel.role
    }
    return user;

},
getUserByPredicate:async function (obj){
    return await (await User.findOne(obj)).toJSON();
},
getUsersByPredicate:async function (obj){
    return await User.findAll(obj);
},
createUser:async function (user){
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(user.password, salt, 10000, 512, 'sha512').toString('hex');
    const _user = await User.create(
    {"id":uuid(),
    "email":user.email,
    "salt":salt,
    "hash":hash,
    "role":ROLES.USER});
   return await _user.toJSON()
},

validatePassword:async function (email,password){
    const user = await (await User.findOne({"email":email})).toJSON()
    if(!user) return false;

    const hash = crypto.pbkdf2Sync(password,user.salt, 10000, 512, 'sha512').toString('hex');
    return user.hash === hash;
}
,authJwt:async function (userId){
    const user = await (await User.findOne({"id":userId})).toJSON();
   return{
    _id: user.id,
    email: user.email,
    token: generateJWT(user),
  };
}
}