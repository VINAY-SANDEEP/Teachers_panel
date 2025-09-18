// College Admin Panel - React + Tailwind with Backend API Integration
// Paste this in src/App.jsx of a Vite React project
// Dependencies: axios, react-router-dom, recharts, framer-motion, react-icons, tailwindcss

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiMessageSquare,
  FiUpload,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import Topics from "./components/Topics";

// ================== API BASE URL ==================
const API = axios.create({
  baseURL: "http://localhost:5000/api", // change if deployed
});

// API calls
const addTopic = (formData) =>
  API.post("/add-topic", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
const getTopics = () => API.get("/topics");
const deleteTopic = (id) => API.delete(`/topic/${id}`);

// ================== Sample Data ==================
const studentData = [
  { name: "Amit", watched: true },
  { name: "Priya", watched: false },
  { name: "Kiran", watched: true },
  { name: "Sneha", watched: false },
];

const doubtsMock = [
  { from: "student", text: "Sir, what is polymorphism?" },
  {
    from: "teacher",
    text: "Polymorphism allows different implementations of the same method.",
  },
  { from: "student", text: "Can you give an example?" },
  { from: "teacher", text: "Sure, let’s take shape class with circle and square..." },
];

const COLORS = ["#60A5FA", "#BFDBFE"];

// ================== Components ==================
function Topbar({ setShowLogin, setShowRegister }) {
  return (
    <div className="bg-white/70 backdrop-blur shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-md bg-blue-200 flex items-center justify-center shadow-sm">
          <span className="font-bold text-blue-700">CE</span>
        </div>
        <h1 className="text-lg font-semibold hidden sm:block">
          College Admin Panel
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowLogin(true)}
          className="flex items-center gap-2 px-3 py-2 bg-white border rounded-md hover:shadow"
        >
          <FiLogIn /> Login
        </button>
        <button
          onClick={() => setShowRegister(true)}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:scale-105"
        >
          <FiUserPlus /> Register
        </button>
      </div>
    </div>
  );
}

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 ${
      isActive ? "bg-blue-100 text-blue-700 font-semibold" : ""
    }`;

  return (
    <aside className="w-52 bg-white/80 backdrop-blur border-r p-4 min-h-screen">
      <nav className="flex flex-col gap-3">
        <NavLink to="/" className={linkClass}>
          <FiHome /> Home
        </NavLink>
        <NavLink to="/topics" className={linkClass}>
          <FiBook /> Topics
        </NavLink>
        <NavLink to="/students" className={linkClass}>
          <FiUsers /> Students
        </NavLink>
        <NavLink to="/doubts" className={linkClass}>
          <FiMessageSquare /> Doubts
        </NavLink>
        <NavLink to="/upload" className={linkClass}>
          <FiUpload /> Upload
        </NavLink>
      </nav>
    </aside>
  );
}

function Dashboard() {
  const watchedCount = studentData.filter((s) => s.watched).length;
  const notWatchedCount = studentData.length - watchedCount;
  const pieData = [
    { name: "Watched", value: watchedCount },
    { name: "Not Watched", value: notWatchedCount },
  ];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div className="p-4 rounded-xl bg-white shadow">
          <p>Total Students</p>
          <h2 className="text-xl font-bold">{studentData.length}</h2>
        </div>
        <div className="p-4 rounded-xl bg-white shadow">
          <p>Watched</p>
          <h2 className="text-xl font-bold">{watchedCount}</h2>
        </div>
        <div className="p-4 rounded-xl bg-white shadow">
          <p>Not Watched</p>
          <h2 className="text-xl font-bold">{notWatchedCount}</h2>
        </div>
      </motion.div>
      <div className="mt-6 bg-white rounded-xl shadow p-6 flex justify-center">
        <div className="w-full max-w-md mx-auto">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={40}
                outerRadius={80}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StudentsPage() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Students</h2>
      <ul className="space-y-2">
        {studentData.map((s, idx) => (
          <li
            key={idx}
            className="p-3 bg-white rounded shadow flex justify-between"
          >
            <span>{s.name}</span>
            <span className={s.watched ? "text-green-600" : "text-red-600"}>
              {s.watched ? "Watched" : "Not Watched"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DoubtsPage() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Doubts</h2>
      <div className="space-y-3">
        {doubtsMock.map((d, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl max-w-md ${
              d.from === "student" ? "bg-blue-50 ml-0" : "bg-green-50 ml-10"
            }`}
          >
            <p className="text-sm">
              <span className="font-bold">{d.from}:</span> {d.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    unitName: "",
    className: "",
  });
  const [fileData, setFileData] = useState({ video: null, notes: null });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  async function handleUpload(e) {
    e.preventDefault();
    setUploading(true);
    try {
      const body = new FormData();
      body.append("title", form.title);
      body.append("description", form.description);
      body.append("unitName", form.unitName);
      body.append("className", form.className);
      if (fileData.video) body.append("video", fileData.video);
      if (fileData.notes) body.append("notes", fileData.notes);

      await addTopic(body);

      alert("✅ Uploaded successfully");
      navigate("/topics");
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh] w-full">
      <form
        onSubmit={handleUpload}
        className="bg-white shadow rounded-xl p-6 w-full max-w-lg space-y-3"
      >
        <h2 className="text-lg font-semibold">Upload Topic</h2>
        <input
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Title"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Description"
          className="w-full px-3 py-2 border rounded"
        />
        <div className="flex gap-2">
          <input
            value={form.unitName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, unitName: e.target.value }))
            }
            placeholder="Unit Name"
            className="w-1/2 px-3 py-2 border rounded"
          />
          <input
            value={form.className}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, className: e.target.value }))
            }
            placeholder="Class Name"
            className="w-1/2 px-3 py-2 border rounded"
          />
        </div>
        <input
          type="file"
          accept="video/*"
          onChange={(e) =>
            setFileData((prev) => ({ ...prev, video: e.target.files[0] }))
          }
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          accept="application/pdf,application/msword"
          onChange={(e) =>
            setFileData((prev) => ({ ...prev, notes: e.target.files[0] }))
          }
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={uploading}
          className="w-full px-3 py-2 bg-blue-600 text-white rounded"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

function TopicsPage() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getTopics();
        setTopics(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this topic?")) return;
    try {
      await deleteTopic(id);
      setTopics((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Topics</h2>
      <div className="space-y-3">
        {topics.map((t) => (
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
        ))}
      </div>
    </div>
  );
}

// ================== Main App ==================
export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
        <Topbar setShowLogin={setShowLogin} setShowRegister={setShowRegister} />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/doubts" element={<DoubtsPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/topics" element={<Topics />} />
            </Routes>
          </main>
        </div>

        {/* Simple modal placeholders */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow w-80 text-center">
              <h2 className="text-lg font-bold mb-4">Login</h2>
              <p className="mb-4 text-sm text-gray-600">Login form placeholder</p>
              <button
                onClick={() => setShowLogin(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {showRegister && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow w-80 text-center">
              <h2 className="text-lg font-bold mb-4">Register</h2>
              <p className="mb-4 text-sm text-gray-600">
                Registration form placeholder
              </p>
              <button
                onClick={() => setShowRegister(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}
