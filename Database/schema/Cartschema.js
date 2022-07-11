const mongoose = require('mongoose');
const Cartschema = mongoose.Schema({
    productId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
});

const Cart = mongoose.model('Cart', Cartschema);
module.exports = Cart;