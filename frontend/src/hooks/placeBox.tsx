import { PlaceBoxWrap, PlaceBoxTitle, PlaceBoxArea, PlaceList } from "./placeBox.style";
import { Place } from './util';
import { FiMinus } from "react-icons/fi";

interface PlaceBoxProps {
    places: Place[];
}

const onDeletePlace = (place: Place) => {
    console.log("장소 삭제됨:", place);
}

const PlaceBox: React.FC<PlaceBoxProps> = ({ places }) => {
    return(
        <PlaceBoxWrap className="placeBox">
            <PlaceBoxTitle>장소보관함</PlaceBoxTitle>
            <PlaceBoxArea>
                {places.length > 0 ? (
                    <ul>
                        {places.map((place, index) => (
                            <PlaceList key={`${index}-${place.name}`}>
                                <div className="itemWrap">
                                    <img src={place.img} alt={place.name} width="50" />
                                    <div className="textArea">
                                        <p className="placeName">{place.name}</p>
                                        <p className="address">{place.address}</p>
                                    </div>
                                </div>
                                <FiMinus onClick={() => onDeletePlace(place)} />
                                {/* 삭제 기능 추가해야함 */}
                            </PlaceList>
                        ))}
                    </ul>
                ) : (
                    <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>보관된 장소가 없습니다.</p>
                )}
            </PlaceBoxArea>
        </PlaceBoxWrap>
    )
}

export default PlaceBox;
