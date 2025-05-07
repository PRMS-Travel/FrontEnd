import styled from "styled-components";

export const PlaceListWrap = styled.ul<{ $isDraggingOver?: boolean }>`
    width: 100%;
    min-height: 60vh; 
    padding: 10px;
    border-radius: 4px;
    background: ${props => props.$isDraggingOver ? '#E0E7FF' : '#F7F8F9'};
    box-shadow: 0px 4px 8px 0px rgba(16, 24, 64, 0.08);
    transition: background-color 0.2s ease;
    list-style-type: none;
    margin: 0;
`;

export const PlaceItemStyle = styled.li<{ $isDragging?: boolean }>`
    padding: 10px;
    margin-bottom: 8px;
    background-color: ${props => props.$isDragging ? '#D1E9FF' : 'white'};
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: ${props => props.$isDragging ? '0px 5px 15px rgba(0,0,0,0.2)' : '0px 1px 3px rgba(0,0,0,0.1)'};
    display: flex;
    align-items: center;
    font-size: 0.9rem;
`;