import * as S from './list.style';
import Marker from "../../assets/marker.svg?react";


export const List = () => {
	return (
		<S.ListContainer>
			<S.LocationInfo>
				<Marker />
				<S.LocationText>
					<S.LocationTitle>제주도</S.LocationTitle>
					<S.LocationSubTitle>한국</S.LocationSubTitle>
				</S.LocationText>
			</S.LocationInfo>
			<S.LocationInfo>
				<Marker />
				<S.LocationText>
					<S.LocationTitle>제주도</S.LocationTitle>
					<S.LocationSubTitle>한국</S.LocationSubTitle>
				</S.LocationText>
			</S.LocationInfo>
		</S.ListContainer>
	);
};