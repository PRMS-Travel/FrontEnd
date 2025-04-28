const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Travel API",
      description:
        "여행 일정 관리 페이지",
    },
    servers: [
      {
        url: "http://localhost:5000", // 요청 URL
      },
    ],
  },
  apis: ["./swagger/*.swagger.js"], 
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }