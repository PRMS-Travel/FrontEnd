import Close from '../../assets/close.svg?react';
/** @jsxImportSource @emotion/react */
import * as S from './intro.style';
import React from "react";
import Divider from '../../assets/divider.svg?react'
import bgImage from '../../assets/backGround.svg';
import {AUTH_MESSAGES} from "../../constants/authConstants";
 import {INTRO_MESSAGES} from '../../constants/introConstant'
import {SearchBar} from "../../components/searchBar/searchBar";
import {Calendar} from "../../components/calendar/calendar";
import {List} from"../../components/list/list"
import {useModal} from "../../hooks/useModal";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/useUserStore";


const Intro: React.FC= () => {
	const { isOpenModal, toggleModal } = useModal();
const {isLoggedIn,userId} = useAuthStore();
	const nav = useNavigate();
	const handleOnClickLogin=  ()=>{
		nav("/login");
	}
	const handleOnClickRegister=  ()=>{
		nav("/register");
	}
	return (
		<S.BackGround bg={bgImage}>

				{isLoggedIn? (
						<S.AuthNavContainer>
							<Close/>
							<S.AuthMenu>
								<div onClick={handleOnClickLogin}>
									{userId}
								</div>
								<Divider/>
								<div onClick={handleOnClickRegister}>
									{AUTH_MESSAGES.LOGOUT}</div>
							</S.AuthMenu>
						</S.AuthNavContainer>
				):		<S.AuthNavContainer>
					<Close/>
					<S.AuthMenu>
						<div onClick={handleOnClickLogin}>
							{AUTH_MESSAGES.LOGIN}
						</div>
						<Divider/>
						<div onClick={handleOnClickRegister}>
							{AUTH_MESSAGES.REGISTER}</div>
					</S.AuthMenu>
				</S.AuthNavContainer>}
			<S.Title>{INTRO_MESSAGES.INTRO}</S.Title>
			<SearchBar type="location"  onToggleModal={toggleModal}  />
			{isOpenModal && (
					<S.ModalWrapper>
						<div style={{ flex: 1, visibility: isOpenModal.location ? 'visible' : 'hidden' }}>
							<List />
						</div>
						<div style={{ flex: 1, visibility: isOpenModal.date ? 'visible' : 'hidden' }}>
							<Calendar/>
						</div>
					</S.ModalWrapper>
			)}
		</S.BackGround>
	);
};

export default Intro;