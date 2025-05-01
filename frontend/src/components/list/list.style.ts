import styled from '@emotion/styled';


export const ListContainer = styled.div(({ theme }) => ({
	display: 'flex',
	background: theme.colors.white,
	width: '22rem',
	height: '23rem',
	padding: '1rem',
	flexDirection: 'column',
	borderRadius: '1rem',


}));

export const ScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow-y: auto; 
  height: 100%;
  padding-right: 0.3rem; 
`;

export const LocationInfo = styled.div`
  display: flex;
  align-items: center;
		padding: 0.5rem 0;
		cursor: pointer;
    &:hover {
      background:  #F5F5F5;
		    border-radius: 16px;
    }
`;

export const LocationText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
   

`;
export const LocationTitle =styled.div(({theme}) => ({
	color: theme.colors.sodomy200,
	fontSize: theme.fontSizes.sm,

	fontWeight: theme.fontWeights.medium,
	lineHeight: 1.2,
}))