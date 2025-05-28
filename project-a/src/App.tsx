import React, { Suspense } from 'react';
import { useAuthStore } from 'portal/authStore';
const RemoteLogin = React.lazy(() => import('portal/Login'));

export default function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <h1>Project A</h1>
      {!user ? (
        <Suspense fallback={<div>Carregando login...</div>}>
          <RemoteLogin />
        </Suspense>
      ) : (
        <p>Bem-vindo, {user.name}</p>
      )}
    </div>
  );
}
