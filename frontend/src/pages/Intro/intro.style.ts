import { css, Theme } from '@emotion/react';

export const introStyle = (theme: Theme, bg: string) =>
	css({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
		width: '100%',
		backgroundImage: `url(${bg})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		color: theme.colors.gray,

	});