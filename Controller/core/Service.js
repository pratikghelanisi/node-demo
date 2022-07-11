const Product = require('../../Database/schema/Productschema');
const Connection = require('../../Database/connection');
const User = require('../../Database/schema/Userschema');
let Order = require('../../Database/schema/Orderschema');
const exportFunction = {};

exportFunction.findallData = async function (tableName) {
        const DB_Connection = await Connection();
        return await tableName.find({});
},
exportFunction.findOne = async function (tableName,flied,value) {
        const DB_Connection = await Connection();
        fliedname = flied;
        return console.log(tableName,flied,value);
        // return await tableName.findOne({fliedname : value});
};
module.exports = exportFunction;
