import styled from "styled-components";

export const ScheduleWrap = styled.li`
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const HeaderWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`

export const SubTitleStlye = styled.p`
    color: #7B7B7B;
    font-size: 10pt;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.3px;
`

export const TimeSetWrap = styled.div`
    width: 100%;
    height: 37.117px;
    flex-shrink: 0;
    border-radius: 4px;
    border: 1px solid #909090;
    background: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 9px;
    margin-bottom: 16px;
    position: relative;

    .timeSetStart{
        position: absolute;
        left: 31px;
        font-size: 14px;
    }

    input{
        border: 0;
        font-family: 'Inter';
        padding-left: 20px;
    }
`

export const TravelTimeLoadingStyle = styled.p`
    padding: 10px;
    text-align: center;
    color: #777;
    font-size: 0.9em;
`;