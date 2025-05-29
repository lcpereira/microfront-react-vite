import React from 'react';
import theme from '../theme/theme';
import type { Column } from '../utils/defineColumns';

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
}

export default function Table<T extends Record<string, unknown>>({
  data,
  columns,
  emptyMessage = "Data not available",
}: TableProps<T>) {
  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} style={styles.th}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} style={styles.tr}>
                {columns.map((col) => (
                  <td key={String(col.key)} style={styles.td}>
                    {col.render ? col.render(row) : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    overflowX: 'auto',
    background: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    boxShadow: theme.shadows.sm,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: theme.fonts.body,
  },
  th: {
    textAlign: 'left',
    padding: theme.spacing.sm,
    background: theme.colors.primary,
    color: theme.colors.background,
    fontSize: theme.fontSize.sm,
  },
  td: {
    padding: theme.spacing.sm,
    borderTop: `1px solid ${theme.colors.border}`,
    fontSize: theme.fontSize.base,
    color: theme.colors.text,
  },
  tr: {
    transition: 'background 0.2s',
  },
  empty: {
    padding: theme.spacing.md,
    textAlign: 'center',
    fontSize: theme.fontSize.base,
    color: theme.colors.muted,
  },
};
