import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={`forum-page-header ${isVisible ? "show" : ""}`}>
			<div class="forum-page-header-title">DISCUSSION FORUM</div>
			<div class="forum-page-header-subtitle" style={{ fontSize: "1.2rem" }}>
				Please follow the{" "}
				<a href="/community-guidelines">Community Guidelines.</a>
			</div>
		</div>
	);
};

export default Header;
