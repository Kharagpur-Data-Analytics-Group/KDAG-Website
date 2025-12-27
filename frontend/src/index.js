import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer, toast } from "react-toastify";

ReactDOM.render(
	<React.StrictMode>
		<App />
		<ToastContainer position="top-center" />
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
