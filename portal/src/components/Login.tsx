import { useState } from 'react';
import { useUserStore } from '../stores/user';

export const Login = () => {
  const [email, setEmail] = useState('');
  const login = useUserStore((s) => s.login);

  const handleLogin = () => {
    const permissions = email === 'admin@email.com'
      ? ['cadastro', 'documentacao', 'tudo']
      : ['cadastro'];

    login({ email, permissions });
  };

  return (
    <div>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleLogin}>Sign in</button>
    </div>
  );
};
