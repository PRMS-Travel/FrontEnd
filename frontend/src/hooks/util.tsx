import PlaceBox from "./placeBox";
import Search from "./search";
import { UtilWrap } from "./util.style";

export interface Place {
    id: string;
    name: string;
    address: string;
    img?: string;
    mapx: string;
    mapy: string;
    contentId?: string;
    contentTypeId?: string;
    dayNumber?: number; // 몇 일차 장소인지 나타내는 정보 (추가)
}

interface UtilProps {
    savedPlaces: Place[];
    onAddPlaceToSavedPlaces: (place: Place) => void;
    onDeletePlaceFromSavedPlaces: (placeId: string) => void;
}

const Util: React.FC<UtilProps> = ({ savedPlaces, onAddPlaceToSavedPlaces, onDeletePlaceFromSavedPlaces }) => {
    return (
        <UtilWrap>
            <Search onAddPlace={onAddPlaceToSavedPlaces} />
            <PlaceBox places={savedPlaces} onDeletePlace={onDeletePlaceFromSavedPlaces} />
        </UtilWrap>
    )
}

export default Util;
