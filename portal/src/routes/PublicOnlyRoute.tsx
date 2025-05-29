import { Navigate } from 'react-router-dom';
import useAuthStore from 'shared/stores/authStore';

export const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};
