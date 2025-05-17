import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { PlaceListWrap, PlaceItemStyle, TravelTimeStyle } from "./placeList.style";
import { Place } from "./util";
import { FiTrash2 } from "react-icons/fi";
import { TravelDuration } from "./schedule";
import { addMinutesToTime } from "../utils/time";

interface PlaceListProps {
    places: Place[];
    droppableId: string;
    onDeleteItem?: (placeId: string) => void;
    travelDurations?: TravelDuration[];
    startTime?: string;
}

const PlaceList: React.FC<PlaceListProps> = ({ places, droppableId, onDeleteItem, travelDurations, startTime }) => {
    // 도착 시간을 미리 계산하는 로직
    const arrivalTimes: { [key: string]: string } = {};

    if (places.length > 0 && startTime) {
        let currentAccumulatedTime = startTime;
        arrivalTimes[places[0].id] = startTime; // 첫 번째 장소의 도착 시간은 시작 시간

        for (let i = 0; i < places.length - 1; i++) {
            const currentPlace = places[i];
            const nextPlaceInSequence = places[i+1];

            if (currentAccumulatedTime === "??:??") { // 이전 시간 계산이 실패했다면 이후도 실패 처리
                arrivalTimes[nextPlaceInSequence.id] = "??:??";
                currentAccumulatedTime = "??:??";
                continue;
            }

            const travelToNext = travelDurations?.find(
                td => td.fromPlaceId === currentPlace.id && td.toPlaceId === nextPlaceInSequence.id
            );

            if (travelToNext && travelToNext.durationInMinutes !== null) {
                currentAccumulatedTime = addMinutesToTime(currentAccumulatedTime, travelToNext.durationInMinutes);
                arrivalTimes[nextPlaceInSequence.id] = currentAccumulatedTime;
            } else {
                arrivalTimes[nextPlaceInSequence.id] = "??:??";
                currentAccumulatedTime = "??:??";
            }
        }
    }

    return (
        <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
                <PlaceListWrap
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    $isDraggingOver={snapshot.isDraggingOver}
                >
                    {places.length > 0 ? (
                        places.map((place, index) => {
                            const arrivalAtThisPlace = arrivalTimes[place.id] || (index === 0 && startTime ? startTime : "??:??");
                            const travelInfoToNext = (index < places.length - 1) ? travelDurations?.find(td => td.fromPlaceId === place.id && td.toPlaceId === places[index+1].id) : null;

                            return (
                                <React.Fragment key={place.id}>
                                    <Draggable draggableId={place.id} index={index}>
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
                                                    <p style={{ margin: 0, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                                        {place.name}
                                                        {startTime && (
                                                            <span style={{ fontSize: '0.8em', color: '#007bff', marginLeft: '8px', fontWeight: 'normal' }}>
                                                                (도착: {arrivalAtThisPlace})
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p style={{ margin: 0, fontSize: '0.8em', color: '#666' }}>{place.address}</p>
                                                </div>
                                                {onDeleteItem && (
                                                    <FiTrash2 onClick={() => onDeleteItem && onDeleteItem(place.id)} style={{ marginLeft: '10px', cursor: 'pointer', color: '#cc0000' }} />
                                                )}
                                            </PlaceItemStyle>
                                        )}
                                    </Draggable>
                                    {travelInfoToNext && (index < places.length - 1) && (
                                        <TravelTimeStyle>
                                            {travelInfoToNext.error ? (
                                                `↡ 이동 시간: ${travelInfoToNext.error}`
                                            ) : travelInfoToNext.durationInMinutes !== null ? (
                                                `↡ 이동 시간: 약 ${travelInfoToNext.durationInMinutes}분 소요`
                                            ) : (
                                                `↡ 이동 시간: 이동 시간 계산 중...`
                                            )}
                                        </TravelTimeStyle>
                                    )}
                                </React.Fragment>
                            );
                        })
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