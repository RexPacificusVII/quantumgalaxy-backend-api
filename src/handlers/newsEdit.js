const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const News = require('../models/News');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const news_id = event.pathParameters.id;
    const requestBody = JSON.parse(event.body || '{}');
    const { source, author, title, description, url, url_image, content } = requestBody;

    // Input validation: Check if the news_id is provided
    if (!news_id) {
      throw new Error('News ID is required.');
    }

    // Retrieve the news by ID
    const news = await News.findById(news_id);

    if (!news) {
      throw new Error('News not found.');
    }

    // Update news details
    if (source !== undefined) news.source = source;
    if (author !== undefined) news.author = author;
    if (title !== undefined) news.title = title;
    if (description !== undefined) news.description = description;
    if (url !== undefined) news.url = url;
    if (url_image !== undefined) news.url_image = url_image;
    if (content !== undefined) news.content = content;

    // Save the updated news
    await news.save();

    // Return the updated news details
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'News updated successfully',
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
