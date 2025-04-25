import { UtilsWrap } from './utils.style';
import Title from "./title";
import Util from "./util";

interface UtilProps {
    hideThresholdWidth?: number;
    currentWidth: number | string;
}

const Utils: React.FC<UtilProps> = ({
    hideThresholdWidth = 324,
    currentWidth
}) => {
    const showContent = typeof currentWidth === 'number'
        ? currentWidth > hideThresholdWidth
        : true;

    return (
        <UtilsWrap>
            {showContent && (
                <>
                    <Title />
                    <Util />
                </>
            )}
        </UtilsWrap>
    );
};

export default Utils;
