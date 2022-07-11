const { response } = require("express")
const Joi = require('joi');
const { exit } = require("process");
const Connection = require('.././Database/connection');
// const { find } = require("../Database/schema/Productschema");
const Product = require('../Database/schema/Productschema');
const ProductController = {
    async AddtoProduct(req, res) {
        const DB_Connection = await Connection();
        if (DB_Connection == 1) {
            const schema = Joi.object({
                productname: Joi.required(),
                quantity: Joi.required(),
                mrp: Joi.required(),
                price: Joi.required(),
                discount: Joi.required(),
                category: Joi.required(),
                tax: Joi.required(),
                sortdescription: Joi.required(),
                description: Joi.required(),
            })
           
            const error = schema.validate(req.body);
            if (error.error) {
                const response = {
                    stauts: 422,
                    message: "All fields are required Or Invalid Data"+error.error,
                }
                res.json(response);
            }
            else {
                const filesArray = req.files;
                var fileparth = [];
                for (let i = 0; i < filesArray.length; i++) {
                    fileparth.push({url:filesArray[i].filename});
                }

                const Insertcart = await Product.insertMany({
                    productname : req.body.productname,
                    quantity : req.body.quantity,
                    mrp : req.body.mrp,
                    price : req.body.price,
                    discount : req.body.discount,
                    category : req.body.category,
                    tax : req.body.tax,
                    sortdescription : req.body.sortdescription,
                    description : req.body.description,
                    createdat : Date.now(),
                    updatedat : Date.now(),
                    photos : fileparth  
                });

                const response = {
                    stauts: 200,
                    message : "Data created successfully",
                }
                res.json(response);
            }
        }
        else {
            const response = {
                stauts: 502,
                message: "Database connection error"    
            }
            res.json(response);
        }
    },

    async productlist(req, res) {
        const DB_Connection = await Connection(); 
        if(DB_Connection == 1){
            const TotalProduct = await Product.find({});
            const count = TotalProduct.length;
            let page = req.body.pageno;
            let limit = 8;
            let totalpage = parseInt(TotalProduct.length/limit) + 1 ;
            const Productlist = await Product.find({}).skip((page-1)*limit).limit(limit);
            if(Productlist.length > 0)
            {
                const response = {
                    stauts: 200,
                    totalpage :totalpage,
                    data : Productlist
                }
                res.json(response);
            }
            else{
                const response = {
                    stauts: 404,
                    data : "product not found"
                }
                res.json(response);
            }
         } 
         else {
            const response = {
                stauts: 502,
                message: "Database connection error"    
            }
            res.json(response);
        }
    },
    async pricefilter (req, res)
    {
        const DB_Connection = await Connection(); 
        if(DB_Connection == 1){
            const {price} = req.body;
            if(price < 0){
             const response = {
                 stauts: 200,
                 message : "Invalid price"
             }
                res.json(response);
            }
            else{
                 const Productlist = await Product.find({price:{$lte:price}});
                 const response = {
                     stauts: 200,
                     message : "data not found",
                     data : Productlist
                }
                res.json(response);
             }
        }
        else {
            const response = {
                stauts: 502,
                message: "Database connection error"    
            }
            res.json(response);
        }
    },

    async search(req, res)
    {
        const DB_Connection = await Connection(); 
        if(DB_Connection == 1){
            const searchtext = req.body.search;
            const Searchdata = await Product.find({ $match : {
                $or: [
                    { productname: { $regex: searchtext, $options: "i" }},
                    { price: { $regex:  searchtext, $options: "i" }},
                    { mrp :{ $regex:  searchtext, $options: "i" }}
                  ],
                }
             });
           
            if(Searchdata.length == 0){
                const response = {
                    stauts: 200,
                    message: "Data not found",
                    data: Searchdata    
                }
                res.json(response);
            }
            else{
                const response = {
                    stauts: 200,
                    message: "successfully",
                    data: Searchdata    
                }
                res.json(response);
            }
        }
        else{
            const response = {
                stauts: 502,
                message: "Database connection error"    
            }
            res.json(response);
        }
    }
} 

module.exports = ProductController;