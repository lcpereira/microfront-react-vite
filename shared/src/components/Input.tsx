import theme from '../theme/theme';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, style, ...rest }: Props) {
  return (
    <>
      {label && <label style={styles.label}>{label}</label>}
      <input
        style={{ ...styles.input, ...style }}
        {...rest}
      />
    </>
  );
}

const styles = {
  input: {
    display: 'block',
    width: '100%',
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.sm,
    fontSize: theme.fontSize.base,
    fontFamily: theme.fonts.body,
    borderRadius: theme.borderRadius.sm,
    border: `1px solid ${theme.colors.border}`,
    boxSizing: 'border-box' as const,
  },
  label: {
    display: 'block',
    marginBottom: 4,
    fontSize: theme.fontSize.base,
    fontFamily: theme.fonts.body,
    color: theme.colors.text,
  },
};
