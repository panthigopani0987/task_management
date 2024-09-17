const user = require('../models/user');

const emailValidation = require('email-validator');

const index = (req,res)=>{
    return res.json({status : 200,message : 'Done'});
}

const register = async(req,res)=>{
    try{
        const {name,email,password,cpassword,role} = req.body;
        const existingUser = await user.findOne({ email });
        if(existingUser)
        {
            return res.json({status : 200,message : 'Email Already Exist'});
        }
        else{
            if(password == cpassword && emailValidation.validate(email)){
                const insertData = await user.create({
                    name : name,
                    email : email,
                    password : password,
                    role : role
                });
                if(insertData)
                {
                    return res.json({status : 200,message : 'Register Succsessfully'});
                }
                else{
                    return res.json({status : 404,message : 'Register Error'});
                }
            }
            else{
                return res.json({status : 201,message : 'Password and Confirm Password Both Are Wrong'});
            }
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const jwtData = require('jsonwebtoken');

const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        const userlogin = await user.findOne({
            $or: [{
                "email": email
            }, {    
                "phone": email
            }, {
                "name ": email
            }]
        });
        if(!userlogin || userlogin.password != password)
        {
            return res.json({status : 0,message : 'Email And Password not Valid'});
        }
        let token = jwtData.sign({payload : userlogin},'role-base-app',{expiresIn : '1h'});
        return res.json({token : token});
    }catch(err){
        console.log(err);
        return false
    }
}


const viewData = async (req,res)=>{
    try{
        let viewUser = await user.find({});
        if(viewUser)
        {
            return res.json({status : 200,message : viewUser});
        }
        else{
            return res.json({status : 404,message : 'User Data Not Found'});
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    index,
    register,
    viewData,
    login
}