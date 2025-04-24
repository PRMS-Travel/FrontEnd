const express = require('express');
const router = express.Router();
const { 
    getSchedules, 
    createSchedules, 
    updateStartTime, 
    createDetails, 
    deleteDetails} = require("../controller/schedulesController");

router.route('/')
    .get(getSchedules) // mapId 유효성 검사 처리 필요
    .post(createSchedules)
    .put(updateStartTime);

router.route('/detail')
    .post(createDetails)
    .delete(deleteDetails);

module.exports = router;
