import React, { useEffect, useState, useMemo, useRef } from 'react'; // useMemo, useRef 임포트
import PlaceList from './placeList';
import { HeaderWrap, ScheduleWrap, SubTitleStlye, TimeSetWrap, TravelTimeLoadingStyle } from './schedule.style'; // TimeSetWrap 임포트
import { Place } from './util';
import { getDateForDay } from "../utils/date";
// import { getRouteTime, Position, generateTmapStaticMapUrl } from '../api/tmap.api'; // TMAP API 관련 함수 및 타입 임포트 (주석 처리 또는 삭제)
import { getKakaoDirections, KakaoNaviCoord } from '../api/kakao.mobility.api'; // 카카오내비 API 임포트

// 소요 시간 정보 타입을 정의합니다.
export interface TravelDuration {
    fromPlaceId: string; // 출발지 ID
    toPlaceId: string;   // 도착지 ID
    durationInMinutes: number | null;
    routeCoordinates?: KakaoNaviCoord[]; // 카카오내비 API에서 받은 경로 좌표
    error?: string;
}

interface ScheduleProps {
    dayNumber: number;
    startDate:Date | undefined;
    placesForDay: Place[];
    onDeletePlace: (placeId: string) => void;
    // 부모에게 계산된 세그먼트와 해당 dayKey를 전달하는 콜백
    onRouteSegmentsCalculated?: (segments: KakaoNaviCoord[][]) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ dayNumber,startDate, placesForDay, onDeletePlace, onRouteSegmentsCalculated }) => {
    const [startTime, setStartTime] = useState<string>("11:30");
    const [travelDurations, setTravelDurations] = useState<TravelDuration[]>([]);
    const [isLoadingTravelTimes, setIsLoadingTravelTimes] = useState<boolean>(false);

    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(event.target.value);
    };

    useEffect(() => {
        const fetchTravelTimes = async () => {
            if (placesForDay.length < 2) {
                setTravelDurations([]);
                return;
            }

            setIsLoadingTravelTimes(true);
            const newDurations: TravelDuration[] = [];

            for (let i = 0; i < placesForDay.length - 1; i++) {
                const startPlace = placesForDay[i];
                const endPlace = placesForDay[i + 1];

                const startLon = parseFloat(startPlace.mapx);
                const startLat = parseFloat(startPlace.mapy);
                const endLon = parseFloat(endPlace.mapx);
                const endLat = parseFloat(endPlace.mapy);

                if (isNaN(startLat) || isNaN(startLon) || isNaN(endLat) || isNaN(endLon)) {
                    console.warn(`[${dayNumber}일차] ${startPlace.name} 또는 ${endPlace.name}의 좌표값이 유효하지 않습니다.`);
                    newDurations.push({
                        fromPlaceId: startPlace.id,
                        toPlaceId: endPlace.id,
                        durationInMinutes: null,
                        routeCoordinates: undefined,
                        // staticMapUrl: undefined,
                        error: "좌표 오류",
                    });
                    continue;
                }

                const directionsResult = await getKakaoDirections(
                    startPlace.mapx,
                    startPlace.mapy,
                    endPlace.mapx,
                    endPlace.mapy
                );

                newDurations.push({
                    fromPlaceId: startPlace.id,
                    toPlaceId: endPlace.id,
                    durationInMinutes: directionsResult.durationInMinutes,
                    routeCoordinates: directionsResult.routeCoordinates,
                    error: directionsResult.error,
                });
            }
            setTravelDurations(newDurations);
            setIsLoadingTravelTimes(false);
        };

        fetchTravelTimes();
    }, [placesForDay, dayNumber]);

    // KakaoMap에 동적으로 경로를 그릴 경우 사용될 수 있는 로직입니다.
    // 정적 지도 이미지가 주된 경로 표시 방법이라면 이 부분은 다른 용도로 사용되거나 제거될 수 있습니다.
    const routeSegmentsForMap: KakaoNaviCoord[][] = useMemo(() => {
        return travelDurations
            .map(td => td.routeCoordinates)
            .filter((coords): coords is KakaoNaviCoord[] => !!coords && coords.length > 1);
    }, [travelDurations]); // Only recompute if travelDurations changes

    const prevRouteSegmentsForMapRef = useRef<KakaoNaviCoord[][] | undefined>(undefined);

    useEffect(() => {
        if (onRouteSegmentsCalculated) { // 이 prop이 있다면, 계산된 경로 세그먼트를 상위로 전달
            const currentSegmentsStr = JSON.stringify(routeSegmentsForMap);
            const prevSegmentsStr = JSON.stringify(prevRouteSegmentsForMapRef.current);

            // routeSegmentsForMap의 실제 내용이 변경되었을 때만 콜백 호출
            if (currentSegmentsStr !== prevSegmentsStr) {
                if (import.meta.env.NODE_ENV === 'development') {
                    console.log(`[Schedule ${dayNumber}일차] onRouteSegmentsCalculated 호출 (내용 변경), 데이터:`, JSON.parse(JSON.stringify(routeSegmentsForMap)));
                }
                onRouteSegmentsCalculated(routeSegmentsForMap); // 경로 좌표 배열의 배열만 전달
                prevRouteSegmentsForMapRef.current = routeSegmentsForMap;
            }
        }
    }, [routeSegmentsForMap, onRouteSegmentsCalculated, dayNumber]); // dayNumber는 이제 콜백 시그니처에서 빠짐

    return (
        <ScheduleWrap>
            <HeaderWrap>
                <h2>{dayNumber}일차</h2>
                <SubTitleStlye>  {startDate ? getDateForDay(startDate, dayNumber) : '날짜 없음'}</SubTitleStlye>
            </HeaderWrap>
            <TimeSetWrap>
                <span className='timeSetStart'>출발 시간 :</span>
                <input type="time" value={startTime} onChange={handleStartTimeChange} />
            </TimeSetWrap>
            {isLoadingTravelTimes && <TravelTimeLoadingStyle>이동 시간 계산 중...</TravelTimeLoadingStyle>}
            <PlaceList
                droppableId={`day-${dayNumber}`}
                places={placesForDay}
                onDeleteItem={onDeletePlace}
                travelDurations={travelDurations}
                startTime={startTime}
            />
        </ScheduleWrap>
    );
};

export default Schedule;