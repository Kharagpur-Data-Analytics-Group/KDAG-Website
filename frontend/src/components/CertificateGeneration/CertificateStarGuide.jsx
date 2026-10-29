import React from "react";
import { ExternalLink } from "lucide-react";

import repo1 from "./../../assets/llm_repo.png";
import repo2 from "./../../assets/pathway_repo.png";
import starred from "./../../assets/starred_repo.png";
import profile_icon from "./../../assets/profile_icon.png";
import profile_menu from "./../../assets/profile_menu.png";

export default function CertificateStarGuide() {
    return (
        <div className="text-[#e5e7eb]! py-[20px]! w-[80%] max-w-[900px]"
        style={{fontFamily : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>
            <div className="max-w-[100%] my-0! mx-auto!">

                <div className="text-center mb-[32px]!">
                    <div className="bg-[rgba(255,255,255,0.08)] backdrop-blur-[5px] border! border-[rgba(255,255,255,0.18)]! rounded-[20px] p-[30px]! text-center mb-[40px]! text-white!">
                        <div className="text-[28px] font-bold text-[#F87B7B]! bg-clip-text mb-[12px]! max-[640px]:text-[24px]" style={{ fontSize: "24px", marginBottom: "12px" }}>
                            Thank you for participating in KDSH 2026!
                        </div>
                        <div className="text-[16px] text-[rgba(148,163,184)]! bg-clip-text mb-[8px]!" style={{ lineHeight: "1.6", maxWidth: "700px", margin: "0 auto", fontFamily : 'Segoe UI' }}>
                            Round 1 has ended. You can download your Certificate of Participation by entering your registered email below.
                        </div>
                    </div>
                </div>


                {/* <div className="text-center mb-[32px]!">
                    <h1 className="cert-main-subtitle">How to Star a Repository?</h1>
                    <p className="text-[28px] font-bold bg-[linear-gradient(135deg,#38bdf8,#2563eb)] bg-clip-text mb-[8px]! text-transparent">Follow these steps carefully</p>
                </div> */}

                <div className="flex flex-col gap-[20px] mb-[32px]!">

                    {/* <div className="bg-[rgba(15,23,42,0.75)] border border-[rgba(59,130,246,0.25)] rounded-[18px] p-[24px]! backdrop-blur-[14px] transition-all duration:250 ease-in-out">
                        <div className="flex gap-[16px]">
                            <div className="w-[42px] h-[42px] shrink-0 rounded-[12px] bg-[linear-gradient(135deg,#3b82f6,#1d4ed8)] text-[#020617] flex items-center justify-center font-bold text-[18px] shadow-[0_6px_16px_rgba(59,130,246,0.4)]">1</div>
                            <div className="flex-1">
                                <h3 className="text-[18px] font-semibold mb-[6px]! text-[#f8fafc]">Visit GitHub and Log In</h3>
                                <p className="text-[#cbd5f5] leading-[1.5] text-[14px]" style={{ marginBottom: "0px" }}>
                                    Go to{" "}
                                    <a
                                        href="https://github.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#38bdf8] font-semibold underline underline-offset-[3px] inline-flex items-center gap-[4px] transition-all duration-200 ease-in-out hover:text-[#7dd3fc] hover:text-shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                                    >
                                        GitHub <ExternalLink className="w-[14px] h-[14px]" />
                                    </a>{" "}
                                    and log in. Using the same account you registered with.
                                </p>
                            </div>
                        </div>
                    </div> */}

                    {/* Step 2 */}
                    {/* <div className="bg-[rgba(15,23,42,0.75)] border border-[rgba(59,130,246,0.25)] rounded-[18px] p-[24px]! backdrop-blur-[14px] transition-all duration:250 ease-in-out">
                        <div className="flex gap-[16px]">
                            <div className="w-[42px] h-[42px] shrink-0 rounded-[12px] bg-[linear-gradient(135deg,#3b82f6,#1d4ed8)] text-[#020617] flex items-center justify-center font-bold text-[18px] shadow-[0_6px_16px_rgba(59,130,246,0.4)]">2</div>
                            <div className="flex-1">
                                <h3 className="text-[18px] font-semibold mb-[6px]! text-[#f8fafc]">Star Repository 1</h3>
                                <p className="text-[#cbd5f5] leading-[1.5] text-[14px]">
                                    Open{" "}
                                    <a
                                        href="https://github.com/pathwaycom/llm-app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#38bdf8] font-semibold underline underline-offset-[3px] inline-flex items-center gap-[4px] transition-all duration-200 ease-in-out hover:text-[#7dd3fc] hover:text-shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                                    >
                                        Repository 1 <ExternalLink className="w-[14px] h-[14px]" />
                                    </a>{" "}
                                    and click the <strong>Star</strong> button.
                                </p>
                            </div>
                        </div>
                        <div className="mt-[14px]! rounded-[10px] overflow-hidden border border-[239,68,68,0.2]">
                            <img src={repo1} alt="LLM Repo Star Button" className="w-full block" />
                        </div>
                    </div> */}

                    {/* Step 3 */}
                    {/* <div className="bg-[rgba(15,23,42,0.75)] border border-[rgba(59,130,246,0.25)] rounded-[18px] p-[24px]! backdrop-blur-[14px] transition-all duration:250 ease-in-out">
                        <div className="flex gap-[16px]">
                            <div className="w-[42px] h-[42px] shrink-0 rounded-[12px] bg-[linear-gradient(135deg,#3b82f6,#1d4ed8)] text-[#020617] flex items-center justify-center font-bold text-[18px] shadow-[0_6px_16px_rgba(59,130,246,0.4)]">3</div>
                            <div className="flex-1">
                                <h3 className="text-[18px] font-semibold mb-[6px]! text-[#f8fafc]">Star Repository 2</h3>
                                <p className="text-[#cbd5f5] leading-[1.5] text-[14px]">
                                    Open{" "}
                                    <a
                                        href="https://github.com/pathwaycom/pathway"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#38bdf8] font-semibold underline underline-offset-[3px] inline-flex items-center gap-[4px] transition-all duration-200 ease-in-out hover:text-[#7dd3fc] hover:text-shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                                    >
                                        Repository 2 <ExternalLink className="w-[14px] h-[14px]" />
                                    </a>{" "}
                                    and star it.
                                </p>
                            </div>
                        </div>

                        <div className="mt-[14px]! rounded-[10px] overflow-hidden border border-[239,68,68,0.2]">
                            <img src={repo2} alt="Pathway Repo Star Button" className="w-full block" />
                        </div>
                    </div> */}

                    {/* <div className="bg-[rgba(15,23,42,0.75)] border border-[rgba(59,130,246,0.25)] rounded-[18px] p-[24px]! backdrop-blur-[14px] transition-all duration:250 ease-in-out">
                        <div className="flex gap-[16px]">
                            <div className="w-[42px] h-[42px] shrink-0 rounded-[12px] bg-[linear-gradient(135deg,#3b82f6,#1d4ed8)] text-[#020617] flex items-center justify-center font-bold text-[18px] shadow-[0_6px_16px_rgba(59,130,246,0.4)]">4</div>
                            <div className="flex-1">
                                <h3 className="text-[18px] font-semibold mb-[6px]! text-[#f8fafc]">Verify the Star</h3>
                                <p className="text-[#cbd5f5] leading-[1.5] text-[14px]">
                                    Once starred, the icon will look like this:
                                </p>
                            </div>
                        </div>
                        <div className="mt-[14px]! rounded-[10px] overflow-hidden border border-[239,68,68,0.2]">
                            <img src={starred} alt="Starred Icon" className="w-full block" />
                        </div>
                    </div> */}
                    {/* <div className="step-card">
                        <div className="step-header">
                            <div className="step-number">5</div>
                            <div className="step-content">
                                <h3 className="step-title">Find Your GitHub Username</h3>
                                <p className="step-description">
                                    Click on your GitHub profile icon:
                                </p>
                            </div>
                        </div>
                        <div className="image-wrapper" style={{ marginBottom: "15px" }}>
                            <img src={profile_icon} alt="Profile Icon" />
                        </div>
                        <div className="image-wrapper">
                            <img src={profile_menu} alt="Profile Menu" />

                        </div>
                    </div> */}
                </div>
            </div>

        </div>
    );
}
