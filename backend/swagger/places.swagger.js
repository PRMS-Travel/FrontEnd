/**
 * @swagger
 * tags:
 *   - name: Places
 *     description: 장소 관련 API
 */

/**
 * @swagger
 * paths:
 *   /places/:
 *     get:
 *       tags:
 *         - Places
 *       summary: 장소(장소 보관함) 정보 조회
 *       description: 장소의 정보을 조회합니다.
 *       requestBody:
 *         description: 일정의 Id(mapId)
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  mapId:
 *                    type: integer
 *                    example: 1
 *       responses:
 *         '200':
 *           description: >
 *              장소 정보들이 제공됩니다. <br>
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     contentId:
 *                       type: integer
 *                       example: 1
 *                     contentTypeId:
 *                       type: integer
 *                       example: 1
 *                     placeId:
 *                       type: integer
 *                       example: 1
 *                     add1:
 *                       type: string
 *                       example: "서울특별시 강남구 테헤란로 123"
 *                     add2:
 *                       type: string
 *                       example: "상세 주소"
 *                     firstImage2:
 *                       type: string
 *                       example: "썸네일 이미지 URL 주소"
 *         '400':
 *           description: "데이터 누락 또는 형식 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "전달 데이터를 다시 확인해주세요."
 *         '404':
 *           description: id와 일치하는 장소 없음
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "장소가 존재하지 않습니다."
 *         '500':
 *           description: "서버 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."
 * 
 *     post:
 *       tags:
 *         - Places
 *       summary: 장소보관함 추가
 *       description: >
 *           사용자가 장소를 보관함(place테이블)에 추가합니다. <br>
 *           만약 tour api 에서 제공하지 않는 장소는 위도,경도,add1,add2,mapId만 저장한다.
 *       requestBody:
 *         description: 저장할 장소의 정보를 보관함(place테이블)에 추가한다.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contentId:
 *                   type: integer
 *                   example: 1
 *                 contentTypeId:
 *                   type: integer
 *                   example: 1
 *                 add1:
 *                   type: string
 *                   example: "서울특별시 강남구 테헤란로 123"
 *                 add2:
 *                   type: string
 *                   example: "상세 주소"
 *                 firstImage1:
 *                   type: string
 *                   example: "메인 이미지 URL 주소"
 *                 firstImage2:
 *                   type: string
 *                   example: "썸네일 이미지 URL 주소"
 *                 overview:
 *                   type: string
 *                   example: "상세 설명"
 *                 tel:
 *                   type: string
 *                   example: "010-5555-5555"
 *                 hmpg:
 *                   type: string
 *                   example: "홈페이지 주소"
 *                 mapId:
 *                   type: integer
 *                   example: 1
 *                 latitude:
 *                   type: decimal
 *                   example: 10.000
 *                 longitude:
 *                   type: decimal
 *                   example: 10.000
 *                 stateCode:
 *                   type: integer
 *                   example: 1
 * 
 *       responses:
 *         '201':
 *           description: 장소보관함 목록 추가 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "성공적으로 일정 목록을 저장했습니다."
 *         '400':
 *           description: "데이터 누락 또는 형식 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "전달 데이터를 다시 확인해주세요."
 *         '500':
 *           description: "서버 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."
 */

/**
 * @swagger
 * paths:
 *   /places/{placeId}:
 *     put:
 *       tags:
 *         - Places
 *       summary: 장소의 status 업데이트
 *       description: 장소를 일정에 추가하거나 장소보관함으로 이동하는 api
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: 업데이트할 장소 id ( placeId )
 *           schema:
 *             type: integer
 *             example: 1
 *       responses:
 *         '200':
 *           description: 장소 state 업데이트 성공
 *         '400':
 *           description: "데이터 누락 또는 형식 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "전달 데이터를 다시 확인해주세요."
 *         '404':
 *           description: id와 일치하는 장소 없음
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "장소가 존재하지 않습니다."
 *         '500':
 *           description: "서버 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."
 * 
 *     delete:
 *       tags:
 *         - Places
 *       summary: 장소 보관함에서 삭제하는 api
 *       description: > 
 *          장소 보관함에서 장소를 삭제합니다. <br>
 *          만약 status가 1인 경우 ( =일정에 있는 경우 ) 사용 못함
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: 장소보관함에서 삭제할 장소 id ( placeId )
 *           schema:
 *             type: integer
 *             example: 1
 *       responses:
 *         '200':
 *           description: 장소 삭제 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "성공적으로 데이터가 삭제되었습니다."
 *         '400':
 *           description: "데이터 누락 또는 형식 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "전달 데이터를 다시 확인해주세요."
 *         '404':
 *           description: id와 일치하는 장소 없음
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "장소가 존재하지 않습니다."
 *         '500':
 *           description: "서버 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요."
 */