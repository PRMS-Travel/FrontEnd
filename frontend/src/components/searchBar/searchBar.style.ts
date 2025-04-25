import styled from '@emotion/styled';


export const SearchBarContainer = styled.div(({ theme }) => ({
	borderRadius: theme.borderRadius.sm,
	width: "45.5rem",
	height: "4.1875rem",
	backgroundColor: theme.colors.white,
	marginTop:"1.75rem",
	display: "flex",
	alignItems: "center",
	paddingLeft:"1rem",
	paddingRight:"1rem",
}));

export const Input =styled.input(({ theme }) => ({
	display: "flex",
	flex: 1,
	width: "15rem",
	height: "4.1875rem",
	padding: "0.6rem",
	fontSize:theme.fontSizes.base,
	fontWeight:theme.fontWeights.medium,
	border: "none",
	color: theme.colors.black,
	"&:focus":{
		outline:"none"}
}))
export const CustomDivider = styled.div`
    width: 1px;
    height: 2rem;
    background-color: #3D3E48;
    margin: 0 1rem;
`

