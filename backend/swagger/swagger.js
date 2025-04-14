const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.1",
      title: "Travel API",
      description:
        `<h3>여행 일정 관리 페이지</h3>
        - 지도는 회원/비회원 상관없이 만들 수 있습니다.<br>
        - 처음 지도를 생성했을 때 return한 mapId를 로컬 스토리지에 저장했다가 API 호출 시 같이 보내주세요.
        <h3>외부 API 참조 링크</h3>
        - [TOUR API](https://api.visitkorea.or.kr/#/useKoreaGuide)<br>
        - [TMAP API](https://tmapapi.tmapmobility.com/main.html#webservice/sample/WebSampleRoutes)<br>
        - [ODSAY API](https://lab.odsay.com/guide/releaseReference#searchPubTransPathT)`,
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