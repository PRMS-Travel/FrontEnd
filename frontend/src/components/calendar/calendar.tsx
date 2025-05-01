import 'react-calendar/dist/Calendar.css';
import ReactCalendar from 'react-calendar';
import moment from 'moment';
import {useSearchBarStore} from "../../store/useSearchBar";

export const Calendar = () => {
	const {range, setRange}=useSearchBarStore();

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