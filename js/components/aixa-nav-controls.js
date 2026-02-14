import { LitElement, html, css } from 'lit';

export class AixaNavControls extends LitElement {
    static properties = {
        current: { type: Number },
        total: { type: Number }
    };

    static styles = css`
    :host {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 1000;
    }

    .nav-pill {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(20px);
      padding: 1rem 1.5rem;
      border-radius: 2.5rem;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    }

    .counter {
      color: #7dd3fc;
      font-weight: 700;
      font-size: 1.5rem;
      min-width: 5rem;
      text-align: center;
      font-family: 'Fredoka', sans-serif;
    }

    .buttons {
      display: flex;
      gap: 0.75rem;
    }

    button {
      width: 4rem;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    button:hover {
      background: #005bb7;
      border-color: #38bdf8;
      transform: scale(1.05);
    }

    button:active {
      transform: scale(0.95);
    }

    svg {
      width: 2rem;
      height: 2rem;
    }
  `;

    render() {
        return html`
      <div class="nav-pill">
        <div class="counter">${this.current + 1} / ${this.total}</div>
        <div class="buttons">
          <button @click="${() => this._dispatch('prev')}" aria-label="Anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button @click="${() => this._dispatch('next')}" aria-label="Siguiente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    `;
    }

    _dispatch(type) {
        this.dispatchEvent(new CustomEvent('nav-change', { detail: { type } }));
    }
}

customElements.define('aixa-nav-controls', AixaNavControls);
