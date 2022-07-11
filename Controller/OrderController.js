const { response } = require("express");
const Joi = require('joi');const Connection = require('.././Database/connection');
const Cart = require('.././Database/schema/Cartschema');
const Product = require('../Database/schema/Productschema');
const Order = require('../Database/schema/Orderschema');
const { Console } = require("console");
const ObjectId = require("mongoose").Types.ObjectId;

const OrderController = {
    async addOrder(req, res) {
        const DB_Connection = await Connection();
        const {userId,paymentType }= req.body;
        if (DB_Connection == 1) {
            const Cartdata = await Cart.find({ userId });
            let Orderproductdata = [];
            for(let i = 0; i < Cartdata.length; i++) {
                let productdata = await Product.find({"_id": Cartdata[i].productId});
                Orderproductdata[i]={
                    productId: Cartdata[i].productId,
                    productname: productdata[0].productname,
                    qty: Cartdata[i].quantity,
                    price: productdata[0].price,
                    subtotal: productdata[0].price*Cartdata[i].quantity
                }
            }
            
            const Insertorder = await Order.insertMany({
                userId : userId,
                paymenttype : paymentType,
                paymentstatus : 0,
                orderno : "ORD"+Math.floor(Date.now() / 1000)+"/"+new Date().getFullYear(),
                orderstatus : "PENDING",
                createdAt : Date.now(),
                updatedAt : Date.now(),
                product: Orderproductdata
            });

            const response = {
                stauts: 200,
                message: "Order Data",
                data:Insertorder
            }
            res.json(response);  
        }
        else {
            const response = {
                stauts: 502,
                message: "Database connection error"
            }
            res.json(response);
        }
    }
}
module.exports = OrderController;