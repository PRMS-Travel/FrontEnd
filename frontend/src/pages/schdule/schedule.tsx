import { useState, useEffect, useRef, useMemo, useCallback } from 'react'; // useCallback 임포트
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
import { KakaoNaviCoord } from '../../api/kakao.mobility.api'; // KakaoNaviCoord 타입 임포트

// KakaoMap에 전달할 경로 세그먼트와 색상 정보를 함께 담는 타입
export interface RouteSegmentWithColor {
    coordinates: KakaoNaviCoord[];
    color: string;
}

const Schedule = () => {
	const [isUtilsVisible, setIsUtilsVisible] = useState(true);
	const [utilsWidth, setUtilsWidth] = useState<number | string>(1400);
	const utilsContainerRef = useRef<HTMLDivElement>(null);
	const dragBarRef = useRef<HTMLDivElement>(null);
	const isDragging = useRef<boolean>(false);
	const mapRef = useRef<KakaoMapHandle>(null);
	const {isLoggedIn} = useAuthStore();

	const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
	const [daySchedules, setDaySchedules] = useState<Record<string, Place[]>>({});

	// KakaoMap에 전달될 모든 경로 세그먼트를 저장하는 상태
	const [allMapRouteSegments, setAllMapRouteSegments] = useState<RouteSegmentWithColor[]>([]);


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

	const [modalType, setModalType] = useState<string>(""); // modalType을 상태로 관리

	const handleSaveButton = () => {
		setToggleModal(true);
		setModalType("save"); // 상태 업데이트 함수 사용
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
            return;
        }
        const sourceId = source.droppableId;
        const destinationId = destination.droppableId;

        if (sourceId === destinationId) {
            if (sourceId === 'placeBox') {
                const items = Array.from(savedPlaces);
                const [reorderedItem] = items.splice(source.index, 1);
                // savedPlaces의 아이템에는 dayNumber가 없을 수 있으므로, 그대로 유지
                items.splice(destination.index, 0, { ...reorderedItem, dayNumber: undefined });
                setSavedPlaces(items);
            } else if (sourceId.startsWith('day-')) {
                const dayKey = sourceId;
                const dayNum = parseInt(dayKey.split('-')[1], 10);
                const items = Array.from(daySchedules[dayKey] || []);
                const [reorderedItem] = items.splice(source.index, 1);
                // 같은 날짜 내에서 이동하므로 dayNumber 유지 또는 재설정
                items.splice(destination.index, 0, { ...reorderedItem, dayNumber: dayNum });
                setDaySchedules(prev => ({ ...prev, [dayKey]: items }));
            }
        } else {
            if (sourceId === 'placeBox' && destinationId.startsWith('day-')) {
                const itemToMoveFromSaved = { ...savedPlaces[source.index] }; // 복사본 사용
                const destinationDayNum = parseInt(destinationId.split('-')[1], 10);
                
                if ((daySchedules[destinationId] || []).some(p => p.id === itemToMoveFromSaved.id)) {
                    alert("이미 해당 날짜의 일정에 추가된 장소입니다.");
                    return;
                }

                const newSavedPlaces = Array.from(savedPlaces);
                newSavedPlaces.splice(source.index, 1);
                setSavedPlaces(newSavedPlaces);
                
                // 목적지 날짜에 추가될 때 dayNumber 설정
                const itemToAddWithDayNumber = { ...itemToMoveFromSaved, dayNumber: destinationDayNum };
                const newDaySchedule = Array.from(daySchedules[destinationId] || []);
                newDaySchedule.splice(destination.index, 0, itemToAddWithDayNumber);
                setDaySchedules(prev => ({ ...prev, [destinationId]: newDaySchedule }));
            }
            else if (sourceId.startsWith('day-') && destinationId.startsWith('day-')) {
                const sourceDayKey = sourceId;
                const destinationDayKey = destinationId;
                // const sourceDayNum = parseInt(sourceDayKey.split('-')[1], 10);
                const destinationDayNum = parseInt(destinationDayKey.split('-')[1], 10);

                const sourceDayItems = Array.from(daySchedules[sourceDayKey] || []);
                const [movedItem] = sourceDayItems.splice(source.index, 1);
                // 다른 날짜로 이동하므로, 목적지 날짜의 dayNumber로 업데이트
                const movedItemWithNewDayNumber = { ...movedItem, dayNumber: destinationDayNum };
                const destinationDayItems = Array.from(daySchedules[destinationDayKey] || []);
                destinationDayItems.splice(destination.index, 0, movedItemWithNewDayNumber);

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
	const numberOfdays=useCountDay();

	const handleCloseModal = () => {
		setToggleModal(false);
	}

	const allPlacesForMap = useMemo(() => {
		const placesFromScheduleDays = Object.values(daySchedules).flat();

		const uniquePlacesInSchedules = Array.from(new Map(placesFromScheduleDays.map(place => [place.id, place])).values());
		return uniquePlacesInSchedules;
	}, [daySchedules]);

	// Schedules 컴포넌트로부터 집계된 경로 세그먼트를 받아 상태를 업데이트하는 콜백 함수
	const handleUpdateAllRouteSegments = useCallback((segmentsWithColor: RouteSegmentWithColor[]) => {
		// 개발 환경에서만 상세 로그를 출력하도록 변경하거나, 디버깅 완료 후 제거
		if (import.meta.env.NODE_ENV === 'development') {
			console.log(
				"[Page/Schedule] Received all aggregated segments with color for KakaoMap:",
				JSON.parse(JSON.stringify(segmentsWithColor))
			);
		}
		setAllMapRouteSegments(segmentsWithColor);
	}, []); 


	return (
		<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd} >
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
							onUpdateAllRouteSegments={handleUpdateAllRouteSegments} // 콜백 함수 전달
						/>
						<DragBarStyle ref={dragBarRef}>
							<DragBar />
						</DragBarStyle>
					</S.ResizableContainer>
				</S.Main>
				<KakaoMap
					ref={mapRef}
					places={allPlacesForMap}
					routeSegments={allMapRouteSegments} // 집계된 경로 세그먼트 전달
				/>
			</S.Container>
		</DragDropContext>
	);
};

export default Schedule;