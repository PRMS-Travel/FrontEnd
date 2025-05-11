import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { PlaceListWrap, PlaceItemStyle } from "./placeList.style";
import { Place } from "./util";
import { FiTrash2 } from "react-icons/fi";

interface PlaceListProps {
    places: Place[];
    droppableId: string;
    onDeleteItem?: (placeId: string) => void; // 일정에서 장소 삭제 핸들러
}

const PlaceList: React.FC<PlaceListProps> = ({ places, droppableId, onDeleteItem }) => {
    return (
        <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
                <PlaceListWrap
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    $isDraggingOver={snapshot.isDraggingOver}
                >
                    {places.length > 0 ? (
                        places.map((place, index) => (
                            <Draggable key={place.id} draggableId={place.id} index={index}>
                                {(providedDraggable, snapshotDraggable) => (
                                    <PlaceItemStyle
                                        ref={providedDraggable.innerRef}
                                        {...providedDraggable.draggableProps}
                                        {...providedDraggable.dragHandleProps}
                                        $isDragging={snapshotDraggable.isDragging}
                                        style={{ ...providedDraggable.draggableProps.style }}
                                    >
                                        <img src={place.img || '/assets/images/test.png'} alt={place.name} width="40" height="40" style={{ marginRight: '10px', borderRadius: '4px' }} />
                                        <div style={{ flexGrow: 1 }}>
                                            <p style={{ margin: 0, fontWeight: 'bold' }}>{place.name}</p>
                                            <p style={{ margin: 0, fontSize: '0.8em', color: '#666' }}>{place.address}</p>
                                        </div>
                                        {onDeleteItem && (
                                            <FiTrash2 onClick={() => onDeleteItem(place.id)} style={{ marginLeft: '10px', cursor: 'pointer', color: '#cc0000' }} />
                                        )}
                                    </PlaceItemStyle>
                                )}
                            </Draggable>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', color: '#999', marginTop: '20px', display: snapshot.isDraggingOver ? 'none' : 'block' }}>
                            {snapshot.isDraggingOver ? '여기에 장소를 드롭하세요!' : '드롭하여 장소를 추가하세요.'}
                        </p>
                    )}
                    {provided.placeholder}
                </PlaceListWrap>
            )}
        </Droppable>
    );
};

export default PlaceList;