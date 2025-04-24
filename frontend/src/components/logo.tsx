import React from 'react';
import { LogoImage } from './logo.style';

interface LogoProps {
    alt?: string;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ alt = "Logo", className = "schedule-logo"}) => {
    return (
        <LogoImage
            src="assets/images/logo.png"
            alt={alt}
            className={className}
        />
    );
};

export default Logo;
