import { useState } from "react";

const sections = [
  { title: "Introduction", description: "What this topic is and why it matters" },
  { title: "Concept", description: "Core idea and how it works" },
  { title: "YouTube", description: "Curated video explanations" },
  { title: "Common Patterns", description: "Where this technique is commonly used" },
  { title: "Classic Problems", description: "Frequently asked interview problems" },
  { title: "Interview Mistakes", description: "Common errors candidates make" }
];

function App() {
  const [expanded, setExpanded] = useState(null);
  const [dark, setDark] = useState(false);
  const [topic, setTopic] = useState("");
  const [course, setCourse] = useState(null);
  const [loadingCourse, setLoadingCourse] = useState(false);

  // AI section content state
  const [aiContent, setAiContent] = useState({});
  const [loadingSection, setLoadingSection] = useState(null);

  // Generate course structure
  async function generateCourse() {
    if (!topic) return;

    setLoadingCourse(true);
    setCourse(null);
    setAiContent({});
    setExpanded(null);

    try {
      const res = await fetch(
        `http://localhost:8000/course?topic=${encodeURIComponent(topic)}`
      );
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      alert("Backend error");
      console.error(err);
    }

    setLoadingCourse(false);
  }

  // Auto-generate AI content when section opens
  async function handleExpand(index, sectionTitle) {
    setExpanded(expanded === index ? null : index);

    if (!topic || aiContent[sectionTitle]) return;

    setLoadingSection(sectionTitle);

    try {
      const res = await fetch(
        `http://localhost:8000/ai/generate?topic=${encodeURIComponent(
          topic
        )}&section=${encodeURIComponent(sectionTitle)}`
      );
      const data = await res.json();

      setAiContent((prev) => ({
        ...prev,
        [sectionTitle]: data.content || "No content generated."
      }));
    } catch (err) {
      setAiContent((prev) => ({
        ...prev,
        [sectionTitle]: "AI generation failed."
      }));
    }

    setLoadingSection(null);
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen relative bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">

        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(transparent 95%, rgba(255,255,255,0.04) 100%), linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.04) 100%)",
            backgroundSize: "60px 60px"
          }}
        />

        <div className="relative z-10">

          {/* HEADER */}
          <div className="max-w-4xl mx-auto mb-10 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                {/* 🔒 STATIC HEADING */}
                <h1 className="text-4xl font-extrabold text-blue-400">
                  AI Course Builder
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Generate a structured DSA learning path
                </p>
              </div>

              <button
                onClick={() => setDark(!dark)}
                className="px-4 py-2 rounded bg-gray-800 text-white"
              >
                {dark ? "☀ Light" : "🌙 Dark"}
              </button>
            </div>

            {/* INPUT */}
            <div className="flex gap-3">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter DSA topic (e.g. DFS, Two Pointers)"
                className="flex-1 p-4 rounded-lg border dark:bg-gray-800"
              />
              <button
                onClick={generateCourse}
                className="px-6 rounded-lg bg-blue-600 text-white font-semibold"
              >
                Generate
              </button>
            </div>

            {loadingCourse && (
              <p className="text-center text-gray-400">
                Generating course structure...
              </p>
            )}
          </div>

          {/* SECTIONS */}
          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((section, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow">

                <button
                  onClick={() => handleExpand(index, section.title)}
                  className="w-full p-6 flex justify-between items-center"
                >
                  <div className="text-left">
                    <h2 className="text-2xl font-semibold">
                      {section.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {section.description}
                    </p>
                  </div>
                  <span className="text-2xl">
                    {expanded === index ? "−" : "+"}
                  </span>
                </button>

                {expanded === index && (
                  <div className="px-6 pb-6 text-lg text-gray-300 whitespace-pre-line">
                    {loadingSection === section.title && (
                      <p className="italic text-gray-400">
                        Generating AI content...
                      </p>
                    )}

                    {aiContent[section.title] && (
                      <p>{aiContent[section.title]}</p>
                    )}

                    {!loadingSection && !aiContent[section.title] && (
                      <p className="italic text-gray-500">
                        Expand to generate content
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
