const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middleware/authMiddleware');

const {
    getMap,
    createMap,
    updateMap,
    deleteMap
} = require("../controller/mapController");


router.route('/')
    .get(getMap)
    .post(createMap)

router.route('/:mapId')
    .put(updateMap)
    .delete(deleteMap);

// 토큰 인증 예시
router.route('/auth')
    .get(authenticateToken,getMap);

module.exports = router;