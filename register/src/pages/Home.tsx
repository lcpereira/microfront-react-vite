import { useEffect, useState } from 'react';
import useRegisterStore from 'shared/stores/registerStore';
import useTmpStore from 'shared/stores/tmpStore';
import Button from 'shared/components/Button';

export default function Home() {
  const [email, setEmail] = useState('');
  const [select, setSelect] = useState('1');
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [textarea, setTextarea] = useState('');

  const registerStore = useRegisterStore();
  const tmpStore = useTmpStore();

  useEffect(() => {
    const { email, select, multiSelect, text } = tmpStore.temp || {};

    if (email) setEmail(email);
    if (select) setSelect(select);
    if (multiSelect) setMultiSelect(multiSelect);
    if (text) setTextarea(text);
  }, [tmpStore.temp]);

  const handleUpload = () => {
    tmpStore.setTemp({ email, select, multiSelect, text: textarea });
    window.location.href = '/microfront-react-vite/register/upload';
  };

  const handleRegister = () => {
    registerStore.addRegister({
      ...tmpStore.temp,
      file: tmpStore.tempUpload && { fileName: tmpStore.tempUpload, timestamp: Date.now() },
    });

    tmpStore.clearTemp();
    tmpStore.clearTempUpload();
    window.history.back();
  };

  const handleCancel = () => {
    tmpStore.clearTemp();
    tmpStore.clearTempUpload();
    window.history.back();
  };

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
        <Button onClick={handleUpload}>Upload de Documento</Button>
        {tmpStore.tempUpload && (
          <p style={{ marginTop: 12, color: '#007bff' }}>
            Arquivo selecionado: <strong>{tmpStore.tempUpload}</strong>
          </p>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <Button onClick={handleCancel} style={styles.secondary}>
          Cancel
        </Button>
        <Button onClick={handleRegister} style={{ marginLeft: 8 }}>Enviar</Button>
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
  secondary: {
    backgroundColor: '#ccc',
  },
};
