import React from 'react';
import Schedule from './schedule';
import { SchedulesBox, SchedulesWrap } from './schedules.style';

interface SchedulesProps {
    numberOfDays: number;
}

const Schedules: React.FC<SchedulesProps> = ({ numberOfDays }) => {

    const daysCount = Math.max(0, numberOfDays);

    const daysArray = Array.from({ length: daysCount }, (_, index) => index + 1);

    return (
        <SchedulesBox>
            {daysArray.length > 0 ? (
                <SchedulesWrap>
                {daysArray.map((day) => (
                    <Schedule key={day} dayNumber={day} />
                ))}
                </SchedulesWrap>
            ) : (
                <p>날짜가 선택되지 않았습니다.</p>
            )}
        </SchedulesBox>
    );
};

export default Schedules;
