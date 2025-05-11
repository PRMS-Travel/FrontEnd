import { TitleWrap, TitleH1, SubTitle } from "./title.style";
import {useSearchBarStore} from "../store/useSearchBar";

const Title = () => {
  const { range,location } = useSearchBarStore();
  const formatRange = () => {
    if (!range) return "";
    const [start, end] = range;
    return `${start.toLocaleDateString()} ~ ${end.toLocaleDateString()}`;
  };

    return (
        <TitleWrap>
            <TitleH1>{location}</TitleH1>
            <SubTitle>{formatRange()}</SubTitle>
        </TitleWrap>
    )
}

export default Title;