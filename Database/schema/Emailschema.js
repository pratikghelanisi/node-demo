const mongoose = require('mongoose');
const Emailschema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        required: true
    }
});

const Email = mongoose.model('Email', Emailschema);
module.exports = Email;