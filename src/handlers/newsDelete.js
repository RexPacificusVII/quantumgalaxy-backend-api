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
      throw new Error('News ID is required to delete news.');
    }

    // Retrieve the news by ID
    const news = await News.findById(news_id);

    if (!news) {
      throw new Error('News not found.');
    }

    // Delete the news
    await news.deleteOne();

    // Return success message
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'News deleted successfully',
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
