import bgImage from "../../../assets/backGround.svg";
import * as S from "../login/login.style";
import React from "react";
import {AUTH_MESSAGES} from "../../../constants/authConstants";
import Button from "../../../components/button";
import {Input} from "../../../components/input/input";


const Register: React.FC = () => {
	return (
		<S.BackGround bg={bgImage}>
			<S.Header />
			<S.LoginContainer>
				<S.FormWrapper>
					<S.TitleWrapper>
						<S.LoginMessage>{AUTH_MESSAGES.REGISTER}</S.LoginMessage>
						<S.WelcomeMessage>{AUTH_MESSAGES.WELCOME}</S.WelcomeMessage>
					</S.TitleWrapper>
					<Input label={AUTH_MESSAGES.EMAIL} placeholder={AUTH_MESSAGES.EMAIL_REQUIRED} />
					<Input label={AUTH_MESSAGES.PASSWORD} placeholder={AUTH_MESSAGES.PASSWORD_REQUIRED} />
					<Input label={AUTH_MESSAGES.PASSWORD_CHECK_CONFIRM} placeholder={AUTH_MESSAGES.PASSWORD_REQUIRED} />
					<S.BtnWrapper>
						<Button value={AUTH_MESSAGES.REGISTER} width={"31.25rem"} className="submit" />
					</S.BtnWrapper>
				</S.FormWrapper>
			</S.LoginContainer>
		</S.BackGround>
	);
};

export default Register;