import React from 'react';
import { StyledButton } from './button.style';

interface ButtonProps {
    value: string;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ value, onClick, className }) => {
    return (
    <StyledButton onClick={onClick} className={className}>
        {value}
    </StyledButton>
    );
};


export default Button;
