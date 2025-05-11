import React from 'react';
import PlaceList from './placeList';
import { HeaderWrap, ScheduleWrap, SubTitleStlye, TimeSetWrap } from './schedule.style';
import { Place } from './util';

interface ScheduleProps {
    dayNumber: number;
    placesForDay: Place[];
    onDeletePlace: (placeId: string) => void; // 해당 날짜에서 장소 삭제 핸들러
}

const Schedule: React.FC<ScheduleProps> = ({ dayNumber, placesForDay, onDeletePlace }) => {
    return (
        <ScheduleWrap>
            <HeaderWrap>
                <h2>{dayNumber}일차</h2>
                <SubTitleStlye>2025.03.27</SubTitleStlye>
            </HeaderWrap>
            <TimeSetWrap>
                <span className='timeSetStart'>시작</span>
                <input type="time" value="11:30" />
            </TimeSetWrap>

            <PlaceList
                droppableId={`day-${dayNumber}`}
                places={placesForDay}
                onDeleteItem={onDeletePlace} // PlaceList의 onDeleteItem prop으로 전달
            />
        </ScheduleWrap>
    );
};

export default Schedule;
