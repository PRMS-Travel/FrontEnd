/**
 * @swagger
 * tags:
 *   - name: Maps
 *     description: 지도 관련 API
 */
  
 /**
 * @swagger
 * paths:
 *   /maps:
 *     get:
 *       tags:
 *         - Maps
 *       summary: 로그인 유저의 지도 조회
 *       description: 메인화면 진입 시 로그인 유저라면 호출
 *       requestBody:
 *         description: 유저의 고유 아이디 (로그인 시 발급된 토큰에 포함됨)
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *       responses:
 *         '200':
 *           description: 지도 조회 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "춘천 여행 일정"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T12:00:00Z"
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
 *         default:
 *           description: "예상치 못한 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "예기치 않은 오류가 발생했습니다."
 * 
 *     post:
 *       tags:
 *         - Maps
 *       summary: 새 지도 생성
 *       description: 로그인 상관 없이 지도 생성 시 호출
 *       requestBody:
 *         description: 로그인 유저일 경우 유저의 고유 아이디 (로그인 시 발급된 토큰에 포함됨)
 *         required: false
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *       responses:
 *         '201':
 *           description: 지도 생성 성공, 생성된 지도의 ID 반환
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
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
 *         default:
 *           description: "예상치 못한 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "예기치 않은 오류가 발생했습니다."
 */

/** 
 * @swagger
 * paths:
 *   /maps/{mapid}:
 *     put:
 *       tags:
 *         - Maps
 *       summary: 지도 별칭 수정
 *       description: 로그인 유저의 지도 별칭을 수정할 때 호출 
 *       responses:
 *         '200':
 *           description: 별칭 수정 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "성공적으로 수정되었습니다."
 *         '404':
 *           description: id와 일치하는 지도 없음
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "지도가 존재하지 않습니다."
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
 *         default:
 *           description: "예상치 못한 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "예기치 않은 오류가 발생했습니다."
 * 
 *     delete:
 *       tags:
 *         - Maps
 *       summary: 지도 삭제
 *       description: 로그인 상관 없이 지도를 삭제할 때 호출 (지도를 저장하지 않고 나가면 무조건 삭제)
 *       responses:
 *         '200':
 *           description: 지도 삭제 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "성공적으로 삭제되었습니다."
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
 *         default:
 *           description: "예상치 못한 오류"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "예기치 않은 오류가 발생했습니다."
 */
