import { useState } from 'react';
import PlaceBox from "./placeBox";
import Search from "./search";
import { UtilWrap } from "./util.style";

export interface Place {
    name: string;
    address: string;
    img?: string;
}

const Util = () => {
    const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);

    const handleAddPlaceToBox = (place: Place) => {
        if (!savedPlaces.some(p => p.name === place.name && p.address === place.address)) {
            setSavedPlaces(prevPlaces => [...prevPlaces, place]);
            console.log("장소 추가됨:", place);
        } else {
            console.log("이미 추가된 장소:", place);
            // 사용자에게 알림을 주는 로직 추가해야함
        }
    };

    return (
        <UtilWrap>
            <Search onAddPlace={handleAddPlaceToBox} />
            <PlaceBox places={savedPlaces} />
        </UtilWrap>
    )
}

export default Util;
