import { html } from '@zoxon/mater'
import { describe, expect, it } from 'vitest'
import { Table } from '../components/base/Table/index.js'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
]

const rows = [
  { name: 'Alice', role: 'Admin', status: html`<span class="badge badge--theme-success">Active</span>` },
  { name: 'Bob', role: 'Editor', status: 'Inactive' },
]

describe('table', () => {
  it('renders table wrapper and table', () => {
    const html = Table({ columns, rows })
    expect(html).toContain('class="table-wrap"')
    expect(html).toContain('class="table"')
  })

  it('renders column headers', () => {
    const html = Table({ columns, rows })
    expect(html).toContain('<th')
    expect(html).toContain('Name')
    expect(html).toContain('Role')
    expect(html).toContain('Status')
  })

  it('renders rows with cell values', () => {
    const html = Table({ columns, rows })
    expect(html).toContain('Alice')
    expect(html).toContain('Bob')
    expect(html).toContain('Admin')
  })

  it('renders TemplateResult cells as composed content', () => {
    const html = Table({ columns, rows })
    expect(html).toContain('<span class="badge badge--theme-success">Active</span>')
  })

  it('escapes HTML-like table cell text', () => {
    const html = Table({
      columns: [
        { key: 'name', label: 'Name' },
      ],
      rows: [
        { name: '<img src=x onerror=alert(1)>' },
      ],
    })

    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;')
    expect(html).not.toContain('<img src=x onerror=alert(1)>')
  })

  it('escapes HTML in column labels', () => {
    const html = Table({
      columns: [
        { key: 'x', label: '<b>Name</b>' },
      ],
      rows: [
        { x: 'val' },
      ],
    })
    expect(html).not.toContain('<b>')
    expect(html).toContain('&lt;b&gt;')
  })

  it('applies striped modifier', () => {
    expect(Table({ columns, rows, striped: true })).toContain('table--striped')
    expect(Table({ columns, rows, striped: false })).not.toContain('table--striped')
  })

  it('renders empty state message when rows are empty', () => {
    const html = Table({ columns, rows: [], empty: 'No data found' })
    expect(html).toContain('No data found')
  })
})
