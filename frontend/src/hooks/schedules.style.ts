// c:\github\travel-repository\frontend\src\hooks\schedules.style.ts
import styled from "styled-components";

export const SchedulesWrap = styled.ul`
    width: max-content;
    display: flex;
    gap: 50px;
    flex-direction: row;
`

export const SchedulesBox = styled.div`
    overflow-x: scroll;
    padding-bottom: 30px;
    margin-left: 42px;
    margin-top: 84px;
    height: max-content;

    /* 스크롤바 전체 영역 */
    &::-webkit-scrollbar {
        height: 9px;
        background-color: #f5f5f5; /* 스크롤바 배경색 */
    }

    /* 스크롤바 트랙 (움직이는 부분이 없는 영역) */
    &::-webkit-scrollbar-track {
        border-radius: 100px;
        background: #F8F8F8;
    }

    /* 스크롤바 핸들 (움직이는 막대 부분) */
    &::-webkit-scrollbar-thumb {
        border-radius: 100px;
        background: #CACACA;
    }

    /* 스크롤바 핸들에 마우스를 올렸을 때 */
    &::-webkit-scrollbar-thumb:hover {
        background-color: #999999; /* 호버 시 핸들 배경색 */
    }
`
