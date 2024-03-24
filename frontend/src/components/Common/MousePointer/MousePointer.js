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
		<div>
			<div
				className="cursor"
				style={{
					left: position.x,
					top: position.y,
				}}
			></div>
			{/* <div 
				className="cursor2"
				style={{
					left: position.x,
					top: position.y,
				}}
			></div>
			<div
				className="cursor3"
				style={{
					left: position.x,
					top: position.y,
				}}
			></div>
			<div
				className="cursor4"
				style={{
					left: position.x,
					top: position.y,
				}}
			></div> */}
		</div>
	);
};

export default MousePointer;
