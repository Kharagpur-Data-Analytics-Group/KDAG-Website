import React from "react";
import { Star, ExternalLink, AlertCircle } from "lucide-react";

import repo1 from "./../../assets/llm_repo.png";
import repo2 from "./../../assets/pathway_repo.png";
import starred from "./../../assets/starred_repo.png";
import profile_icon from "./../../assets/profile_icon.png";
import profile_menu from "./../../assets/profile_menu.png";


const starGlobalCss = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`;

export default function GitHubStarGuide() {
  return (
    <>
      <style>{starGlobalCss}</style>
      <div className="min-h-screen text-[#e5e7eb] py-16 px-5 font-sans">
        <div className="max-w-[920px] mx-auto">

          <div className="text-center mb-16">

            <h1 className="text-[38px] max-sm:text-[30px] font-bold bg-gradient-to-br from-[#38bdf8] to-[#93c5fd] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
              How to Star a Repository?
            </h1>
            <p className="mt-3 text-[#94a3b8] text-[18px]">Follow these steps carefully</p>
          </div>

          <div className="flex flex-col gap-7">

            <div className="bg-[rgba(15,23,42,0.75)] border border-[rgba(59,130,246,0.25)] rounded-[18px] p-6 backdrop-blur-[14px] transition-[transform,border-color] duration-[250ms]">
              <div className="flex gap-4">
                <div className="w-[42px] h-[42px] max-sm:hidden shrink-0 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-[#020617] flex items-center justify-center font-bold text-[18px] shadow-[0_6px_16px_rgba(59,130,246,0.4)]">1</div>
                <div className="flex-1">
                  <h3 className="text-[22px] font-semibold mb-2.5 text-[#f8fafc]">Visit GitHub and Log In</h3>
                  <p className="text-[#cbd5f5] leading-[1.65] text-[16px]" style={{ marginBottom: "0px" }}>
                    Go to{" "}
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#38bdf8] font-semibold underline underline-offset-[3px] inline-flex items-center gap-1 transition-[color,text-shadow] duration-200 hover:text-[#7dd3fc] hover:[text-shadow:0_0_12px_rgba(56,189,248,0.7)]"
                    >
                      GitHub <ExternalLink className="w-4 h-4" />
                    </a>{" "}
                    and log in using your account credentials. If you don’t have
                    an account, click Sign Up to create one
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[rgba(15,23,42,0.75)] border border-[rgba(59,130,246,0.25)] rounded-[18px] p-6 backdrop-blur-[14px] transition-[transform,border-color] duration-[250ms]">
              <div className="flex gap-4">
                <div className="w-[42px] h-[42px] max-sm:hidden shrink-0 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-[#020617] flex items-center justify-center font-bold text-[18px] shadow-[0_6px_16px_rgba(59,130,246,0.4)]">2</div>
                <div className="flex-1">
                  <h3 className="text-[22px] font-semibold mb-2.5 text-[#f8fafc]">Star Repository 1</h3>
                  <p className="text-[#cbd5f5] leading-[1.65] text-[16px]">
                    Open{" "}
                    <a
                      href="https://github.com/pathwaycom/llm-app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#38bdf8] font-semibold underline underline-offset-[3px] inline-flex items-center gap-1 transition-[color,text-shadow] duration-200 hover:text-[#7dd3fc] hover:[text-shadow:0_0_12px_rgba(56,189,248,0.7)]"
                    >
                      Repository 1 <ExternalLink className="w-4 h-4" />
                    </a>{" "}
                    and click the <strong>Star</strong> button.
                  </p>
                </div>
              </div>
              <div className="rounded-[10px] overflow-hidden border border-[rgba(59,130,246,0.2)]">
                <img src={repo1} alt="LLM Repo Star Button" className="w-full block" />
              </div>

            </div>

            {/* Step 3 */}
            <div className="bg-[rgba(15,23,42,0.75)] border border-[rgba(59,130,246,0.25)] rounded-[18px] p-6 backdrop-blur-[14px] transition-[transform,border-color] duration-[250ms]">
              <div className="flex gap-4">
                <div className="w-[42px] h-[42px] max-sm:hidden shrink-0 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-[#020617] flex items-center justify-center font-bold text-[18px] shadow-[0_6px_16px_rgba(59,130,246,0.4)]">3</div>
                <div className="flex-1">
                  <h3 className="text-[22px] font-semibold mb-2.5 text-[#f8fafc]">Star Repository 2</h3>
                  <p className="text-[#cbd5f5] leading-[1.65] text-[16px]">
                    Open{" "}
                    <a
                      href="https://github.com/pathwaycom/pathway"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#38bdf8] font-semibold underline underline-offset-[3px] inline-flex items-center gap-1 transition-[color,text-shadow] duration-200 hover:text-[#7dd3fc] hover:[text-shadow:0_0_12px_rgba(56,189,248,0.7)]"
                    >
                      Repository 2 <ExternalLink className="w-4 h-4" />
                    </a>{" "}
                    and star it.
                  </p>
                </div>
              </div>

              <div className="rounded-[10px] overflow-hidden border border-[rgba(59,130,246,0.2)]">
                <img src={repo2} alt="Pathway Repo Star Button" className="w-full block" />
              </div>

            </div>

            <div className="bg-[rgba(15,23,42,0.75)] border border-[rgba(59,130,246,0.25)] rounded-[18px] p-6 backdrop-blur-[14px] transition-[transform,border-color] duration-[250ms]">
              <div className="flex gap-4">
                <div className="w-[42px] h-[42px] max-sm:hidden shrink-0 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-[#020617] flex items-center justify-center font-bold text-[18px] shadow-[0_6px_16px_rgba(59,130,246,0.4)]">4</div>
                <div className="flex-1">
                  <h3 className="text-[22px] font-semibold mb-2.5 text-[#f8fafc]">Verify the Star</h3>
                  <p className="text-[#cbd5f5] leading-[1.65] text-[16px]">
                    Once starred, the icon will look like this:
                  </p>
                </div>
              </div>
              <div className="rounded-[10px] overflow-hidden border border-[rgba(59,130,246,0.2)]">
                <img src={starred} alt="Starred Icon" className="w-full block" />
              </div>
            </div>


            {/* <div className="important-note">
              <div className="note-content">
                <AlertCircle className="note-icon" />
                <div>
                  <h4 className="note-title">Important</h4>
                  <p className="note-description">
                    Use the same GitHub username in the registration form that you
                    used to star the repositories.
                  </p>
                </div>
              </div>
            </div> */}

            {/* Step 5 */}
            {/*<div className="step-card">
              <div className="step-header">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3 className="step-title">Find Your GitHub Username</h3>
                  <p className="step-description">
                    Click on your GitHub profile icon:
                  </p>
                </div>
              </div>
                <div className="image-wrapper" style={{marginBottom: "15px"}}>
                  <img src={profile_icon} alt="Profile Icon"/>
                </div>
                <div className="image-wrapper">
                  <img src={profile_menu} alt="Profile Menu" />

              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
