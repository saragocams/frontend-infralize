import { Routes, Route, Navigate } from "react-router-dom";
import Analise from "./pages/Analise.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Analise />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
