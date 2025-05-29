import { type ButtonHTMLAttributes } from 'react';
import theme from '../theme/theme';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
}

export default function Button({ secondary, style, children, ...res }: Props) {
  const appliedStyle = {
    ...styles.button,
    ...(secondary ? styles.secondary : {}),
    ...style,
  };

  return (
    <button style={appliedStyle} {...res}>
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
  secondary: {
    background: theme.colors.secondary,
  },
};
