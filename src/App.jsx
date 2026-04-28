import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout.jsx";
import Overview from "./pages/Overview.jsx";
import Contracts from "./pages/Contracts.jsx";
import ContractAnalysis from "./pages/ContractAnalysis.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Overview />} />
        <Route path="/contratos" element={<Contracts />} />
        <Route path="/contratos/:id" element={<ContractAnalysis />} />
        <Route
          path="/relatorios"
          element={<Placeholder title="Relatórios de Obra" />}
        />
        <Route
          path="/configuracoes"
          element={<Placeholder title="Configurações" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function Placeholder({ title }) {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold text-ink-900">{title}</h1>
      <p className="mt-2 text-ink-500">Em construção.</p>
    </div>
  );
}
