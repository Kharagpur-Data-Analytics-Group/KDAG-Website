import React from "react";
import { motion } from "framer-motion";
import Particless from "../Common/Particles/Particless";
import "react-toastify/dist/ReactToastify.css";
// import "./RegisterPage.css";
import successBackground from "./../../assets/success_background.png";
import whatsapp from "./../../assets/kdsh2025_whatsapp.png";
import discord from "./../../assets/kdsh2025_discord.png";
import kdsh_2025 from "./../../assets/kdsh2025_logo.png";

const Success = () => {
  const particless = React.useMemo(() => <Particless />, []);

  return (
    <>
      <style>{`
        /* ── Responsive values & hover effect ──────────────────────────── */

        /* Base (> 1285px) */
        .success-register-kdsh {
          top: 155px;
          left: 38%;
          font-size: 50px;
        }
        .success-register-kdsh img { height: 100px; }

        .success-register-kdsh-desc {
          top: 300px;
          margin: 0 200px;
          padding: 25px;
          font-size: 20px;
        }

        /* text-shadow not supported in Tailwind core */
        .success-register-kdsh-desc ul li:hover {
          text-shadow: 0 0 8px cyan;
        }

        @media (max-width: 1285px) {
          .success-register-kdsh { top: 125px; left: 36%; }
          .success-register-kdsh img { height: 90px; }
          .success-register-kdsh-desc { padding: 20px; top: 265px; margin: 0 100px; }
        }
        @media (max-width: 1060px) {
          .success-register-kdsh { top: 120px; left: 34%; font-size: 45px; }
          .success-register-kdsh img { height: 80px; }
          .success-register-kdsh-desc { top: 240px; margin: 0 100px; }
        }
        @media (max-width: 880px) {
          .success-register-kdsh { top: 110px; left: 34%; }
          .success-register-kdsh img { height: 70px; }
          .success-register-kdsh-desc { top: 240px; margin: 0 90px; }
        }
        @media (max-width: 750px) {
          .success-register-kdsh { top: 110px; left: 32%; }
          .success-register-kdsh img { height: 65px; }
          .success-register-kdsh-desc { top: 240px; margin: 0 90px; }
        }
        @media (max-width: 700px) {
          .success-register-kdsh { top: 110px; left: 28%; }
          .success-register-kdsh img { height: 60px; }
          .success-register-kdsh-desc { top: 240px; margin: 0 50px; font-size: 18px; }
        }
        @media (max-width: 575px) {
          .success-register-kdsh { top: 100px; left: 24%; }
          .success-register-kdsh img { height: 55px; }
          .success-register-kdsh-desc { top: 220px; margin: 0 40px; font-size: 16px; }
        }
        @media (max-width: 500px) {
          .success-register-kdsh { top: 100px; left: 20%; }
          .success-register-kdsh img { height: 50px; }
        }
        @media (max-width: 460px) {
          .success-register-kdsh { top: 100px; left: 22%; font-size: 35px; }
          .success-register-kdsh img { height: 45px; }
          .success-register-kdsh-desc { top: 220px; margin: 0 30px; font-size: 16px; }
        }
        @media (max-width: 395px) {
          .success-register-kdsh { top: 100px; left: 18%; font-size: 35px; }
          .success-register-kdsh img { height: 40px; }
          .success-register-kdsh-desc { top: 220px; margin: 0 20px; font-size: 16px; }
        }
      `}</style>

      {/* success-container */}
      <div className="success-container">

        {/* register-header — must be relative so absolute children anchor to it */}
        <div className="register-header relative">

          {/* Background layer (spacer + layer1) */}
          <div
            className="w-full bg-no-repeat bg-center bg-cover min-h-[130vh] h-auto pb-[400px]"
            style={{
              aspectRatio: "1500/700",
              backgroundImage: `url(${successBackground})`,
            }}
          />

          {/* ── KDSH Logo ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ display: "flex", justifyContent: "center", height: "100%" }}
          >
            {/*
              success-register-kdsh:
                position + top/left/font-size → responsive, handled in <style>
                font-weight: 900    → font-black
                color: #000         → text-black
                padding: 5px 25px  → py-[5px] px-[25px]
                text-wrap: nowrap  → whitespace-nowrap
            */}
            <div className="success-register-kdsh absolute font-black text-black py-[5px] px-[25px] whitespace-nowrap">
              {/* img height → responsive, handled in <style> */}
              <img src={kdsh_2025} alt="KDSH2025" className="w-auto max-w-full" />
            </div>
          </motion.div>

          {/* ── Description Box ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ display: "flex", justifyContent: "center", height: "100%" }}
          >
            {/*
              success-register-kdsh-desc:
                position + top/margin/padding/font-size → responsive, handled in <style>
                border: 1px solid rgba(59,130,246,0.25) → border border-blue-500/25
                color: #cbd5f5                          → text-[#cbd5f5]
                font-weight: 600                        → font-semibold
                text-align: justify                     → text-justify
                line-height: 25px                       → leading-[25px]
                backdrop-filter: blur(10px)             → backdrop-blur-[10px]
                border-radius: 15px                     → rounded-[15px]
                background: rgba(15,23,42,0.75)         → inline style (arbitrary rgba)
            */}
            <div
              className="success-register-kdsh-desc absolute border border-blue-500/25 text-[#cbd5f5] font-semibold text-justify leading-[25px] backdrop-blur-[10px] rounded-[15px]"
              style={{ background: "rgba(15, 23, 42, 0.75)" }}
            >
              <p>
                Congratulations on successfully registering for{" "}
                <strong>Kharagpur Data Science Hackathon 2026</strong>. For
                timelines and other details related to the Hackathon Visit{" "}
                <a
                  className="kdsh-unstop-link"
                  href="https://unstop.com/p/kharagpur-data-science-hackathon-2026-iit-kharagpur-1614844"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Unstop Page
                </a>
                .
              </p>

              <p>
                Join the Whatsapp Group and Discord Channel for regular updates!
              </p>

              {/*
                social-icons:
                  display: flex       → flex
                  align-items: center → items-center
                  gap: 15px           → gap-[15px]
                  margin-top: 15px    → mt-[15px]

                social-icons a:
                  display: flex       → flex

                social-icons img:
                  width/height: 45px  → w-[45px] h-[45px]
                  cursor: pointer     → cursor-pointer
              */}
              <div className="flex items-center gap-[15px] mt-[15px]">
                <a
                  href="https://chat.whatsapp.com/LguOtn8Dwyh19sajyCKNoQ"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex"
                >
                  <img
                    src={whatsapp}
                    alt="whatsapp"
                    className="w-[45px] h-[45px] cursor-pointer"
                  />
                </a>
                <a
                  href="https://discord.gg/fBfvXCTQF"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex"
                >
                  <img
                    src={discord}
                    alt="discord"
                    className="w-[45px] h-[45px] cursor-pointer"
                  />
                </a>
              </div>

              {/*
                important-note2:
                  Styled as a bordered inner sub-card to match Image 1.
                  - border + rounded corners  → border border-blue-500/40 rounded-[10px]
                  - inner padding             → p-[16px]
                  - subtle inner background   → bg-[rgba(30,45,100,0.35)]
                  - top spacing               → mt-[20px]
                  Label color: blue (#60a5fa) to match Image 1 styling.
              */}
              <div
                style={{
                  background: "rgba(30, 45, 100, 0.35)",
                  margin: "20px 30px 0 30px",
                  padding: "16px",
                  border: "1px solid rgba(59, 130, 246, 0.4)",
                  borderRadius: "10px",
                }}
              >
                <strong style={{ color: "#60a5fa" }}>Important for Team Leaders:</strong>{" "}
                After all Members have joined your team, you MUST finalize your
                team on the{" "}
                <a
                  href="/manage-team"
                  style={{ color: "#60a5fa", textDecoration: "underline" }}
                >
                  Manage Team page
                </a>{" "}
                to complete your registration. Your team will only appear on
                Unstop after finalization.
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {particless}
    </>
  );
};

export default Success;
