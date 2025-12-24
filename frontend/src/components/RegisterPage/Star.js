import React from "react";
import { Star, ExternalLink, AlertCircle } from "lucide-react";
import "./Star.css";

import repo1 from "./../../assets/llm_repo.png";
import repo2 from "./../../assets/pathway_repo.png";
import starred from "./../../assets/starred_repo.png";
import profile_icon from "./../../assets/profile_icon.png";
import profile_menu from "./../../assets/profile_menu.png";

export default function GitHubStarGuide() {
  return (
    <div className="container">
      <div className="content-wrapper">
        
        <div className="header">
          
          <h1 className="main-title">How to Star a Repository?</h1>
          <p className="subtitle">Follow these steps carefully</p>
        </div>

        <div className="steps-container">
          
          <div className="step-card">
            <div className="step-header">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Visit GitHub and Log In</h3>
                <p className="step-description" style={{marginBottom:"0px"}}>
                  Go to{" "}
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    GitHub <ExternalLink className="link-icon" />
                  </a>{" "}
                  and log in using your account credentials. If you don’t have
										an account, click Sign Up to create one
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-header">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Star Repository 1</h3>
                <p className="step-description">
                  Open{" "}
                  <a
                    href="https://github.com/pathwaycom/llm-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Repository 1 <ExternalLink className="link-icon" />
                  </a>{" "}
                  and click the <strong>Star</strong> button.
                </p>
              </div>
            </div>
            <div className="image-wrapper">
                <img src={repo1} alt="LLM Repo Star Button" />
            </div>
            
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-header">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Star Repository 2</h3>
                <p className="step-description">
                  Open{" "}
                  <a
                    href="https://github.com/pathwaycom/pathway"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Repository 2 <ExternalLink className="link-icon" />
                  </a>{" "}
                  and star it.
                </p>
              </div>
            </div>

            <div className="image-wrapper">
                <img src={repo2} alt="Pathway Repo Star Button" />
            </div>
            
          </div>

        <div className="step-card">
            <div className="step-header">
                <div className="step-number">4</div>
                <div className="step-content">
                <h3 className="step-title">Verify the Star</h3>
                <p className="step-description">
                  Once starred, the icon will look like this:
                </p>
              </div>
            </div>
            <div className="image-wrapper">
                <img src={starred} alt="Starred Icon" />
            </div>
            </div>

          {/* Important Note */}
          <div className="important-note">
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
          </div>

          {/* Step 5 */}
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
              <div className="image-wrapper" style={{marginBottom: "15px"}}>
                <img src={profile_icon} alt="Profile Icon"/>
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
