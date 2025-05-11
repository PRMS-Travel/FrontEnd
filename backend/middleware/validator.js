const { body, param, query, check, validationResult } = require('express-validator');
const {StatusCodes} = require('http-status-codes');

const handleValidation = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        const errorMessages = error.array().map((err) => ({
            location : err.location,
            path : err.path,
            message : err.msg,
        }));

        return res.status(StatusCodes.BAD_REQUEST).json({ message : "전달 데이터를 다시 확인해주세요. ", errors : errorMessages});
    }
    return next(); 
};

exports.userValidator = [
    body("loginId").notEmpty().withMessage("아이디는 필수 입력 항목입니다."),
    body("pwd").notEmpty().withMessage("비밀번호는 필수 입력 항목입니다."),
    handleValidation
];

exports.mapIdValidator = [
    check("mapId").notEmpty().isInt({ gt : 0 }).withMessage("MapId는 필수 항목이며 유효한 정수여야 합니다."),
    handleValidation
];

exports.createMapValidator = [
    body("firstMapName").notEmpty().withMessage("여행지역은 필수 항목입니다."),
    body("startDay").notEmpty().isISO8601().withMessage("시작날짜는 필수 항목이며 ISO8601 형식을 준수해야합니다."),
    body("endDay").notEmpty().isISO8601().withMessage("종료날짜는 필수 항목이며 ISO8601 형식을 준수해야합니다."),
    handleValidation
];

exports.updateMapValidator = [
    param("mapId").isInt({ gt : 0 }).withMessage("MapId는 유효한 정수여야 합니다."),
    body("mapName").notEmpty().withMessage("변경할 mapName은 필수 입력 항목입니다."),
    handleValidation
];

exports.createPlaceValidator = [
    body("mapId").notEmpty().isInt({ gt : 0 }).withMessage("MapId는 필수 항목이며 유효한 정수여야 합니다."),
    body("latitude").notEmpty().withMessage("위도는 필수 입력 항목입니다."),
    body("longitude").notEmpty().withMessage("경도는 필수 입력 항목입니다."),
    handleValidation
];

exports.updateStateValidator = [
    param("placeId").notEmpty().isInt({ gt : 0 }).withMessage("placeId는 필수 항목이며 유효한 정수여야 합니다."),
    body("stateCode").notEmpty().isInt().isIn([0, 1]).withMessage("상태 코드는 0과 1 중 하나여야 합니다."),
    handleValidation
];

exports.deletePlaceValidator = [
    param("placeId").notEmpty().isInt({ gt : 0 }).withMessage("placeId는 필수 항목이며 유효한 정수여야 합니다."),
    handleValidation
];

exports.createDetailValidator = [
    body("mapId").notEmpty().isInt({ gt : 0 }).withMessage("MapId는 필수 항목이며 유효한 정수여야 합니다."),
    body("details").isArray({ min : 1}).withMessage("details는 비어있지 않은 배열이어야 합니다."),
    body('details.*.scheduleId').notEmpty().isInt({ gt: 0 }).withMessage('scheduleId는 필수 항목이며 유효한 정수여야 합니다.'),
    body('details.*.placeId').notEmpty().isInt({ gt: 0 }).withMessage('placeId는 필수 항목이며 유효한 정수여야 합니다.'),
    body('details.*.orderBy').notEmpty().isInt({ gt: 0 }).withMessage('orderBy는 필수 항목이며 유효한 정수여야 합니다.'),
    body('details.*.playTime').notEmpty().isInt({ gt: 0 }).withMessage('playTime은 필수 항목이며 유효한 정수(분단위)여야 합니다.'),
    body('details.*.moveTime').notEmpty().isInt({ gt: 0 }).withMessage('moveTime은 필수 항목이며 유효한 정수(분단위)여야 합니다.'),
    handleValidation
];

exports.updateTimeValidator = [
    body('scheduleId').notEmpty().isInt({ gt: 0 }).withMessage('scheduleId는 필수 항목이며 유효한 정수여야 합니다.'),
    body("startTime").notEmpty().isISO8601().withMessage("시작날짜/시간은 필수 항목이며 ISO8601 형식을 준수해야합니다."),
    handleValidation
];