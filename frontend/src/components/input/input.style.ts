import styled from "@emotion/styled";

export const InputContainer = styled.div(({ theme }) => ({
	borderRadius: theme.borderRadius.sm,
	width: "48.75rem",
	height: "4.1875rem",
	backgroundColor: theme.colors.white,
	marginTop:"1.75rem",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	paddingLeft:"1rem",
	paddingRight:"1rem",

}));

export const Input = styled.input(({ theme }) => ({

	border: "none",
	display: "flex",
	width: "15rem",
	padding: "0.6rem",
	fontSizes:theme.fontSizes.base,
fontWeight:theme.fontWeights.medium,
}))
