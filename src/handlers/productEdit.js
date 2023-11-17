const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Product = require('../models/Product');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const productId = event.pathParameters.id;
    const requestBody = JSON.parse(event.body || '{}');
    const { name, brand, price, discount, description, features, category, subcategory, image, rating } = requestBody;

    // Input validation: Check if the productId is provided
    if (!productId) {
      throw new Error('Product ID is required.');
    }

    // Fetch the product by ID from the database
    const product = await Product.findById(productId);

    // Check if the product with the given ID exists
    if (!product) {
      throw new Error('Product not found.');
    }

    // Update product details
    if (name) product.name = name;
    if (brand) product.brand = brand;
    if (price) product.price = price;
    if (discount !== undefined) product.discount = discount;
    if (description) product.description = description;
    if (features) product.features = features;
    if (category) product.category = category;
    if (subcategory) product.subcategory = subcategory;
    if (image) product.image = image;
    if (rating) product.rating = rating;

    // Save the updated product details
    await product.save();

    // Return the updated product details
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Product details updated successfully',
        product,
      }),
    };

    return response;
  } catch (error) {
    console.error(error);

    const response = {
      statusCode: error.statusCode || 400, // Bad Request status code
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };

    return response;
  }
};
