import React, { useState, useEffect } from "react";
import "./MousePointer.css";

const MousePointer = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        document.addEventListener("mousemove", updateMousePosition);

        return () => {
            document.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return (
        <div
        className="cursor-none [&_a]:cursor-none">
            <div
                className="fixed w-[30px] h-[30px] rounded-full bg-[#ffffff] duration-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-difference z-[1000000] max-[740px]:invisible"
                style={{
                    left: position.x,
                    top: position.y,
                }}
            ></div>
        </div>
    );
};

export default MousePointer;
