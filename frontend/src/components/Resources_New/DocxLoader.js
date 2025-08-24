import React, { useEffect, useState } from "react";
import Particles from "../Common/Particles/Particless";

// Helper to get query param
function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const DocxLoader = () => {
  const [html, setHtml] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const docxUrl = getQueryParam("url");
    const name = getQueryParam("name");

    if (!docxUrl) {
      setError("No url provided in query.");
      return;
    }

    if (!name || typeof name !== "string" || name.length === 0) {
      name = "ML Resources";
    }

    const backendUrl = `${process.env.REACT_APP_FETCH_URL}/docx/view_docx?name=${encodeURIComponent(
      name
    )}&url=${encodeURIComponent(docxUrl)}`;

    setIsLoading(true);
    setError(null);

    fetch(backendUrl)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load document.");

        const text = await res.text();
        setIsLoading(false);

        document.open();
        document.write(text);
        document.close();
      })
      .catch((err) => setError(err.message));
  }, []);

  // Render the HTML from backend (with its own CSS/scripts)
  return (
    <div>
      <div style={{ paddingTop: "10rem" }}></div>
      <div style={{ padding: "1rem", minHeight: "20rem" }}>
        {isLoading ? (
          <div
            style={{
              height: "250px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "3.2rem",
                height: "3.2rem",
                border: "5px solid #ff4040",
                borderTop: "5px solid #1a0008",
                borderRadius: "50%",
                animation: "docx-spin 1s linear infinite",
                marginBottom: "1.5rem",
                boxShadow: "0 0 18px #ff404055",
              }}
            />
            <div
              style={{
                color: "#ff4040",
                fontSize: "1.5rem",
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Loading Document...
            </div>
            <style>
              {`
            @keyframes docx-spin {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
          `}
            </style>
          </div>
        ) : error ? (
          <div
            style={{
              height: "250px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>{error}</h2>
          </div>
        ) : null}
      </div>
      <Particles />
    </div>
  );
};

export default DocxLoader;
