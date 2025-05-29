import { useNavigate } from 'react-router-dom';
import useAuthStore from 'shared/stores/authStore';
import useTmpStore from 'shared/stores/tmpStore';
import useRegisterStore from 'shared/stores/registerStore';
import Layout from 'shared/components/Layout';
import Table from 'shared/components/Table';
import Button from 'shared/components/Button';
import theme from 'shared/theme';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const registerStore = useRegisterStore();
  const tmpStore = useTmpStore();

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
    {
      key: 'file',
      label: 'File',
      render: (row) => row.file && `${row.file.fileName} ${new Date(row.file.timestamp).toLocaleString()}`,
    },
  ]);

  const uploadColumns = ([
    { key: 'fileName', label: 'File' },
    {
      key: 'timestamp',
      label: 'Date',
      render: (row) => new Date(row.timestamp).toLocaleString(),
    },
  ]);

  useEffect(() => {
    if (tmpStore.tempUpload && !tmpStore.temp?.email) {
      const fileName = tmpStore.tempUpload.name;
      const timestamp = Date.now();

      registerStore.addUpload({ fileName, timestamp });
      tmpStore.clearTempUpload();
    } else {
      tmpStore.clearTemp();
      tmpStore.clearTempUpload();
    }
  }, []);

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
