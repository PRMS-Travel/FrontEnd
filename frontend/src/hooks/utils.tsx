import { UtilsWrap } from './utils.style';
import Title from "./title";
import Util from "./util";
import { Place } from './util';

interface UtilProps {
    hideThresholdWidth?: number;
    currentWidth: number | string;
    savedPlaces: Place[];
    onAddPlaceToSavedPlaces: (place: Place) => void;
    onDeletePlaceFromSavedPlaces: (placeId: string) => void;
}

const Utils: React.FC<UtilProps> = ({
    hideThresholdWidth = 324,
    currentWidth,
    savedPlaces,
    onAddPlaceToSavedPlaces,
    onDeletePlaceFromSavedPlaces,
}) => {
    const showContent = typeof currentWidth === 'number'
        ? currentWidth > hideThresholdWidth
        : true;

    return (
        <UtilsWrap>
            {showContent && (
                <>
                    <Title />
                    <Util
                        savedPlaces={savedPlaces}
                        onAddPlaceToSavedPlaces={onAddPlaceToSavedPlaces}
                        onDeletePlaceFromSavedPlaces={onDeletePlaceFromSavedPlaces}
                    />
                </>
            )}
        </UtilsWrap>
    );
};

export default Utils;
