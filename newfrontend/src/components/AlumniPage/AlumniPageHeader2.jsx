import React from "react";
import "./AlumniPageHeading.css";

const AlumniPageHeading2 = ({ text }) => {
	return (
		<div className="w-9/10 max-w-7xl flex items-center">
			<div className="flex justify-end">
				<svg
					width="75"
					height="75"
					viewBox="0 0 75 75"
					fill="none"
                    className="w-8/10"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g filter="url(#filter0_d_139:59)">
						<rect x="15" y="7" width="53" height="53" rx="6" fill="#F53D3D" />
					</g>
					<circle cx="41" cy="33" r="14" fill="white" />
					<defs>
						<filter
							id="filter0_d_139:59"
							x="0"
							y="0"
							width="83"
							height="83"
							filterUnits="userSpaceOnUse"
							color-interpolation-filters="sRGB"
						>
							<feFlood flood-opacity="0" result="BackgroundImageFix" />
							<feColorMatrix
								in="SourceAlpha"
								type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
								result="hardAlpha"
							/>
							<feMorphology
								radius="2"
								operator="erode"
								in="SourceAlpha"
								result="effect1_dropShadow_139:59"
							/>
							<feOffset dy="8" />
							<feGaussianBlur stdDeviation="8.5" />
							<feComposite in2="hardAlpha" operator="out" />
							<feColorMatrix
								type="matrix"
								values="0 0 0 0 0.9625 0 0 0 0 0.238219 0 0 0 0 0.238219 0 0 0 0.75 0"
							/>
							<feBlend
								mode="normal"
								in2="BackgroundImageFix"
								result="effect1_dropShadow_139:59"
							/>
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="effect1_dropShadow_139:59"
								result="shape"
							/>
						</filter>
					</defs>
				</svg>
			</div>
			<div className="text-[2rem] text-white font-bold text-shadow-[3px_3px_3px_rgba(255,255,255,0.31)]"
            style={{paddingLeft : '1rem'}}>{text}</div>
		</div>
	);
};

export default AlumniPageHeading2;
