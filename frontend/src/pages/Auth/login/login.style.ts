import styled from "@emotion/styled";

interface BackGroundProps {
	bg: string;
}

export const BackGround = styled.div<BackGroundProps>(({ bg }) => ({
	display: 'flex',
	height: '100vh',
	width: '100%',
	backgroundImage: `url(${bg})`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	alignItems: 'center',
}));

export const Header = styled.div(({ theme }) => ({
	width: '6.25rem',
	height: '100vh',
	borderRight: '1px solid #D1D1D1',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-between',
	background: theme.colors.white,
	paddingBottom: '20px',
}));

export const LoginContainer = styled.div(({ theme }) => ({
	width: '45%',
	height: '100vh',
	display: 'flex',
	flexDirection: 'column',
	background: theme.colors.white,
}));

export const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
    width: 31.25rem; // ✅ 입력창과 너비 맞춤
    align-items: flex-start;
	padding-top: 5.4rem;
		padding-bottom: 2rem;
		

`;

export const LoginMessage = styled.div(({ theme }) => ({
	color: theme.colors.sodomy200,
	fontSize: theme.fontSizes.lg,
	fontWeight: theme.fontWeights.bold,
}));

export const WelcomeMessage = styled.div(({ theme }) => ({
	color: theme.colors.sodomy200,
	fontWeight: theme.fontWeights.medium,
	fontSize: theme.fontSizes.md,
}));

export const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2.5rem;
`;


export const InputGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.25rem;

`;

export const Label = styled.label(({ theme }) => ({
	color: theme.colors.sodomy200,
	fontSize: theme.fontSizes.md,
}));

export const BtnWrapper = styled.div`
	display: flex;
	flex-direction: column;
 
	gap: 1.25rem;
	margin-top: 10rem;
`;