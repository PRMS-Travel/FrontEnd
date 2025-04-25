/**
 * @swagger
 * tags:
 *   - name: Schedules
 *     description: 일정 관련 API
 */

/**
 * @swagger
 * paths:
 *   /schedules:
 *     get:
 *       tags:
 *         - Schedules
 *       summary: 일정 목록 조회
 *       description: 일정 목록을 조회합니다.
 *       parameters:
 *         - in: query
 *           name: mapId
 *           schema:
 *             type: integer
 *           required: true
 *           description: 지도 ID
 *       responses:
 *         '200':
 *           description: >
 *              성공적으로 일정 목록을 반환합니다. <br>
 *              detail 테이블과 조인해서 모든 정보를 json 형태로 가져옴 <br>
 *              select문의 조건 <br> 
 *              => 1일차일때 mapId가 같고 day가 1인 schedulesId를 가져와서 detail 테이블과 조인
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     schedulesId:
 *                       type: integer
 *                       example: 1
 *                     day:
 *                       type: integer
 *                       example: 1
 *                     startTime:
 *                       type: timestamp
 *                       example: "2023-10-01 10:00:00"
 *                     detail:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           detailId:
 *                             type: integer
 *                             example: 1
 *                           placeId:
 *                             type: integer
 *                             example: 1
 *                           orderBy:
 *                             type: integer
 *                             example: 1
 *                           playTime:
 *                             type: integer
 *                             example: "일정 소요 시간 분단위로 integer 타입 저장"
 *                           moveTime:
 *                             type: integer
 *                             example: "이동 시간 분단위로 integer 타입 저장"
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
 *           description: "일정 없음"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "일치하는 일정 목록을 찾지 못했습니다."
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
 *         - Schedules
 *       summary: 일정 목록 저장
 *       description: 사용자가 일정을 저장합니다.(화면의 저장 버튼을 클릭시 저장)
 *       requestBody:
 *         description: 저장할 일정 목록
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 schedules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: integer
 *                         example: 1
 *                       startTime:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-12-12 12:00:00"
 *                       mapId:
 *                         type: integer
 *                         example: 2
 *                   description: 일정 목록
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       placeId:
 *                         type: integer
 *                         example: 1
 *                       orderBy:
 *                         type: integer
 *                         example: 1
 *                       playTime:
 *                         type: integer
 *                         example: 70
 *                       moveTime:
 *                         type: integer
 *                         example: 70
 *                   description: 상세 정보 목록
 *       responses:
 *         '201':
 *           description: 성공적으로 일정 목록을 저장합니다.
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
 * 
 *     put:
 *       tags:
 *         - Schedules
 *       summary: 시작 시작 업데이트
 *       description: 사용자의 일정에 있는 시작시간을 업데이트 합니다.
 *       requestBody:
 *         description: 시작 시간
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  startTime:
 *                    type: timestamp
 *                    example: "2023-10-01 10:00:00"
 *                  scheduleId:
 *                    type: integer
 *                    example: 1
 *       responses:
 *         '200':
 *           description: 성공적으로 시작시간을 업데이트
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
 *           description: "일정 없음"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "일치하는 일정 목록을 찾지 못했습니다."
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
 *         - Schedules
 *       summary: map의 schedules 전체 삭제
 *       description: mapId의 schedules 전체 삭제
 *       parameters:
 *         - in: query
 *           name: mapId
 *           schema:
 *             type: integer
 *           required: true
 *           description: 지도 ID
 *       responses:
 *         '200':
 *           description: 전체 삭제 성공
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
 *           description: "일정 없음"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "일치하는 지도를 찾지 못했습니다."
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
 *   /schedules/detail:
 *     delete:
 *       tags:
 *         - Schedules
 *       summary: 일정을 삭제 합니다.
 *       description: > 
 *          사용자가 일정을 삭제합니다. <br>
 *          place의 status를 0으로 업데이트 해야함( 보관함으로 이동 ) <br>
 *          placeId는 stauts 상태 업데이트용 <br>
 *       requestBody:
 *         description: 삭제할 일정의 id
 *         required: true
 *         content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  placeId:
 *                    type: integer
 *                    example: 1
 *       responses:
 *         '200':
 *           description: 성공적으로 데이터 삭제
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "성공적으로 일정이 삭제되었습니다."
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
 *           description: "일정 없음"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "일치하는 일정 목록을 찾지 못했습니다."
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