import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../shared-styles.js';
import { gsap } from 'gsap';

export class AixaSlideArchitecture extends LitElement {
  static properties = {
    active: { type: Boolean, reflect: true }
  };

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        color: white;
      }

      .slide {
          padding: 0; /* Remove padding for fullscreen SVG */
      }

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
      }

      h2 {
        font-family: 'Fredoka', sans-serif;
        font-weight: 500;
        font-size: clamp(2rem, 5vw, 4rem);
        margin-top: 2rem;
        margin-bottom: 0;
        color: #fff;
        z-index: 10;
        text-transform: uppercase;
        letter-spacing: -0.02em;
        pointer-events: none;
      }

      svg {
        width: 95%;
        height: 80vh;
        max-width: 1200px;
        overflow: visible;
      }

      .node-text {
        font-family: 'Fredoka', sans-serif;
        font-size: 14px;
        font-weight: 500;
        fill: #e0f2fe;
        text-anchor: middle;
        pointer-events: none;
      }

      .node-title {
          font-weight: 600;
          font-size: 18px;
      }

      .path-bg {
        fill: none;
        stroke: rgba(125, 211, 252, 0.1);
        stroke-width: 2;
      }

      .path-glow {
        fill: none;
        stroke: #38bdf8;
        stroke-width: 3;
        stroke-dasharray: 10, 50;
        filter: drop-shadow(0 0 5px #00bfff);
      }

      .icon-bg {
        fill: #001a2c;
        stroke: rgba(255, 255, 255, 0.2);
        stroke-width: 1;
        transition: stroke 0.3s ease;
      }

      .node-group:hover .icon-bg {
          stroke: #00bfff;
          stroke-width: 2;
      }

      /* Logo styles */
      .aixa-hub {
          filter: drop-shadow(0 0 15px rgba(0, 191, 255, 0.3));
      }
    `
  ];

  updated(changedProperties) {
    if (changedProperties.has('active') && this.active) {
      this._animateIn();
    }
  }

  _animateIn() {
    const flows = this.renderRoot.querySelectorAll('.path-glow');
    gsap.set(flows, { strokeDashoffset: 0 });

    flows.forEach((flow, i) => {
      gsap.to(flow, {
        strokeDashoffset: -120,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        ease: "none",
        delay: i * 0.2
      });
    });

    gsap.from(this.renderRoot.querySelectorAll('.node-group'), {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)",
      transformOrigin: "center center"
    });
  }

  render() {
    return html`
      <section class="slide">
        <h2>Arquitectura</h2>
        <div class="container">
            <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <g id="paths">
                <!-- Connectors between Aixa and nodes -->
                <path class="path-bg" d="M 500 300 Q 300 300 200 200" />
                <path class="path-glow" d="M 500 300 Q 300 300 200 200" />
                
                <path class="path-bg" d="M 500 300 Q 300 300 150 450" />
                <path class="path-glow" d="M 500 300 Q 300 300 150 450" />

                <path class="path-bg" d="M 500 300 Q 500 150 420 100" />
                <path class="path-glow" d="M 500 300 Q 500 150 420 100" />

                <path class="path-bg" d="M 500 300 Q 500 150 580 100" />
                <path class="path-glow" d="M 500 300 Q 500 150 580 100" />

                <path class="path-bg" d="M 500 300 Q 700 300 800 150" />
                <path class="path-glow" d="M 500 300 Q 700 300 800 150" />

                <path class="path-bg" d="M 500 300 Q 700 300 850 300" />
                <path class="path-glow" d="M 500 300 Q 700 300 850 300" />

                <path class="path-bg" d="M 500 300 Q 700 300 800 450" />
                <path class="path-glow" d="M 500 300 Q 700 300 800 450" />

                <path class="path-bg" d="M 500 300 Q 700 300 700 550" />
                <path class="path-glow" d="M 500 300 Q 700 300 700 550" />
              </g>

              <!-- Central Hub -->
              <g class="node-group aixa-hub" id="hub">
                 <!-- Transparent container, borderless, with official logo -->
                 <image href="./images/aixa_logo_web.svg" x="400" y="250" width="200" height="100" />
              </g>

              <!-- LLM Section -->
              <g class="node-group" transform="translate(420, 100)">
                <circle class="icon-bg" r="30" />
                <text class="node-text node-title" y="-45">LLM</text>
                <text class="node-text" y="55">OpenAI</text>
              </g>
              <g class="node-group" transform="translate(580, 100)">
                <circle class="icon-bg" r="30" />
                <text class="node-text" y="55">Gemini</text>
              </g>

              <!-- WhatsApp Section -->
              <g class="node-group" transform="translate(200, 200)">
                <rect class="icon-bg" x="-40" y="-40" width="80" height="80" rx="15" />
                <text class="node-text" y="60">WhatsApp Cloud</text>
                <circle cx="0" cy="0" r="15" fill="#25D366" />
              </g>

              <!-- HTTP Section -->
              <g class="node-group" transform="translate(150, 450)">
                <rect class="icon-bg" x="-50" y="-30" width="100" height="60" rx="10" />
                <text class="node-text node-title" fill="#00bfff" y="8" style="font-size: 24px;">HTTP</text>
                <text class="node-text" y="50">Webservices</text>
              </g>

              <!-- Knowledge / DB -->
              <g class="node-group" transform="translate(800, 150)">
                <circle class="icon-bg" r="35" />
                <text class="node-text" y="60">BD / Conocimiento</text>
              </g>

              <!-- Tools -->
              <g class="node-group" transform="translate(850, 300)">
                <circle class="icon-bg" r="35" />
                <text class="node-text" y="60">Herramientas</text>
                <text class="node-text" x="120" y="0" style="text-anchor: start; font-size: 11px; fill: #94a3b8; line-height: 1.2;">
                    <tspan x="60" dy="-15">• Cambio Contraseña</tspan>
                    <tspan x="60" dy="15">• Estado Servicio</tspan>
                    <tspan x="60" dy="15">• Facturación</tspan>
                    <tspan x="60" dy="15">• Cartera</tspan>
                </text>
              </g>

              <!-- Tasks -->
              <g class="node-group" transform="translate(800, 450)">
                <circle class="icon-bg" r="35" />
                <text class="node-text" y="60">Tareas</text>
              </g>

              <!-- Flows -->
              <g class="node-group" transform="translate(700, 550)">
                <circle class="icon-bg" r="30" />
                <text class="node-text" y="50">Flujos</text>
              </g>
            </svg>
        </div>
      </section>
    `;
  }
}

customElements.define('aixa-slide-architecture', AixaSlideArchitecture);
