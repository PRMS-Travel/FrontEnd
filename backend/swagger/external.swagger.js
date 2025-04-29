/**
 * @swagger
 * tags:
 *   - name: External_Routes
 *     description: 경로 관련 API (오디세이, 티맵)
 *   - name: External_Tour
 *     description: 관광지 관련 API (TOUR)
 */

/**
 * @swagger
 * paths:
 *   https://apis.data.go.kr/B551011/KorService1/areaCode1:
 *     get:
 *       tags:
 *         - External_Tour
 *       summary: 지역코드 조회
 *       description: >
 *         TOUR API에 들어가는 areaCode를 조회합니다.
 *         지역 선택할 때 해당 API로 출력하면 좋을 듯합니다.
 *       parameters:
 *         - name: serviceKey
 *           in: query
 *           required: true
 *           description: "API 인증 키"
 *           schema: 
 *             type: string
 *             example: 1TQg5uN3%2Bn9N5ud14TunWUaCmwmA7Ijg1xe2ZPS9K6xrih%2Bdrd0NEb4OSQWkX7XRJO8bbE%2BirN0RrQoUDW5pmQ%3D%3D
 *         - name: MobileApp
 *           in: query
 *           required: true
 *           description: "서비스명"
 *           schema: 
 *             type: string
 *             example: "AppTest"
 *         - name: MobileOS
 *           in: query
 *           required: true
 *           description: "OS 구분"
 *           schema: 
 *             type: string
 *             example: "ETC, WIN"
 *         - name: pageNo
 *           in: query
 *           required: true
 *           description: "페이지 번호, totalCount가 17이기 때문에 1 추천합니다."
 *           schema: 
 *             type: integer
 *             example: 1
 *         - name: numOfRows
 *           in: query
 *           required: true
 *           description: "한 페이지에 출력할 row 수, totalCount가 17이기 때문에 20 추천합니다."
 *           schema: 
 *             type: integer
 *             example: 20
 *         - name: areaCode
 *           in: query
 *           required: false
 *           description: "areaCode를 포함하여 검색하면 해당 지역의 시군구 코드 정보를 조회합니다."
 *           schema: 
 *             type: integer
 *             example: 1
 *         - name: _type
 *           in: query
 *           required: false
 *           description: "기본 형태가 xml이기 때문에 json 데이터로 변경이 필요할 경우 사용."
 *           schema: 
 *             type: string
 *             example: "json"
 *       responses:
 *         '200':
 *           description: 조회 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   response:
 *                     type: object
 *                     properties:
 *                       header:
 *                         type: object
 *                         properties:
 *                           resultCode:
 *                             type: string
 *                             example: "0000"
 *                           resultMsg:
 *                             type: string
 *                             example: "OK"
 *                       body:
 *                         type: object
 *                         properties:
 *                           items:
 *                             type: object
 *                             properties:
 *                               item:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     rnum:
 *                                       type: integer
 *                                       example: "row num"
 *                                     code:
 *                                       type: string
 *                                       example: "areaCode (또는 시군구 코드)"
 *                                     name:
 *                                       type: string
 *                                       example: "도시이름 (또는 시군구 이름)"
 *                           numOfRows:
 *                             type: integer
 *                             example: "한 페이지 당 row의 수"
 *                           pageNo:
 *                             type: integer
 *                             example: "현재 페이지"
 *                           totalCount:
 *                             type: integer
 *                             example: "전체 결과의 수"
 *         '400':
 *           description: 잘못된 요청
 *         '401':
 *           description: 인증 실패
 *         '500':
 *           description: 서버 오류
 * 
 *   https://apis.data.go.kr/B551011/KorService1/areaBasedList1:
 *     get:
 *       tags:
 *         - External_Tour
 *       summary: 지역별 모든 타입 관광정보 조회
 *       description: >
 *          지역별 관광정보를 조회합니다.
 *          contentTypeId를 지정하면 특정 타입(숙박, 관광 등)의 목록을 조회할 수 있다.
 *       parameters:
 *         - name: serviceKey
 *           in: query
 *           required: true
 *           description: "API 인증 키"
 *           schema: 
 *             type: string
 *             example: 1TQg5uN3%2Bn9N5ud14TunWUaCmwmA7Ijg1xe2ZPS9K6xrih%2Bdrd0NEb4OSQWkX7XRJO8bbE%2BirN0RrQoUDW5pmQ%3D%3D
 *         - name: MobileApp
 *           in: query
 *           required: true
 *           description: "서비스명"
 *           schema: 
 *             type: string
 *             example: "AppTest"
 *         - name: MobileOS
 *           in: query
 *           required: true
 *           description: "OS 구분"
 *           schema: 
 *             type: string
 *             example: "ETC"
 *         - name: pageNo
 *           in: query
 *           required: false
 *           description: "페이지 번호"
 *           schema: 
 *             type: integer
 *             example: 1
 *         - name: numOfRows
 *           in: query
 *           required: false
 *           description: "한 페이지에 출력할 row 수"
 *           schema: 
 *             type: integer
 *             example: 20
 *         - name: _type
 *           in: query
 *           required: false
 *           description: "기본 형태가 xml이기 때문에 json데이터로 변경이 필요할 경우 사용."
 *           schema: 
 *             type: string
 *             example: "json"
 *         - name: listYN
 *           in: query
 *           required: false
 *           description: "목록 구분 (Y일 경우 관광목록, N일 경우 목록의 totalCnt 리턴)"
 *           schema: 
 *             type: string
 *             example: "Y"
 *         - name: arrange
 *           in: query
 *           required: false
 *           description: "정렬 구분(A=제목순, C=수정일순, D=생성일순)"
 *           schema: 
 *             type: string
 *             example: "A"
 *         - name: contentTypeId
 *           in: query
 *           required: false
 *           description: "관광 타입 (관광지, 숙박 등)"
 *           schema: 
 *             type: string
 *             example: "A"
 *         - name: areaCode
 *           in: query
 *           required: false
 *           description: "지역 코드"
 *           schema: 
 *             type: integer
 *             example: 1
 *         - name: sigunguCode
 *           in: query
 *           required: false
 *           description: "시군구 코드 (사용 시 areaCode 필수)"
 *           schema: 
 *             type: integer
 *             example: 1
 *       responses:
 *         '200':
 *           description: 조회 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   response:
 *                     type: object
 *                     properties:
 *                       header:
 *                         type: object
 *                         properties:
 *                           resultCode:
 *                             type: string
 *                             example: "0000"
 *                           resultMsg:
 *                             type: string
 *                             example: "OK"
 *                       body:
 *                         type: object
 *                         properties:
 *                           items:
 *                             type: object
 *                             properties:
 *                               item:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     addr1:
 *                                       type: string
 *                                       example: "강원특별자치도 평창군 평창읍 평창시장1길 14"
 *                                     add2:
 *                                       type: string
 *                                       example: "상세 주소"
 *                                     areacode:
 *                                       type: string
 *                                       example: "32"
 *                                     booktour:
 *                                       type: string
 *                                       example: "교과서 속 여행지 여부 (1=여행지, 0=해당없음)"
 *                                     cat1:
 *                                       type: string
 *                                       example: "대분류"
 *                                     cat2:
 *                                       type: string
 *                                       example: "중분류"
 *                                     cat3:
 *                                       type: string
 *                                       example: "소분류"
 *                                     contentid:
 *                                       type: string
 *                                       example: "콘텐츠ID"
 *                                     contenttypeid:
 *                                       type: string
 *                                       example: "관광타입 ID"
 *                                     createdtime:
 *                                       type: string
 *                                       example: "최초 등록일"
 *                                     firstimage:
 *                                       type: string
 *                                       example: "원본 대표 이미지"
 *                                     firstimage2:
 *                                       type: string
 *                                       example: "썸네일 이미지"
 *                                     cpyrhtDivCd:
 *                                       type: string
 *                                       example: "저작권 유형"
 *                                     mapx:
 *                                       type: string
 *                                       example: "X좌표 경도"
 *                                     mapy:
 *                                       type: string
 *                                       example: "Y좌표 위도"
 *                                     mlevel:
 *                                       type: string
 *                                       example: "Map Level"
 *                                     modifiedtime:
 *                                       type: string
 *                                       example: "수정일"
 *                                     sigungucode:
 *                                       type: string
 *                                       example: "시군구코드"
 *                                     tel:
 *                                       type: string
 *                                       example: "전화번호"
 *                                     title:
 *                                       type: string
 *                                       example: "제목"
 *                                     zipcode:
 *                                       type: string
 *                                       example: "우편번호"
 *                           numOfRows:
 *                             type: integer
 *                             example: "한 페이지 당 row의 수"
 *                           pageNo:
 *                             type: integer
 *                             example: "현재 페이지"
 *                           totalCount:
 *                             type: integer
 *                             example: "전체 결과의 수"
 *         '400':
 *           description: 잘못된 요청
 *         '401':
 *           description: 인증 실패
 *         '500':
 *           description: 서버 오류
 * 
 *   http://apis.data.go.kr/B551011/KorService1/searchKeyword1:
 *     get:
 *       tags:
 *         - External_Tour
 *       summary: 입력한 키워드에 따라 관광 정보 조회
 *       description: >
 *          검색 키워드에 따라 조회합니다.
 *          키워드는 인코딩이 필요합니다. (ex) String keyword = URLEncoder.encode("시장", "UTF-8"));
 *       parameters:
 *         - name: serviceKey
 *           in: query
 *           required: true
 *           description: "API 인증 키"
 *           schema: 
 *             type: string
 *             example: 1TQg5uN3%2Bn9N5ud14TunWUaCmwmA7Ijg1xe2ZPS9K6xrih%2Bdrd0NEb4OSQWkX7XRJO8bbE%2BirN0RrQoUDW5pmQ%3D%3D
 *         - name: MobileApp
 *           in: query
 *           required: true
 *           description: "서비스명"
 *           schema: 
 *             type: string
 *             example: "AppTest"
 *         - name: MobileOS
 *           in: query
 *           required: true
 *           description: "OS 구분"
 *           schema: 
 *             type: string
 *             example: "ETC"
 *         - name: pageNo
 *           in: query
 *           required: false
 *           description: "페이지 번호"
 *           schema: 
 *             type: integer
 *             example: 1
 *         - name: numOfRows
 *           in: query
 *           required: false
 *           description: "한 페이지에 출력할 row 수"
 *           schema: 
 *             type: integer
 *             example: 20
 *         - name: _type
 *           in: query
 *           required: false
 *           description: "기본 형태가 xml이기 때문에 json데이터로 변경이 필요할 경우 사용."
 *           schema: 
 *             type: string
 *             example: "json"
 *         - name: listYN
 *           in: query
 *           required: false
 *           description: "목록 구분 (Y일 경우 관광목록, N일 경우 목록의 totalCnt 리턴)"
 *           schema: 
 *             type: string
 *             example: "Y"
 *         - name: arrange
 *           in: query
 *           required: false
 *           description: "정렬 구분(A=제목순, C=수정일순, D=생성일순)"
 *           schema: 
 *             type: string
 *             example: "A"
 *         - name: contentTypeId
 *           in: query
 *           required: false
 *           description: "관광 타입 (관광지, 숙박 등)"
 *           schema: 
 *             type: string
 *             example: "A"
 *         - name: areaCode
 *           in: query
 *           required: false
 *           description: "지역 코드"
 *           schema: 
 *             type: integer
 *             example: 1
 *         - name: sigunguCode
 *           in: query
 *           required: false
 *           description: "시군구 코드 (사용 시 areaCode 필수)"
 *           schema: 
 *             type: integer
 *             example: 1
 *         - name: keyword
 *           in: query
 *           required: false
 *           description: "키워드, 인코딩 필요"
 *           schema: 
 *             type: string
 *             example: 시장
 *       responses:
 *         '200':
 *           description: 조회 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   response:
 *                     type: object
 *                     properties:
 *                       header:
 *                         type: object
 *                         properties:
 *                           resultCode:
 *                             type: string
 *                             example: "0000"
 *                           resultMsg:
 *                             type: string
 *                             example: "OK"
 *                       body:
 *                         type: object
 *                         properties:
 *                           items:
 *                             type: object
 *                             properties:
 *                               item:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     addr1:
 *                                       type: string
 *                                       example: "강원특별자치도 평창군 평창읍 평창시장1길 14"
 *                                     add2:
 *                                       type: string
 *                                       example: "상세 주소"
 *                                     areacode:
 *                                       type: string
 *                                       example: "32"
 *                                     booktour:
 *                                       type: string
 *                                       example: "교과서 속 여행지 여부 (1=여행지, 0=해당없음)"
 *                                     cat1:
 *                                       type: string
 *                                       example: "대분류"
 *                                     cat2:
 *                                       type: string
 *                                       example: "중분류"
 *                                     cat3:
 *                                       type: string
 *                                       example: "소분류"
 *                                     contentid:
 *                                       type: string
 *                                       example: "콘텐츠ID"
 *                                     contenttypeid:
 *                                       type: string
 *                                       example: "관광타입 ID"
 *                                     createdtime:
 *                                       type: string
 *                                       example: "최초 등록일"
 *                                     firstimage:
 *                                       type: string
 *                                       example: "원본 대표 이미지"
 *                                     firstimage2:
 *                                       type: string
 *                                       example: "썸네일 이미지"
 *                                     cpyrhtDivCd:
 *                                       type: string
 *                                       example: "저작권 유형"
 *                                     mapx:
 *                                       type: string
 *                                       example: "X좌표 경도"
 *                                     mapy:
 *                                       type: string
 *                                       example: "Y좌표 위도"
 *                                     mlevel:
 *                                       type: string
 *                                       example: "Map Level"
 *                                     modifiedtime:
 *                                       type: string
 *                                       example: "수정일"
 *                                     sigungucode:
 *                                       type: string
 *                                       example: "시군구코드"
 *                                     tel:
 *                                       type: string
 *                                       example: "전화번호"
 *                                     title:
 *                                       type: string
 *                                       example: "제목"
 *                                     zipcode:
 *                                       type: string
 *                                       example: "우편번호"
 *                           numOfRows:
 *                             type: integer
 *                             example: "한 페이지 당 row의 수"
 *                           pageNo:
 *                             type: integer
 *                             example: "현재 페이지"
 *                           totalCount:
 *                             type: integer
 *                             example: "전체 결과의 수"
 *         '400':
 *           description: 잘못된 요청
 *         '401':
 *           description: 인증 실패
 *         '500':
 *           description: 서버 오류
 * 
 *   http://apis.data.go.kr/B551011/KorService1/detailIntro1:
 *     get:
 *       tags:
 *         - External_Tour
 *       summary: 원하는 장소의 상세 정보 조회
 *       description: >
 *          타입(관광, 숙박 등) 별 소개 정보를 조회하는 기능입니다. <br>
 *          타입별로 결과가 다르게 제공됩니다. <br>
 *          타입별 결과에 대해서는 해당 [링크](https://api.visitkorea.or.kr/#/useKoreaGuide) 참조 <br>
 *          (공통 정보 조회 - 소개 정보 조회)
 *       parameters:
 *         - name: serviceKey
 *           in: query
 *           required: true
 *           description: "API 인증 키"
 *           schema: 
 *             type: string
 *             example: 1TQg5uN3%2Bn9N5ud14TunWUaCmwmA7Ijg1xe2ZPS9K6xrih%2Bdrd0NEb4OSQWkX7XRJO8bbE%2BirN0RrQoUDW5pmQ%3D%3D
 *         - name: MobileApp
 *           in: query
 *           required: true
 *           description: "서비스명"
 *           schema: 
 *             type: string
 *             example: "AppTest"
 *         - name: MobileOS
 *           in: query
 *           required: true
 *           description: "OS 구분"
 *           schema: 
 *             type: string
 *             example: "ETC"
 *         - name: pageNo
 *           in: query
 *           required: false
 *           description: "페이지 번호"
 *           schema: 
 *             type: integer
 *             example: 1
 *         - name: numOfRows
 *           in: query
 *           required: false
 *           description: "한 페이지에 출력할 row 수"
 *           schema: 
 *             type: integer
 *             example: 20
 *         - name: _type
 *           in: query
 *           required: false
 *           description: "기본 형태가 xml이기 때문에 json데이터로 변경이 필요할 경우 사용."
 *           schema: 
 *             type: string
 *             example: "json"
 *         - name: contentId
 *           in: query
 *           required: true
 *           description: "목록 구분 (Y일 경우 관광목록, N일 경우 목록의 totalCnt 리턴)"
 *           schema: 
 *             type: string
 *             example: "2674675"
 *         - name: contentTypeId
 *           in: query
 *           required: true
 *           description: "관광 타입 (관광지, 숙박 등)"
 *           schema: 
 *             type: string
 *             example: "A"
 *       responses:
 *         '200':
 *           description: 조회 성공
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   response:
 *                     type: object
 *                     properties:
 *                       header:
 *                         type: object
 *                         properties:
 *                           resultCode:
 *                             type: string
 *                             example: "0000"
 *                           resultMsg:
 *                             type: string
 *                             example: "OK"
 *                       body:
 *                         type: object
 *                         properties:
 *                           items:
 *                             type: object
 *                             properties:
 *                               item:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                           numOfRows:
 *                             type: integer
 *                             example: "한 페이지 당 row의 수"
 *                           pageNo:
 *                             type: integer
 *                             example: "현재 페이지"
 *                           totalCount:
 *                             type: integer
 *                             example: "전체 결과의 수"
 *         '400':
 *           description: 잘못된 요청
 *         '401':
 *           description: 인증 실패
 *         '500':
 *           description: 서버 오류
 */

