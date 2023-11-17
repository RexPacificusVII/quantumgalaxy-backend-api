const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Product = require('../models/Product');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const requestBody = JSON.parse(event.body || '{}');
    const { name, brand, price, discount, description, features, category, subcategory, image, rating } = requestBody;

    // Input validation
    if (!name || !price) {
      throw new Error('Name and price are required.');
    }

    const productObj = await Product.create({
      name,
      brand,
      price,
      discount: discount || 0.00,
      description,
      features,
      category,
      subcategory,
      image,
      rating: rating || { rate: 0, count: 0 },
    });

    // Return the created product details
    const response = {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Product created successfully',
        product: productObj,
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
