import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../shared-styles.js';
import { gsap } from 'gsap';

export class AixaSlideUseCases extends LitElement {
    static properties = {
        active: { type: Boolean, reflect: true }
    };

    static styles = [
        sharedStyles,
        css`
      :host {
        overflow: hidden;
      }

      h2 {
        font-weight: 500;
        margin-bottom: 2rem;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: -0.05em;
        /* Half the previous size (approx 6rem/8vw) */
        font-size: clamp(3rem, 7.5vw, 6rem);
        line-height: 0.9;
        color: #ffffffff;
        z-index: 100;
        pointer-events: none;
      }

      #container {
        position: relative;
        width: 100%;
        height: 60vh;
        overflow: visible;
      }

      .use-case {
        position: absolute;
        font-weight: 600;
        white-space: nowrap;
        pointer-events: none;
        user-select: none;
        will-change: transform;
      }
    `
    ];

    constructor() {
        super();
        this.useCases = [
            "Soporte", "Cliente Interno", "Cliente Externo", "Leads Cualificados",
            "Experto en Producto", "Cobranzas", "Agendamiento", "Recordatorios",
            "Ventas", "Escalamiento", "Encuestas", "Tutoriales",
            "Alertas", "Cambio de contraseña", "Facturación",
            "Cartera", "Seguimiento", "Estado de Servicio"
        ];
        this.elements = [];
        this.mouse = { x: -1000, y: -1000 };
        this._handleMouseMove = this._handleMouseMove.bind(this);
        this._tick = this._tick.bind(this);
        this._rafId = null;
    }

    firstUpdated() {
        const container = this.renderRoot.querySelector('#container');

        const observer = new ResizeObserver((entries) => {
            const rect = entries[0].contentRect;

            if (rect.width > 0 && rect.height > 0) {
                observer.disconnect(); // solo inicializamos una vez
                this._initElements();
                this._tick();
            }
        });

        observer.observe(container);

        window.addEventListener('mousemove', this._handleMouseMove);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('mousemove', this._handleMouseMove);
        if (this._rafId) cancelAnimationFrame(this._rafId);
    }

    _handleMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

    _initElements() {

        const container = this.renderRoot.querySelector('#container');
        const gradients = ['text-gradient-blue', 'text-gradient-green', 'text-gradient-red'];
        const rect = container.getBoundingClientRect();
        console.log(rect.width, rect.height);

        this.useCases.forEach((text, i) => {
            const el = document.createElement('div');
            const gradientClass = gradients[Math.floor(Math.random() * gradients.length)];
            el.className = `use-case ${gradientClass}`;
            el.innerText = text;

            const size = 1.5 + Math.random() * 3;
            el.style.fontSize = `${size}rem`;

            const x = Math.random() * (rect.width);
            const y = Math.random() * (rect.height);

            container.appendChild(el);

            this.elements.push({
                el,
                x,
                y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                w: 0, // Will update in tick once rendered
                h: 0,
                baseSpeed: 0.5 + Math.random() * 1
            });
        });
    }

    _tick() {
        if (!this.active) {
            this._rafId = requestAnimationFrame(this._tick);
            return;
        }

        const container = this.renderRoot.querySelector('#container');
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const repulsionRadius = 200;
        const repulsionStrength = 0.5;
        const friction = 0.98;

        this.elements.forEach(item => {
            // Get dimensions once
            if (item.w === 0) {
                item.w = item.el.offsetWidth;
                item.h = item.el.offsetHeight;
            }

            // Physics: Velocity
            item.x += item.vx;
            item.y += item.vy;

            // Mouse Repulsion
            const dx = (item.x + item.w / 2 + rect.left) - this.mouse.x;
            const dy = (item.y + item.h / 2 + rect.top) - this.mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < repulsionRadius) {
                const force = (repulsionRadius - dist) / repulsionRadius;
                const angle = Math.atan2(dy, dx);
                item.vx += Math.cos(angle) * force * repulsionStrength;
                item.vy += Math.sin(angle) * force * repulsionStrength;
            }

            // Bounce against walls
            if (item.x <= 0) {
                item.x = 0;
                item.vx *= -1;
            } else if (item.x + item.w >= rect.width) {
                item.x = rect.width - item.w;
                item.vx *= -1;
            }

            if (item.y <= 0) {
                item.y = 0;
                item.vy *= -1;
            } else if (item.y + item.h >= rect.height) {
                item.y = rect.height - item.h;
                item.vy *= -1;
            }

            // Friction and minimal movement
            item.vx *= friction;
            item.vy *= friction;

            // Constant gentle drift
            const speed = Math.sqrt(item.vx * item.vx + item.vy * item.vy);
            if (speed < 0.2) {
                item.vx += (Math.random() - 0.5) * 0.1;
                item.vy += (Math.random() - 0.5) * 0.1;
            }

            // Apply transform
            item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
        });

        this._rafId = requestAnimationFrame(this._tick);
    }

    render() {
        return html`
      <section class="slide">
        <h2 style="font-family: 'Fredoka', sans-serif;">Casos de Uso</h2>
        <div id="container"></div>
      </section>
    `;
    }
}

customElements.define('aixa-slide-use-cases', AixaSlideUseCases);
