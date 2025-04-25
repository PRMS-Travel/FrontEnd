import styled from "styled-components";

export const PlaceBoxWrap = styled.div`

`

export const PlaceBoxTitle = styled.h2`

`

export const PlaceBoxArea = styled.div`
    display: flex;
    width: 360px;
    min-height: 550px;
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
    background: #FFF;
    box-shadow: 0px 4px 8px 0px rgba(16, 24, 64, 0.08);
    padding: 12px;
    margin-top: 8px;

    ul{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
`

export const PlaceList = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .itemWrap{
        display: flex;
        gap: 10px;
    }

    .textArea{
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;

        .placeName{
        
        }

        .address{
            width: 197px;
            color: #BCC2CC;
            font-family: Inter;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            margin: 0;
        }
    }
    svg{
        cursor: pointer;
        color: #3D3E48;
    }
`