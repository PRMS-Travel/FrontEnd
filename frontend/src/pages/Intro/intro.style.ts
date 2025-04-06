import styled from '@emotion/styled';

 // import { Theme } from '@emotion/react';

interface BackGroundProps {
	bg: string;
}

export const BackGround = styled.div<BackGroundProps>(({ bg }) => ({
	display: 'flex',
	flexDirection: 'column',
	height: '100vh',
	width: '100%',
	backgroundImage: `url(${bg})`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	alignItems: 'center',
	backgroundRepeat: 'no-repeat',
}));

export const AuthNavContainer=styled.div`
    display: flex;
    flex-direction: row;
    width: 80rem;
    height: 2rem;
		margin-top: 2.26rem;
		justify-content: space-between;
`

export const AuthMenu = styled.div(({theme}) => ({
	color: theme.colors.white,
	display: 'flex',
	flexDirection: 'row',
	gap: '1.5rem',
	fontSize:theme.fontSizes.base,
	fontWeight: theme.fontWeights.bold,
}))

export const Title = styled.div(({ theme }) => ({
color:theme.colors.white,
	fontSize:theme.fontSizes.lg,
	fontWeight:theme.fontWeights.bold,
marginTop:'3rem',
}));