const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Product = require('../models/Product');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const { query } = event.queryStringParameters || {};

    // Input validation: Check if query are provided
    if (!query) {
      throw new Error('Queries are required for product search.');
    }

    // Perform a case-insensitive search using regular expressions
    const regex = new RegExp(query, 'i');

    // Search for products based on query in name, brand, description, category, or subcategory
    const searchResults = await Product.find({
      $or: [
        { name: regex },
        { brand: regex },
        { description: regex },
        { category: regex },
        { subcategory: regex },
      ],
    });

    // Return the search results
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        results: searchResults,
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
