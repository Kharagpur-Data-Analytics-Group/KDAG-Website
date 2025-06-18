// App.js
import { useState } from "react";
import DropdownSection from "./sheet.js";
import initialSections from "./course.json";
import CircularProgress from "./ProgressCard.js";
import "./course.css";

function App() {
  const [sections, setSections] = useState(initialSections);
  const totalSubtopics = initialSections.reduce(
    (total, section) => total + section.items.length,
    0
  );
  const totalCompleted = sections.reduce(
    (total, section) => total + section.items.filter((item) => item.completed).length,
    0
  );
  const [openIndex, setOpenIndex] = useState(null);

  const percentage = ((totalCompleted / totalSubtopics) * 100).toFixed(1);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (circumference * percentage) / 100;

  const handleToggleCompleted = (sectionIdx, itemIdx) => {
    setSections((prevSections) =>
      prevSections.map((section, sIdx) =>
        sIdx === sectionIdx
          ? {
              ...section,
              items: section.items.map((item, iIdx) =>
                iIdx === itemIdx ? { ...item, completed: !item.completed } : item
              ),
            }
          : section
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black px-2 py-8 app-container">
      <CircularProgress completed={totalCompleted} total={totalSubtopics}/>
      <div className="w-full max-w-3xl mt-6">
        {sections.map((section, idx) => (
          <DropdownSection
            key={idx}
            title={section.title}
            items={section.items}
            open={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            isFirst={idx === 0}
            isLast={idx === sections.length - 1}
            onToggleCompleted={(itemIdx) => handleToggleCompleted(idx, itemIdx)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;