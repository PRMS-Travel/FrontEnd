import * as S from "./searchBar.style"
import Search from "../../assets/serch.svg?react"
import Marker from "../../assets/marker.svg?react"
import React, {useEffect} from "react";
import {INTRO_MESSAGES} from "../../constants/introConstant";
import {CustomDivider} from "./searchBar.style";
import {useSearchBarStore} from "../../store/useSearchBar";
import {useNavigate} from "react-router-dom";


export interface SearchBarProps extends React.HTMLAttributes<HTMLInputElement> {
	type: 'location' | 'date' | 'destination';
	onToggleModal: (type: 'location' | 'date' | 'destination') => void;
}

export const SearchBar = ({ type, onToggleModal }: SearchBarProps) => {
	const { range,location } = useSearchBarStore();
	const nav=useNavigate()
	const formatRange = () => {
		if (!range) return "";
		const [start, end] = range;
		return `${start.getFullYear()}.${start.getMonth() + 1}.${start.getDate()} - ${end.getFullYear()}.${end.getMonth() + 1}.${end.getDate()}`;
	};
	useEffect(() => {
		if(range && range[0] && range[1]){
			onToggleModal('date')}
	}, [range]);
	useEffect(() => {
		if (location !== '') {
			onToggleModal('location');
		}
	}, [location]);
	return (
		<S.SearchBarContainer>
			<Marker />
			<S.Input
				placeholder={INTRO_MESSAGES.DESTINATION_PLACEHOLDER}
				readOnly={type === 'location'}
				value={location}
				onClick={() => onToggleModal('location')}
			/>
			<CustomDivider />
			<S.Input
				placeholder={INTRO_MESSAGES.TRAVEL_DATE_PLACEHOLDER}
				value={formatRange()}
				readOnly={type === 'date'}
				onClick={() => onToggleModal('date')}
			/>
			<Search onClick={() => nav("/schedule")}/>
		</S.SearchBarContainer>
	);
};