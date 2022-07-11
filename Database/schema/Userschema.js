const mongoose = require('mongoose');
const Userschema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('user', Userschema);
module.exports = User;