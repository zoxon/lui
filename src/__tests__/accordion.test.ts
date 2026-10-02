import { describe, expect, it } from 'vitest'
import { Accordion, AccordionItem } from '../components/base/Accordion/index.js'

const CHEVRON = 'accordion__icon'

describe('accordion', () => {
  it('renders accordion with items', () => {
    const html = Accordion({
      children: [
        AccordionItem({ title: 'What is this?', children: '<p>It is a design system.</p>' }),
        AccordionItem({ title: 'How do I use it?', expanded: true, children: '<p>Import the CSS.</p>' }),
        AccordionItem({ title: 'Is it free?', children: '<p>Yes.</p>' }),
      ],
    })
    expect(html).toContain('class="accordion"')
    expect(html).toContain('accordion__item')
    expect(html).toContain('accordion__trigger')
    expect(html).toContain('accordion__content')
    expect(html).toContain(CHEVRON)
  })

  it('renders nux data hooks for client runtime wiring', () => {
    const html = Accordion({
      children: [
        AccordionItem({ title: 'What is this?', children: '<p>It is a design system.</p>' }),
      ],
    })

    expect(html).toContain('data-component="accordion"')
  })

  it('renders all item labels', () => {
    const html = Accordion({
      children: [
        AccordionItem({ title: 'What is this?', children: '<p>It is a design system.</p>' }),
        AccordionItem({ title: 'How do I use it?', children: '<p>Import the CSS.</p>' }),
        AccordionItem({ title: 'Is it free?', children: '<p>Yes.</p>' }),
      ],
    })
    expect(html).toContain('What is this?')
    expect(html).toContain('How do I use it?')
    expect(html).toContain('Is it free?')
  })

  it('uses <details> and <summary> elements', () => {
    const html = Accordion({
      children: [
        AccordionItem({ title: 'What is this?', children: '<p>It is a design system.</p>' }),
      ],
    })
    expect(html).toContain('<details')
    expect(html).toContain('<summary')
  })

  it('renders open state for items with expanded=true', () => {
    const html = Accordion({
      children: [
        AccordionItem({ title: 'How do I use it?', expanded: true, children: '<p>Import the CSS.</p>' }),
      ],
    })
    expect(html).toContain('<details class="accordion__item" open')
  })

  it('does not open items without expanded=true', () => {
    const closed = Accordion({
      children: [
        AccordionItem({ title: 'Q', children: 'A' }),
      ],
    })
    expect(closed).not.toContain(' open')
  })

  it('adds data-single when multiple=false', () => {
    expect(Accordion({
      children: [
        AccordionItem({ title: 'Q', children: 'A' }),
      ],
      multiple: false,
    })).toContain('data-single="true"')
  })

  it('does not add data-single when multiple=true', () => {
    expect(Accordion({
      children: [
        AccordionItem({ title: 'Q', children: 'A' }),
      ],
      multiple: true,
    })).not.toContain('data-single')
  })

  it('renders item content (trusted HTML)', () => {
    const html = Accordion({
      children: [
        AccordionItem({ title: 'What is this?', children: '<p>It is a design system.</p>' }),
      ],
    })
    expect(html).toContain('<p>It is a design system.</p>')
  })

  it('escapes HTML in item labels', () => {
    const html = Accordion({
      children: [
        AccordionItem({ title: '<b>bold</b>', children: '' }),
      ],
    })
    expect(html).not.toContain('<b>bold</b>')
    expect(html).toContain('&lt;b&gt;')
  })

  it('filters out non-AccordionItem children instead of leaving a phantom item', () => {
    // Simulates `{condition && <AccordionItem/>}` yielding `false` for a
    // falsy branch — a real JS caller can produce this even though the TS
    // types disallow it statically.
    const stray = false as unknown as ReturnType<typeof AccordionItem>

    const html = String(Accordion({
      children: [
        stray,
        AccordionItem({ title: 'What is this?', children: '<p>It is a design system.</p>' }),
      ],
    }))

    expect(html).toContain('What is this?')
    expect((html.match(/accordion__item/g) ?? []).length).toBe(1)
  })
})
