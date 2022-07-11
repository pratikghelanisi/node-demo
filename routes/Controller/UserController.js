const { response } = require("express")
const Joi = require('joi');
const bcrypt = require('bcrypt');
const saltRounds = 2;
const Connection = require('.././Database/connection');
const User = require('.././Database/schema/Userschema');
const { Console } = require("console");
var jwt = require('jsonwebtoken');

const UserController = {
    async registration(req, res) {
        const schema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required().min(6).max(20),
        })       
       const error = schema.validate(req.body);
       if(error.error){
            // console.log("Not Done");
            const response = {
                stauts: 422,
                message : error.error.details[0].message
            }
            res.json(response);
       }
       else{
            const DB_Connection = await Connection(); 
            if(DB_Connection == 1){
                const password = bcrypt.hashSync(req.body.password, saltRounds);
                // res.json(password);
                const exist = await User.findOne({email:req.body.email });
                if(exist) {
                    const response = {
                        stauts: 409,
                        message : "Email ID already exists"
                    }
                    res.json(response);
                }
                else{
                    const InsertUser = await User.insertMany({
                        name : req.body.name,
                        email : req.body.email,
                        password : password
                      
                    });

                    const response = {
                        stauts: 200,
                        message : "User successfully registered"
                    }
                    res.json(response);
                }
             }
            else{
                const response = {
                    stauts: 502,
                    message : "Database connection error"
                }
                res.json(response);
            }
       }
    },
    async userlist(req, res)
    {
        const DB_Connection = await Connection(); 
        if(DB_Connection == 1){
            const exist = await User.find({},{"_id": 1,"name": 1,"email": 1}).sort({"_id": -1});
            console.log(exist)
            if(exist.length > 0)
            {
                const response = {
                    stauts: 200,
                    data : exist
                }
                res.json(response);
            }
            else{
                const response = {
                    stauts: 404,
                    data : "User not found"
                }
                res.json(response);
            }
         } 
    },

    async user(req, res)
    {
        const DB_Connection = await Connection(); 
        if(DB_Connection == 1){
            if(!req.body.userid ){
                const response = {
                    stauts: 422,
                    message : "User id is required",
                }
                res.json(response)
            }

            else{
                const exist = await User.findOne({_id:`${req.body.userid}`},{"_id": 1,"name": 1,"email": 1});
           
                if(exist){
                    const response = {
                        stauts: 200,
                        data : exist
                    }
                    res.json(response);
                }
                else{
                    const response = {
                        stauts: 200,
                        message : "User not found"
                    }
                    res.json(response);
                }
            }
         } 
         else{
            const response = {
                stauts: 502,
                message : "Database connection error"
            }
            res.json(response);
        }
    },
    async userlogin(req, res)
    {
        const DB_Connection = await Connection(); 
        if(DB_Connection == 1){
            if(!req.body.email && !req.body.password){
                let response = {
                    stauts: 422,
                    message : "email or password are required",
                }
                res.json(response)
            }
            else{
                const exist = await User.findOne({ email: req.body.email },{"_id": 1,"name": 1,"email": 1,"password": 1});
                if(exist){ 
                    const isPasswordCorrect = await bcrypt.compare(req.body.password, exist.password)
                    if(isPasswordCorrect == true)
                    {
                        let token = jwt.sign({
                            "name":  exist.name,"email": exist.email
                         }, 'demo',{ expiresIn: '24h' });
                         
                         console.log(new Date());
                        // try {
                        //     var decoded = jwt.verify(token, 'demo');
                        //        console.log(decoded);
                        //   } catch(err) {
                        //        console.log(err);
                        //  }

                        let response = {
                            stauts: 200,
                            message : "User successfully Login",
                            token : token
                        }
                        res.json(response)
                    }
                    else
                    {
                        let response = {
                            stauts: 200,
                            message : "Invalid User",
                        }
                        res.json(response)
                    }
                }  
                else {
                    let response = {
                        stauts: 200,
                        message : "Invalid User",
                    }
                    res.json(response)
                 }
            }
         } 
         else{
            const response = {
                stauts: 502,
                message : "Database connection error"
            }
            res.json(response);
        }
    }
}
module.exports = UserController;