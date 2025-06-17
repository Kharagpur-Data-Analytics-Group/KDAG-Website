import { useState } from "react";
import DropdownSection from "./sheet.js";
import initialSections from "./course.json";
import "./course.css"; 

function App() {
  const [sections, setSections] = useState(initialSections);
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggleCompleted = (sectionIdx, itemIdx) => {
    setSections(prevSections =>
      prevSections.map((section, sIdx) =>
        sIdx === sectionIdx
          ? {
              ...section,
              items: section.items.map((item, iIdx) =>
                iIdx === itemIdx
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : section
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black px-2 py-8 dd-container">
      <div className="w-full max-w-3xl">
        {sections.map((section, idx) => (
          <DropdownSection
            key={idx}
            title={section.title}
            items={section.items}
            open={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            isFirst={idx === 0}
            isLast={idx === sections.length - 1}
            onToggleCompleted={itemIdx => handleToggleCompleted(idx, itemIdx)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
