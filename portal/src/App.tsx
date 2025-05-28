import { useUserStore } from './stores/user';
import { AppRoutes } from './routes';
import { Login } from './components/Login';

export default function App() {
  const user = useUserStore((s) => s.user);

  if (!user) return <Login />;
  return <AppRoutes />;
}
