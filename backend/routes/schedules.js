const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.send("");
    })
    .post((req, res) => {
        res.send("");
    })
    .put((req, res) => {
        res.send("시작 시간 업데이트용");
    });

router.route('/detail')
    .post((req, res) => {
        res.send("");
    })
    .delete((req, res) => {
        res.send("일정 싹다 날림");
    });



module.exports = router;
