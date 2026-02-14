import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../shared-styles.js';

export class AixaSlideCharacteristics extends LitElement {
    static styles = [
        sharedStyles,
        css`
      h2 {
        font-size: clamp(3rem, 7vw, 6rem);
        font-weight: 700;
        margin-bottom: 3rem;
        color: #00bfff;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        max-width: 1000px;
      }

      .item {
        padding: 2rem;
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .item h3 {
        font-size: 1.5rem;
        color: #e0f2fe;
      }

      .item p {
        color: rgba(224, 242, 254, 0.6);
      }
    `
    ];

    render() {
        return html`
      <section class="slide">
        <h2>Características</h2>
        <div class="grid">
          <div class="item glass">
            <h3>Arquitectura de Datos</h3>
            <p>Estructura robusta para el manejo eficiente de información.</p>
          </div>
          <div class="item glass">
            <h3>Escalabilidad</h3>
            <p>Capacidad de crecer según las necesidades del negocio.</p>
          </div>
          <div class="item glass">
            <h3>Seguridad</h3>
            <p>Protocolos avanzados para la protección de datos.</p>
          </div>
          <div class="item glass">
            <h3>Disponibilidad</h3>
            <p>Servicio continuo y confiable 24/7.</p>
          </div>
        </div>
      </section>
    `;
    }
}

customElements.define('aixa-slide-characteristics', AixaSlideCharacteristics);
