// App.js
import { useEffect, useState } from "react";
import DropdownSection from "./sheet.js";
import initialSections from "./course.json";
import ProgressCard from "./ProgressCard.js";
import Header from "./Header/Header.js";
import "./course.css";

function App() {
  const BASE_URL = process.env.REACT_APP_FETCH_URL;

  const [sections, setSections] = useState(initialSections);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (loading) {
      document.body.classList.add("hide-footer");
    } else {
      document.body.classList.remove("hide-footer");
    }
    return () => document.body.classList.remove("hide-footer");
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`${BASE_URL}/resources/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch course data");
        const data = await res.json();

        const updatedSections = data[0]?.sections || [];

        const merged = initialSections.map((initialSection) => {
          const matchingBackendSection = updatedSections.find(
            (s) => s.title === initialSection.title
          );

          if (!matchingBackendSection) return initialSection;

          return {
            ...initialSection,
            items: initialSection.items.map((initialItem) => {
              const matchingBackendItem = matchingBackendSection.items.find(
                (i) => i.name === initialItem.name
              );

              return {
                ...initialItem,
                ...(matchingBackendItem || {}),
                resource: initialItem.resource,
              };
            }),
          };
        });

        setSections(merged);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [BASE_URL]);

  // Progress calculations
  const totalSubtopics = initialSections.reduce(
    (total, section) => total + section.items.length,
    0
  );
  const totalCompleted = sections.reduce(
    (total, section) =>
      total + section.items.filter((item) => item.completed).length,
    0
  );
  const easyCount = initialSections.reduce(
    (total, section) =>
      total + section.items.filter((item) => item.difficulty === "Easy").length,
    0
  );
  const mediumCount = initialSections.reduce(
    (total, section) =>
      total +
      section.items.filter((item) => item.difficulty === "Medium").length,
    0
  );
  const hardCount = initialSections.reduce(
    (total, section) =>
      total + section.items.filter((item) => item.difficulty === "Hard").length,
    0
  );
  const easyCompleted = sections.reduce(
    (total, section) =>
      total +
      section.items.filter(
        (item) => item.difficulty === "Easy" && item.completed
      ).length,
    0
  );
  const mediumCompleted = sections.reduce(
    (total, section) =>
      total +
      section.items.filter(
        (item) => item.difficulty === "Medium" && item.completed
      ).length,
    0
  );
  const hardCompleted = sections.reduce(
    (total, section) =>
      total +
      section.items.filter(
        (item) => item.difficulty === "Hard" && item.completed
      ).length,
    0
  );

  const handleToggleCompleted = async (sectionIdx, itemIdx) => {
    const section = sections[sectionIdx];
    const item = section.items[itemIdx];
    const newValue = !item.completed;

    try {
      const token = localStorage.getItem("access_token");
      await fetch(`${BASE_URL}/resources/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          section_title: section.title,
          item_name: item.name, 
          field: "completed",
          value: newValue,
        }),
      });

      setSections((prev) =>
        prev.map((sec, sIdx) =>
          sIdx === sectionIdx
            ? {
                ...sec,
                items: sec.items.map((itm, iIdx) =>
                  iIdx === itemIdx ? { ...itm, completed: newValue } : itm
                ),
              }
            : sec
        )
      );
    } catch (err) {
      console.error("Error updating completion status:", err);
    }
  };

  const handleToggleRevision = async (sectionIdx, itemIdx) => {
    const section = sections[sectionIdx];
    const item = section.items[itemIdx];
    const newValue = !item.revision;

    try {
      const token = localStorage.getItem("access_token");
      await fetch(`${BASE_URL}/resources/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          section_title: section.title,
          item_name: item.name, 
          field: "revision",
          value: newValue,
        }),
      });

      setSections((prev) =>
        prev.map((sec, sIdx) =>
          sIdx === sectionIdx
            ? {
                ...sec,
                items: sec.items.map((itm, iIdx) =>
                  iIdx === itemIdx ? { ...itm, revision: newValue } : itm
                ),
              }
            : sec
        )
      );
    } catch (err) {
      console.error("Error updating revision status:", err);
    }
  };

  if (loading)
    return (
      <div className="custom-loading-container">
        <div className="custom-loading-spinner"></div>
        <div className="custom-loading-text">Loading Resources...</div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black px-2 py-8 app-container">
      <Header />
      <ProgressCard
        totalCompleted={totalCompleted}
        totalCount={totalSubtopics}
        easyCompleted={easyCompleted}
        easyCount={easyCount}
        mediumCompleted={mediumCompleted}
        mediumCount={mediumCount}
        hardCompleted={hardCompleted}
        hardCount={hardCount}
      />
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
            onToggleRevision={(itemIdx) => handleToggleRevision(idx, itemIdx)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
