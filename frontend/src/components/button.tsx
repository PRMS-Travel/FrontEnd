import React from 'react';
import { StyledButton } from './button.style';

interface ButtonProps {
    value: string;
    onClick?: () => void;
    className?: string;
    width?:string;
}

const Button: React.FC<ButtonProps> = ({ value, onClick, className ,width}) => {
    return (
    <StyledButton onClick={onClick} className={className} width={width}>
        {value}
    </StyledButton>
    );
};


export default Button;
