const mongoose = require('mongoose');
const Productschema = mongoose.Schema({
    productname :{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
        trim: true,
    },
    mrp:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    tax:{
        type: Number,
        required: true,
    },
    sortdescription:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    createdat: {
        type: Date,
        required: true
    },
    updatedat: {
        type: Date,
        required: true
    },
      photos: {
        type: [{
            url : String,
        }],
        required: true
    }
});

const Product = mongoose.model('Product', Productschema);
module.exports = Product;