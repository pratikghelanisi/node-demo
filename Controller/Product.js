const { response } = require("express");
const Product = require("../Database/schema/ProductSchema");

const AddProduct = async (req, response) => {
  try {
    const { name, category, price, quantity, description, sortdescription } =
      req.body;
    const filesArray = req.files;
    var fileparth = [];

    for (let i = 0; i < filesArray.length; i++) {
      fileparth.push({ url: filesArray[i].filename });
    }

    const Insertcart = await Product.insertMany({
      name: name,
      quantity: quantity,
      category: category,
      price: price,
      sortdescription: sortdescription,
      description: description,
      photos: fileparth,
    });

    response.json({
      stauts: 200,
      message: "Product created successfully",
    });
  } catch (error) {
    response.json({
      status: 500,
      message: error,
    });
  }
};

const Productlist = async (req, response) => {
  try {
    const TotalProduct = await Product.find({ active: true });
    const count = TotalProduct.length;
    let page = req.body.pageno;
    let limit = 10;
    let totalpage = parseInt(TotalProduct.length / limit) + 1;
    const Productlist = await Product.find({ active: true })
      .skip((page - 1) * limit)
      .limit(limit);

    response.json({
      stauts: 200,
      totalpage: totalpage,
      totalproduct: TotalProduct.length,
      totalproductthispage: Productlist.length,
      data: Productlist,
    });
  } catch (error) {
    response.json({
      stauts: 500,
      message: error,
    });
  }
};

const Search = async (req, response) => {
  try {
    const searchtext = req.body.searchtext;
    const Searchdata = await Product.find({
      active: true,
      $or: [
        { name: { $regex: searchtext, $options: "i" } },
        { description: { $regex: searchtext, $options: "i" } },
        { sortdescription: { $regex: searchtext, $options: "i" } }
      ]
    });
    response.json({
      stauts: 200,
      total: Searchdata.length,
      data: Searchdata,
    });
  } catch (error) {
    response.json({
      stauts: 500,
      message: error,
    });
  }
};

module.exports = { AddProduct, Productlist, Search };
