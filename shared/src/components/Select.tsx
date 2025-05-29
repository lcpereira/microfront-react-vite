import theme from '../theme/theme';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export default function Select({ label, style, ...rest }: Props) {
  return (
    <>
      {label && <label style={styles.label}>{label}</label>}
      <select
        style={{ ...styles.select, ...style }}
        {...rest}
      />
    </>
  );
}

const styles = {
  select: {
    display: 'block',
    width: '100%',
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.sm,
    fontSize: theme.fontSize.base,
    fontFamily: theme.fonts.body,
    borderRadius: theme.borderRadius.sm,
    border: `1px solid ${theme.colors.border}`,
    boxSizing: 'border-box' as const,
    appearance: 'none' as const,
    backgroundColor: theme.colors.background,
  },
  label: {
    display: 'block',
    marginBottom: 4,
    fontSize: theme.fontSize.base,
    fontFamily: theme.fonts.body,
    color: theme.colors.text,
  },
};
