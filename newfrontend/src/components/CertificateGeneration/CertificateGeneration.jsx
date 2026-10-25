import React, { useState, useMemo, useRef } from "react";
import Navbar from "../Common/Navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Particless from "../Common/Particles/Particless";
import { jsPDF } from "jspdf";
import certificateTemplate from "../../assets/KDSH2026_sponsor_logos/KDSH26_certificate.png";
import './Animation.css'

import CertificateStarGuide from "./CertificateStarGuide.jsx";

const CertificateGeneration = () => {
  const [email, setEmail] = useState("");
  // const [githubId, setGithubId] = useState("");
  const [loading, setLoading] = useState(false);
  const [resolvedName, setResolvedName] = useState("");
  const [generatedPreview, setGeneratedPreview] = useState("");

  const canvasRef = useRef(null);
  const particles = useMemo(() => <Particless />, []);

  const drawCertificate = async (name) => {
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.src = certificateTemplate;

      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
      });

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const fontSize = 60;
      const fontSpec = `bold ${fontSize}px "Glacial Indifference"`;
      try {
        await document.fonts.load(fontSpec);
      } catch (e) {
        console.error("Font loading failed", e);
      }
      ctx.font = fontSpec;
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(name.toUpperCase(), canvas.width / 2, canvas.height * 0.515 - 5);

      const dataUrl = canvas.toDataURL("image/png");
      setGeneratedPreview(dataUrl);
      return dataUrl;
    } catch {
      return null;
    }
  };

  const generatePdfFromImage = async (imageDataUrl, name) => {
    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: "a4" });
    const img = new Image();
    img.src = imageDataUrl;

    await new Promise((r) => (img.onload = r));

    const pw = pdf.internal.pageSize.getWidth();
    const ph = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pw / img.width, ph / img.height);

    const w = img.width * ratio;
    const h = img.height * ratio;

    pdf.addImage(imageDataUrl, "PNG", (pw - w) / 2, (ph - h) / 2, w, h);

    pdf.save(`KDSH_2026_${name.replace(/\W+/g, "_")}.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return toast.error("Enter a valid email address");

    // if (!githubId.trim()) return toast.error("Enter GitHub ID");

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_FETCH_URL}/kdsh/certificate_lookup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            // github_id: githubId.trim(),
          }),
        }
      );

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Verification failed");

      setResolvedName(data.name);
      const img = await drawCertificate(data.name);
      await generatePdfFromImage(img, data.name);


    } catch (err) {
      toast.error(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[100vh] flex flex-col justify-center items-center gap-[3rem] box-border relative z-1 px-[2rem]! pt-[6rem]! pb-[2rem]!">
        {!generatedPreview && <CertificateStarGuide />}
        <div className={`rounded-[20px] w-[80%] border border-[rgba(255,255,255,0.18)]! ${generatedPreview ? "bg-[rgba(30,30,30,0.9)] backdrop-blur-[16px] p-[1.5rem]! max-w-[1000px]" : "bg-[rgba(255,255,255,0.08)] backdrop-blur-[25px] max-w-[900px] py-[3.2rem]! px-[3rem]!"}`}>
          {!generatedPreview ? (
            <>
              <h1 className="mb-[2.2rem]! text-white text-[2.1rem]! font-semibold tracking-[0.4px] text-shadow-[0_0_14px_rgba(255,255,255,0.1)] "
              style={{fontFamily : 'Segoe UI'}}>Get Your Certificate</h1>
              <form className="certificate-form flex flex-col items-center gap-[1.6rem]" onSubmit={handleSubmit}>
                <input
                  placeholder="Registered Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{fontFamily: 'Segoe UI'}}
                  className="w-[300px] p-[10px]! text-[1.05rem] rounded-0 bg-transparent text-white!  
                  border-t-0! border-r-0! border-l-0! border-b! placeholder:text-[1.05rem] 
                  border-[rgba(255,255,255,0.2)] transition-all duration-250 ease-in-out focus:border-[#ff1e1e]! focus:outline-none focus:shadow-none placeholder:text-[rgba(255,255,255,0.45)]! "
                  required
                />
                {/* <input
                  placeholder="GitHub ID"
                  value={githubId}
                  onChange={(e) => setGithubId(e.target.value)}
                  required
                /> */}
                <button disabled={loading} 
                className="mt-[18px]! py-[14px]! px-[28px]! w-full max-w-[15rem] text-white! bg-[linear-gradient(135deg,#ff1e1e,#b00000)] rounded-[16px]! border border-[rgba(255,255,255,0.2)]! text-[1.05rem] font-bold tracking-[0.6px] cursor-pointer transition-all duration-200 ease-in-out hover:bg-[linear-gradient(135deg,#ff2e2e,#e00000)] hover:translate-y-[-1px] active:translate-y-0 active:shadow-[0_10px_24px_rgba(255,0,0,0.4)] disabled:opacity-60 disabled:cursor-not-allowed ">
                  {loading ? "Verifying..." : "Get Certificate"}
                </button>
              </form>
            </>
          ) : (
            <div className="w-full flex flex-col items-center gap-[1.5rem] animate-[fadeIn_0.6s_ease-out] certificate-card">
              <div className="relative w-full p-[12px]! bg-[linear-gradient(135deg,#ffffff,#f0f0f0)] rounded-[8px] shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)] transition-transform duration-300 ease-in-out hover:scale-[1.01] max-md:p-[8px]! ">
                <img src={generatedPreview} alt="certificate" className="w-full h-auto max-h-[calc(100vh-16rem)] block border border-[rbga(0,0,0,0.1)]" />
              </div>
              <button
                className="max-w-[300px] mt-0! text-[1.1rem]! py-[16px]! px-[32px]! shadow-[0_8px_20px_rgba(255,30,30,0.3)]"
                onClick={() =>
                  generatePdfFromImage(generatedPreview, resolvedName)
                }
              >
                Download PDF
              </button>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      {particles}
    </>
  );
};

export default CertificateGeneration;
