export type Column<T> = {
    key: keyof T;
    label: string;
    render?: (row: T) => React.ReactNode;
};

export function defineColumns<T extends Record<string, unknown>>(cols: readonly Column<T>[]): Column<T>[] {
    return cols as Column<T>[];
}
  