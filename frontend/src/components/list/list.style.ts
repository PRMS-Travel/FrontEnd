import styled from '@emotion/styled';


export const ListContainer = styled.div(({ theme }) => ({
	display: 'flex',
	background: theme.colors.white,
	width: '22rem',
	height: '23rem',
	padding: '1rem 1.5rem',
	flexDirection: 'column',
	borderRadius: '1rem'
}));