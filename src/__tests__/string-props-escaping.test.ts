import type { TemplateResult } from '@zoxon/mater'
import { raw, render } from '@zoxon/mater'
import { describe, expect, it } from 'vitest'
import { Accordion, AccordionItem } from '../components/base/Accordion/index.js'
import { Card } from '../components/base/Card/index.js'
import { Content } from '../components/base/Content/index.js'
import { Drawer } from '../components/base/Drawer/index.js'
import { Field } from '../components/base/Field/index.js'
import { Header } from '../components/base/Header/index.js'
import { Modal } from '../components/base/Modal/index.js'
import { Spoiler } from '../components/base/Spoiler/index.js'
import { Tabs, TabsItem } from '../components/base/Tabs/index.js'

const PAYLOAD = '<img src=x onerror=alert(1)>'
const ESCAPED = '&lt;img src=x onerror=alert(1)&gt;'

function expectEscaped(view: TemplateResult): void {
  const out = render(view)
  expect(out).toContain(ESCAPED)
  expect(out).not.toContain(PAYLOAD)
}

function expectTrusted(view: TemplateResult): void {
  const out = render(view)
  expect(out).toContain('<b>ok</b>')
  expect(out).not.toContain('&lt;b&gt;')
}

describe('string props are escaped, raw() opts in', () => {
  it('card', () => {
    expectEscaped(Card({ children: PAYLOAD }))
    expectEscaped(Card({ title: 't', children: '', footer: PAYLOAD }))
    expectEscaped(Card({ title: 't', children: '', actions: PAYLOAD }))
    expectTrusted(Card({
      children: raw('<b>ok</b>'),
    }))
    expectTrusted(Card({
      title: 't',
      children: '',
      footer: raw('<b>ok</b>'),
    }))
    expectTrusted(Card({
      title: 't',
      children: '',
      actions: raw('<b>ok</b>'),
    }))
  })

  it('modal', () => {
    expectEscaped(Modal({ title: 't', children: PAYLOAD }))
    expectEscaped(Modal({ title: 't', children: '', footer: PAYLOAD }))
    expectTrusted(Modal({
      title: 't',
      children: raw('<b>ok</b>'),
    }))
    expectTrusted(Modal({
      title: 't',
      children: '',
      footer: raw('<b>ok</b>'),
    }))
  })

  it('drawer', () => {
    expectEscaped(Drawer({ title: 't', children: PAYLOAD }))
    expectEscaped(Drawer({ title: 't', children: '', footer: PAYLOAD }))
    expectTrusted(Drawer({
      title: 't',
      children: raw('<b>ok</b>'),
    }))
    expectTrusted(Drawer({
      title: 't',
      children: '',
      footer: raw('<b>ok</b>'),
    }))
  })

  it('spoiler', () => {
    expectEscaped(Spoiler({ label: 'l', children: PAYLOAD }))
    expectTrusted(Spoiler({
      label: 'l',
      children: raw('<b>ok</b>'),
    }))
  })

  it('field', () => {
    expectEscaped(Field({ label: 'l', children: PAYLOAD }))
    expectTrusted(Field({
      label: 'l',
      children: raw('<b>ok</b>'),
    }))
  })

  it('header', () => {
    expectEscaped(Header({ logo: 'x', navLinks: [], actions: PAYLOAD }))
    expectTrusted(Header({
      logo: 'x',
      navLinks: [],
      actions: raw('<b>ok</b>'),
    }))
  })

  it('tabs', () => {
    expectEscaped(Tabs({
      children: TabsItem({ title: 'a', children: PAYLOAD }),
    }))
    expectTrusted(Tabs({
      children: TabsItem({
        title: 'a',
        children: raw('<b>ok</b>'),
      }),
    }))
  })

  it('accordion', () => {
    expectEscaped(Accordion({
      children: AccordionItem({ title: 'a', children: PAYLOAD }),
    }))
    expectTrusted(Accordion({
      children: AccordionItem({
        title: 'a',
        children: raw('<b>ok</b>'),
      }),
    }))
  })

  it('content only accepts trusted markup explicitly', () => {
    expectTrusted(Content({
      html: raw('<b>ok</b>'),
    }))
    expectEscaped(Content({ html: PAYLOAD as never }))
  })
})
