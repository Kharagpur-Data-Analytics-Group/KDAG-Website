import React from "react";
import ReactDOM from "react-dom/client";
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer, toast } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ParticlesProvider init={loadSlim}>
			<App />
		</ParticlesProvider>
		<ToastContainer position="top-center" />
	</React.StrictMode>
);

reportWebVitals();
