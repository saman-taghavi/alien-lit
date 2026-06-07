import type { ReactiveController, ReactiveElement } from 'lit'
import { effect, effectScope } from 'alien-signals'

/**
 * A Lit ReactiveController that manually tracks specific alien-signals
 * and requests a host update when any of the tracked signals change.
 */
export class SignalTrackingController implements ReactiveController {
  #dispose: (() => void) | null = null

  constructor(
    private host: ReactiveElement,
    private track: () => void,
  ) {
    this.host.addController(this)
  }

  hostConnected(): void {
    this.#dispose = effectScope(() => {
      effect(() => {
        this.track()
        this.host.requestUpdate()
      })
    })
  }

  hostDisconnected(): void {
    this.#dispose?.()
    this.#dispose = null
  }
}
