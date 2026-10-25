import React, { useEffect, useState } from "react";
const ProgressSummaryCard = ({
  totalCompleted,
  totalCount,
  easyCompleted,
  easyCount,
  mediumCompleted,
  mediumCount,
  hardCompleted,
  hardCount
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const totalPercent = totalCount > 0 ? Math.round(totalCompleted / totalCount * 100) : 0;
  const radius = 48;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - totalPercent / 100 * circumference;
  const getPercent = (done, total) => total > 0 ? Math.round(done / total * 100) : 0;
  const renderProgressSections = () => <>
      <div className="progress-section [flex:1_1_100px]! [display:flex]! [flex-direction:column]! [align-items:flex-start]! [justify-content:center]! [padding:0_0.5rem]! [min-width:70px]! max-[768.01px]:[flex:1_1_20px]! max-[768.01px]:[width:100%]! max-[768.01px]:[padding:1rem]! max-[768.01px]:[align-items:center]! max-[768.01px]:[text-align:center]! max-[768.01px]:[min-width:3rem]!">
        <div className="progress-title [font-size:1.2rem]! [font-weight:700]! [color:#ff5656]! [margin-bottom:0.5rem]! [text-shadow:0_1px_5px_rgba(255,_75,_75,_0.3)]! max-[768.01px]:[text-align:center]!">Easy</div>
        <div className="progress-fraction [font-size:1.05rem]! [font-weight:500]! [color:#dcdcdc]! [margin-top:0.4rem]! [text-align:left]! max-[768.01px]:[text-align:center]!">
          {easyCompleted} / {easyCount}
        </div>
        <div className="horizontal-progress [width:100%]! [margin-top:0.4rem]! max-[768.01px]:[margin-top:0.4rem]! max-[768.01px]:[width:100%]! max-[768.01px]:[max-width:320px]!">
          <div className="progress-bar [height:8px]! [flex:1]! [background-color:rgb(0,_0,_0)]! [border-radius:8px]! [border:1px_solid_#ff4d4d33]! [box-shadow:inset_0_0_4px_#ff4d4d22]! [overflow:hidden]! easy-bar">
            <div className="progress-fill [height:100%]! [border-radius:8px]! [transition:width_0.4s_ease]! [box-shadow:0_0_8px_#ff4d4d88]! easy-fill [background:linear-gradient(90deg,_#ffbaba,_#ff4d4d)]!" style={{
            width: `${getPercent(easyCompleted, easyCount)}%`
          }} />
          </div>
        </div>
      </div>

      <div className="progress-section [flex:1_1_100px]! [display:flex]! [flex-direction:column]! [align-items:flex-start]! [justify-content:center]! [padding:0_0.5rem]! [min-width:70px]! max-[768.01px]:[flex:1_1_20px]! max-[768.01px]:[width:100%]! max-[768.01px]:[padding:1rem]! max-[768.01px]:[align-items:center]! max-[768.01px]:[text-align:center]! max-[768.01px]:[min-width:3rem]!">
        <div className="progress-title [font-size:1.2rem]! [font-weight:700]! [color:#ff5656]! [margin-bottom:0.5rem]! [text-shadow:0_1px_5px_rgba(255,_75,_75,_0.3)]! max-[768.01px]:[text-align:center]!">Medium</div>
        <div className="progress-fraction [font-size:1.05rem]! [font-weight:500]! [color:#dcdcdc]! [margin-top:0.4rem]! [text-align:left]! max-[768.01px]:[text-align:center]!">
          {mediumCompleted} / {mediumCount}
        </div>
        <div className="horizontal-progress [width:100%]! [margin-top:0.4rem]! max-[768.01px]:[margin-top:0.4rem]! max-[768.01px]:[width:100%]! max-[768.01px]:[max-width:320px]!">
          <div className="progress-bar [height:8px]! [flex:1]! [background-color:rgb(0,_0,_0)]! [border-radius:8px]! [border:1px_solid_#ff4d4d33]! [box-shadow:inset_0_0_4px_#ff4d4d22]! [overflow:hidden]! medium-bar">
            <div className="progress-fill [height:100%]! [border-radius:8px]! [transition:width_0.4s_ease]! [box-shadow:0_0_8px_#ff4d4d88]! medium-fill [background:linear-gradient(90deg,_#ffdab3,_#ff944d)]!" style={{
            width: `${getPercent(mediumCompleted, mediumCount)}%`
          }} />
          </div>
        </div>
      </div>

      <div className="progress-section [flex:1_1_100px]! [display:flex]! [flex-direction:column]! [align-items:flex-start]! [justify-content:center]! [padding:0_0.5rem]! [min-width:70px]! max-[768.01px]:[flex:1_1_20px]! max-[768.01px]:[width:100%]! max-[768.01px]:[padding:1rem]! max-[768.01px]:[align-items:center]! max-[768.01px]:[text-align:center]! max-[768.01px]:[min-width:3rem]!">
        <div className="progress-title [font-size:1.2rem]! [font-weight:700]! [color:#ff5656]! [margin-bottom:0.5rem]! [text-shadow:0_1px_5px_rgba(255,_75,_75,_0.3)]! max-[768.01px]:[text-align:center]!">Hard</div>
        <div className="progress-fraction [font-size:1.05rem]! [font-weight:500]! [color:#dcdcdc]! [margin-top:0.4rem]! [text-align:left]! max-[768.01px]:[text-align:center]!">
          {hardCompleted} / {hardCount}
        </div>
        <div className="horizontal-progress [width:100%]! [margin-top:0.4rem]! max-[768.01px]:[margin-top:0.4rem]! max-[768.01px]:[width:100%]! max-[768.01px]:[max-width:320px]!">
          <div className="progress-bar [height:8px]! [flex:1]! [background-color:rgb(0,_0,_0)]! [border-radius:8px]! [border:1px_solid_#ff4d4d33]! [box-shadow:inset_0_0_4px_#ff4d4d22]! [overflow:hidden]! hard-bar">
            <div className="progress-fill [height:100%]! [border-radius:8px]! [transition:width_0.4s_ease]! [box-shadow:0_0_8px_#ff4d4d88]! hard-fill [background:linear-gradient(90deg,_#ff8686,_#c81d1d)]!" style={{
            width: `${getPercent(hardCompleted, hardCount)}%`
          }} />
          </div>
        </div>
      </div>
    </>;
  return <div className="progress-summary-card [display:flex]! [flex-wrap:wrap]! [flex-direction:row]! [background:rgba(20,_0,_0,_0.6)]! [border-radius:1.5rem]! [width:92%]! [max-width:980px]! [padding:1.5rem]! [font-family:'Inter',_'JetBrains_Mono',_monospace]! [margin:1rem_auto]! [box-sizing:border-box]! [gap:0.5rem]! [border:1.5px_solid_rgba(255,_64,_64,_0.6)]! [transition:box-shadow_0.4s_ease,_transform_0.3s_ease]! max-[768.01px]:[flex-direction:column]! max-[768.01px]:[align-items:center]! max-[768.01px]:[padding:1rem]! max-[768.01px]:[gap:1.5rem]! max-[768.01px]:[width:97%]!"><style>{"@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;600;700&display=swap')"}</style>
      <div className="progress-section total-progress-section [display:flex]! [flex-direction:row]! [align-items:center]! [justify-content:space-between]! [min-width:260px]! [max-width:300px]! [flex:0_0_auto]! [padding:0_1.2rem]! max-[768.01px]:[flex:1_1_20px]! max-[768.01px]:[justify-content:space-around]! max-[768.01px]:[border-right:none]! max-[768.01px]:[border-bottom:none]! max-[768.01px]:[padding:1rem]! max-[768.01px]:[max-width:none]! max-[768.01px]:[width:100%]! max-[768.01px]:[text-align:center]! max-[768.01px]:[min-width:3rem]!">
        <div className="total-text-group [display:flex]! [flex-direction:column]! [justify-content:center]! [align-items:flex-start]! [margin-right:1rem]! max-[768.01px]:[align-items:center]! max-[768.01px]:[text-align:center]! max-[768.01px]:[margin:0_0_0.5rem_0]!">
          <div className="progress-title total-title [font-size:1.2rem]! [font-weight:700]! [color:#ff5656]! [margin-bottom:0.5rem]! [text-shadow:0_1px_5px_rgba(255,_75,_75,_0.3)]! max-[768.01px]:[text-align:center]! max-[768.01px]:[font-size:1.7rem]!">Total Progress</div>
          <div className="progress-fraction total-fraction [font-size:1.2rem]! [font-weight:700]! [color:#fdfdfd]! [margin-top:0.4rem]! [text-align:left]! max-[768.01px]:[text-align:center]! max-[768.01px]:[font-size:1.45rem]!">
            {totalCompleted} / {totalCount} Completed
          </div>
        </div>
        <div className="circle-progress-wrapper [position:relative]! [display:flex]! [align-items:center]! [justify-content:center]! [width:96px]! [height:96px]! max-[768.01px]:[margin-top:1rem]!">
          <svg className="circular-progress [width:96px]! [height:96px]! [display:block]! [transform:rotate(-90deg)]!" width={radius * 2} height={radius * 2}>
            <circle className="bg-circle [fill:none]! [stroke-width:8]! [stroke:#797979]! [opacity:0.2]!" cx={radius} cy={radius} r={normalizedRadius} />
            <circle className="fg-circle [fill:none]! [stroke-width:8]! [stroke:#ff6b6b]! [stroke-linecap:round]! [transition:stroke-dashoffset_0.7s_ease-in-out]!" cx={radius} cy={radius} r={normalizedRadius} strokeDasharray={circumference} strokeDashoffset={offset} />
          </svg>
          <div className="progress-percent [position:absolute]! [top:50%]! [left:50%]! [transform:translate(-50%,_-50%)]! [color:#ff6b6b]! [font-size:1rem]! [font-weight:700]! [text-shadow:0_0_4px_rgba(255,_75,_75,_0.5)]!">{totalPercent}%</div>
        </div>
      </div>

      {/* Conditional wrapper based on screen size */}
      {isMobile ? <div className="d-progress-section [display:flex]! [flex-direction:row]! [align-items:center]! [justify-content:center]! [width:100%]! max-[768.01px]:[flex-direction:row]! max-[768.01px]:[align-items:center]! max-[768.01px]:[justify-content:center]! max-[768.01px]:[width:100%]! max-[768.01px]:[margin:0]!">{renderProgressSections()}</div> : renderProgressSections()}
    </div>;
};
export default ProgressSummaryCard;
