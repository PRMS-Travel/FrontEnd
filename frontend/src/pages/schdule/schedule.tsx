import { useState, useEffect, useRef } from 'react';
import { DragDropContext, DropResult, DragStart } from '@hello-pangea/dnd';
import * as S from "./schedule.style";
import Logo from "../../hooks/logo";
import KakaoMap, { KakaoMapHandle } from "../../hooks/map";
import Button from "../../hooks/button";
import Utils from "../../hooks/utils";
import { ButtonWrap } from "../../hooks/button.style";
import Schedules from '../../hooks/schedules';
import { DragBarStyle } from '../../hooks/utils.style';
import DragBar from '../../assets/dragBar.svg?react';
import { Place } from '../../hooks/util';
import Modal from '../../hooks/Modal';
import {useAuthStore} from "../../store/useUserStore";
import {useCountDay} from "../../hooks/useDateRangeDay";

const Schedule = () => {
	const [isUtilsVisible, setIsUtilsVisible] = useState(true);
	const [utilsWidth, setUtilsWidth] = useState<number | string>(1400);
	const utilsContainerRef = useRef<HTMLDivElement>(null);
	const dragBarRef = useRef<HTMLDivElement>(null);
	const isDragging = useRef<boolean>(false);
	const mapRef = useRef<KakaoMapHandle>(null);
	const {isLoggedIn} = useAuthStore();

	const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
	const [daySchedules, setDaySchedules] = useState<Record<string, Place[]>>({}); // 예: { "day-1": [place1, place2], "day-2": [] }
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

	const handleAddPlaceToSavedPlaces = (place: Place) => {
        if (!savedPlaces.some(p => p.id === place.id)) {
            setSavedPlaces(prevPlaces => [...prevPlaces, place]);
        } else {
            alert("이미 보관함에 있는 장소입니다.");
        }
    };

    const handleDeletePlaceFromSavedPlaces = (placeId: string) => {
        setSavedPlaces(prev => prev.filter(p => p.id !== placeId));
    };

    const handleDeletePlaceFromDaySchedule = (dayKey: string, placeId: string) => {
        setDaySchedules(prev => ({
            ...prev,
            [dayKey]: (prev[dayKey] || []).filter(p => p.id !== placeId)
        }));
    };

	const onDragStart = (start: DragStart) => {
		console.log("Drag started from:", start.source.droppableId, "item:", start.draggableId);
	};

	const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return; // 드롭 영역 밖으로 드롭된 경우
        }
        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;

        if (sourceId === destinationId) {
            if (sourceId === 'placeBox') {
                const items = Array.from(savedPlaces);
                const [reorderedItem] = items.splice(source.index, 1);
                items.splice(destination.index, 0, reorderedItem);
                setSavedPlaces(items);
            } else if (sourceId.startsWith('day-')) { // 일정 내에서의 순서 변경
                const dayKey = sourceId;
                const items = Array.from(daySchedules[dayKey] || []);
                const [reorderedItem] = items.splice(source.index, 1);
                items.splice(destination.index, 0, reorderedItem);
                setDaySchedules(prev => ({ ...prev, [dayKey]: items }));
            }
        } else {
            // 다른 목록으로 아이템 이동 (장소보관함 -> 특정 날짜의 일정)
            if (sourceId === 'placeBox' && destinationId.startsWith('day-')) {
                const itemToMove = savedPlaces[source.index];
                
                // 목적지 날짜에 이미 해당 아이템이 있는지 ID로 확인
                if ((daySchedules[destinationId] || []).some(p => p.id === itemToMove.id)) {
                    alert("이미 해당 날짜의 일정에 추가된 장소입니다.");
                    return;
                }

                const newSavedPlaces = Array.from(savedPlaces);
                newSavedPlaces.splice(source.index, 1); // 원본에서 제거
                setSavedPlaces(newSavedPlaces);

                const newDaySchedule = Array.from(daySchedules[destinationId] || []);
                newDaySchedule.splice(destination.index, 0, itemToMove); // 목적지에 추가
                setDaySchedules(prev => ({ ...prev, [destinationId]: newDaySchedule }));
            }
			// 한 날짜의 일정에서 다른 날짜의 일정으로 아이템 이동
            else if (sourceId.startsWith('day-') && destinationId.startsWith('day-')) {
                const sourceDayKey = sourceId;
                const destinationDayKey = destinationId;

                const sourceDayItems = Array.from(daySchedules[sourceDayKey] || []);
                const [movedItem] = sourceDayItems.splice(source.index, 1); // 소스에서 아이템 제거
                const destinationDayItems = Array.from(daySchedules[destinationDayKey] || []);
                destinationDayItems.splice(destination.index, 0, movedItem); // 목적지에 아이템 추가

                setDaySchedules(prev => ({
                    ...prev,
                    [sourceDayKey]: sourceDayItems,
                    [destinationDayKey]: destinationDayItems,
                }));
            }
        }
    };

	const handleLoginButton = () => {
		window.location.href = '/login';
	}
	const handleCloseModal = () => {
        setToggleModal(false);
    }
		const numberOfdays=useCountDay();

	return (
		<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
			<S.Container id="schedule">
				<Modal $view={toggleModal} onClose={handleCloseModal} type={modalType}/>
				<S.Header>
					<div className="logo_wrap">
						<Logo />
						{isLoggedIn ? (
							<Button className="loginButton" value='로그아웃' onClick={handleLoginButton}/>):<Button className="loginButton" value='로그인' onClick={handleLoginButton}/>}
					</div>
					<ButtonWrap>
						<Button
							value={isUtilsVisible ? "닫기" : "열기"}
							onClick={handleToggleUtils}
						/>
						<Button value="저장" className="submit" onClick={handleSaveButton} />
					</ButtonWrap>
				</S.Header>
				<S.Main>
					<S.ResizableContainer ref={utilsContainerRef} style={{ width: typeof utilsWidth === 'number' ? `${utilsWidth}px` : utilsWidth }}>
						{isUtilsVisible && (
							<Utils
								currentWidth={utilsWidth}
								hideThresholdWidth={hideThresholdWidth}
								savedPlaces={savedPlaces}
                                onAddPlaceToSavedPlaces={handleAddPlaceToSavedPlaces}
                                onDeletePlaceFromSavedPlaces={handleDeletePlaceFromSavedPlaces}
							/>
						)}
						<Schedules
							numberOfDays={numberOfdays}
							daySchedules={daySchedules}
                            onDeletePlaceFromDay={handleDeletePlaceFromDaySchedule}
						/>
						<DragBarStyle ref={dragBarRef}>
							<DragBar />
						</DragBarStyle>
					</S.ResizableContainer>
				</S.Main>
				<KakaoMap ref={mapRef} />
			</S.Container>
		</DragDropContext>
	);
};

export default Schedule;