/**
 * @swagger
 * paths:
 *   https://apis.openapi.sk.com/tmap/routes:
 *     post:
 *       tags:
 *         - External_Routes
 *       summary: 자동차 경로 조회
 *       description: 출발지와 목적지를 기반으로 자동차 경로와 소요 시간을 조회합니다. <br> 
 *         더 자세한 내용은 [링크](https://tmapapi.tmapmobility.com/main.html#webservice/docs/tmapRouteDoc) 참조
 *       parameters:
 *         - name: version
 *           in: query
 *           required: true
 *           description: API 버전
 *           schema:
 *             type: string
 *             example: "1"
 *         - name: format
 *           in: query
 *           required: true
 *           description: 응답 형식
 *           schema:
 *             type: string
 *             example: "json"
 *         - name: appKey
 *           in: query
 *           required: true
 *           description: T맵 API 키
 *           schema:
 *             type: string
 *             example: ""
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startX:
 *                   type: string
 *                   example: "126.9850380932383"
 *                   description: "출발지 경도"
 *                 startY:
 *                   type: string
 *                   example: "37.566567545861645"
 *                   description: "출발지 위도"
 *                 endX:
 *                   type: string
 *                   example: "127.10331814639885"
 *                   description: "도착지 경도"
 *                 endY:
 *                   type: string
 *                   example: "37.403049076341794"
 *                   description: "도착지 위도"
 *                 totalValue:
 *                   type: string
 *                   example: "2"
 *                   description: "1은 API 전체 응답, 2는 거리, 소요시간, 요금 정보, 택시 요금 정보만 출력"
 *       responses:
 *         '200':
 *           description: 성공적인 응답
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     example: "FeatureCollection"
 *                   features:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                           example: "Feature"
 *                         properties:
 *                           type: object
 *                           properties:
 *                             totalDistance:
 *                               type: number
 *                               example: "총 거리 (미터 단위)"
 *                             totalTime:
 *                               type: number
 *                               example: "총 소요 시간 (초 단위)"
 *                             totalFare:
 *                               type: number
 *                               example: "총 요금"
 *                             taxiFare:
 *                               type: number
 *                               example: "택시 요금"
 *         '400':
 *           description: 잘못된 요청
 *         '401':
 *           description: 인증 실패
 *         '500':
 *           description: 서버 오류
 * 	
 *   https://api.odsay.com/v1/api/searchPubTransPathT:
 *     get:
 *       tags:
 *         - External_Routes
 *       summary: 대중교통 경로 검색
 *       description: 입력한 출발지와 도착지를 기반으로 대중교통 경로를 검색합니다.
 *       parameters:
 *         - name: SX
 *           in: query
 *           required: true
 *           description: 출발지의 경도
 *           schema:
 *             type: number
 *             format: float
 *         - name: SY
 *           in: query
 *           required: true
 *           description: 출발지의 위도
 *           schema:
 *             type: number
 *             format: float
 *         - name: EX
 *           in: query
 *           required: true
 *           description: 도착지의 경도
 *           schema:
 *             type: number
 *             format: float
 *         - name: EY
 *           in: query
 *           required: true
 *           description: 도착지의 위도
 *           schema:
 *             type: number
 *             format: float
 *         - name: apiKey
 *           in: query
 *           required: true
 *           description: API 인증 키
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: 성공적으로 대중교통 경로를 검색함
 *         '500':
 *           description: 서버 오류
 *         '-8':
 *           description: 필수 입력값 형식 및 범위 오류
 *         '-9':
 *           description: 필수 입력값 누락
 *         '3':
 *           description: 출발지 정류장이 없습니다.
 *         '4':
 *           description: 도착지 정류장이 없습니다.
 *         '5':
 *           description: 출, 도착지 정류장이 없습니다.
 *         '6':
 *           description: 서비스 지역이 아닙니다.
 *         '-98':
 *           description: 출, 도착지가 700m이내입니다.
 *         '-99':
 *           description: 검색결과가 없습니다.
 */