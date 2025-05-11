export const getDateForDay=(startDate:Date, dayOffset:number):string=>{
const date=new Date(startDate);
date.setDate(date.getDate() + dayOffset-1);
	const year = date.getFullYear();
	const month = `${date.getMonth() + 1}`.padStart(2, '0');
	const day = `${date.getDate()}`.padStart(2, '0');
	return `${year}.${month}.${day}`;
}