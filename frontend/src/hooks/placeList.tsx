import React from "react";
import { PlaceListWrap } from "./placeList.style";

interface PlaceListProps {
    day: number;
}

const PlaceList: React.FC<PlaceListProps> = ({day}) => {
    return(
        <PlaceListWrap>
            {day}
        </PlaceListWrap>
    )
};

export default PlaceList;