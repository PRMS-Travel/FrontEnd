import styled from "styled-components";

export const LogoImage = styled.img`
    width: 100px; /* Example: Set a default width */
    height: auto; /* Maintain aspect ratio */
    /* Add any other default styles you want here */
    &.small {
        width: 50px;
    }
    &.large {
        width: 200px;
    }
`;