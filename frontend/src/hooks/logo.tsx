import React from 'react';
import { LogoImage } from './logo.style';

interface LogoProps {
    alt?: string;
    className?: string;
}

const handleURL = () =>{
    if(confirm('메인 페이지로 돌아가시겠습니까?')){
        window.location.href = '/';
    }
}

const Logo: React.FC<LogoProps> = ({ alt = "Logo", className = "schedule-logo"}) => {
    return (
        <LogoImage
            src="assets/images/logo.png"
            alt={alt}
            className={className}
            onClick={handleURL}
        />
    );
};

export default Logo;
