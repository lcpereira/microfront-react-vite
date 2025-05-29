import { useEffect, useState } from 'react';
import useRegisterStore from 'shared/stores/registerStore';
import useTmpStore from 'shared/stores/tmpStore';
import Button from 'shared/components/Button';
import Input from 'shared/components/Input';
import Select from 'shared/components/Select';
import Textarea from 'shared/components/Textarea';
import theme from 'shared/theme';

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
    const errors: string[] = [];
  
    if (!email.trim()) errors.push('Email is required.');
    if (!select) errors.push('Single selection is required.');
    if (multiSelect.length === 0) errors.push('At least one option must be selected.');
    if (!textarea.trim()) errors.push('Text is required.');
  
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }
  
    registerStore.addRegister({
      ...tmpStore.temp,
      file: { fileName: tmpStore.tempUpload, timestamp: Date.now() },
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
    <div style={styles.container}>
      <h2>Cadastro</h2>

      <Input
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Select
        label="Example select"
        value={select}
        onChange={(e) => setSelect(e.target.value)}
      >
        <option value="1">1</option>
        <option value="2">2</option>
      </Select>

      <Select
        multiple
        label="Example multiple select"
        value={multiSelect}
        onChange={(e) =>
          setMultiSelect(Array.from(e.target.selectedOptions, (opt: { value: string }) => opt.value))
        }
        style={{ height: 100 }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </Select>

      <Textarea
        label="Example textarea"
        value={textarea}
        onChange={(e) => setTextarea(e.target.value)}
        style={{ height: 80 }}
      />

      <div style={{ marginTop: 12 }}>
        <Button onClick={handleUpload}>Upload de Documento</Button>
        {tmpStore.tempUpload && (
          <p style={{ marginTop: 12, color: theme.colors.primary }}>
            Arquivo selecionado: <strong>{tmpStore.tempUpload}</strong>
          </p>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <Button onClick={handleCancel} secondary>
          Cancel
        </Button>
        <Button onClick={handleRegister} style={{ marginLeft: 8 }}>Enviar</Button>
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
