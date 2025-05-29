import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, ...props }: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>}
      <input
        {...props}
        style={{
          display: 'block',
          width: '100%',
          padding: 8,
          fontSize: 14,
        }}
      />
    </div>
  );
}
