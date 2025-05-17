import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'; // useCallback, useMemo, useRef 임포트
import Schedule from './schedule';
import { SchedulesBox, SchedulesWrap } from './schedules.style';
import { Place } from './util';
import {useSearchBarStore} from "../store/useSearchBar";
import { KakaoNaviCoord } from '../api/kakao.mobility.api';
import { getColorForDay } from '../utils/colors'; // 색상 유틸리티 임포트
import { RouteSegmentWithColor } from '../pages/schdule/schedule'; // 타입 임포트


interface SchedulesProps {
    numberOfDays: number;
    daySchedules: Record<string, Place[]>;
    onDeletePlaceFromDay: (dayKey: string, placeId: string) => void;
    onUpdateAllRouteSegments: (allSegments: RouteSegmentWithColor[]) => void; // 타입 변경

}

const Schedules: React.FC<SchedulesProps> = ({
    numberOfDays,
    daySchedules,
    onDeletePlaceFromDay,
    onUpdateAllRouteSegments,
    
}) => {
    const daysCount = Math.max(0, numberOfDays);
    const daysArray = Array.from({ length: daysCount }, (_, index) => index + 1);
    const { range} = useSearchBarStore();

    // Memoize the default empty array to provide a stable reference
    const defaultEmptyPlaces = useMemo(() => [], []);

    // State to hold segments calculated by each Schedule instance
    // Key: dayKey (e.g., "day-1"), Value: KakaoNaviCoord[][] for that day
    // 이제 각 세그먼트에 색상 정보도 포함합니다.
    const [segmentsByDay, setSegmentsByDay] = useState<Record<string, RouteSegmentWithColor[]>>({});


    // Callback for each Schedule component to report its calculated segments
    const handleRouteSegmentsForDay = useCallback((dayKey: string, dayNumber: number, segments: KakaoNaviCoord[][]) => {
        const dayColor = getColorForDay(dayNumber);
        const segmentsWithColor: RouteSegmentWithColor[] = segments.map(segmentCoords => ({
            coordinates: segmentCoords,
            color: dayColor,
        }));
        if (import.meta.env.NODE_ENV === 'development') {
            console.log(`[Schedules] Received segments for ${dayKey} (Day ${dayNumber}, Color ${dayColor}):`, JSON.parse(JSON.stringify(segmentsWithColor)));
        }
        setSegmentsByDay(prev => ({
            ...prev,
            [dayKey]: segmentsWithColor,
        }));
    }, []); // setSegmentsByDay는 안정적이므로 의존성 배열이 비어있어도 됩니다.


    // When segmentsByDay (segments from individual days) changes,
    // aggregate all segments.
    const allAggregatedSegments = useMemo(() => {
        if (import.meta.env.NODE_ENV === 'development') {
            // console.log("[Schedules] Recalculating allAggregatedSegments based on segmentsByDay:", JSON.parse(JSON.stringify(segmentsByDay)));
        }
        return Object.values(segmentsByDay).flat();
    }, [segmentsByDay]);

    const prevAggregatedSegmentsRef = useRef<RouteSegmentWithColor[] | undefined>(undefined);

    // onUpdateAllRouteSegments 함수 자체는 부모로부터 useCallback으로 메모이징되어 전달됩니다.
    // allAggregatedSegments는 useMemo로 segmentsByDay가 변경될 때만 새 참조를 갖습니다.
    // 여기서 루프가 발생한다면, allAggregatedSegments의 내용이 실제로 계속 변경되거나,
    // 부모의 setAllMapRouteSegments 호출이 다시 Schedules의 props를 변경시켜 segmentsByDay를 바꾸는 경우입니다.
    useEffect(() => {
        const currentSegmentsStr = JSON.stringify(allAggregatedSegments);
        const prevSegmentsStr = JSON.stringify(prevAggregatedSegmentsRef.current);

        // 문자열 비교를 통해 실제 내용이 변경되었는지 확인
        if (currentSegmentsStr !== prevSegmentsStr) {
            if (import.meta.env.NODE_ENV === 'development') {
                console.log("[Schedules] 이전과 다른 allAggregatedSegments로 onUpdateAllRouteSegments 호출:", JSON.parse(JSON.stringify(allAggregatedSegments)));
            }
            onUpdateAllRouteSegments(allAggregatedSegments);
            // prevAggregatedSegmentsRef.current를 업데이트하여 다음 비교에 사용
            // 주의: allAggregatedSegments가 빈 배열([])로 시작하고, API 호출 후 실제 데이터로 채워지는 경우,
            // 이 로직은 초기 빈 배열 -> 실제 데이터로 변경될 때 onUpdateAllRouteSegments를 호출합니다.
            // 이것이 의도된 동작인지 확인해야 합니다.
            prevAggregatedSegmentsRef.current = allAggregatedSegments;
        }
    }, [allAggregatedSegments, onUpdateAllRouteSegments]);

    return (
        <SchedulesBox>
            {daysArray.length > 0 ? (
                <SchedulesWrap>
                {daysArray.map((day) => {
                    const dayKey = `day-${day}`;
                    const currentPlacesForDay = daySchedules[dayKey] || defaultEmptyPlaces;
                    return (
                        <Schedule
                            key={day}
                            startDate={range?.[0]}
                            dayNumber={day}
                            placesForDay={currentPlacesForDay}
                            onDeletePlace={(placeId) => onDeletePlaceFromDay(dayKey, placeId)}
                            onRouteSegmentsCalculated={(segments) => handleRouteSegmentsForDay(dayKey, day, segments)}

                        />
                    );
                })}
                </SchedulesWrap>
            ) : (
                <p>날짜가 선택되지 않았습니다.</p>
            )}
        </SchedulesBox>
    );
};

export default Schedules;