import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Header = styled.header`
    width: 100px;
    height: 100vh;
    border-right: 1px solid #D1D1D1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;

    .logo_wrap{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const Main = styled.main`
    display: flex;
`

export const ResizableContainer = styled.div`
    position: relative;
    height: 100%;
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    border-right: 2px solid #D1D1D1;
`;