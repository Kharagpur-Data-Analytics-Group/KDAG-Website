import React from "react";
import { ExternalLink } from "lucide-react";
import "./CertificateStarGuide.css";

import repo1 from "./../../assets/llm_repo.png";
import repo2 from "./../../assets/pathway_repo.png";
import starred from "./../../assets/starred_repo.png";
import profile_icon from "./../../assets/profile_icon.png";
import profile_menu from "./../../assets/profile_menu.png";

export default function CertificateStarGuide() {
    return (
        <div className="cert-star-container">
            <div className="cert-content-wrapper">

                <div className="cert-header">
                    <div className="cert-welcome-card">
                        <div className="cert-main-title" style={{ fontSize: "24px", marginBottom: "12px" }}>
                            Thank you for participating in KDSH 2026!
                        </div>
                        <div className="cert-subtitle" style={{ lineHeight: "1.6", maxWidth: "700px", margin: "0 auto" }}>
                            Round 1 has ended. You can download your Certificate of Participation after starring the required repositories below.
                        </div>
                    </div>
                </div>

                <div className="cert-header">
                    <h1 className="cert-main-subtitle">How to Star a Repository?</h1>
                    <p className="cert-subtitle">Follow these steps carefully</p>
                </div>

                <div className="cert-steps-container">

                    <div className="cert-step-card">
                        <div className="cert-step-header">
                            <div className="cert-step-number">1</div>
                            <div className="cert-step-content">
                                <h3 className="cert-step-title">Visit GitHub and Log In</h3>
                                <p className="cert-step-description" style={{ marginBottom: "0px" }}>
                                    Go to{" "}
                                    <a
                                        href="https://github.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cert-link"
                                    >
                                        GitHub <ExternalLink className="cert-link-icon" />
                                    </a>{" "}
                                    and log in. Using the same account you registered with.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="cert-step-card">
                        <div className="cert-step-header">
                            <div className="cert-step-number">2</div>
                            <div className="cert-step-content">
                                <h3 className="cert-step-title">Star Repository 1</h3>
                                <p className="cert-step-description">
                                    Open{" "}
                                    <a
                                        href="https://github.com/pathwaycom/llm-app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cert-link"
                                    >
                                        Repository 1 <ExternalLink className="cert-link-icon" />
                                    </a>{" "}
                                    and click the <strong>Star</strong> button.
                                </p>
                            </div>
                        </div>
                        <div className="cert-image-wrapper">
                            <img src={repo1} alt="LLM Repo Star Button" />
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="cert-step-card">
                        <div className="cert-step-header">
                            <div className="cert-step-number">3</div>
                            <div className="cert-step-content">
                                <h3 className="cert-step-title">Star Repository 2</h3>
                                <p className="cert-step-description">
                                    Open{" "}
                                    <a
                                        href="https://github.com/pathwaycom/pathway"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cert-link"
                                    >
                                        Repository 2 <ExternalLink className="cert-link-icon" />
                                    </a>{" "}
                                    and star it.
                                </p>
                            </div>
                        </div>

                        <div className="cert-image-wrapper">
                            <img src={repo2} alt="Pathway Repo Star Button" />
                        </div>
                    </div>

                    <div className="cert-step-card">
                        <div className="cert-step-header">
                            <div className="cert-step-number">4</div>
                            <div className="cert-step-content">
                                <h3 className="cert-step-title">Verify the Star</h3>
                                <p className="cert-step-description">
                                    Once starred, the icon will look like this:
                                </p>
                            </div>
                        </div>
                        <div className="cert-image-wrapper">
                            <img src={starred} alt="Starred Icon" />
                        </div>
                    </div>
                    <div className="step-card">
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
                    </div>
                </div>
            </div>
        </div>
    );
}
