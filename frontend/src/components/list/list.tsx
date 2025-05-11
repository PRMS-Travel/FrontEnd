
import * as S from './list.style';
import Marker from "../../assets/marker.svg?react";
import { useSearchBarStore } from "../../store/useSearchBar";
import {useFetchArea} from "../../hooks/useFetchArea";

export const List = () => {
	const { setLocation } = useSearchBarStore();
	const areas = useFetchArea();

	const handleSelectLocation = (place: string) => {
		setLocation(place);
	};

	return (
		<S.ListContainer>
			<S.ScrollWrapper>
				{areas.map((area) => (
					<S.LocationInfo key={area.code} onClick={() => handleSelectLocation(area.name)}>
						<Marker />
						<S.LocationText>
							<S.LocationTitle>{area.name}</S.LocationTitle>
						</S.LocationText>
					</S.LocationInfo>
				))}
			</S.ScrollWrapper>
		</S.ListContainer>
	);
};