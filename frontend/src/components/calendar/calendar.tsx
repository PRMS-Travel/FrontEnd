import 'react-calendar/dist/Calendar.css';
import ReactCalendar from 'react-calendar';
import moment from 'moment';
import {useState} from "react";

export const Calendar = () => {
	const [range, setRange] = useState<[Date, Date] | null>(null);

	const onChange = (value: any) => {
		setRange(value);
	};

	return (
		<ReactCalendar
			onChange={onChange}
			value={range}
			selectRange={true}
			prev2Label={null}
			next2Label={null}
			calendarType="gregory"
			formatDay={(_, date) => moment(date).format("D")}
			tileClassName={({ date, view }) => {
				if (range && view === 'month') {
					const [start, end] = range;

					const isSameDay = (a: Date, b: Date) => moment(a).isSame(b, 'day');
					const isInRange = moment(date).isBetween(start, end, 'day', '[]');

					if (isSameDay(date, start)) return 'range-start';
					if (isSameDay(date, end)) return 'range-end';
					if (isInRange) return 'range-middle';
				}
				return '';
			}}
		/>
	);
};


// import { useState } from "react";

// import {DayRange } from "@hassanmojab/react-modern-calendar-datepicker";
// import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
//
// export const Calendar = () => {
// 	const [selectedDayRange, setSelectedDayRange] = useState<DayRange>({
// 		from: undefined,
// 		to: undefined,
// 	});
//
// 	return (
// 		<div>
// 			<DatePicker
// 				value={selectedDayRange ?? { from: undefined, to: undefined }} // ✅ fallback 보장
// 				onChange={setSelectedDayRange}
// 				shouldHighlightWeekends
// 				inputPlaceholder="Select a range"
// 				colorPrimary="#122840"
// 				calendarClassName="my-custom-calendar"
// 			/>
// 		</div>
// 	);
// };



