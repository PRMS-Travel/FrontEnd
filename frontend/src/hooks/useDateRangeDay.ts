import {useSearchBarStore} from "../store/useSearchBar";


export const useCountDay = () => {
	const { range} = useSearchBarStore();
	if(!range) return 0;
	const [start, end] = range;
	const startDate= new Date(start)
	const endDate= new Date(end)

	const diff= Math.abs(endDate.getTime() - startDate.getTime());
	return Math.ceil(diff/(1000*60*60*24));
};