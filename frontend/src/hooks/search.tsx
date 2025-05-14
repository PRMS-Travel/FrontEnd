import React, { useState, ChangeEvent, useEffect } from 'react';
import { SearchWrap, SearchInput, SearchResult } from "./search.style";
import { FaPlus } from "react-icons/fa";
import { Place } from './util';
import Marker from '../assets/marker.svg?react';
import { tourAPI, AreaBasedListItem } from '../api/tour.api';
import useDebounce from './useDebounce';

interface SearchProps{
    onAddPlace: (place: Place) => void;
}

const convertToPlace = (item: AreaBasedListItem): Place => {
    return {
        id: item.contentid ? String(item.contentid) : `custom-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: item.title || "이름 정보 없음",
        address: item.addr1,
        img: item.firstimage || item.firstimage2 || '/assets/images/test.png', // API 응답에 따라 firstimage가 우선일 수 있음
        mapx: item.mapx,
        mapy: item.mapy,
    };
};

const Search: React.FC<SearchProps> = ({ onAddPlace }) => {

    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [searchResults, setSearchResults] = useState<AreaBasedListItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const debouncedSearchTerm = useDebounce(inputValue, 500);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 150);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const currentInputValue = event.target.value;
        setInputValue(currentInputValue);
        // 입력 중에는 로딩 상태를 즉시 표시하지 않음
        // setIsLoading(true);
    };

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsLoading(true);
            tourAPI.searchKeyword({
                keyword: debouncedSearchTerm,
                areaCode: 39,   // 임시로 제주도 지역 코드 활용
                pageNo: 1,
                numOfRows: 20,
            })
            .then(results => setSearchResults(results.results))
            .catch(error => {
                console.error("Search API error:", error);
                setSearchResults([]); // 에러 발생 시 결과 초기화
            })
            .finally(() => setIsLoading(false));
        } else {
            setSearchResults([]); // 디바운스된 검색어가 없으면 결과 초기화
        }
    }, [debouncedSearchTerm]);

    const shouldRenderResultsContainer = isFocused || inputValue.length > 0;

    return (
        <SearchWrap>
            <div className='searchArea'>
                <SearchInput
                    type="search"
                    name="search-input"
                    placeholder="장소명을 입력해주세요."
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <Marker />
            </div>
            {shouldRenderResultsContainer && (
                <SearchResult>
                    <ul>
                        {isLoading ? (
                            <li>검색 중...</li>
                        ) : searchResults.length > 0 ? (
                            searchResults.map((item, index) => (
                                <li key={`${item.contentid}-${index}`}>
                                    <div className="resultArea">
                                        <img
                                            src={item.firstimage2 || item.firstimage || '/assets/images/test.png'}
                                            alt={item.title}
                                            onError={(e) => (e.currentTarget.src = '/assets/images/test.png')}
                                        />
                                        <div className="nameArea">
                                            <p className='placeName'>{item.title}</p>
                                            <p className='address'>{item.addr1}</p>
                                        </div>
                                    </div>
                                    <FaPlus onClick={() => onAddPlace(convertToPlace(item))} style={{ cursor: 'pointer' }} />
                                </li>
                            ))
                        ) : inputValue && !isLoading ? (
                            <li>검색 결과가 없습니다.</li>
                        ) : null}
                    </ul>
                </SearchResult>
            )}
        </SearchWrap>
    )
}

export default Search;
