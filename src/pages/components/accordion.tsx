import type { TemplateResult } from '@zoxon/mater'
import { Accordion, AccordionItem } from '@/components/base/Accordion/index.js'
import { PageHeader, Section } from '@/components/docs/index.js'

export function renderAccordion(): TemplateResult {
  return (
    <>
      <PageHeader title="Accordion" desc="Expandable panels for progressive disclosure of content." />
      <Section
        title="Default (single open)"
        canvasStyle="flex-direction:column;width:100%"
        canvas={(
          <Accordion>
            <AccordionItem title="What is Lui?">
              <p>Lui (Lightweight User Interface) is a cross-framework UI library.</p>
            </AccordionItem>
            <AccordionItem title="How do I install it?">
              <p>
                Run
                <code>npm install lui</code>
                and import the CSS.
              </p>
            </AccordionItem>
            <AccordionItem title="Is it accessible?">
              <p>Yes — all components follow ARIA guidelines and keyboard navigation.</p>
            </AccordionItem>
          </Accordion>
        )}
        code={`<Accordion>
  <AccordionItem title="What is Lui?">
    <p>Lui (Lightweight User Interface) is a cross-framework UI library.</p>
  </AccordionItem>
  <AccordionItem title="How do I install it?">
    <p>
      Run
      <code>npm install lui</code>
      and import the CSS.
    </p>
  </AccordionItem>
  <AccordionItem title="Is it accessible?">
    <p>Yes — all components follow ARIA guidelines and keyboard navigation.</p>
  </AccordionItem>
</Accordion>`}
      />
      <Section
        title="With open item"
        canvasStyle="flex-direction:column;width:100%"
        canvas={(
          <Accordion>
            <AccordionItem title="What is Lui?">
              <p>Lui (Lightweight User Interface) is a cross-framework UI library.</p>
            </AccordionItem>
            <AccordionItem title="How do I install it?" expanded>
              <p>
                Run
                <code>npm install lui</code>
                and import the CSS.
              </p>
            </AccordionItem>
            <AccordionItem title="Is it accessible?">
              <p>Yes — all components follow ARIA guidelines and keyboard navigation.</p>
            </AccordionItem>
          </Accordion>
        )}
        code={`<Accordion>
  <AccordionItem title="What is Lui?">
    <p>Lui (Lightweight User Interface) is a cross-framework UI library.</p>
  </AccordionItem>
  <AccordionItem title="How do I install it?" expanded>
    <p>
      Run
      <code>npm install lui</code>
      and import the CSS.
    </p>
  </AccordionItem>
  <AccordionItem title="Is it accessible?">
    <p>Yes — all components follow ARIA guidelines and keyboard navigation.</p>
  </AccordionItem>
</Accordion>`}
      />
      <Section
        title="Multiple open mode"
        canvasStyle="flex-direction:column;width:100%"
        canvas={(
          <Accordion multiple>
            <AccordionItem title="What is Lui?" expanded>
              <p>Lui (Lightweight User Interface) is a cross-framework UI library.</p>
            </AccordionItem>
            <AccordionItem title="How do I install it?" expanded>
              <p>
                Run
                <code>npm install lui</code>
                and import the CSS.
              </p>
            </AccordionItem>
            <AccordionItem title="Is it accessible?">
              <p>Yes — all components follow ARIA guidelines and keyboard navigation.</p>
            </AccordionItem>
          </Accordion>
        )}
        code={`<Accordion multiple>
  <AccordionItem title="What is Lui?" expanded>
    <p>Lui (Lightweight User Interface) is a cross-framework UI library.</p>
  </AccordionItem>
  <AccordionItem title="How do I install it?" expanded>
    <p>
      Run
      <code>npm install lui</code>
      and import the CSS.
    </p>
  </AccordionItem>
  <AccordionItem title="Is it accessible?">
    <p>Yes — all components follow ARIA guidelines and keyboard navigation.</p>
  </AccordionItem>
</Accordion>`}
      />
    </>
  )
}
