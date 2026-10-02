import type { TemplateResult } from '@zoxon/mater'
import { PageHeader, Section } from '@/components/docs/index.js'
import { Avatar, Badge, Button, Checkbox, StatusDot, Table, TextField } from '@/components/index.js'

function cell(view: TemplateResult): TemplateResult {
  return view
}

export function renderUserManagement(): TemplateResult {
  const columns = [
    { key: 'select', label: 'Select' },
    { key: 'user', label: 'User' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'access', label: 'Access' },
    { key: 'actions', label: 'Actions' },
  ]

  const rows = [
    {
      select: cell(<Checkbox label="Select Alice Morgan" class="user-management__select" />),
      user: cell(
        <span class="user-cell">
          <Avatar initials="AM" status="green" size="sm" />
          <span class="user-cell__body">
            <strong>Alice Morgan</strong>
            <span class="user-cell__meta">alice@example.com</span>
          </span>
        </span>,
      ),
      role: 'Admin',
      status: cell(<StatusDot status="green" label="Active" size="sm" />),
      access: cell(<Badge label="Full access" theme="success" size="sm" />),
      actions: cell(<Button label="Edit" variant="ghost" size="sm" />),
    },
    {
      select: cell(<Checkbox label="Select Ben Keller" class="user-management__select" />),
      user: cell(
        <span class="user-cell">
          <Avatar initials="BK" status="yellow" size="sm" />
          <span class="user-cell__body">
            <strong>Ben Keller</strong>
            <span class="user-cell__meta">ben@example.com</span>
          </span>
        </span>,
      ),
      role: 'Editor',
      status: cell(<StatusDot status="yellow" label="Invited" size="sm" />),
      access: cell(<Badge label="Limited" theme="warning" size="sm" />),
      actions: cell(<Button label="Resend" variant="ghost" size="sm" />),
    },
    {
      select: cell(<Checkbox label="Select Clara Nguyen" class="user-management__select" />),
      user: cell(
        <span class="user-cell">
          <Avatar initials="CN" status="gray" size="sm" />
          <span class="user-cell__body">
            <strong>Clara Nguyen</strong>
            <span class="user-cell__meta">clara@example.com</span>
          </span>
        </span>,
      ),
      role: 'Viewer',
      status: cell(<StatusDot status="gray" label="Inactive" size="sm" />),
      access: cell(<Badge label="Read only" size="sm" />),
      actions: cell(<Button label="Review" variant="ghost" size="sm" />),
    },
  ]

  const activeUsers = (
    <div class="user-management">
      <div class="user-management__toolbar">
        <TextField type="search" placeholder="Search users..." class="user-management__search" />
        <Button label="Invite user" />
      </div>
      <Table columns={columns} rows={rows} striped />
    </div>
  )

  return (
    <>
      <PageHeader title="User Management" desc="A composed admin table for identity, roles, status, and actions." />
      <Section
        title="Active users"
        canvasStyle="width:100%;align-items:stretch"
        canvas={activeUsers}
        code="<Table columns={columns} rows={rows} striped />"
      />
      <Section
        title="Empty invite state"
        canvasStyle="width:100%;padding:0"
        canvas={<Table columns={columns} rows={[]} empty="No users match the current filters." />}
        code={`<Table columns={columns} rows={[]} empty="No users match the current filters." />`}
      />
    </>
  )
}
