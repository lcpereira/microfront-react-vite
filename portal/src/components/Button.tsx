import { type ButtonHTMLAttributes } from 'react';
import theme from '../src/theme/theme';

export default function Button({ children, ...res }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button style={styles.button} {...res}>
      {children}
    </button>
  );
}

const styles = {
  button: {
    margin: `${theme.spacing.sm} 0`,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    background: theme.colors.primary,
    color: theme.colors.background,
    border: 'none',
    borderRadius: theme.borderRadius.sm,
    cursor: 'pointer',
    fontSize: theme.fontSize.base,
    fontFamily: theme.fonts.body,
    boxShadow: theme.shadows.sm,
  },
};
