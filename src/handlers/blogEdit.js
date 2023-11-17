const mongoose = require('mongoose');
const connectDatabase = require('../database/db');
const Blog = require('../models/Blog');

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();

    const blog_id = event.pathParameters.id;
    const requestBody = JSON.parse(event.body || '{}');
    const { title, author, image, category, tags, summary, content } = requestBody;

    // Input validation: Check if the blog_id is provided
    if (!blog_id) {
      throw new Error('Blog ID is required.');
    }

    // Retrieve the blog by ID
    const blog = await Blog.findById(blog_id);

    if (!blog) {
      throw new Error('Blog not found.');
    }

    // Update blog details
    if (title !== undefined) blog.title = title;
    if (author !== undefined) blog.author = author;
    if (image !== undefined) blog.image = image;
    if (category !== undefined) blog.category = category;
    if (tags !== undefined) blog.tags = tags;
    if (summary !== undefined) blog.summary = summary;
    if (content !== undefined) blog.content = content;

    // Save the updated blog
    await blog.save();

    // Return the updated blog details
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Blog updated successfully',
        blog,
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
