import React, { useState, ChangeEvent } from 'react';
import { SearchWrap, SearchInput, SearchResult } from "./search.style";
import { FaPlus } from "react-icons/fa";
import { Place } from './util';
import Marker from '../assets/marker.svg?react';

interface SearchProps{
    onAddPlace: (place: Place) => void;
}

const dummy = [
    {
        name : "성산 일출봉",
        address : "대한민국 서귀포시 성산 일출봉",
        img : "/assets/images/test.png",
    },
    {
        name : "제주동문시장",
        address : "대한민국 제주특별자치도 제주시 특별자치도",
        img : "/assets/images/test.png",
    },
];

const Search: React.FC<SearchProps> = ({ onAddPlace }) => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 150);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const showResults = isFocused || inputValue.length > 0;
    
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
            {showResults && (
                <SearchResult>
                    <ul>
                        {
                            dummy
                                .filter(item => item.name.includes(inputValue) || item.address.includes(inputValue))
                                .map((item, index) => (
                                <li key={index}>
                                    <div className="resultArea">
                                        <img src={item.img} alt={item.name} />
                                        <div className="nameArea">
                                            <p className='placeName'>{item.name}</p>
                                            <p className='address'>{item.address}</p>
                                        </div>
                                    </div>
                                    <FaPlus onClick={() => onAddPlace(item)} style={{ cursor: 'pointer' }} />
                                </li>
                            ))
                        }
                        {dummy.filter(item => item.name.includes(inputValue) || item.address.includes(inputValue)).length === 0 && (
                            <li>검색 결과가 없습니다.</li>
                        )}
                    </ul>
                </SearchResult>
            )}
        </SearchWrap>
    )
}

export default Search;
