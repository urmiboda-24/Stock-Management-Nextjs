// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
openapi: "3.0.0", // Swagger version
info: {
title: "Node.js API", // Title of the API
version: "1.0.0", // Version of the API
description: "A simple Express API to demonstrate Swagger setup", // Description of the API
},
servers: [
{
url: "http://localhost:3001", // Base URL of your API
},
],
};

const options = {
swaggerDefinition,
apis: ["../../routes/v1Routes.js"], // Path to the API routes (use JSDoc comments inside your routes)
};



const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;