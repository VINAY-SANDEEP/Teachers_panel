// College Admin Panel - Modern UI with Tailwind + Framer Motion
import React, { useState } from "react";
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
  baseURL: "http://localhost:5000/api",
});

const addTopic = (formData) =>
  API.post("/add-topic", formData, { headers: { "Content-Type": "multipart/form-data" } });
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
  { from: "teacher", text: "Polymorphism allows different implementations of the same method." },
  { from: "student", text: "Can you give an example?" },
  { from: "teacher", text: "Sure, let’s take shape class with circle and square..." },
];

const COLORS = ["#4ADE80", "#F87171"]; // Green & Red

// ================== Components ==================
function Topbar({ setShowLogin, setShowRegister, setMobileOpen }) {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg">
      <div className="flex items-center gap-3">
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden text-white text-2xl mr-2"
          onClick={() => setMobileOpen(true)}
        >
          &#9776;
        </button>
        <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center shadow-lg">
          <span className="font-bold text-xl">CE</span>
        </div>
        <h1 className="text-xl font-semibold hidden sm:block">College Admin Panel</h1>
      </div>
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowLogin(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:shadow-lg transition"
        >
          <FiLogIn /> Login
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowRegister(true)}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-white font-semibold rounded-lg shadow hover:shadow-lg transition"
        >
          <FiUserPlus /> Register
        </motion.button>
      </div>
    </div>
  );
}

function Sidebar({ mobileOpen, setMobileOpen }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-blue-100 hover:text-blue-700 transition ${
      isActive ? "bg-blue-200 text-blue-700 shadow" : "text-gray-700"
    }`;

  const sidebarContent = (
    <nav className="flex flex-col gap-3">
      <NavLink to="/" className={linkClass} onClick={() => setMobileOpen(false)}><FiHome /> Home</NavLink>
      <NavLink to="/topics" className={linkClass} onClick={() => setMobileOpen(false)}><FiBook /> Topics</NavLink>
      <NavLink to="/students" className={linkClass} onClick={() => setMobileOpen(false)}><FiUsers /> Students</NavLink>
      <NavLink to="/doubts" className={linkClass} onClick={() => setMobileOpen(false)}><FiMessageSquare /> Doubts</NavLink>
      <NavLink to="/upload" className={linkClass} onClick={() => setMobileOpen(false)}><FiUpload /> Upload</NavLink>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white/90 backdrop-blur border-r p-6 min-h-screen shadow-xl">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          className="fixed inset-0 bg-white/95 z-50 p-6 md:hidden flex flex-col"
        >
          <button
            className="self-end mb-4 text-gray-700 text-2xl"
            onClick={() => setMobileOpen(false)}
          >
            &times;
          </button>
          {sidebarContent}
        </motion.div>
      )}
    </>
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
    <div className="p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {[
          { title: "Total Students", value: studentData.length, color: "bg-indigo-400" },
          { title: "Watched", value: watchedCount, color: "bg-green-400" },
          { title: "Not Watched", value: notWatchedCount, color: "bg-red-400" },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-2xl text-white shadow-lg ${card.color} cursor-pointer transition`}
          >
            <p className="font-medium">{card.title}</p>
            <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6 flex justify-center"
      >
        <div className="w-full max-w-md mx-auto">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={5}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}

function StudentsPage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Students</h2>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {studentData.map((s, idx) => (
          <motion.li
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="p-4 rounded-2xl bg-gradient-to-tr from-indigo-50 to-blue-50 shadow hover:shadow-lg transition flex justify-between font-medium"
          >
            <span>{s.name}</span>
            <span className={s.watched ? "text-green-600" : "text-red-600"}>
              {s.watched ? "Watched" : "Not Watched"}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function DoubtsPage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Doubts</h2>
      <div className="space-y-4">
        {doubtsMock.map((d, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-2xl max-w-md shadow ${d.from === "student" ? "bg-blue-50 ml-0" : "bg-green-50 ml-12"}`}
          >
            <p className="text-sm text-gray-700">
              <span className="font-semibold capitalize">{d.from}:</span> {d.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function UploadPage() {
  const [form, setForm] = useState({ title: "", description: "", unitName: "", className: "" });
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
      <motion.form
        onSubmit={handleUpload}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-700">Upload Topic</h2>
        <input
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Title"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
        <input
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Description"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="flex gap-4">
          <input
            value={form.unitName}
            onChange={(e) => setForm((prev) => ({ ...prev, unitName: e.target.value }))}
            placeholder="Unit Name"
            className="w-1/2 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            value={form.className}
            onChange={(e) => setForm((prev) => ({ ...prev, className: e.target.value }))}
            placeholder="Class Name"
            className="w-1/2 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFileData((prev) => ({ ...prev, video: e.target.files[0] }))}
          className="w-full border p-2 rounded-xl"
        />
        <input
          type="file"
          accept="application/pdf,application/msword"
          onChange={(e) => setFileData((prev) => ({ ...prev, notes: e.target.files[0] }))}
          className="w-full border p-2 rounded-xl"
        />
        <button
          type="submit"
          disabled={uploading}
          className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-xl shadow hover:shadow-lg transition"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </motion.form>
    </div>
  );
}

// ================== Main App ==================
export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
        <Topbar
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
          setMobileOpen={setMobileOpen}
        />
        <div className="flex flex-1 relative">
          <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
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

        {/* Login & Register Modals */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 text-center">
              <h2 className="text-xl font-bold mb-4">Login</h2>
              <p className="mb-4 text-gray-600">Login form placeholder</p>
              <button
                onClick={() => setShowLogin(false)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:scale-105 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {showRegister && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 text-center">
              <h2 className="text-xl font-bold mb-4">Register</h2>
              <p className="mb-4 text-gray-600">Registration form placeholder</p>
              <button
                onClick={() => setShowRegister(false)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:scale-105 transition"
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
