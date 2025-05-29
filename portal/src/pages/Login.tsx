import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'shared/stores/authStore';
import Input from 'shared/components/Input';
import Button from 'shared/components/Button';
import Checkbox from 'shared/components/Checkbox';
import theme from 'shared/theme';

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
      await login(email);
      navigate('/');
    } catch {
      setError('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.imageContainer}>
        <img style={styles.image} src="/microfront-react-vite/login.jpg" />
      </div>

      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>Login</h2>

        <form onSubmit={handleSubmit}>
          <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <small style={styles.smallText}>
            We'll never share your email with anyone else.
          </small>
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Checkbox label="Check me out" checked={checked} onChange={() => setChecked(!checked)} />

          {error && <div style={styles.errorText}>{error}</div>}

          <Button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'sans-serif',
  },
  imageContainer: {
    flex: '0 0 20%',
    minWidth: 250,
    background: '#FDE6C2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '0 0 0 8px',
  },
  formContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '48px 24px',
    maxWidth: 600,
    margin: '0 auto',
  },
  formTitle: {
    fontSize: 24,
    marginBottom: 24,
  },
  smallText: {
    display: 'block',
    marginBottom: 12,
    color: theme.colors.muted,
  },
  errorText: {
    color: theme.colors.danger,
    marginBottom: 12,
  },
};
