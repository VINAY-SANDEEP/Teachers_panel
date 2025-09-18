import { useState, useEffect } from "react";

function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // ✅ Sample data instead of API
    const sampleData = [
      {
        _id: "1",
        title: "Introduction to AI",
        description: "Basics of Artificial Intelligence and its applications.",
        unitName: "Unit 1",
        className: "AIML - II Year",
        videoUrl: "https://www.youtube.com/watch?v=1t2zzv8sLxM",
        notesUrl: "https://example.com/ai-notes.pdf",
      },
      {
        _id: "2",
        title: "Data Structures",
        description: "Understanding arrays, linked lists, and stacks.",
        unitName: "Unit 2",
        className: "CSE - II Year",
        videoUrl: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
        notesUrl: "https://example.com/dsa-notes.pdf",
      },
      {
        _id: "3",
        title: "ReactJS Basics",
        description: "Learn components, props, and state management.",
        unitName: "Unit 3",
        className: "Web Development",
        videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
      },
    ];
    setTopics(sampleData);
  }, []);

  function handleDelete(id) {
    if (!window.confirm("Delete this topic?")) return;
    setTopics((prev) => prev.filter((t) => t._id !== id));
  }

  // ✅ Filtered topics based on search input
  const filteredTopics = topics.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Topics</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search topics..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />

      <div className="space-y-3">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((t) => (
            <div
              key={t._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{t.title}</h3>
                <p className="text-sm text-gray-600">{t.description}</p>
                <p className="text-xs text-gray-400">
                  {t.unitName} | {t.className}
                </p>
                <a
                  href={t.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm"
                >
                  ▶ Watch Video
                </a>
                {t.notesUrl && (
                  <a
                    href={t.notesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 text-green-600 text-sm"
                  >
                    📄 Notes
                  </a>
                )}
              </div>
              <button
                onClick={() => handleDelete(t._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No topics found.</p>
        )}
      </div>
    </div>
  );
}

export default TopicsPage;
