const { response } = require("express")
const Joi = require('joi');
const { exit } = require("process");
const Connection = require('.././Database/connection');
const { insertMany } = require(".././Database/schema/Settingschema");
const Setting = require('.././Database/schema/Settingschema');
const UserController = {

    async UpdateSetting(req, res) {
            const DB_Connection = await Connection(); 
            if(DB_Connection == 1){
                const schema = Joi.object({
                    name: Joi.string().min(3).max(30).required(),
                    email: Joi.string().email().required(),
                    phone: Joi.string().required(),
                    address: Joi.string().required(),
                })     
            
                const error = schema.validate(req.body);
                if(error.error){
                    const response = {
                        stauts: 422,
                        message : "All fields are required",
                    }
                    res.json(response);
               }
               else{
                const exist = await Setting.findOne({});
                // console.log(exist);

                if(exist == null){
                    // console.log("Insert");
                    const InsertSetting = await Setting.insertMany({
                    name : req.body.name,
                    email : req.body.email,
                    phone : req.body.phone,
                    address : req.body.address,
                });
                    const response = {
                        stauts: 200,
                        message : "Data created successfully",
                    }
                    res.json(response);
                }
                else{
                    // console.log("Update");
                    const UpdateSetting = await Setting.updateMany({id: exist._id}, { $set: { 
                                name: req.body.name,
                                email: req.body.email,
                                phone: req.body.phone,
                                address: req.body.address,
                            }});
                            if(UpdateSetting.acknowledged === true)
                            {
                                 const response = {
                                            stauts: 200,
                                            message : "Data successfully modified",
                                        }
                                        res.json(response);
                            }
                            else{
                                const response = {
                                        stauts: 500,
                                        message : "Something went wrong",
                                    }
                                res.json(response);
                            }
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