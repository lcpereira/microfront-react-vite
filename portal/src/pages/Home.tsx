import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Home() {
  const { user, logout } = useAuthStore();
  console.log(user, logout);
  const navigate = useNavigate();

  const goTo = (path: string) => navigate(path);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#e6f0ff', padding: '8px 16px' }}>
        <strong>Header</strong>
      </div>

      <div style={{ padding: 16 }}>
        <button onClick={() => goTo('/a')} style={styles.link}>
          Regular link
        </button>
        <button onClick={() => goTo('/b')} style={{ ...styles.link, background: '#007bff', color: '#fff' }}>
          Active link
        </button>
        <button onClick={() => goTo('/c')} style={styles.link}>
          Another link
        </button>
      </div>

      <div style={{ background: '#f6dcc0', marginTop: 'auto', padding: 8 }}>
        <small>Footer</small>
      </div>
    </div>
  );
}

const styles = {
  link: {
    display: 'block',
    padding: 8,
    margin: '4px 0',
    border: '1px solid #ccc',
    borderRadius: 4,
    width: '150px',
    textAlign: 'left',
    cursor: 'pointer',
    background: '#fff',
  } as React.CSSProperties,
};
