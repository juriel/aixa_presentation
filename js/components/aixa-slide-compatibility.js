import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../shared-styles.js';

export class AixaSlideCompatibility extends LitElement {
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
        max-width: 800px;
        text-align: center;
      }

      .icons-grid {
        display: flex;
        justify-content: center;
        gap: 4rem;
        margin-top: 3rem;
      }

      .icon-box {
        width: 100px;
        height: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .icon-placeholder {
        width: 60px;
        height: 60px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      span { color: #e0f2fe; font-weight: 500; }
    `
    ];

    render() {
        return html`
      <section class="slide">
        <h2>Compatibilidad</h2>
        <div class="content">
          <p class="text-2xl text-blue-100/80">Integración nativa con las plataformas líderes del mercado.</p>
          <div class="icons-grid">
            <div class="icon-box">
              <div class="icon-placeholder"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
              <span>WhatsApp</span>
            </div>
            <div class="icon-box">
              <div class="icon-placeholder"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8V2z"/></svg></div>
              <span>Web</span>
            </div>
            <div class="icon-box">
              <div class="icon-placeholder"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg></div>
              <span>API</span>
            </div>
          </div>
        </div>
      </section>
    `;
    }
}

customElements.define('aixa-slide-compatibility', AixaSlideCompatibility);
