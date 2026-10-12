import { useRef, useEffect, useState, useContext } from "react";
import LoginPrompt from "./LoginPrompt.jsx";
import AuthStatus from "../AuthenticationPages/AuthStatus.jsx";
import { AuthContext } from "../../context/AuthContext";
const Chevron = ({ open }) => (
  <svg
    className={`inline-block align-middle h-[1.3em] w-[1.3em] transition-transform duration-300 ease-in-out ${open ? " rotate-90" : "rotate-0"}`}
    width="22"
    height="22"
    viewBox="0 0 22 22"
    style={{ marginLeft : '2px', marginRight : '2px'  }}
  >
    <polyline
      points="7,6 12,11 7,16"
      fill="none"
      stroke="#ff4040"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-[#ff4040]"
    />
  </svg>
);

const DropdownSection = ({
  title,
  items,
  open,
  onToggle,
  onToggleCompleted,
  onToggleRevision,
}) => {

  const { isLoggedIn } = useContext(AuthContext);
  const [showPrompt, setShowPrompt] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");
  const [shouldRender, setShouldRender] = useState(open);

  const completed = items.filter((i) => i.completed).length;
  const total = items.length;
  const progressPercent = total > 0 ? (completed / total) * 100 : 0;

  useEffect(() => {
  
    setShowPrompt(false);
    if (open) {
      setShouldRender(true);
      setTimeout(() => {
        if (contentRef.current) {
          setMaxHeight(contentRef.current.scrollHeight + "px");
        }
      }, 10);
    } else {
      if (contentRef.current) {
        setMaxHeight(contentRef.current.scrollHeight + "px");
      }
      setTimeout(() => {
        setMaxHeight("0px");
      }, 10);
      const timeout = setTimeout(() => setShouldRender(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  const handleCheckboxClick = (idx) => {
    if (!isLoggedIn) {
      setShowPrompt(true);
      return;
    }
    onToggleCompleted(idx);
  };

  const handleRevisionClick = (idx) => {
    if (!isLoggedIn) {
      setShowPrompt(true);
      return;
    }
    onToggleRevision(idx);
  };

  // const addDifficultyClass = (e) => {
  //   if (e === 'easy') {
  //     return 'bg-[linear-gradient(145deg,#00ff99,#00cc77) !text-[#0a0a0a] shadow-[0_0_8px_#00ff9966]'
  //   }
  //   else if (e === 'medium') {
  //     return 'bg-[linear-gradient(145deg,#ffe066,#ffc400)] !text-[#0a0a0a] shadow-[0_0_8px_#ffc40066]'
  //   }
  //   else if (e==='hard'){
  //     return 'bg-[linear-gradient(145deg,#ff3b3b,#c30000)] !text-white shadow-[0_0_8px_#ff3b3b66]'
  //   }
  // }

  return (
    <div className="bg-[rgba(12, 0, 0, 0.85)] !m-4.5 max-md:w-97/100 max-md:!m-1.25 rounded-[16px] border-[1.5px] border-[#ff404040] opacity-95 shadow-[0_0_12px_rgba(255,50,50,0.2),0_0_28px_rgba(255,10,10,0.08)] transition-shadow duration-300 ease-in-out" 
    >
      <LoginPrompt open={showPrompt} onClose={() => setShowPrompt(false)} />
      <div className="max-md:w-full block gap-[18px] items-center !px-[1.5rem] !py-[0.5rem] cursor-pointer rounded-2xl border-b-[1px] border-[#ff1a1a44] hover:shadow-[0_0_10px_#ff1a1a33] hover:bg-[linear-gradient(90deg,#300008_0%,#4d000f_100%)] " onClick={onToggle}>

        <Chevron open={open} />

        <span className="font-bold text-[1.45rem] text-shadow-[0_0_12px_rgba(255,50,50,0.6)] align-middle !mr-auto  overflow-visible max-w-[calc(100% - 160px)] whitespace-normal max-md:text-[1.9rem]"
        style={{fontFamily : '"JetBrains Mono", monospace', color : '#ff3333'}}>
            {title}
        </span>
        <div className="flex items-center gap-[14px] min-w-[180px]">
          <div className="h-[8px] flex-1 bg-black rounded-[8px] border-[1px] border-[#ff4d4d33] shadow-[inset_0_0_4px_#ff4d4d22] overflow-hidden"
          >
            <div
              className="h-full bg-[linear-gradient(90deg, #ff1a1a, #ff3b3b, #ff5e5e)] rounded-[6px_0_0_6px] shadow-[0_0_6px_#ff4d4d88] transition-[width] duration-400 ease-in-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[0.92rem] font-bold max-md:text-[0.8rem]"
          style={{color: '#ff7b7b', fontFamily : '"JetBrains Mono", monospace'}}>
            {`${completed} / ${total}`}
          </span>
        </div>
      </div>
      <div
        ref={contentRef}
        className="bg-[#0f0006] transition-[max-height] duration-400 ease-in-out overflow-hidden rounded-2xl"
        style={{
          maxHeight,
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        {shouldRender && (
          <div className="!p-[22px] overflow-x-auto max-md:!p-[10px">
            <table className="w-full  text-[0.96rem] min-w-160 max-md:text-[0.85rem] max-md:min-w-full"
            style={{color : '#f3f3f3', fontFamily : '"Inter", monospace'}}>
              <thead>
                <tr>
                  <th className="text-[0.82rem] bg-[#1c0008] font-bold uppercase !py-[14px] !px-[12px] max-md:!py-[8px] max-md:!px-[6px] max-md:text-[0.85rem] align-middle  tracking-[0.05em] text-center border-b-[1px] border-[#3a0a13]"
                  style={{color : '#ff6666', fontFamily : '"JetBrains Mono", monospace'}}>
                    Status
                  </th>
                  <th className="text-[0.82rem] bg-[#1c0008] font-bold uppercase !py-[14px] !px-[12px] max-md:!py-[8px] max-md:!px-[6px] max-md:text-[0.85rem] align-middle  tracking-[0.05em] subtopic border-b-[1px] border-[#3a0a13]"
                  style={{color : '#ff6666', fontFamily : '"JetBrains Mono", monospace'}}>
                    Subtopic
                  </th>
                  <th className="text-[0.82rem] bg-[#1c0008] font-bold uppercase !py-[14px] !px-[12px] max-md:!py-[8px] max-md:!px-[6px] max-md:text-[0.85rem] align-middle  tracking-[0.05em] text-center border-b-[1px] border-[#3a0a13]"
                  style={{color : '#ff6666', fontFamily : '"JetBrains Mono", monospace'}}>
                    Resources
                  </th>
                  <th className="text-[0.82rem] bg-[#1c0008] font-bold uppercase !py-[14px] !px-[12px] max-md:!py-[8px] max-md:!px-[6px] max-md:text-[0.85rem] align-middle  tracking-[0.05em] text-center border-b-[1px] border-[#3a0a13]"
                  style={{color : '#ff6666', fontFamily : '"JetBrains Mono", monospace'}}>
                    Revision
                  </th>
                  <th className="text-[0.82rem] bg-[#1c0008] font-bold uppercase !py-[14px] !px-[12px] max-md:!py-[8px] max-md:!px-[6px] max-md:text-[0.85rem] align-middle  tracking-[0.05em] text-center border-b-[1px] border-[#3a0a13]"
                  style={{color : '#ff6666', fontFamily : '"JetBrains Mono", monospace'}}>
                    Difficulty
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr className="hover:bg-[rgba(255,30,30,0.05)]" key={idx}>
                    <td className="!px-3 !py-3.5 max-md:!py-2 max-md:!px-1.5 max-md:text-[0.85rem] align-middle font-medium border-b-[1px] border-[#3a0a13] text-center !pt-4.5 !pb-2.5 !font-['Inter', monospace]">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleCheckboxClick(idx)}
                        className="w-[18px]! h-[18px]!"
                      />
                    </td>
                    <td className="!px-3 !py-3.5 max-md:!py-2 max-md:!px-1.5 max-md:text-[0.85rem] align-middle font-medium border-b-[1px] border-[#3a0a13]  !font-['Inter', monospace]">
                      {item.name}
                    </td>
                    <td className="!px-3 !py-3.5 max-md:!py-2 max-md:!px-1.5 max-md:text-[0.85rem] align-middle font-medium border-b-[1px] border-[#3a0a13] text-center align-middle h-full !font-['Inter', monospace]">
                      {item.resource ? (
                        <a
                          href={isLoggedIn ? item.resource : "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#ff4040", textDecoration: "underline", cursor: "pointer" }}
                          onClick={(e) => {
                            if (!isLoggedIn) {
                              e.preventDefault(); // stop navigation
                              setShowPrompt(true); // show your warning/prompt
                              return;
                            }
                          }}
                        >
                          Link
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="!px-[12px] !py-[14px] max-md:!py-[8px] max-md:!px-[6px] max-md:text-[0.85rem] align-middle font-medium border-b-[1px] text-center border-[#3a0a13] !font-['Inter', monospace]">
                      <button
                        className={`bg-none border-none cursor-pointer outline-none inline-flex items-center justify-center duration-200 transition-[filter] focus:outline-[2px_solid_#ff4040] ${
                          item.revision ? " active" : ""
                        }`}
                        aria-label="Toggle Revision"
                        onClick={() => handleRevisionClick(idx)}
                        type="button"
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill={item.revision ? "#ff4040" : "#bbb"}
                          stroke={item.revision ? "#ff4040" : "#bbb"}
                          className="block w-[22px] h-[22px] max-md:w-[18px] max-md:h-[18px]"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            filter: item.revision
                              ? "drop-shadow(0 0 4px #ff4040aa)"
                              : "none",
                            transition: "fill 0.2s, stroke 0.2s",
                          }}
                        >
                          <path
                            d="M6 3C4.89543 3 4 3.89543 4 5V19C4 19.5523 4.44772 20 5 20C5.27614 20 5.52614 19.8611 5.70711 19.6464L11 13.382L16.2929 19.6464C16.4739 19.8611 16.7239 20 17 20C17.5523 20 18 19.5523 18 19V5C18 3.89543 17.1046 3 16 3H6Z"
                            fill={item.revision ? "#ff4040" : "#bbb"}
                            stroke={item.revision ? "#ff4040" : "#bbb"}
                            strokeWidth="1.5"
                          />
                        </svg>
                      </button>
                    </td>
                    <td className="!px-3 !py-3.5 max-md:!py-2 max-md:!px-1.5 max-md:text-[0.85rem] align-middle font-medium border-b-[1px] border-[#3a0a13] text-center align-middle h-full !font-['Inter', monospace]">
                      {item.difficulty ? (
                        <span
                          className={`inline-block !py-1.25 !px-3 text-[0.8rem] font-bold rounded-full text-center shadow-[0_1px_6px_#ff1a1a55] ${item.difficulty.toLowerCase() === 'easy' ? "bg-[linear-gradient(145deg,#00ff99,#00cc77)] !text-[#0a0a0a] shadow-[0_0_8px_#00ff9966]" : item.difficulty.toLowerCase() === 'medium' ? "bg-[linear-gradient(145deg,#ffe066,#ffc400)] !text-[#0a0a0a] shadow-[0_0_8px_#ffc40066]" : "bg-[linear-gradient(145deg,#ff3b3b,#c30000)] !text-white shadow-[0_0_8px_#ff3b3b66]"}`}
                        >
                          {item.difficulty}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownSection;
