import { signal } from 'alien-signals'
import { html, LitElement } from 'lit'
// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { SignalTrackingController } from '../controller'
import { SignalWatcher } from '../watcher'

describe('alien-lit integration', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
  })

  describe('signalWatcher Mixin', () => {
    it('automatically tracks signals read during render', async () => {
      const count = signal(0)

      class WatcherElement extends SignalWatcher(LitElement) {
        override render() {
          return html`<div>count: ${count()}</div>`
        }
      }
      customElements.define('watcher-element', WatcherElement)

      const el = new WatcherElement()
      container.appendChild(el)

      await el.updateComplete
      expect(el.shadowRoot?.textContent).toContain('count: 0')

      // Mutate signal
      count(5)
      await el.updateComplete
      expect(el.shadowRoot?.textContent).toContain('count: 5')

      // Disconnect
      el.remove()
      // Changing the signal after disconnect shouldn't trigger updates
      count(10)
      expect(el.isUpdatePending).toBe(false)
    })
  })

  describe('signalTrackingController', () => {
    it('manually tracks signals specified in the track function', async () => {
      const count = signal(10)
      let trackCalls = 0

      class ControllerElement extends LitElement {
        controller = new SignalTrackingController(this, () => {
          trackCalls++
          count() // read signal
        })

        override render() {
          return html`<div>count: ${count()}</div>`
        }
      }
      customElements.define('controller-element', ControllerElement)

      const el = new ControllerElement()
      container.appendChild(el)

      await el.updateComplete
      expect(el.shadowRoot?.textContent).toContain('count: 10')
      expect(trackCalls).toBe(1)

      // Mutate signal
      count(20)
      await el.updateComplete
      expect(el.shadowRoot?.textContent).toContain('count: 20')
      expect(trackCalls).toBe(2)

      // Disconnect
      el.remove()
      count(30)
      expect(el.isUpdatePending).toBe(false)
    })
  })
})
