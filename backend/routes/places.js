const express = require('express');
const router = express.Router();

// 장소는 일단 보류합니다.
router.route('/')
    .get((req, res) => {
    res.send("");
})
    .post((req, res) => {
        res.send("");
    })
    .put((req, res) => {
        res.send("");
    })
    .delete((req, res) => {
        res.send("");
    });

module.exports = router;
