import React from 'react';
import theme from '../theme/theme';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({ label, ...props }: Props) {
  return (
    <label style={styles.label}>
      <input type="checkbox" {...props} style={{ marginRight: 8 }} />
      {label}
    </label>
  );
}

const styles = {
  label: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
    fontSize: theme.fontSize.base,
    fontFamily: theme.fonts.body,
    color: theme.colors.text,
  },
};
