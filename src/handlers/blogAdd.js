const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Blog = require('../models/Blog');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const requestBody = JSON.parse(event.body || '{}');
    const { title, author, image, category, tags, summary, content } = requestBody;

    // Input validation
    if (!title || !author || !content) {
      throw new Error('Title, author, and content are required for creating a blog.');
    }

    const blogObj = await Blog.create({
      title,
      author,
      image,
      category,
      tags,
      summary,
      content,
    });

    // Return the created blog details
    const response = {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Blog created successfully',
        blog: blogObj,
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
