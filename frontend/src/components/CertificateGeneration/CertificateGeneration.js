import React, { useState, useMemo } from "react";
import Navbar from "../Common/Navbar/Navbar";
import certificates from "./certificates";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CertificateGeneration.css";
import Particless from "../Common/Particles/Particless";

const CertificateGeneration = () => {
  const [email, setEmail] = useState("");
  const [githubId, setGithubId] = useState("");
  const [loading, setLoading] = useState(false);
  const particles = useMemo(() => <Particless />, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const found = certificates.find(
      (item) => item.Gmail.toLowerCase() === email.toLowerCase().trim()
    );

    if (!found) {
      toast.error("Enter registered email", { position: "top-center" });
      return;
    }

    if (!githubId.trim()) {
      toast.error("Enter your GitHub ID", { position: "top-center" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/kdsh/verify_github_star`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ github_id: githubId.trim() })
        }
      );

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "GitHub verification failed");
      }

      if (!data.ok) {
        toast.error(
          `Please star required repos: ${data.missing.join(", ")}`,
          { position: "top-center", autoClose: 10000 }
        );
        return;
      }

      window.location.href = found["Certificate Link"];

    } catch (err) {
      toast.error(err.message || "Verification failed", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="certificate-page">
        <div className="certificate-card">
          <h1>Certificate Generation</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Enter your GitHub ID"
              value={githubId}
              onChange={(e) => setGithubId(e.target.value)}
              required
            />

            <button type="submit" className="register-button" disabled={loading}>
              {loading ? "Verifying..." : "Get Certificate"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
      {particles}
    </>
  );
};

export default CertificateGeneration;
