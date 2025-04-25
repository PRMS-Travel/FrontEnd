import styled from "@emotion/styled";

export const InputContainer = styled.div(({ theme }) => ({
	borderRadius: theme.borderRadius.base,
	backgroundColor: theme.colors.white,
	 display: "flex",
	alignItems: "center",
	width: "31.25rem",
	height: "3.5rem",
border: "1px solid #1E2A3C",
}));

export const Input = styled.input(({ theme }) => ({
marginLeft:"2.84rem",
	border: "none",
	display: "flex",
	width: "25rem",
	padding: "0.6rem",
	fontSizes:theme.fontSizes.base,
fontWeight:theme.fontWeights.medium,
	"&:focus":{
	outline:"none"}

}))