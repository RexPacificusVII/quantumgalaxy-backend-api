const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Product = require('../models/Product');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const { brands, categories, minPrice, maxPrice, minRating } = event.queryStringParameters || {};

    // Build the filter object based on the provided query parameters
    const filter = {};

    if (brands) {
      // Split the brands into an array and perform OR filtering
      filter.brand = { $in: brands.split(',') };
    }

    if (categories) {
      // Split the categories into an array and perform OR filtering
      filter.category = { $in: categories.split(',') };
    }

    if (minPrice || maxPrice) {
      // Price range filtering
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (minRating) {
      // Rating filtering
      filter['rating.rate'] = { $gte: parseFloat(minRating) };
    }

    // Search for products based on the constructed filter
    const filteredProducts = await Product.find(filter);

    // Return the filtered products
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        results: filteredProducts,
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
