import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../shared-styles.js';

export class AixaSlideHero extends LitElement {
  static styles = [
    sharedStyles,
    css`
      .logo-container {
        width: clamp(200px, 40vw, 500px);
        margin-bottom: 3rem;
        filter: drop-shadow(0 0 30px rgba(0, 91, 183, 0.4));
      }

      h1 {
        font-size: clamp(2.5rem, 6vw, 5rem);
        font-weight: 500;
        line-height: 1.1;
        margin-bottom: 1.5rem;
        letter-spacing: -0.02em;
        color: #fff;
      }

      p {
        font-size: clamp(1rem, 2vw, 1.5rem);
        color: rgba(224, 242, 254, 0.8);
        text-transform: uppercase;
        letter-spacing: 0.15em;
      }
    `
  ];

  render() {
    return html`
      <section class="slide">
        <div class="logo-container">
          <img src="./images/aixa_logo_web.svg" alt="Aixa Logo" class="w-full h-auto">
        </div>
        <h1>
          Chatbot AI para ambientes corporativos
        </h1>
        <p>Chatbot - Consultoría IA - Automatización de Procesos</p>
      </section>
    `;
  }
}

customElements.define('aixa-slide-hero', AixaSlideHero);
