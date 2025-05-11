import React from 'react';
import Schedule from './schedule';
import { SchedulesBox, SchedulesWrap } from './schedules.style';
import { Place } from './util';

interface SchedulesProps {
    numberOfDays: number;
    daySchedules: Record<string, Place[]>;
    onDeletePlaceFromDay: (dayKey: string, placeId: string) => void;
}

const Schedules: React.FC<SchedulesProps> = ({ numberOfDays, daySchedules, onDeletePlaceFromDay }) => {
    const daysCount = Math.max(0, numberOfDays);
    const daysArray = Array.from({ length: daysCount }, (_, index) => index + 1);

    return (
        <SchedulesBox>
            {daysArray.length > 0 ? (
                <SchedulesWrap>
                {daysArray.map((day) => (
                    <Schedule
                        key={day}
                        dayNumber={day}
                        placesForDay={daySchedules[`day-${day}`] || []}
                        onDeletePlace={(placeId) => onDeletePlaceFromDay(`day-${day}`, placeId)}
                    />
                ))}
                </SchedulesWrap>
            ) : (
                <p>날짜가 선택되지 않았습니다.</p>
            )}
        </SchedulesBox>
    );
};

export default Schedules;