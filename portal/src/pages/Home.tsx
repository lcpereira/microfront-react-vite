import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'shared/stores/authStore';
import { useRegisterStore } from 'shared/stores/registerStore';
import Layout from 'shared/components/Layout';
import Table from 'shared/components/Table';
import Button from 'shared/components/Button';
import theme from 'shared/theme';

export default function Home() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const registerStore = useRegisterStore();

  const registers = registerStore.getRegisters();
  const uploads = registerStore.getUploads();

  const hasRegisterPermission = user?.permissions.includes('register');
  const hasUploadPermission = user?.permissions.includes('upload');

  const registerColumns = ([
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

  const uploadColumns = ([
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
