const mongoose = require('mongoose');
const Orderschema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        trim: true,
    },
    paymenttype: {
        type: String,
        required: true
    },
    paymentstatus: {
        type: Boolean,
        required: true
    },
    orderstatus: {
        type: String,
        required: true
    },
    orderno: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    product: {
        type:[{
            productId: mongoose.Schema.Types.ObjectId,
            productname:String,
            qty: Number,
            price: Number,
            subtotal: Number,
        }]
    }
});

const Order = mongoose.model('Order', Orderschema);
module.exports = Order;