/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: 유저 관련 API
 * 
 * paths:
 *   /users/login:
 *     post:
 *       tags:
 *         - Users
 *       summary: 유저 로그인
 *       description: 로그인 버튼 클릭 시 호출
 *       requestBody:
 *         description: 로그인 정보 (아이디, 비밀번호)
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loginId:
 *                   type: string
 *                   example: "user123"
 *                 password:
 *                   type: string
 *                   example: "password123!"
 *       responses:
 *         '200':
 *           description: 로그인 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "성공적으로 로그인 되었습니다."
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
 *         '401':
 *           description: "아이디나 비밀번호가 일치하지 않음 또는 존재하지 않는 회원"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "아이디 또는 비밀번호를 다시 확인해주세요."
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
 *   /users/join:
 *     post:
 *       tags:
 *         - Users
 *       summary: 회원가입
 *       description: 회원가입 버튼 클릭 시 호출
 *       requestBody:
 *         description: 회원가입에 필요한 정보 (아이디, 비밀번호)
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loginId:
 *                   type: string
 *                   example: "user123"
 *                 password:
 *                   type: string
 *                   example: "password123!"
 *       responses:
 *         '201':
 *           description: 회원가입 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "성공적으로 회원가입 되었습니다."
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
 *         '409':
 *           description: "이미 존재하는 아이디"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "이미 존재하는 아이디입니다."
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
