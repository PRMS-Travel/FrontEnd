const express = require('express');
const router = express.Router();
const { 
    getSchedules, 
    createDetails, 
    updateStartTime, 
    deleteDetails,
    deleteSchedules} = require("../controller/schedulesController");

router.route('/')
    .get(getSchedules) // mapId 유효성 검사 처리 필요
    .post(createDetails)
    .put(updateStartTime)
    .delete(deleteSchedules);

router.route('/detail')
    .delete(deleteDetails);

module.exports = router;
