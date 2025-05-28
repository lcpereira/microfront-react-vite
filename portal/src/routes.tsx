import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const ProjetoA = lazy(() => import('project_a/App'));
const ProjetoB = lazy(() => import('project_b/App'));
const ProjetoC = lazy(() => import('project_c/App'));

export const AppRoutes = () => (
  <BrowserRouter basename="microfront-react-vite">
    <nav>
      <Link to="/a">Projeto A</Link> |{" "}
      <Link to="/b">Projeto B</Link> |{" "}
      <Link to="/c">Projeto C</Link>
    </nav>
    <Suspense fallback={<p>Carregando...</p>}>
      <Routes>
        <Route path="/a" element={<ProjetoA />} />
        <Route path="/b" element={<ProjetoB />} />
        <Route path="/c" element={<ProjetoC />} />
        <Route path="*" element={<p>Escolha um projeto</p>} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
