import type { TemplateResult } from '@zoxon/mater'
import { Table } from '@/components/base/Table/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderTable(): TemplateResult {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ]

  const rows = [
    { name: 'Alice Johnson', role: 'Administrator', status: 'Active' },
    { name: 'Bob Smith', role: 'Editor', status: 'Active' },
    { name: 'Carol White', role: 'Viewer', status: 'Inactive' },
  ]

  return (
    <>
      <PageHeader title="Table" desc="Tabular data display with optional striping." />
      <Section
        title="Basic table"
        canvasStyle="width:100%;padding:0"
        canvas={<Table columns={columns} rows={rows} />}
        code="<Table columns={columns} rows={rows} />"
      />
      <Section
        title="Striped table"
        canvasStyle="width:100%;padding:0"
        canvas={<Table columns={columns} rows={rows} striped />}
        code="<Table columns={columns} rows={rows} striped />"
      />
      <Section
        title="Empty state"
        canvasStyle="width:100%;padding:0"
        canvas={<Table columns={columns} rows={[]} empty="No records found." />}
        code={`<Table columns={columns} rows={[]} empty="No records found." />`}
      />
    </>
  )
}
