const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middleware/authMiddleware');
const { createMapValidator, updateMapValidator, mapIdValidator } = require('../middleware/validator');

const {
    getMap,
    createMap,
    updateMap,
    deleteMap
} = require("../controller/mapController");


router.route('/')
    .get(authenticateToken, getMap)
    .post(createMapValidator, createMap)

router.route('/:mapId')
    .put(authenticateToken, updateMapValidator, updateMap)
    .delete(authenticateToken, mapIdValidator, deleteMap);

module.exports = router;