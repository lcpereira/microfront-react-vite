import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useRegisterStore } from '../stores/registerStore';
import Layout from '../components/Layout';
import Table from '../components/Table';
import { defineColumns } from '../utils/defineColumns';
import Button from '../components/Button';
import theme from '../src/theme/theme';

export default function Home() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const registerStore = useRegisterStore();

  const registers = registerStore.getRegisters();
  const uploads = registerStore.getUploads();

  const hasRegisterPermission = user?.permissions.includes('register');
  const hasUploadPermission = user?.permissions.includes('upload');

  const registerColumns = defineColumns<Register>([
    { key: 'email', label: 'E-mail' },
    { key: 'select', label: 'Opção' },
    {
      key: 'multiSelect',
      label: 'Múltiplos',
      render: (row) => row.multiSelect.join(', '),
    },
    { key: 'text', label: 'Texto livre' },
    { key: 'file', label: 'Arquivo' },
  ]);

  const uploadColumns = defineColumns<UploadInfo>([
    { key: 'fileName', label: 'Arquivo' },
    {
      key: 'timestamp',
      label: 'Data',
      render: (row) => new Date(row.timestamp).toLocaleString(),
    },
  ]);

  return (
    <Layout>
      <div style={styles.wrapper}>
        {hasRegisterPermission && (
          <>
            <h3>Registers</h3>
            <Button onClick={() => navigate('/register')}>New register</Button>
            <Table data={registers} columns={registerColumns} />
          </>
        )}

        {hasUploadPermission && (
          <>
            <h3>Uploads</h3>
            <Button onClick={() => navigate('/home/upload')}>New upload</Button>
            <Table data={uploads} columns={uploadColumns} />
          </>
        )}

        {!hasRegisterPermission && !hasUploadPermission && (
          <p style={styles.danger}>
            Not authorized to view this page.
          </p>
        )}
      </div>
    </Layout>
  );
}

const styles = {
  wrapper: {
    padding: theme.spacing.md,
  },
  danger: {
    fontSize: theme.fontSize.md,
    marginBottom: theme.spacing.md,
    color: theme.colors.danger,
  },
};
