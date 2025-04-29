const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const userService = require("../service/userService");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

const join = async (req, res) => {
    const {loginId, pwd} = req.body;
    
    try {
        const loginUser = await userService.findUserByLoginId(loginId);
        if(loginUser.length) {
            return res.status(StatusCodes.CONFLICT).json({ message : "이미 존재하는 아이디입니다." });
        }

        await userService.joinUser(loginId, pwd);
        return res.status(StatusCodes.CREATED).json({ message : "성공적으로 회원가입 되었습니다. "});
    } catch(err) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
    }
}

const login = async (req, res) => {
    const {loginId, pwd} = req.body;
    console.log("login");

    try {
        const loginUser = await userService.findUserByLoginId(loginId);
        console.log(loginUser);
        if (!loginUser[0]) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message : "아이디 또는 비밀번호를 다시 확인해주세요." });
        }
        
        const hashPassword = crypto.pbkdf2Sync(pwd, loginUser[0].salt, 10000, 10, 'sha512').toString('base64');
        if (loginUser[0].password !== hashPassword) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "아이디 또는 비밀번호를 다시 확인해주세요." });
        }

        const token = jwt.sign(
            { 
                id: loginUser[0].id, 
                loginId: loginUser[0].login_id 
            }, 
            process.env.JWT_SECRET, 
            {
                expiresIn: process.env.JWT_EXPIRES_IN  
            } 
        );

        // token 관련은 추후 업데이트
        return res.status(StatusCodes.OK).json({
            loginUser : loginUser[0],
            token : token
        });

    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
    }
}

module.exports = { join, login };