import { css } from "@emotion/react";

export const GlobalStyles = css`
    @font-face {
        font-family: "Inter";
        src: url('/assets/fonts/Inter-Medium.woff2') format('woff2');
        font-weight: 500;
        font-style: normal;
    }
    @font-face {
        font-family: "Inter";
        src: url("/assets/fonts/Inter-Bold.woff2") format("woff2");
        font-weight: 700;
        font-style: normal;
    }
    @font-face {
        font-family: "Inter";
        src: url("/assets/fonts/Inter-SemiBold.woff2") format("woff2");
        font-weight:600;
        font-style: normal;
    }
    body {
        font-family: "Inter", sans-serif;
        overflow: hidden;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    ul, li{
        list-style: none;
    }
    input[type="search"] {
        -webkit-appearance: textfield; /* 기본(네이티브) 모양을 제거 */
    }

    
    [type="search"]::-webkit-search-cancel-button,
    [type="search"]::-webkit-search-results-button {
        display: none; /* X 버튼 및 검색 결과 버튼 숨기기 */
    }
`;

