const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const News = require('../models/News');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const requestBody = JSON.parse(event.body || '{}');
    const { source, author, title, description, url, url_image, content } = requestBody;

    // Input validation
    if (!source || !title) {
      throw new Error('Source and title are required for creating news.');
    }

    const newsObj = await News.create({
      source,
      author,
      title,
      description,
      url,
      url_image,
      content,
    });

    // Return the created news details
    const response = {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'News created successfully',
        news: newsObj,
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
