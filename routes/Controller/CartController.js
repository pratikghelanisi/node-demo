const { response } = require("express");
const { object } = require("joi");
const Joi = require('joi');
const ObjectId = require("mongoose").Types.ObjectId;
const Connection = require('.././Database/connection');
const Cart = require('.././Database/schema/Cartschema');
const Product = require('.././Database/schema/Productschema');
const User = require('.././Database/schema/Userschema');

const CartController = {
    async Addtocart(req, res) {
        const DB_Connection = await Connection();
        if (DB_Connection == 1) {
            const schema = Joi.object({
                userid: Joi.string().required(),
                productid: Joi.string().required(),
                qty: Joi.number().required(),
            })
            const error = schema.validate(req.body);
            if (error.error) {
                const response = {
                    stauts: 422,
                    message: "All fields are required",
                }
                res.json(response);
            }
            else {
                const Insertcart = await Cart.insertMany({
                    productId: req.body.productid,
                    userId: req.body.userid,
                    quantity: req.body.qty,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                });
                const response = {
                    stauts: 200,
                    message: "Data created successfully",
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

    async cartlist(req, res) {
        const DB_Connection = await Connection();
        if (DB_Connection == 1) {
            if (req.body.userid) {
                console.log(req.body.userid);
                if (true) {
                    await Cart.aggregate([
                        { $match: { "userId": ObjectId(req.body.userid) } },
                            {
                                $lookup: {
                                    from: "products",
                                    localField: 'productId',
                                    foreignField: '_id',
                                    as: 'products'
                                }
                            }
                    ]).then((data) => {
                        if (data.length > 0) {
                            return res.json({ status: 200, data });
                        } else {
                            return res.json({ status: 200, message: "Your cart empty" });
                        }
                    }).catch((e) => {
                        return res.json({
                            stauts: 200,
                            message: "Your Cart is empty"
                        });
                    })
                }

                else {
                    const response = {
                        stauts: 200,
                        message: "Your Cart is empty"
                    }
                    res.json(response);
                }
            }
            else {
                const response = {
                    stauts: 200,
                    message: "Invalid User ID"
                }
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

    async deleteitem(req, res){
        const DB_Connection = await Connection();
        if (DB_Connection == 1) {

        const { userid,productid} = req.body
        console.log(userid,productid);

            if(userid && productid){
                const cartitems = await Cart.deleteOne( { productId: productid, userId:userid } )
                console.log(cartitems.acknowledged);

                if(cartitems.acknowledged == true){
                    const response = {
                                stauts: 200,
                                message: "Cart Item deleted successfully"
                            }
                            res.json(response);
                }
                else{
                    const response = {
                                stauts: 500,
                                message: "Something was wrong"
                            }
                            res.json(response);
                }

                // if(cartitems.acknowledged = true){
                //     const response = {
                //         stauts: 200,
                //         message: "User ID and Product ID are required"
                //     }
                //     res.json(response);
                // }
                // else{
                //     const response = {
                //         stauts: 500,
                //         message: "Something was wrong"
                //     }
                //     res.json(response);
                // }
            }
            else{
                const response = {
                    stauts: 200,
                    message: "User ID and Product ID are required"
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

module.exports = CartController;