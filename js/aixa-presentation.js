import { LitElement, html, css } from 'lit';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Import components
import './components/aixa-slide-hero.js';
import './components/aixa-slide-use-cases.js';
import './components/aixa-slide-architecture.js';
import './components/aixa-slide-characteristics.js';
import './components/aixa-slide-modes.js';
import './components/aixa-slide-compatibility.js';
import './components/aixa-nav-controls.js';

export class AixaPresentation extends LitElement {
    static properties = {
        currentSlide: { type: Number },
        totalSlides: { type: Number }
    };

    static styles = css`
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
      background-color: #001a2c;
      overflow: hidden;
      font-family: 'Fredoka', sans-serif;
    }

    #bg-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    main {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 10;
    }
  `;

    constructor() {
        super();
        this.currentSlide = 0;
        this.totalSlides = 6;
        this._handleNav = this._handleNav.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    firstUpdated() {
        this._initThree();
        window.addEventListener('keydown', this._handleKeyDown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('keydown', this._handleKeyDown);
    }

    _initThree() {
        const canvas = this.renderRoot.querySelector('#bg-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        camera.position.z = 5;

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 3000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: '#005bb7',
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.0008;
            particlesMesh.rotation.x += 0.0004;
            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    _handleNav(e) {
        const { type } = e.detail;
        if (type === 'next' && this.currentSlide < this.totalSlides - 1) {
            this.currentSlide++;
        } else if (type === 'prev' && this.currentSlide > 0) {
            this.currentSlide--;
        }
    }

    _handleKeyDown(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            if (this.currentSlide < this.totalSlides - 1) this.currentSlide++;
        } else if (e.key === 'ArrowLeft') {
            if (this.currentSlide > 0) this.currentSlide--;
        }
    }

    render() {
        return html`
      <canvas id="bg-canvas"></canvas>
      <main>
        <aixa-slide-hero ?active="${this.currentSlide === 0}"></aixa-slide-hero>
        <aixa-slide-use-cases ?active="${this.currentSlide === 1}"></aixa-slide-use-cases>
        <aixa-slide-architecture ?active="${this.currentSlide === 2}"></aixa-slide-architecture>
        <aixa-slide-characteristics ?active="${this.currentSlide === 3}"></aixa-slide-characteristics>
        <aixa-slide-modes ?active="${this.currentSlide === 4}"></aixa-slide-modes>
        <aixa-slide-compatibility ?active="${this.currentSlide === 5}"></aixa-slide-compatibility>
      </main>

      <aixa-nav-controls 
        .current="${this.currentSlide}" 
        .total="${this.totalSlides}"
        @nav-change="${this._handleNav}">
      </aixa-nav-controls>
    `;
    }
}

customElements.define('aixa-presentation', AixaPresentation);
