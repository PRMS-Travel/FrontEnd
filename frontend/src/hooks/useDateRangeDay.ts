import {useSearchBarStore} from "../store/useSearchBar";


export const useCountDay = () => {
	const { range} = useSearchBarStore();
	if(!range) return 0;
	const [start, end] = range;
	const diff= Math.abs(end.getTime() - start.getTime());
	return Math.ceil(diff/(1000*60*60*24));
};