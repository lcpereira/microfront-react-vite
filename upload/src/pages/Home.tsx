import { useState } from 'react';
import useTmpStore from 'shared/stores/tmpStore';
import FileUpload from 'shared/components/FileUpload';
import Button from 'shared/components/Button';
import theme from 'shared/theme';

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { temp, setTempUpload, clearTempUpload } = useTmpStore();

  const handleUpload = () => {
    if (!selectedFile) return alert('Select a file to upload.');
    setTempUpload(selectedFile.name);
    window.history.back();
  };

  const goBack = () => {
    clearTempUpload();
    window.history.back();
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: 24 }}>Enviar Documentação {temp?.email && `(${temp.email})`}</h2>

      <FileUpload
        label="Selecionar Arquivo"
        accept=".pdf,.jpg,.png"
        onUpload={(files: FileList) => {
          setSelectedFile(files[0]);
          setTempUpload(files[0]);
        }}
      />

      {selectedFile && (
        <p style={{ marginTop: 12, color: theme.colors.primary }}>
          Arquivo selecionado: <strong>{selectedFile.name}</strong>
        </p>
      )}

      <div style={{ marginTop: 24 }}>
        <Button onClick={goBack} secondary>
          Cancelar
        </Button>
        <Button onClick={handleUpload} style={{ marginLeft: 8 }}>
          Enviar
        </Button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 32,
    maxWidth: 600,
    margin: '0 auto',
  },
};
