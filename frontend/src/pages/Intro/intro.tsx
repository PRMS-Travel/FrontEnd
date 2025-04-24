import Close from '../../assets/close.svg?react';
/** @jsxImportSource @emotion/react */
import * as S from './intro.style';
import React from 'react';
import Divider from '../../assets/divider.svg?react'
import bgImage from '../../assets/backGround.svg';
import {AUTH_MESSAGES} from "../../constants/authConstants";
 import {INTRO_MESSAGES} from '../../constants/introConstant'
import {SearchBar} from "../../components/searchBar/searchBar";

const Intro: React.FC = () => {

	return (
		<S.BackGround bg={bgImage}>
			<S.AuthNavContainer>
				<Close/>
			<S.AuthMenu>
				{AUTH_MESSAGES.LOGIN}
					<Divider/>
				{AUTH_MESSAGES.REGISTER}
			</S.AuthMenu>
			</S.AuthNavContainer>
			<S.Title>{INTRO_MESSAGES.INTRO}</S.Title>
			<SearchBar type="location"/>
		</S.BackGround>
	);
};

export default Intro;