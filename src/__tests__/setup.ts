import { TemplateResult } from '@zoxon/mater'
import { expect } from 'vitest'

// Vitest treats non-string objects as iterables in toContain, returning [].
// This extension auto-stringifies TemplateResult before the inclusion check.
expect.extend({
  toContain(received: unknown, expected: string) {
    if (!(received instanceof TemplateResult)) {
      // For non-TemplateResult values, use the original built-in path.
      // We mimic the string and array checks manually.
      if (typeof received === 'string') {
        const pass = received.includes(expected)
        return {
          pass,
          message: () => pass
            ? `expected ${JSON.stringify(received)} not to contain ${JSON.stringify(expected)}`
            : `expected ${JSON.stringify(received)} to contain ${JSON.stringify(expected)}`,
        }
      }
      if (Array.isArray(received) || (received != null && Symbol.iterator in (received as object))) {
        const arr = Array.from(received as Iterable<unknown>)
        const pass = arr.includes(expected)
        return {
          pass,
          message: () => pass
            ? `expected array not to contain ${JSON.stringify(expected)}`
            : `expected array to contain ${JSON.stringify(expected)}`,
        }
      }
      return {
        pass: false,
        message: () => `toContain: cannot check containment in ${typeof received}`,
      }
    }

    const str = received.toString()
    const pass = str.includes(expected)
    return {
      pass,
      message: () => pass
        ? `expected rendered HTML not to contain ${JSON.stringify(expected)}\n\nReceived:\n${str}`
        : `expected rendered HTML to contain ${JSON.stringify(expected)}\n\nReceived:\n${str}`,
    }
  },
})
