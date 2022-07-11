const { response } = require('express');
const demo = async (req, res) => {
    try{
        console.log("1");
        res.json("2");
        res.json("2");
        console.log("3");
    }
    catch(e){
        console.log(e);
    }
 }
module.exports = { demo };