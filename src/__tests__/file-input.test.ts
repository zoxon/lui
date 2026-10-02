import { describe, expect, it } from 'vitest'
import { FileInput } from '../components/base/FileInput/index.js'

describe('file input', () => {
  it('renders nux hooks for runtime refs', () => {
    const html = FileInput({ label: 'Upload file', name: 'resume' })

    expect(html).toContain('class="file-input"')
    expect(html).toContain('data-component="file-input"')
    expect(html).toContain('data-ref="file-input:input"')
    expect(html).toContain('data-ref="file-input:value"')
  })

  it('renders single-file trigger text by default', () => {
    expect(FileInput({ label: 'Upload file' })).toContain('Choose file')
  })

  it('renders multi-file trigger text when multiple is enabled', () => {
    expect(FileInput({ label: 'Upload file', multiple: true })).toContain('Choose files')
  })
})
