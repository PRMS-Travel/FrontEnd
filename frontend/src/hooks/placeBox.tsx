import { PlaceBoxWrap, PlaceBoxTitle, PlaceBoxArea, PlaceList } from "./placeBox.style";
import { Place } from './util';
import { FiMinus } from "react-icons/fi";
import { Droppable, Draggable } from '@hello-pangea/dnd';

interface PlaceBoxProps {
    places: Place[];
    onDeletePlace: (placeId: string) => void; 
}

const PlaceBox: React.FC<PlaceBoxProps> = ({ places, onDeletePlace }) => {
    return(
        <PlaceBoxWrap className="placeBox">
            <PlaceBoxTitle>장소보관함</PlaceBoxTitle>
            <Droppable droppableId="placeBox">
                {(provided, snapshot) => (
                    <PlaceBoxArea
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {places.length > 0 ? (
                            places.map((place, index) => (
                                <Draggable key={place.id} draggableId={place.id} index={index}>
                                    {(providedDraggable) => (
                                        <PlaceList
                                            ref={providedDraggable.innerRef}
                                            {...providedDraggable.draggableProps}
                                            {...providedDraggable.dragHandleProps}
                                            style={{
                                                ...providedDraggable.draggableProps.style,
                                            }}
                                        >
                                            <div className="itemWrap">
                                                <img src={place.img || '/assets/images/test.png'} alt={place.name} width="50" />
                                                <div className="textArea">
                                                    <p className="placeName">{place.name}</p>
                                                    <p className="address">{place.address}</p>
                                                </div>
                                        </div>
                                            <FiMinus onClick={() => onDeletePlace(place.id)} style={{ cursor: 'pointer' }} />
                                        </PlaceList>
                                    )}
                                </Draggable>
                            ))
                        ) : (
                            !snapshot.isDraggingOver
                            &&
                            <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>보관된 장소가 없습니다.</p>
                        )}
                        {provided.placeholder}
                    </PlaceBoxArea>
                )}
            </Droppable>
        </PlaceBoxWrap>
    )
}

export default PlaceBox;
