const mongoose = require('mongoose');
const Settingschema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const Setting = mongoose.model('Setting', Settingschema);
module.exports = Setting;