import React, { useState, useMemo, useRef } from "react";
import Navbar from "../Common/Navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CertificateGeneration.css";
import Particless from "../Common/Particles/Particless";
import { jsPDF } from "jspdf";
import certificateTemplate from "../../assets/KDSH2026_sponsor_logos/KDSH26_certificate.png";

const CertificateGeneration = () => {
  const [email, setEmail] = useState("");
  const [githubId, setGithubId] = useState("");
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

      const fontSize = 58.4;
      const fontSpec = `${fontSize}px "Glacial Indifference"`;
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
    if (!githubId.trim()) return toast.error("Enter GitHub ID");

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/kdsh/certificate_lookup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            github_id: githubId.trim(),
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
      <div className="certificate-page">
        <div className={`certificate-card ${generatedPreview ? "expanded" : ""}`}>
          {!generatedPreview ? (
            <>
              <h1>Certificate Generator</h1>
              <form className="certificate-form" onSubmit={handleSubmit}>
                <input
                  placeholder="Registered Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  placeholder="GitHub ID"
                  value={githubId}
                  onChange={(e) => setGithubId(e.target.value)}
                  required
                />
                <button disabled={loading} className="register-button">
                  {loading ? "Verifying..." : "Generate Certificate"}
                </button>
              </form>
            </>
          ) : (
            <div className="certificate-viewer">
              <div className="certificate-frame">
                <img src={generatedPreview} alt="certificate" />
              </div>
              <button
                className="register-button"
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
