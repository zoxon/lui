import type { TemplateResult } from '@zoxon/mater'

export interface TableColumn {
  key: string
  label: string
}

export type TableCell = string | TemplateResult

export interface TableProps {
  columns: TableColumn[]
  rows: Record<string, TableCell>[]
  striped?: boolean
  empty?: string
  class?: string
}

export function Table({ columns, rows, striped = false, empty, class: className }: TableProps): TemplateResult {
  const theadHtml = <thead><tr>{columns.map(col => <th>{col.label}</th>)}</tr></thead>

  const tbodyHtml = rows.length === 0
    ? (
        <tbody>
          <tr>
            <td
              colspan={columns.length}
              style={{
                'text-align': 'center',
                'color': 'var(--color-text-tertiary)',
                'padding': 'var(--spacing-6)',
              }}
            >
              {empty ?? 'No data'}
            </td>
          </tr>
        </tbody>
      )
    : (
        <tbody>
          {rows.map(row =>
            <tr>{columns.map(col => <td>{row[col.key] ?? ''}</td>)}</tr>,
          )}
        </tbody>
      )

  return (
    <div class="table-wrap">
      <table class={['table', striped && 'table--striped', className]}>
        {theadHtml}
        {tbodyHtml}
      </table>
    </div>
  )
}
