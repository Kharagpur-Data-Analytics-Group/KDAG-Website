import React, { useEffect, useState } from "react";
import Particles from "../Common/Particles/Particless";

const DocxLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const docxUrl = params.get("url");
    const name = params.get("name") || "ML Resources";

    if (!docxUrl) {
      setError("No url provided in query.");
      return;
    }

    const backendUrl = `${import.meta.env.VITE_FETCH_URL}/docx/view_docx?name=${encodeURIComponent(name)}&url=${encodeURIComponent(docxUrl)}`;
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
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <div className="!pt-[10rem]" />
      <div className="!p-[1rem] min-h-[20rem]">
        {isLoading ? (
          <div className="h-[250px] flex flex-col items-center justify-center">
            <div className="w-[3.2rem] h-[3.2rem] border-[5px] border-[#ff4040] border-t-[#1a0008] rounded-full animate-spin !mb-[1.5rem] shadow-[0_0_18px_#ff404055]" />
            <div className="text-[#ff4040] text-[1.5rem] font-['JetBrains_Mono',monospace] font-bold text-center">
              Loading Document...
            </div>
          </div>
        ) : error ? (
          <div className="h-[250px] flex flex-col items-center justify-center">
            <h2>{error}</h2>
          </div>
        ) : null}
      </div>
      <Particles />
    </div>
  );
};

export default DocxLoader;
