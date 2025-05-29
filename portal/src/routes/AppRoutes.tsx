import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import Login from '../pages/Login';
import Home from '../pages/Home';
import { useAuthStore } from 'shared/stores/authStore';
import { PublicOnlyRoute } from './PublicOnlyRoute';

const RemoteCadastro = lazy(() => import('register/App'));
const RemoteUpload = lazy(() => import('upload/App'));

export const AppRoutes = () => {
  const { user } = useAuthStore();

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/home/upload" element={<ProtectedRoute><RemoteUpload /></ProtectedRoute>} />

        <Route path="/register" element={<ProtectedRoute><RemoteCadastro /></ProtectedRoute>} />
        <Route path="/register/upload" element={<ProtectedRoute><RemoteUpload email={user?.email} /></ProtectedRoute>} />

        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </Suspense>
  );
};
