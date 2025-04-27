const express = require('express');
const router = express.Router();

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

module.exports = router;