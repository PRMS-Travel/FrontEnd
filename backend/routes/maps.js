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
    .get(authenticateToken,getMap)
    .post(createMap)

router.route('/:mapId')
    .put(authenticateToken,updateMap)
    .delete(authenticateToken,deleteMap);

module.exports = router;