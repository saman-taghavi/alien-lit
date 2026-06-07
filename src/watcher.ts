import type { ReactiveElement } from 'lit'
import { effect } from 'alien-signals'

type Constructor<T> = new (...args: any[]) => T

/**
 * A class mixin that adds automatic fine-grained reactive updates to any Lit ReactiveElement
 * (like LitElement) by tracking alien-signals accessed during the update/render lifecycle.
 */
export function SignalWatcher<T extends Constructor<ReactiveElement>>(Base: T): T {
  abstract class SignalWatcherClass extends Base {
    private __dispose?: () => void

    override performUpdate(): void {
      if (this.isUpdatePending === false) {
        return
      }

      this.__dispose?.()

      let updateFromLit = true

      this.__dispose = effect(() => {
        if (updateFromLit) {
          updateFromLit = false
          super.performUpdate()
        }
        else {
          this.requestUpdate()
        }
      })
    }

    override connectedCallback(): void {
      super.connectedCallback()
      // Ensure we re-render on re-connection to capture current signal accesses
      this.requestUpdate()
    }

    override disconnectedCallback(): void {
      super.disconnectedCallback()
      this.__dispose?.()
      this.__dispose = undefined
    }
  }

  return SignalWatcherClass as unknown as T
}
