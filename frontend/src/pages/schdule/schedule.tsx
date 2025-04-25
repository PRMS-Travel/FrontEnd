import { useState, useEffect, useRef } from 'react';
import * as S from "./schedule.style.ts";
import Logo from "../../hooks/logo.tsx";
import KakaoMap, { KakaoMapHandle } from "../../hooks/map.tsx";
import Button from "../../hooks/button.tsx";
import Utils from "../../hooks/utils.tsx";
import { ButtonWrap } from "../../hooks/button.style.ts";
import Schedules from '../../hooks/schedules.tsx';
import { DragBarStyle } from '../../hooks/utils.style';
import DragBar from '../../assets/dragBar.svg?react';
import Modal from '../../hooks/Modal.tsx';

const Schedule = () => {
	const [isUtilsVisible, setIsUtilsVisible] = useState(true);
	const [utilsWidth, setUtilsWidth] = useState<number | string>(1400);
	const utilsContainerRef = useRef<HTMLDivElement>(null);
	const dragBarRef = useRef<HTMLDivElement>(null);
	const isDragging = useRef<boolean>(false);
	const mapRef = useRef<KakaoMapHandle>(null);

	const [toggleModal, setToggleModal] = useState(false);

	const minWidth = 100;
	const maxWidth = 1900;
	const hideThresholdWidth = 324;

	useEffect(() => {
		const dragBarElement = dragBarRef.current;
		const containerElement = utilsContainerRef.current;

		if (!dragBarElement || !containerElement) return;

		const handleMouseMove = (e: MouseEvent) => {
			if (isDragging.current) {
				let newWidth = e.clientX - containerElement.getBoundingClientRect().left;
				newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
				setUtilsWidth(newWidth);
			}
		};

		const handleMouseUp = () => {
			if (isDragging.current) {
				isDragging.current = false;
				document.body.style.cursor = 'default';
				window.removeEventListener("mousemove", handleMouseMove);
				window.removeEventListener("mouseup", handleMouseUp);

				mapRef.current?.relayout();
			}
		};

		const handleMouseDown = (e: MouseEvent) => {
			e.preventDefault();
			isDragging.current = true;
			document.body.style.cursor = 'col-resize';
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		};

		dragBarElement.addEventListener("mousedown", handleMouseDown);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
			if (dragBarElement) {
				dragBarElement.removeEventListener("mousedown", handleMouseDown);
			}
			if (isDragging.current) {
				document.body.style.cursor = 'default';
			}
		};
	}, [minWidth, maxWidth]);

	let modalType: string = "";

	const handleSaveButton = () => {
		setToggleModal(true);
		modalType = "save";
	}

	const handleToggleUtils = () => {
		setIsUtilsVisible(prev => !prev);
		setTimeout(() => {
			mapRef.current?.relayout();
		}, 0);
		if (!isUtilsVisible) {
			setUtilsWidth(1400);
		}
	}

	const handleLoginButton = () => {
		window.location.href = '/login';
	}
	const handleCloseModal = () => {
        setToggleModal(false);
    }

	return (
	<S.Container id="schedule">
		<Modal $view={toggleModal} onClose={handleCloseModal} type={modalType}/>
		<S.Header>
			<div className="logo_wrap">
				<Logo />
				<Button className="loginButton" value='로그인' onClick={handleLoginButton}/>
			</div>
			<ButtonWrap>
				<Button
					value={isUtilsVisible ? "닫기" : "열기"}
					onClick={handleToggleUtils}
				/>
				<Button value="편집" />
				<Button value="저장" className="submit" onClick={handleSaveButton} />
			</ButtonWrap>
		</S.Header>
		<S.Main>
			<S.ResizableContainer ref={utilsContainerRef} style={{ width: typeof utilsWidth === 'number' ? `${utilsWidth}px` : utilsWidth }}>
				{isUtilsVisible && (
					<Utils currentWidth={utilsWidth} hideThresholdWidth={hideThresholdWidth} />
				)}
				<Schedules numberOfDays={3} />
				<DragBarStyle ref={dragBarRef}>
					<DragBar />
				</DragBarStyle>
			</S.ResizableContainer>
		</S.Main>
		<KakaoMap ref={mapRef} />
	</S.Container>
	);
};

export default Schedule;
