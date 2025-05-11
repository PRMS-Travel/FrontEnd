import styled from "@emotion/styled";

export const InputContainer = styled.div({
	display: "flex",
	flexDirection: "column",
	gap: "1.125rem",
	width: "100%",
	maxWidth: "31.25rem",
});

export const Label = styled.label(({ theme }) => ({
	color: theme.colors.sodomy200,
	fontSize: theme.fontSizes.mmd,
	fontWeight: theme.fontWeights.medium,
}));

export const Input = styled.input(({ theme }) => ({
	width: "100%",
	padding: "1.2rem 2rem",
	border: "1px solid #1E2A3C",
	borderRadius: theme.borderRadius.base,
	backgroundColor: theme.colors.white,
	fontSize: theme.fontSizes.base18,
	fontWeight: theme.fontWeights.medium,

	"&:focus": {
		outline: "none",
	},

	"&::placeholder": {
		color: theme.colors.gray200,
		fontSize: theme.fontSizes.base18,
		fontWeight: theme.fontWeights.medium,
	},
}));