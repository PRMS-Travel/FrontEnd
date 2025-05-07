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

    &::-webkit-scrollbar {
        height: 9px;
        background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-track {
        border-radius: 100px;
        background: #F8F8F8;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 100px;
        background: #CACACA;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #999999;
    }
`
