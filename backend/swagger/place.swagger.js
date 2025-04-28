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
 *           description: bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "bad request"
 * 
 *         '404':
 *           description: not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "not found"
 *         '500':
 *           description: server error ( DB 연결 실패, DB 쿼리 실패 )
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "not found"
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
 *       responses:
 *         '200':
 *           description: 성공적으로 일정 목록을 저장합니다.
 *         '400':
 *           description: bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "bad request"
 * 
 *         '404':
 *           description: not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "not found"
 *         '500':
 *           description: server error ( DB 연결 실패, DB 쿼리 실패 )
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "not found"
 */

/**
 * @swagger
 * paths:
 *   /places/{id}:
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
 *           description: 성공적으로 장소를 업데이트
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "성공적으로 장소를 업데이트"
 * 
 *         '400':
 *           description: bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "bad request"
 * 
 *         '404':
 *           description: not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "not found"
 *         '500':
 *           description: server error ( DB 연결 실패, DB 쿼리 실패 )
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "not found"
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
 *           description: 성공적으로 장소보관함에서 삭제
 *         '400':
 *           description: bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "bad request"
 * 
 *         '404':
 *           description: not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "not found"
 * 
 *         '500':
 *           description: server error ( DB 연결 실패, DB 쿼리 실패 )
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "not found"
 */