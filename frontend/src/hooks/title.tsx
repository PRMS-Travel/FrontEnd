import { TitleWrap, TitleH1, SubTitle } from "./title.style";
import {useSearchBarStore} from "../store/useSearchBar";

const Title = () => {
  const { range,location } = useSearchBarStore();
  const formatRange=()=> {
    if (!range) return "";
    const [start, end] = range;
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.getFullYear()}.${startDate.getMonth() + 1}.${startDate.getDate()} - ${endDate.getFullYear()}.${endDate.getMonth() + 1}.${endDate.getDate()}`;
  };

    return (
        <TitleWrap>
            <TitleH1>{location}</TitleH1>
            <SubTitle>{formatRange()}</SubTitle>
        </TitleWrap>
    )
}

export default Title;