import { API_BASE_URL } from "../../config/api.js";
import React, { useState, useMemo, useRef } from "react";
import Navbar from "../Common/Navbar/Navbar";
import { toast } from "react-toastify";
import Particless from "../Common/Particles/Particless";
import certificateTemplate from "../../assets/KDSH2026_sponsor_logos/KDSH26_certificate.png";
import CertificateStarGuide from "./CertificateStarGuide";
const CertificateGeneration = () => {
  const [email, setEmail] = useState("");
  // const [githubId, setGithubId] = useState("");
  const [loading, setLoading] = useState(false);
  const [resolvedName, setResolvedName] = useState("");
  const [generatedPreview, setGeneratedPreview] = useState("");
  const canvasRef = useRef(null);
  const particles = useMemo(() => <Particless />, []);
  const drawCertificate = async name => {
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
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4"
    });
    const img = new Image();
    img.src = imageDataUrl;
    await new Promise(r => img.onload = r);
    const pw = pdf.internal.pageSize.getWidth();
    const ph = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pw / img.width, ph / img.height);
    const w = img.width * ratio;
    const h = img.height * ratio;
    pdf.addImage(imageDataUrl, "PNG", (pw - w) / 2, (ph - h) / 2, w, h);
    pdf.save(`KDSH_2026_${name.replace(/\W+/g, "_")}.pdf`);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return toast.error("Enter a valid email address");

    // if (!githubId.trim()) return toast.error("Enter GitHub ID");

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/kdsh/certificate_lookup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim()
          // github_id: githubId.trim(),
        })
      });
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
  return <><style>{"@import url('https://fonts.cdnfonts.com/css/glacial-indifference-2')\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}"}</style>
      <Navbar />
      <div className="certificate-page [min-height:100vh]! [display:flex]! [flex-direction:column]! [justify-content:center]! [align-items:center]! [gap:3rem]! [padding:6rem_2rem_2rem]! [box-sizing:border-box]! [position:relative]! [z-index:1]!">
        {!generatedPreview && <CertificateStarGuide />}
        <div className={`certificate-card [background:rgba(255,_255,_255,_0.08)]! [backdrop-filter:blur(25px)]! [-webkit-backdrop-filter:blur(12px)]! [padding:3.2rem_3rem]! [border-radius:20px]! [width:80%]! [max-width:900px]! [border:1px_solid_rgba(255,_255,_255,_0.18)]! [box-shadow:none]! [text-align:center]! [transition:all_0.4s_cubic-bezier(0.175,_0.885,_0.32,_1.275)]! [&.expanded]:[max-width:1000px]! [&.expanded]:[padding:1.5rem]! [&.expanded]:[background:rgba(30,_30,_30,_0.9)]! [&.expanded]:[backdrop-filter:blur(16px)]! [&_h1]:[margin-bottom:2.2rem]! [&_h1]:[color:white]! [&_h1]:[font-size:2.1rem]! [&_h1]:[font-weight:600]! [&_h1]:[letter-spacing:0.4px]! [&_h1]:[text-shadow:0_0_14px_rgba(255,_255,_255,_0.1)]! [&_form]:[display:flex]! [&_form]:[flex-direction:column]! [&_form]:[align-items:center]! [&_form]:[gap:1.6rem]! [&_input]:[width:300px]! [&_input]:[padding:10px]! [&_input]:[font-size:1.05rem]! [&_input]:[border-radius:0]! [&_input]:[background:transparent]! [&_input]:[color:white]! [&_input]:[border:none]! [&_input]:[border-bottom:1px_solid_rgba(255,_255,_255,_0.2)]! [&_input]:[transition:border_0.25s_ease,_box-shadow_0.25s_ease]! [&_input::placeholder]:[color:rgba(255,_255,_255,_0.45)]! [&_input:focus]:[outline:none]! [&_input:focus]:[background:transparent]! [&_input:focus]:[border-bottom:1px_solid_#ff1e1e]! [&_input:focus]:[box-shadow:none]! max-[768.01px]:[&.expanded]:[padding:1.5rem]! max-[515.01px]:[&_input]:[width:265px]! max-[480.01px]:[&_input]:[width:240px]! max-[480.01px]:[width:92%]! max-[480.01px]:[padding:2rem_1.5rem]! max-[450.01px]:[&_input]:[width:210px]! max-[400.01px]:[&_input]:[width:200px]! max-[386.01px]:[&_input]:[width:190px]! max-[375.01px]:[&_input]:[width:180px]! max-[360.01px]:[&_input]:[width:170px]! max-[350.01px]:[&_input]:[width:160px]! max-[340.01px]:[&_input]:[width:150px]! max-[325.01px]:[&_input]:[width:130px]! ${generatedPreview ? "expanded" : ""} `}>
          {!generatedPreview ? <>
              <h1>Get Your Certificate</h1>
              <form className="certificate-form" onSubmit={handleSubmit}>
                <input placeholder="Registered Email" value={email} onChange={e => setEmail(e.target.value)} required />
                {/* <input
                  placeholder="GitHub ID"
                  value={githubId}
                  onChange={(e) => setGithubId(e.target.value)}
                  required
                 /> */}
                <button disabled={loading} className="register-button [margin-top:18px]! [padding:14px_28px]! [width:100%]! [max-width:15rem]! [color:#ffffff]! [background:linear-gradient(135deg,_#ff1e1e,_#b00000)]! [border-radius:16px]! [border:1px_solid_rgba(255,_255,_255,_0.2)]! [font-size:1.05rem]! [font-weight:700]! [letter-spacing:0.6px]! [cursor:pointer]! [transition:transform_0.2s_ease,_box-shadow_0.2s_ease,_background_0.3s_ease]! [&:hover]:[background:linear-gradient(135deg,_#ff2e2e,_#e00000)]! [&:hover]:[transform:translateY(-1px)]! [&:active]:[transform:translateY(0)]! [&:active]:[box-shadow:0_10px_24px_rgba(255,_0,_0,_0.4)]! [&:disabled]:[opacity:0.6]! [&:disabled]:[cursor:not-allowed]! [.certificate-viewer_&]:[max-width:300px]! [.certificate-viewer_&]:[margin-top:0]! [.certificate-viewer_&]:[font-size:1.1rem]! [.certificate-viewer_&]:[padding:16px_32px]! [.certificate-viewer_&]:[box-shadow:0_8px_20px_rgba(255,_30,_30,_0.3)]!">
                  {loading ? "Verifying..." : "Get Certificate"}
                </button>
              </form>
            </> : <div className="certificate-viewer [width:100%]! [display:flex]! [flex-direction:column]! [align-items:center]! [gap:1.5rem]! [animation:fadeIn_0.6s_ease-out]!">
              <div className="certificate-frame [position:relative]! [width:100%]! [padding:12px]! [background:linear-gradient(135deg,_#ffffff,_#f0f0f0)]! [border-radius:8px]! [box-shadow:0_20px_60px_rgba(0,_0,_0,_0.6),_0_0_0_1px_rgba(255,_255,_255,_0.1)]! [transition:transform_0.3s_ease]! [&:hover]:[transform:scale(1.01)]! [&_img]:[width:100%]! [&_img]:[height:auto]! [&_img]:[max-height:calc(100vh_-_16rem)]! [&_img]:[display:block]! [&_img]:[border:1px_solid_rgba(0,_0,_0,_0.1)]! max-[768.01px]:[padding:8px]!">
                <img src={generatedPreview} alt="certificate" />
              </div>
              <button className="register-button [margin-top:18px]! [padding:14px_28px]! [width:100%]! [max-width:15rem]! [color:#ffffff]! [background:linear-gradient(135deg,_#ff1e1e,_#b00000)]! [border-radius:16px]! [border:1px_solid_rgba(255,_255,_255,_0.2)]! [font-size:1.05rem]! [font-weight:700]! [letter-spacing:0.6px]! [cursor:pointer]! [transition:transform_0.2s_ease,_box-shadow_0.2s_ease,_background_0.3s_ease]! [&:hover]:[background:linear-gradient(135deg,_#ff2e2e,_#e00000)]! [&:hover]:[transform:translateY(-1px)]! [&:active]:[transform:translateY(0)]! [&:active]:[box-shadow:0_10px_24px_rgba(255,_0,_0,_0.4)]! [&:disabled]:[opacity:0.6]! [&:disabled]:[cursor:not-allowed]! [.certificate-viewer_&]:[max-width:300px]! [.certificate-viewer_&]:[margin-top:0]! [.certificate-viewer_&]:[font-size:1.1rem]! [.certificate-viewer_&]:[padding:16px_32px]! [.certificate-viewer_&]:[box-shadow:0_8px_20px_rgba(255,_30,_30,_0.3)]!" onClick={() => generatePdfFromImage(generatedPreview, resolvedName)}>
                Download PDF
              </button>
            </div>}
        </div>
        <canvas ref={canvasRef} style={{
        display: "none"
      }} />
      </div>
      {particles}
    </>;
};
export default CertificateGeneration;
