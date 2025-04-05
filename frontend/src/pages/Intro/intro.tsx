/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { introStyle } from './intro.style';
import React from 'react';
import bgImage from '../../assets/backGround.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Close from '../../assets/close.svg?react';

const Intro: React.FC = () => {
	const theme = useTheme();
	return (
		<div css={introStyle(theme, bgImage)}>
<Close />
		</div>
	);
};

export default Intro;

