const Product = require("../models/product");
const fs = require("fs");
const path = require("path");

const addNewProduct = async (req, res) => {
  req.body.productImage = req.file?.filename;
  const data = await Product.create(req.body);
  if (data) {
    res.json({
      msg: "product add success",
    });
  }
};

const getAllProducts = async (req, res) => {
  const data = await Product.find();
  res.json({ productList: data });
};

const getProductImage = async (req, res) => {
  try {
    const productInfo = await Product.findById(req.params.id);
    const imagePath = path.join(
      __dirname,
      "../../uploads/products",
      productInfo.productImage
    );
    const defaultimagePath = path.join(
      __dirname,
      "../../uploads/avatar",
      "defaultimg.png"
    );

    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      res.sendFile(defaultimagePath);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addNewProduct, getAllProducts, getProductImage };
