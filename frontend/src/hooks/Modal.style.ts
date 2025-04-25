import styled from "styled-components";
import { ModalProps } from "./Modal";

export const ModalWrap = styled.div<ModalProps>`
    position: fixed;
    width: 100%;
    height: 100%;
    display: ${({$view}) => $view ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    z-index: 30000;
    background: rgba(0, 0, 0, 0.70);
    text-align: center;
`

export const ModalBox = styled.div`
    width: 481px;
    height: 195px;
    border-radius: 20px;
    background: #FFF;
    padding: 8px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    svg{
        position: absolute;
        top: 8px;
        right: 8px;
        cursor: pointer;
    }

    a{
        text-decoration: none;
        color: #009DFF;
        position: absolute;
        bottom: 24px;
    }
`