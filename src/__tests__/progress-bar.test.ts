import { describe, expect, it } from 'vitest'
import { ProgressBar } from '../components/base/ProgressBar/index.js'

describe('progressBar', () => {
  it('renders progress bar at given value', () => {
    const html = ProgressBar({ value: 60 })
    expect(html).toContain('progress--size-md')
    expect(html).toContain('progress--theme-default')
    expect(html).toContain('progress__track')
    expect(html).toContain('progress__bar')
    expect(html).toContain('width:60%')
  })

  it('clamps value to 0–100', () => {
    expect(ProgressBar({ value: -10 })).toContain('width:0%')
    expect(ProgressBar({ value: 110 })).toContain('width:100%')
  })

  it('applies theme modifier', () => {
    expect(ProgressBar({ value: 50, theme: 'success' })).toContain('progress--theme-success')
    expect(ProgressBar({ value: 50, theme: 'danger' })).toContain('progress--theme-danger')
    expect(ProgressBar({ value: 50, theme: 'warning' })).toContain('progress--theme-warning')
    expect(ProgressBar({ value: 50, theme: 'info' })).toContain('progress--theme-info')
  })

  it('applies size modifier', () => {
    expect(ProgressBar({ value: 50, size: 'sm' })).toContain('progress--size-sm')
    expect(ProgressBar({ value: 50, size: 'lg' })).toContain('progress--size-lg')
  })

  it('renders label', () => {
    const html = ProgressBar({ value: 75, label: 'Uploading...' })
    expect(html).toContain('progress__label')
    expect(html).toContain('Uploading...')
  })

  it('renders value as percentage in label when showValue=true', () => {
    const html = ProgressBar({ value: 75, showValue: true })
    expect(html).toContain('progress__label')
    expect(html).toContain('75%')
  })

  it('escapes HTML in label', () => {
    const html = ProgressBar({ value: 50, label: '<b>oops</b>' })
    expect(html).not.toContain('<b>')
    expect(html).toContain('&lt;b&gt;')
  })
})
