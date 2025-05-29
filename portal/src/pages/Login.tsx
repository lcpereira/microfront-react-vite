import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !checked) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      await login(email); // você pode adaptar para login(email, password)
      navigate('/');
    } catch {
      setError('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* Lado esquerdo com "Image" */}
      <div style={{ flex: '0 0 250px', background: '#FDE6C2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 18, fontWeight: 'bold' }}>Image</p>
      </div>

      {/* Lado direito com o formulário */}
      <div style={{ flex: 1, padding: '48px 24px' }}>
        <h2 style={{ fontSize: 24, marginBottom: 24 }}>Login</h2>

        <form onSubmit={handleSubmit} style={{ maxWidth: 320 }}>
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 12, padding: 8 }}
          />

          <small style={{ display: 'block', marginBottom: 12 }}>
            We'll never share your email with anyone else.
          </small>

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: 'block', width: '100%', marginBottom: 12, padding: 8 }}
          />

          <label style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} style={{ marginRight: 8 }} />
            Check me out
          </label>

          {error && (
            <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? '#6c757d' : '#007bff',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: 4,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Carregando...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
