const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const News = require('../models/News');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const news_id = event.pathParameters.id;

    // Input validation
    if (!news_id) {
      throw new Error('News ID is required to get news.');
    }

    // Retrieve the news by ID
    const news = await News.findById(news_id);

    // Check if the product with the given ID exists
    if (!news) {
      throw new Error('News not found.');
    }

    // Return the news details
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        news,
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
