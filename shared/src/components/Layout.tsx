import React from 'react';
import { useAuthStore } from '../stores/authStore';
import theme from '../theme/theme';
import Button from './Button';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h2 style={styles.title}>Micro Front com React + ViteJS + Zustand</h2>
          {user ? (
            <Button onClick={logout}>Logout</Button>
          ) : null}
        </div>
      </header>

      <main style={styles.main}>{children}</main>

      <footer style={styles.footer}>LCPEREIRA - 2025</footer>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh',
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontFamily: theme.fonts.body,
  },
  header: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    boxShadow: theme.shadows.md,
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: theme.fontSize.md,
  },
  main: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  footer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    textAlign: 'center' as const,
    borderTop: `1px solid ${theme.colors.border}`,
  },
};
