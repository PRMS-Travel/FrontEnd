import React from 'react';
import PlaceList from './placeList';
import { HeaderWrap, ScheduleWrap, SubTitleStlye, TimeSetWrap } from './schedule.style';

interface ScheduleProps {
    dayNumber: number;
}

const Schedule: React.FC<ScheduleProps> = ({ dayNumber }) => {
    return (
        <ScheduleWrap>
            <HeaderWrap>
                <h2>{dayNumber}일차</h2>
                <SubTitleStlye>2025.03.27</SubTitleStlye>
            </HeaderWrap>
            <TimeSetWrap>
                시간 설정 노출
            </TimeSetWrap>
            {/* 여기에 해당 날짜의 상세 일정 내용을 추가/구성할 수 있습니다. */}
            {/* 예: <AddPlaceButton day={dayNumber} /> */}
            <PlaceList day={dayNumber}/>
        </ScheduleWrap>
    );
};

export default Schedule;
