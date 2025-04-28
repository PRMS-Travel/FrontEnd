const express = require('express');
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.send("USER 지도 SELECT");
    })
    .post((req, res) => {
        res.send("지도 INSERT (로그인 하지 않아도 필수)");
    })
    .put((req, res) => {
        res.send("지도 별칭 UPDATE -> 안쓸수도 있음");
    })
    .delete((req, res) => {
        res.send("지도 삭제");
    });

module.exports = router;
