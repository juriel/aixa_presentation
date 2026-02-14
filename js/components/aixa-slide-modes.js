import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../shared-styles.js';

export class AixaSlideModes extends LitElement {
    static styles = [
        sharedStyles,
        css`
      h2 {
        font-size: clamp(3rem, 7vw, 6rem);
        font-weight: 700;
        margin-bottom: 3rem;
        color: #00bfff;
      }

      .content {
        display: flex;
        gap: 3rem;
        justify-content: center;
        max-width: 1000px;
      }

      .mode-card {
        flex: 1;
        padding: 3rem;
        border-radius: 2rem;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      .mode-card:hover { scale: 1.05; background: rgba(0, 91, 183, 0.1); }

      h3 { font-size: 2rem; margin-bottom: 1rem; color: #fff; }
      p { color: rgba(224, 242, 254, 0.8); line-height: 1.5; }
    `
    ];

    render() {
        return html`
      <section class="slide">
        <h2>Modos de IA</h2>
        <div class="content">
          <div class="mode-card glass">
            <h3 class="text-gradient-blue">Consultivo</h3>
            <p>IA diseñada para analizar, diagnosticar y proponer soluciones estratégicas basadas en datos.</p>
          </div>
          <div class="mode-card glass">
            <h3 class="text-gradient-green">Resolutivo</h3>
            <p>IA enfocada en la ejecución rápida y precisa de tareas específicas y flujos de trabajo.</p>
          </div>
        </div>
      </section>
    `;
    }
}

customElements.define('aixa-slide-modes', AixaSlideModes);
