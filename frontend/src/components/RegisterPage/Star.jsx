import React from "react";
import { Star, ExternalLink, AlertCircle } from "lucide-react";
import repo1 from "./../../assets/arc_task_repo.png";
import repo2 from "./../../assets/pathway_repo.png";
import starred from "./../../assets/starred_repo.png";
import profile_icon from "./../../assets/profile_icon.png";
import profile_menu from "./../../assets/profile_menu.png";
export default function GitHubStarGuide() {
  return <div className="container [min-height:100vh]! [color:#e5e7eb]! [padding:64px_20px]! [font-family:-apple-system,_BlinkMacSystemFont,_'Segoe_UI',_Roboto,_sans-serif]!">
      <div className="content-wrapper [max-width:920px]! [margin:0_auto]!">

        <div className="header [text-align:center]! [margin-bottom:64px]!">

          <h1 className="main-title [font-size:38px]! [font-weight:700]! bg-[linear-gradient(135deg,#38bdf8,#93c5fd)]! bg-clip-text! text-transparent! [-webkit-text-fill-color:transparent]! max-[640.01px]:[font-size:30px]!">How to Star a Repository?</h1>
          <p className="subtitle [margin-top:12px]! [color:#94a3b8]! [font-size:18px]!">Follow these steps carefully</p>
        </div>

        <div className="steps-container [display:flex]! [flex-direction:column]! [gap:28px]!">

          <div className="step-card [background:rgba(15,_23,_42,_0.75)]! [border:1px_solid_rgba(59,_130,_246,_0.25)]! [border-radius:18px]! [padding:24px]! [backdrop-filter:blur(14px)]! [transition:transform_0.25s_ease,_border-color_0.25s_ease]!">
            <div className="step-header [display:flex]! [gap:16px]!">
              <div className="step-number [width:42px]! [height:42px]! [flex-shrink:0]! [border-radius:12px]! [background:linear-gradient(135deg,_#3b82f6,_#1d4ed8)]! [color:#020617]! [display:flex]! [align-items:center]! [justify-content:center]! [font-weight:700]! [font-size:18px]! [box-shadow:0_6px_16px_rgba(59,_130,_246,_0.4)]! max-[640.01px]:[display:none]!">1</div>
              <div className="step-content [flex:1]!">
                <h3 className="step-title [font-size:22px]! [font-weight:600]! [margin-bottom:10px]! [color:#f8fafc]!">Visit GitHub and Log In</h3>
                <p className="step-description [color:#cbd5f5]! [line-height:1.65]! [font-size:16px]!" style={{
                marginBottom: "0px"
              }}>
                  Go to{" "}
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="link [color:#38bdf8]! [font-weight:600]! [text-decoration:underline]! [text-underline-offset:3px]! [display:inline-flex]! [align-items:center]! [gap:4px]! [transition:color_0.2s_ease,_text-shadow_0.2s_ease]! [&:hover]:[color:#7dd3fc]! [&:hover]:[text-shadow:0_0_12px_rgba(56,_189,_248,_0.7)]!">
                    GitHub <ExternalLink className="link-icon [width:16px]! [height:16px]!" />
                  </a>{" "}
                  and log in using your account credentials. If you don’t have
                    an account, click Sign Up to create one
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-card [background:rgba(15,_23,_42,_0.75)]! [border:1px_solid_rgba(59,_130,_246,_0.25)]! [border-radius:18px]! [padding:24px]! [backdrop-filter:blur(14px)]! [transition:transform_0.25s_ease,_border-color_0.25s_ease]!">
            <div className="step-header [display:flex]! [gap:16px]!">
              <div className="step-number [width:42px]! [height:42px]! [flex-shrink:0]! [border-radius:12px]! [background:linear-gradient(135deg,_#3b82f6,_#1d4ed8)]! [color:#020617]! [display:flex]! [align-items:center]! [justify-content:center]! [font-weight:700]! [font-size:18px]! [box-shadow:0_6px_16px_rgba(59,_130,_246,_0.4)]! max-[640.01px]:[display:none]!">2</div>
              <div className="step-content [flex:1]!">
                <h3 className="step-title [font-size:22px]! [font-weight:600]! [margin-bottom:10px]! [color:#f8fafc]!">Star Repository</h3>
                <p className="step-description [color:#cbd5f5]! [line-height:1.65]! [font-size:16px]!">
                  Open{" "}
                  <a href="https://github.com/pathwaycom/arc-task-gen" target="_blank" rel="noopener noreferrer" className="link [color:#38bdf8]! [font-weight:600]! [text-decoration:underline]! [text-underline-offset:3px]! [display:inline-flex]! [align-items:center]! [gap:4px]! [transition:color_0.2s_ease,_text-shadow_0.2s_ease]! [&:hover]:[color:#7dd3fc]! [&:hover]:[text-shadow:0_0_12px_rgba(56,_189,_248,_0.7)]!">
                    Repository<ExternalLink className="link-icon [width:16px]! [height:16px]!" />
                  </a>{" "}
                  and click the <strong>Star</strong> button.
                </p>
              </div>
            </div>
            <div className="image-wrapper [border-radius:10px]! [overflow:hidden]! [border:1px_solid_rgba(59,_130,_246,_0.2)]! [&_img]:[width:100%]! [&_img]:[display:block]!">
                <img src={repo1} alt="Arc Task Repo Star Button" />
            </div>

          </div>

          {/* Step 3 */}
          {/* <div className="step-card">
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

           </div> */}

          {/* Step 4 */}
          <div className="step-card [background:rgba(15,_23,_42,_0.75)]! [border:1px_solid_rgba(59,_130,_246,_0.25)]! [border-radius:18px]! [padding:24px]! [backdrop-filter:blur(14px)]! [transition:transform_0.25s_ease,_border-color_0.25s_ease]!">
            <div className="step-header [display:flex]! [gap:16px]!">
                <div className="step-number [width:42px]! [height:42px]! [flex-shrink:0]! [border-radius:12px]! [background:linear-gradient(135deg,_#3b82f6,_#1d4ed8)]! [color:#020617]! [display:flex]! [align-items:center]! [justify-content:center]! [font-weight:700]! [font-size:18px]! [box-shadow:0_6px_16px_rgba(59,_130,_246,_0.4)]! max-[640.01px]:[display:none]!">3</div>
                <div className="step-content [flex:1]!">
                <h3 className="step-title [font-size:22px]! [font-weight:600]! [margin-bottom:10px]! [color:#f8fafc]!">Verify the Star</h3>
                <p className="step-description [color:#cbd5f5]! [line-height:1.65]! [font-size:16px]!">
                  Once starred, the icon will look like this:
                </p>
              </div>
            </div>
            <div className="image-wrapper [border-radius:10px]! [overflow:hidden]! [border:1px_solid_rgba(59,_130,_246,_0.2)]! [&_img]:[width:100%]! [&_img]:[display:block]!">
                <img src={starred} alt="Starred Icon" />
            </div>
          </div>

          {/* Step 5 */}
          <div className="step-card [background:rgba(15,_23,_42,_0.75)]! [border:1px_solid_rgba(59,_130,_246,_0.25)]! [border-radius:18px]! [padding:24px]! [backdrop-filter:blur(14px)]! [transition:transform_0.25s_ease,_border-color_0.25s_ease]!">
           <div className="step-header [display:flex]! [gap:16px]!">
             <div className="step-number [width:42px]! [height:42px]! [flex-shrink:0]! [border-radius:12px]! [background:linear-gradient(135deg,_#3b82f6,_#1d4ed8)]! [color:#020617]! [display:flex]! [align-items:center]! [justify-content:center]! [font-weight:700]! [font-size:18px]! [box-shadow:0_6px_16px_rgba(59,_130,_246,_0.4)]! max-[640.01px]:[display:none]!">4</div>
             <div className="step-content [flex:1]!">
               <h3 className="step-title [font-size:22px]! [font-weight:600]! [margin-bottom:10px]! [color:#f8fafc]!">Find Your GitHub Username</h3>
               <p className="step-description [color:#cbd5f5]! [line-height:1.65]! [font-size:16px]!">
                 Click on your GitHub profile icon:
               </p>
             </div>
           </div>
             <div className="image-wrapper [border-radius:10px]! [overflow:hidden]! [border:1px_solid_rgba(59,_130,_246,_0.2)]! [&_img]:[width:100%]! [&_img]:[display:block]!" style={{
            marginBottom: "15px"
          }}>
               <img src={profile_icon} alt="Profile Icon" />
             </div>
             <div className="image-wrapper [border-radius:10px]! [overflow:hidden]! [border:1px_solid_rgba(59,_130,_246,_0.2)]! [&_img]:[width:100%]! [&_img]:[display:block]!">
               <img src={profile_menu} alt="Profile Menu" />
           </div>
          </div>


          {/* Important Note */}
          <div className="important-note [margin-top:0px]! [background:rgba(15,_23,_42,_0.75)]! [border:1px_solid_rgba(59,_130,_246,_0.4)]! [border-radius:18px]! [padding:24px]!">
            <div className="note-content [display:flex]! [gap:16px]!">
              <AlertCircle className="note-icon [color:#60a5fa]! [width:26px]! [height:26px]!" />
              <div>
                <h4 className="note-title [color:#93c5fd]! [font-size:18px]! [font-weight:600]! [margin-bottom:6px]! max-[640.01px]:[font-size:20px]!">Important</h4>
                <p className="note-description [color:#e5e7eb]! [line-height:1.6]! max-[640.01px]:[font-size:17px]! max-[640.01px]:[line-height:1.7]!">
                  GitHub stars are optional for registration. If you do add a
                  GitHub username, use the exact username from your GitHub profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
