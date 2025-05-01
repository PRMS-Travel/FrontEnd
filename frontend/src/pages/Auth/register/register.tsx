import bgImage from "../../../assets/backGround.svg";
import * as S from "../login/login.style";
import React, { useState } from "react";
import { AUTH_MESSAGES } from "../../../constants/authConstants";
import Button from "../../../hooks/button";
import { Input } from "../../../components/input/input";
import { useAuthStore } from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
	const nav=  useNavigate();
	const { loginId, pwd, setLoginId, setPassword, signup } = useAuthStore();
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSignup = async () => {
		if (pwd !== confirmPassword) {
			alert("비밀번호가 일치하지 않습니다.");
			return;
		}
		await signup();
		nav("/")
	};
	return (
		<S.BackGround bg={bgImage}>
			<S.Header />
			<S.LoginContainer>
				<S.FormWrapper>
					<S.TitleWrapper>
						<S.LoginMessage>{AUTH_MESSAGES.REGISTER}</S.LoginMessage>
						<S.WelcomeMessage>{AUTH_MESSAGES.WELCOME}</S.WelcomeMessage>
					</S.TitleWrapper>

					<Input
						label={AUTH_MESSAGES.EMAIL}
						placeholder={AUTH_MESSAGES.EMAIL_REQUIRED}
						value={loginId}
						onChange={(e) => setLoginId(e.target.value)}
					/>

					<Input
						label={AUTH_MESSAGES.PASSWORD}
						placeholder={AUTH_MESSAGES.PASSWORD_REQUIRED}
						value={pwd}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
					/>
					{pwd && (
						<Input
							label={AUTH_MESSAGES.PASSWORD_CHECK_CONFIRM}
							placeholder={AUTH_MESSAGES.PASSWORD_REQUIRED}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							type="password"
						/>
					)}

					<S.BtnWrapper>
						<Button
							value={AUTH_MESSAGES.REGISTER}
							width={"31.25rem"}
							className="submit"
							onClick={handleSignup}
						/>
					</S.BtnWrapper>
				</S.FormWrapper>
			</S.LoginContainer>
		</S.BackGround>
	);
};

export default Register;