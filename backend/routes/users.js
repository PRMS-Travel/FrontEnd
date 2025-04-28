const express = require('express');
const router = express.Router();

router.post('/join', (req, res) => {
    res.send("회원가입 API");
});

router.post('/login', ()=> {
    res.send("로그인 API");
});

module.exports = router;
