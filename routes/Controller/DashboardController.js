const { response } = require("express");
const { object } = require("joi");
const Joi = require('joi');
const ObjectId = require("mongoose").Types.ObjectId;
const Connection = require('.././Database/connection');
const Product = require('.././Database/schema/Productschema');
const User = require('.././Database/schema/Userschema');
let Order = require('.././Database/schema/Orderschema');
const Core = require('../Controller/core/Service');
const moment = require('moment');

const DashboardController = {
    async Dashboard(req, res) {

        const allUser = await Core.findallData(User);
        const Userdata = await Core.findOne(User,"email","krishghelani@gmail.com");
        // console.log(data);

        res.json({
            data : Userdata
        })
        
        const DB_Connection = await Connection();
        if (DB_Connection == 1) {
            const totaluser = await User.findOne({}).count();
            const totalProduct = await Product.findOne({}).count();
            const totalOrder = await Order.findOne({}).count();
            const outofstock = await Product.findOne({'quantity' : 0}).count();
            const outofstockproduct = await Product.findOne({'quantity' : 0});            
            res.json({
                    stauts: 200,
                    message: "success",
                    data : {
                        totaluser:totaluser,
                        totalProduct:totalProduct,
                        totalOrder:totalOrder,
                        outofstock : outofstock,
                        outofstockproduct :outofstockproduct
                    }
                })
            }
        else {
            const response = {
                stauts: 502,
                message: "Database connection error"
            }
            res.json(response);
        }
    },
    async test(req,res){
      const time =  moment().format(); 
      console.log(time);
      console.log(moment().format());  
    }
}
module.exports = DashboardController;