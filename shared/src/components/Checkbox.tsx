import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({ label, ...props }: Props) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
      <input type="checkbox" {...props} style={{ marginRight: 8 }} />
      {label}
    </label>
  );
}
