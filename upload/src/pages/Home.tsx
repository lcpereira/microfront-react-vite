import { useState } from 'react';
import useRegisterStore from 'shared/stores/registerStore';
import FileUpload from 'shared/components/FileUpload';
import Button from 'shared/components/Button';

export default function Upload({ email }: { email?: string }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { setTempUpload, clearTempUpload } = useRegisterStore();
  const handleUpload = () => {
    if (!selectedFile) return alert('Select a file to upload.');
    setTempUpload(selectedFile);
    window.history.back();
  };

  const goBack = () => {
    clearTempUpload();
    window.history.back();
  };

  return (
    <div style={{ padding: 32, fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: 24 }}>Enviar Documentação {email && `(${email})`}</h2>

      <FileUpload
        label="Selecionar Arquivo"
        accept=".pdf,.jpg,.png"
        onUpload={(files: FileList) => {
          setSelectedFile(files[0]);
          setTempUpload(files[0]);
        }}
      />

      {selectedFile && (
        <p style={{ marginTop: 12, color: '#007bff' }}>
          Arquivo selecionado: <strong>{selectedFile.name}</strong>
        </p>
      )}

      <div style={{ marginTop: 24 }}>
        <Button onClick={goBack} style={{ backgroundColor: '#6c757d' }}>
          Cancelar
        </Button>
        <Button onClick={handleUpload} style={{ marginLeft: 8 }}>
          Enviar
        </Button>
      </div>
    </div>
  );
}
