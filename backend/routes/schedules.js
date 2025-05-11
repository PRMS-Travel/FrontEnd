const express = require('express');
const router = express.Router();
const {authenticateToken} = require("../middleware/authMiddleware");
const { mapIdValidator, createDetailValidator, updateTimeValidator } = require('../middleware/validator');
const { 
    getSchedules, 
    createDetails, 
    updateStartTime, 
    /*deleteDetails,*/
    deleteSchedules} = require("../controller/schedulesController");

router.route('/')
    .get(mapIdValidator, getSchedules)
    .post(createDetailValidator, createDetails)
    .put(updateTimeValidator, updateStartTime)
    .delete(mapIdValidator, deleteSchedules);

/* 외래키 속성으로 필요없어질 경우 추후 삭제
router.route('/detail')
    .delete(mapIdValidator, deleteDetails);
*/

module.exports = router;