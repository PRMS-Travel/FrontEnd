import { useEffect, useRef, useState } from "react";
import { UtilWrap } from './util.style';
import DragBar from '../assets/dragBar.svg?react';

interface UtilProps {
    defaultWidth?: number;
    minWidth?: number;
    maxWidth?: number;
}

const Util: React.FC<UtilProps> = ({ defaultWidth = 858, minWidth = 100, maxWidth = 1900 }) => {
    const [utilWidth, setUtilWidth] = useState<number>(defaultWidth);
    const utilRef = useRef<HTMLDivElement>(null);
    const dragBarRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef<boolean>(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging.current && utilRef.current) {
                let newWidth = e.clientX - utilRef.current.offsetLeft;
                newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
                setUtilWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        if (dragBarRef.current) {
            dragBarRef.current.addEventListener("mousedown", () => {
                isDragging.current = true;
                window.addEventListener("mousemove", handleMouseMove);
                window.addEventListener("mouseup", handleMouseUp);
            });
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [minWidth, maxWidth]);

    return (
        <UtilWrap ref={utilRef} style={{ width: `${utilWidth}px` }}>
            <div>Resizable Content</div>
            <DragBar ref={dragBarRef}/>
        </UtilWrap>
    );
};

export default Util;
