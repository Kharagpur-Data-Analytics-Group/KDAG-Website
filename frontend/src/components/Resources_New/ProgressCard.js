import React from "react";
import "./ProgressCard.css";

const ProgressCard = ({ completed, total }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-card">
      <div className="progress-left">
        <div className="progress-label">Progress</div>
        <div className="progress-fraction">
          {completed} / {total}
        </div>
      </div>
      <div className="progress-right">
        <svg
          className="circular-progress"
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff3333" />
              <stop offset="100%" stopColor="#cc0000" />
            </linearGradient>
            <linearGradient id="gradGray" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#444" />
              <stop offset="100%" stopColor="#111" />
            </linearGradient>
          </defs>
          <circle
            className="bg-circle"
            cx={radius}
            cy={radius}
            r={normalizedRadius}
          />
          <circle
            className="fg-circle"
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <text
            x="50%"
            y="50%"
            className="progress-percent"
          >
            {percentage}%
          </text>
        </svg>
      </div>
    </div>
  );
};

export default ProgressCard;
