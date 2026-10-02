/**
 * Shared "destroyable singleton instance" lifecycle used by every interactive
 * component client (Accordion, Drawer, FileInput, Modal, NotificationBoard,
 * Spoiler, Tabs). `@zoxon/nux`'s `Component` base class sets `element.__instance`
 * on construction and clears it on `destroy()` — these helpers build on that
 * contract instead of duplicating it per component.
 */

export interface DestroyableInstance {
  destroy: () => void
}

type InstanceHost = HTMLElement & {
  __instance?: DestroyableInstance
  __lifecycleController?: AbortController
}

/**
 * Destroys the previous component instance bound to `element`, if any other
 * than `self`. Call at the start of `bindEvents()` to avoid double-binding
 * when the same DOM node is re-initialized.
 */
export function destroyPreviousInstance(element: HTMLElement, self: DestroyableInstance): void {
  const previous = (element as InstanceHost).__instance
  if (previous && previous !== self)
    previous.destroy()
}

/**
 * True when `self` is still the live instance for `element`. Use inside
 * listeners registered before a later re-init to skip stale callbacks.
 */
export function isCurrentInstance(element: HTMLElement, self: DestroyableInstance): boolean {
  return (element as InstanceHost).__instance === self
}

/**
 * Returns a fresh `AbortController` for `element`'s listeners, aborting
 * whichever controller was previously stored there. Pass its `signal` to
 * every `addEventListener` call in `bindEvents()`.
 */
export function replaceListenerController(element: HTMLElement): AbortController {
  const host = element as InstanceHost

  host.__lifecycleController?.abort()

  const controller = new AbortController()
  host.__lifecycleController = controller
  return controller
}

/**
 * Destroys every live component instance found within `root` (inclusive of
 * `root` itself when it carries `data-component`). Call before replacing a
 * subtree's children so components don't leak document-level listeners
 * bound to now-detached elements.
 */
export function destroyComponentInstances(root: ParentNode): void {
  if (root instanceof Element && root.hasAttribute('data-component'))
    (root as InstanceHost).__instance?.destroy()

  root.querySelectorAll<HTMLElement>('[data-component]').forEach((element) => {
    (element as InstanceHost).__instance?.destroy()
  })
}
