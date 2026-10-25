import React, { useEffect, useState } from "react";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPercent =
    totalCount > 0 ? Math.round((totalCompleted / totalCount) * 100) : 0;
  const radius = 48;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (totalPercent / 100) * circumference;

  const getPercent = (done, total) =>
    total > 0 ? Math.round((done / total) * 100) : 0;

  const renderProgressSections = () => (
    <>
      <div className="flex-[1_1_100px] max-md:flex-[1_1_20px] flex flex-col items-start justify-center !px-2 min-w-17.5 max-md:w-full max-md:!p-4 max-md:items-center max-md:text-center max-md:min-w-12">

        <div className="text-[1.2rem] font-bold !text-[#ff5656] !mb-2 text-shadow-[0_1px_5px_rgba(255,75,75,0.3)] max-md:text-center">
          Easy
        </div>
        <div className="text-[1.05rem] fond-md !text-[#dcdcdc] !mt-[0.4rem] text-left max-md:text-center">
          {easyCompleted} / {easyCount} 
        </div>
        <div className="w-full !mt-[0.4rem] max-md:max-w-[320px]">
          <div className="h-[8px] flex-1 !bg-black rounded-lg border-[1px] border-[#ff4d4d33] shadow-[inset_0_0_4px_#ff4d4d22] overflow-hidden easy-bar">
            <div
              className="h-full rounded-lg transition-[width] duration-400 ease-in-out shadow-[0_0_8px_#ff4d4d88] bg-[linear-gradient(90deg,#ff5e5e_0%,#ff1a1a_40%,#ff0066_100%)] bg-[linear-gradient(90deg, #ffbaba, #ff4d4d)]"
              style={{ width: `${getPercent(easyCompleted, easyCount)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-[1_1_100px] max-md:flex-[1_1_20px] flex flex-col items-start justify-center !px-2 min-w-17.5 max-md:w-full max-md:!p-4 max-md:items-center max-md:text-center max-md:min-w-12">
        <div className="text-[1.2rem] font-bold !text-[#ff5656] !mb-2 text-shadow-[0_1px_5px_rgba(255,75,75,0.3)] max-md:text-center">
          Medium
        </div>
        <div className="text-[1.05rem] fond-md !text-[#dcdcdc] !mt-[0.4rem] text-left max-md:text-center">
          {mediumCompleted} / {mediumCount} 
        </div>
        <div className="w-full !mt-[0.4rem] max-md:max-w-[320px]">
          <div className="h-[8px] flex-1 !bg-black rounded-lg border-[1px] border-[#ff4d4d33] shadow-[inset_0_0_4px_#ff4d4d22] overflow-hidden medium-bar">
            <div
              className="h-full rounded-lg transition-[width] duration-400 ease-in-out shadow-[0_0_8px_#ff4d4d88] bg-[linear-gradient(90deg,#ff5e5e_0%,#ff1a1a_40%,#ff0066_100%)] bg-[linear-gradient(90deg, #ffdab3, #ff944d)]"
              style={{ width: `${getPercent(mediumCompleted, mediumCount)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-[1_1_100px] max-md:flex-[1_1_20px] flex flex-col items-start justify-center !px-2 min-w-17.5 max-md:w-full max-md:!p-4 max-md:items-center max-md:text-center max-md:min-w-12">
        <div className="text-[1.2rem] font-bold !text-[#ff5656] !mb-2 text-shadow-[0_1px_5px_rgba(255,75,75,0.3)] max-md:text-center">
          Hard
        </div>
        <div className="text-[1.05rem] fond-md !text-[#dcdcdc] !mt-[0.4rem] text-left max-md:text-center">
          {hardCompleted} / {hardCount} 
        </div>
        <div className="w-full !mt-[0.4rem] max-md:max-w-[320px]">
          <div className="h-[8px] flex-1 !bg-black rounded-lg border-[1px] border-[#ff4d4d33] shadow-[inset_0_0_4px_#ff4d4d22] overflow-hidden hard-bar">
            <div
              className="h-full rounded-lg transition-[width] duration-400 ease-in-out shadow-[0_0_8px_#ff4d4d88] bg-[linear-gradient(90deg,#ff5e5e_0%,#ff1a1a_40%,#ff0066_100%)] bg-[linear-gradient(90deg, #ff8686, #c81d1d)]"
              style={{ width: `${getPercent(hardCompleted, hardCount)}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-wrap bg-[rgba(20,0,0,0.6)] rounded-3xl justify-normal w-92/100 max-w-[980px] !p-6 !my-4 !mx-auto box-border gap-2 border-[1.5px] border-[rgba(255,64,64,0.6)] transition-[box-shadow_0.4s_ease, transform_0.3s_ease] max-md:flex-col max-md:items-center max-md:!p-4 max-md:gap-6 max-md:w-97/100"
    style={{fontFamily : "'Inter', 'JetBrains Mono', monospace"}}>

      <div className="flex-[0_0_auto] max-md:flex-[1_1_20px] flex items-center justify-between max-md:justify-around max-md:border-r-none max-md:border-b-none !px-[1.2rem] min-w-[260px] max-w-[300px] max-md:w-full max-md:!p-0 max-md:items-center max-md:text-center max-md:max-w-none">
        <div className="flex flex-col justify-center items-start !mr-4 max-md:items-center max-md:text-center max-md:!mr-2">
          <div className="text-[1.2rem] font-bold !text-[#ff4b4b] !mb-2 text-shadow-[0_0_10px_rgba(255,75,75,0.3)]">
            Total Progress
          </div>
          <div className="text-[1.2rem] !mt-[4.8px] font-bold !text-[#fdfdfd] text-left max-md:text-[1.45rem]">
            {totalCompleted} / {totalCount} Completed
          </div>
        </div>
        <div className="relative flex items-center justify-center w-[96px] h-[96px] max-md:!mt-4">
          <svg
            className="w-[96px] h-[96px] block rotate-90"
            width={radius * 2}
            height={radius * 2}
          >
            <circle
              className="fill-none stroke-8 stroke-[#797979] opacity-20"
              cx={radius}
              cy={radius}
              r={normalizedRadius}
            />
            <circle
              className="fill-none stroke-8 stroke-[#ff6b6b] transition-[stroke-dashoffset] duration-700 ease-in-out"
              style={{strokeLinecap : 'round'}}
              cx={radius}
              cy={radius}
              r={normalizedRadius}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !text-[#ff6b6b] text-[1rem] font-bold text-shadow-[0_0_4px_rgba(255, 75, 75, 0.5)]">{totalPercent}%</div>
        </div>
      </div>

      {/* Conditional wrapper based on screen size */}
      {isMobile ? (
        <div className="flex items-center w-full justify-center max-md:!m-0">{renderProgressSections()}</div>
      ) : (
        renderProgressSections()
      )}
    </div>
  );
};

export default ProgressSummaryCard;
