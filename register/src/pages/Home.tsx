import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [select, setSelect] = useState('1');
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [textarea, setTextarea] = useState('');

  const handleUpload = () => alert('Upload iniciado...');
  const handleOk = () => alert('Cadastro enviado!');
  const handleCancel = () => alert('Cadastro cancelado.');

  return (
    <div style={{ padding: 32 }}>
      <h2>Cadastro</h2>

      <label>Email address</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <label>Example select</label>
      <select value={select} onChange={(e) => setSelect(e.target.value)} style={styles.input}>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>

      <label>Example multiple select</label>
      <select
        multiple
        value={multiSelect}
        onChange={(e) =>
          setMultiSelect(Array.from(e.target.selectedOptions, (opt) => opt.value))
        }
        style={{ ...styles.input, height: 100 }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>

      <label>Example textarea</label>
      <textarea
        value={textarea}
        onChange={(e) => setTextarea(e.target.value)}
        style={{ ...styles.input, height: 80 }}
      />

      <div style={{ marginTop: 12 }}>
        <button onClick={handleUpload} style={styles.primary}>
          Upload de Documento
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <button onClick={handleCancel} style={styles.secondary}>
          Cancel
        </button>
        <button onClick={handleOk} style={styles.primary}>
          Ok
        </button>
      </div>
    </div>
  );
}

const styles = {
  input: {
    display: 'block',
    marginBottom: 16,
    padding: 8,
    width: '100%',
    maxWidth: 400,
  },
  primary: {
    marginRight: 8,
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
  },
  secondary: {
    padding: '8px 16px',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: 4,
  },
};
