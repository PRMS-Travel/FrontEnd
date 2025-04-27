// import bgImage from "../../../assets/backGround.svg";
// import * as S from "./login.style";
// import React from "react";
// import {AUTH_MESSAGES} from "../../../constants/authConstants";
// import Button from "../../../components/button";
// import {Input} from "../../../components/input/input";
// const Login: React.FC = () => {
// 	return (
//
// 		<S.BackGround bg={bgImage}>
// 			<S.Header></S.Header>
// 			<S.LoginContainer>
// 				<S.TitleWrapper>
// 					<S.LoginMessage>{AUTH_MESSAGES.LOGIN}</S.LoginMessage>
// 					<S.WelcomeMessage>{AUTH_MESSAGES.WELCOME}</S.WelcomeMessage>
// 				</S.TitleWrapper>
// 				<S.ComponentContainer>
// 				<S.ComponentWrapper>
// 					<S.Label>	{AUTH_MESSAGES.EMAIL}</S.Label>
// 					<Input placeholder={AUTH_MESSAGES.EMAIL_REQUIRED} />
// 					<S.Label>{AUTH_MESSAGES.PASSWORD}</S.Label>
// 					<Input placeholder={AUTH_MESSAGES.PASSWORD_REQUIRED} />
// 					<S.BtnWrapper>
// 						<Button value={AUTH_MESSAGES.LOGIN} width={"31.25rem"} className="submit"/>
// 						<Button value={AUTH_MESSAGES.REGISTER} width={"31.25rem"}/>
// 					</S.BtnWrapper>
// 				</S.ComponentWrapper>
// 				</S.ComponentContainer>
// 			</S.LoginContainer>
// 		</S.BackGround>
// 	);
// };
// export default Login;
import bgImage from "../../../assets/backGround.svg";
import * as S from "./login.style";
import React from "react";
import {AUTH_MESSAGES} from "../../../constants/authConstants";
import Button from "../../../hooks/button";
import {Input} from "../../../components/input/input";

const LabeledInput = ({ label, placeholder }: { label: string; placeholder: string }) => (
	<S.InputGroup>
		<S.Label>{label}</S.Label>
		<Input placeholder={placeholder} />
	</S.InputGroup>
);

const Login: React.FC = () => {
	return (
		<S.BackGround bg={bgImage}>
			<S.Header />
			<S.LoginContainer>
				<S.FormWrapper>
					<S.TitleWrapper>
						<S.LoginMessage>{AUTH_MESSAGES.LOGIN}</S.LoginMessage>
						<S.WelcomeMessage>{AUTH_MESSAGES.WELCOME}</S.WelcomeMessage>
					</S.TitleWrapper>
					<LabeledInput label={AUTH_MESSAGES.EMAIL} placeholder={AUTH_MESSAGES.EMAIL_REQUIRED} />
					<LabeledInput label={AUTH_MESSAGES.PASSWORD} placeholder={AUTH_MESSAGES.PASSWORD_REQUIRED} />
					<S.BtnWrapper>
						<Button value={AUTH_MESSAGES.LOGIN} width={"31.25rem"} className="submit" />
						<Button value={AUTH_MESSAGES.REGISTER} width={"31.25rem"} />
					</S.BtnWrapper>
				</S.FormWrapper>
			</S.LoginContainer>
		</S.BackGround>
	);
};

export default Login;