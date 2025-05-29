import { useEffect, useState } from 'react';

export default function Upload({ email }: { email?: string }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [emailParam, setEmailParam] = useState(email || '');

  useEffect(() => {
    if (!email) {
      const params = new URLSearchParams(window.location.search);
      const fromQuery = params.get('email');
      if (fromQuery) setEmailParam(fromQuery);
    }
  }, [email]);

  const handleUpload = () => {
    alert(`Enviando ${selectedFile?.name} para ${emailParam || 'usuário anônimo'}`);
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Documentação (email qdo receber)</h2>

      <label>Example file input</label>
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        style={{ display: 'block', marginBottom: 16 }}
      />

      <div>
        <button onClick={() => alert('Cancelado')} style={styles.secondary}>Cancel</button>
        <button onClick={handleUpload} style={styles.primary}>Ok</button>
      </div>
    </div>
  );
}

const styles = {
  primary: {
    marginLeft: 8,
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
