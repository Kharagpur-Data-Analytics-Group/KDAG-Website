import React from "react";
import "./ProgressCard.css";

const ProgressSummaryCard = ({
  totalCompleted,
  totalCount,
  easyCompleted,
  easyCount,
  mediumCompleted,
  mediumCount,
  hardCompleted,
  hardCount,
}) => {
  const totalPercent =
    totalCount > 0 ? Math.round((totalCompleted / totalCount) * 100) : 0;
  const radius = 48;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (totalPercent / 100) * circumference;

  const getPercent = (done, total) =>
    total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="progress-summary-card">
      <div className="progress-section total-progress-section">
        <div className="total-text-group">
          <div className="progress-title total-title">Total Progress</div>
          <div className="progress-fraction total-fraction">
            {totalCompleted} / {totalCount}
          </div>
        </div>
        <div className="circle-progress-wrapper">
          <svg
            className="circular-progress"
            width={radius * 2}
            height={radius * 2}
          >
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
          </svg>
          <div className="progress-percent">{totalPercent}%</div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-title">Easy</div>
        <div className="progress-fraction">
          {easyCompleted} / {easyCount} completed
        </div>
        <div className="horizontal-progress">
          <div className="progress-bar easy-bar">
            <div
              className="progress-fill easy-fill"
              style={{ width: `${getPercent(easyCompleted, easyCount)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-title">Medium</div>
        <div className="progress-fraction">
          {mediumCompleted} / {mediumCount} completed
        </div>
        <div className="horizontal-progress">
          <div className="progress-bar medium-bar">
            <div
              className="progress-fill medium-fill"
              style={{ width: `${getPercent(mediumCompleted, mediumCount)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-title">Hard</div>
        <div className="progress-fraction">
          {hardCompleted} / {hardCount} completed
        </div>
        <div className="horizontal-progress">
          <div className="progress-bar hard-bar">
            <div
              className="progress-fill hard-fill"
              style={{ width: `${getPercent(hardCompleted, hardCount)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSummaryCard;
