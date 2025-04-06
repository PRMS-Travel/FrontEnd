
import * as S from "./searchBar.style"
import Search from "../../assets/serch.svg?react"
import Marker from "../../assets/marker.svg?react"
import React from "react";
import {INTRO_MESSAGES} from "../../constants/introConstant";
import {CustomDivider} from "./searchBar.style";

export interface SearchBarProps extends React.HTMLAttributes<HTMLInputElement> {
	type:'location'| 'date' |'destination'
}

export const SearchBar = ({ type }: SearchBarProps) => {
	return (
		<S.SearchBarContainer>
			<Marker />
			<S.Input
				placeholder={INTRO_MESSAGES.DESTINATION_PLACEHOLDER}
				readOnly={type === 'date'}
			/>
			<CustomDivider/>
			<S.Input placeholder={INTRO_MESSAGES.TRAVEL_DATE_PLACEHOLDER}/>
			<Search />
		</S.SearchBarContainer>
	);
};