import React from "react";
import associate_sponsor from "../../assets/kdsh2025_associate_sponsor.jpg";
import pathwayAsset from "../../assets/pathway_asset.svg";
import polygonScatter from "../../assets/kdsh2025_polygon_scatter.svg";

// Markup taken from the commented-out blocks in the old LandingPage.js: the
// same list is rendered twice (second copy aria-hidden) so the loop is seamless.
const SLIDES = [0, 1, 2, 3, 4, 5];

const SponsorSlider = () => (
  <>
    <style>{sponsorSliderStyles}</style>

    <div className="kdsh2025_header">
      Introducing Sponsors for KDSH 2025
    </div>

    <div className="kdsh2025-sponsor-slider">
      <ul>
        {SLIDES.map((i) => (
          <li key={i}>
            <img src={associate_sponsor} alt="associate_sponsor" />
          </li>
        ))}
      </ul>

      <ul aria-hidden="true">
        {SLIDES.map((i) => (
          <li key={i}>
            <img src={associate_sponsor} alt="associate_sponsor" />
          </li>
        ))}
      </ul>
    </div>
  </>
);

// Kept as real CSS (same pattern as TeamPage.jsx / LandingPage.jsx): SVG
// background images, text-shadow glow and the 900/450px breakpoints have no
// exact Tailwind tokens. Copied from SponsorSlider.css; @keyframes scroll ->
// sponsorSliderScroll so it can't clash with the other `scroll` keyframes in
// the app. The two SVG backgrounds are imported and interpolated so Vite
// hashes/serves them correctly in production builds.
const sponsorSliderStyles = `
.kdsh2025_slider_outer {
	border: none;
}

.kdsh2025_header {
	color: whitesmoke;
	font-weight: 800;
	margin-bottom: 25px;
	font-size: 25px;
	text-align: center;
	text-shadow: 0 0 50px red, 0 0 100px blue;
	padding: 10px 15px;
	margin: 0 20% 2% 20%;
	border: solid 2px rgba(255, 255, 255, 0.758);
	border-radius: 50px;
}

.kdsh2025-title-sponsor {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 200px;
	flex-direction: row;
	padding-right: 200px;
	background-image: url("${pathwayAsset}");
	margin-bottom: 50px;
}

.kdsh2025_title_sponsor_intro {
	font-size: 50px;
	font-weight: 900;
	padding-left: 200px;
	color: white;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.kdsh2025_sponsors {
	height: 250px;
	display: flex;
	align-items: center;
	justify-content: space-around;
}

.kdsh2025_sponsors img {
	height: 245px;
	border-radius: 15px;
}

.kdsh2025-sponsor-slider {
	box-sizing: border-box;
	width: 100%;
	height: 300px;
	display: flex;
	align-items: center;
	overflow: hidden;
	user-select: none;
	position: relative;
	z-index: 30;
	gap: 2rem;
	padding-top: 15px;
	background-image: url("${polygonScatter}");
}

.kdsh2025-sponsor-slider ul {
	min-width: 100%;
	list-style: none;
	display: flex;
	gap: 5rem;
	flex-shrink: 0;
	transition: all 0.5s;
	animation: sponsorSliderScroll 35s linear infinite;
	margin-right: 4rem;
}

.kdsh2025-sponsor-slider ul li {
	min-width: 10px;
}

.kdsh2025-sponsor-slider ul li img {
	height: 295px;
	border-radius: 15px;
}

.kdsh2025-sponsor-slider:hover ul {
	animation-play-state: paused;
	color: white;
}

@keyframes sponsorSliderScroll {
	to {
		transform: translateX(calc(-100% - 22px));
	}
}

@media only screen and (max-width: 900px) {
	.kdsh2025_header {
		font-weight: 800;
		font-size: 16px;
		padding: 5px 5px;
		margin: 0 20% 2% 20%;
		border: solid 2px rgba(255, 255, 255, 0.758);
		border-radius: 0px;
		margin-top: 75px;
	}

	.kdsh2025-title-sponsor {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: auto;
		flex-direction: column;
		padding-right: 0px;
		margin-bottom: 50px;
	}
	.kdsh2025_title_sponsor_intro {
		font-size: 25px;
		text-wrap: nowrap;
		font-weight: 900;
		padding-left: 0px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.kdsh2025-title-sponsor img {
		height: 150px;
	}
}

@media screen and (max-width: 450px) {
	.kdsh2025-sponsor-slider ul {
		gap: 3rem;
		font-size: 1.1rem;
		margin-right: 2rem;
	}
}
`;

export default SponsorSlider;
