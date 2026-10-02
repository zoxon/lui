import { describe, expect, it } from 'vitest'
import { renderSettingsForm } from '@/pages/examples/settings-form.js'
import { renderUserManagement } from '@/pages/examples/user-management.js'
import { routes } from '@/routes.js'

describe('examples pages', () => {
  it('registers example routes', () => {
    expect(routes['examples-user-management']).toBe(renderUserManagement)
    expect(routes['examples-settings-form']).toBe(renderSettingsForm)
    expect(routes['examples-billing-summary']).toBeUndefined()
  })

  it('renders user management example content', () => {
    expect(renderUserManagement()).toContain('User Management')
    expect(renderUserManagement()).toContain('Alice Morgan')
    expect(renderUserManagement()).toContain('Invite user')
  })

  it('renders stable user management layout hooks', () => {
    expect(renderUserManagement()).toContain('class="user-cell"')
    expect(renderUserManagement()).toContain('class="user-cell__body"')
    expect(renderUserManagement()).toContain('class="user-management__toolbar"')
    expect(renderUserManagement()).toContain('class="field__input user-management__search"')
  })

  it('renders user management selection and consistent row actions', () => {
    expect(renderUserManagement()).toContain('<th>Select</th>')
    expect(renderUserManagement()).toContain('class="checkbox user-management__select"')
    expect(renderUserManagement()).toContain('Select Alice Morgan')
    expect(renderUserManagement()).not.toContain('button--variant-outline')
  })

  it('renders settings form example content', () => {
    expect(renderSettingsForm()).toContain('Settings Form')
    expect(renderSettingsForm()).toContain('Project name')
    expect(renderSettingsForm()).toContain('Save changes')
  })

  it('renders settings form item spacing hooks', () => {
    expect(renderSettingsForm()).toContain('class="form"')
    expect(renderSettingsForm()).toContain('class="form__item"')
    expect(renderSettingsForm()).toContain('class="form__actions"')
  })
})
