import * as S from "./searchBar.style"
import Search from "../../assets/serch.svg?react"
import Marker from "../../assets/marker.svg?react"
import React from "react";
import {INTRO_MESSAGES} from "../../constants/introConstant";
import {CustomDivider} from "./searchBar.style";

// SearchBar.tsx
export interface SearchBarProps extends React.HTMLAttributes<HTMLInputElement> {
	type: 'location' | 'date' | 'destination';
	onToggleModal: (type: 'location' | 'date' | 'destination') => void;
}

export const SearchBar = ({ type, onToggleModal }: SearchBarProps) => {
	return (
		<S.SearchBarContainer>
			<Marker />
			<S.Input
				placeholder={INTRO_MESSAGES.DESTINATION_PLACEHOLDER}
				readOnly={type === 'date'}
				onClick={() => onToggleModal('location')}
			/>
			<CustomDivider />
			<S.Input
				placeholder={INTRO_MESSAGES.TRAVEL_DATE_PLACEHOLDER}
				onClick={() => onToggleModal('date')}
			/>
			<Search />
		</S.SearchBarContainer>
	);
};