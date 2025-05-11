import bgImage from "../../../assets/backGround.svg";
import * as S from "./login.style";
import React from "react";
import {AUTH_MESSAGES} from "../../../constants/authConstants";
import Button from "../../../hooks/button";
import {Input} from "../../../components/input/input";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../../../store/useUserStore";



const Login: React.FC = () => {
	const nav=useNavigate();
	const { setLoginId, setPassword, login,loginId,pwd } = useAuthStore();
	const handleLogin = async() => {
		if (!loginId || !pwd) {
			alert("아이디와 비밀번호를 입력해주세요.");
			return;
		}
		await login();
		console.log("loginId:", loginId, "pwd:", pwd);

		nav('/')
	}
	const handleRegister = () => {
		nav('/register')
	}
	return (
		<S.BackGround bg={bgImage}>
			<S.Header />
			<S.LoginContainer>
				<S.FormWrapper>
					<S.TitleWrapper>
						<S.LoginMessage>{AUTH_MESSAGES.LOGIN}</S.LoginMessage>
						<S.WelcomeMessage>{AUTH_MESSAGES.WELCOME}</S.WelcomeMessage>
					</S.TitleWrapper>
					<Input label={AUTH_MESSAGES.ID} placeholder={AUTH_MESSAGES.ID_REQUIRED} onChange={(e)=>{setLoginId(e.target.value)}}/>
					<Input label={AUTH_MESSAGES.PASSWORD} placeholder={AUTH_MESSAGES.PASSWORD_REQUIRED} 	type="password" onChange={(e)=>setPassword(e.target.value)} />
					<S.BtnWrapper>
						<Button value={AUTH_MESSAGES.LOGIN} width={"31.25rem"} className="submit" onClick={handleLogin}/>
						<Button value={AUTH_MESSAGES.REGISTER} width={"31.25rem"} onClick={handleRegister} />
					</S.BtnWrapper>
				</S.FormWrapper>
			</S.LoginContainer>
		</S.BackGround>
	);
};

export default Login;