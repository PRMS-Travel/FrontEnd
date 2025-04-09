import 'react-calendar/dist/Calendar.css';
import ReactCalendar from 'react-calendar';
import moment from 'moment';


export const Calendar = () => {
	return (
		<ReactCalendar   prev2Label={null}
		                 next2Label={null}
		                 calendarType="gregory"
		                 formatDay={(_locale, date) => moment(date).format("D")}



		/>
	);
};