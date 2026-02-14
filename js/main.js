import * as THREE from 'three';
import { gsap } from 'gsap';

// --- Scene Setup ---
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

camera.position.z = 5;

// --- Background Particles ---
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

// --- Animation Loop ---
const animate = () => {
    requestAnimationFrame(animate);

    particlesMesh.rotation.y += 0.0008;
    particlesMesh.rotation.x += 0.0004;

    renderer.render(scene, camera);
};

animate();

// --- Window Resize ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Use Cases Data ---
const useCases = [
    "Soporte", "Cliente Interno", "Cliente Externo", "Leads Cualificados",
    "Experto en Producto", "Cobranzas", "Agendamiento", "Recordatorios",
    "Ventas", "Escalamiento", "Encuestas", "Tutoriales",
    "Alertas", "Cambio de contraseña", "Facturación",
    "Cartera", "Seguimiento", "Estado de Servicio"
];

const useCaseElements = [];

function initUseCases() {
    const container = document.querySelector('#use-cases-container');
    if (!container) return;

    const gradients = ['text-gradient-blue', 'text-gradient-green', 'text-gradient-red'];

    useCases.forEach((text, i) => {
        const el = document.createElement('div');
        const gradientClass = gradients[Math.floor(Math.random() * gradients.length)];
        el.className = `absolute font-bold whitespace-nowrap pointer-events-none ${gradientClass}`;
        el.innerText = text;

        // Random style and position
        const size = 1.5 + Math.random() * 3.5;
        const x = Math.random() * 80;
        const y = Math.random() * 70;
        const delay = Math.random() * 5;
        const duration = 12 + Math.random() * 20;

        el.style.fontSize = `${size}rem`;
        el.style.left = `${x}%`;
        el.style.top = `${y}%`;
        el.style.opacity = '0';
        el.style.zIndex = Math.floor(size * 10);

        container.appendChild(el);
        useCaseElements.push({
            el,
            factor: 30 + Math.random() * 50
        });

        // Entrance Animation
        gsap.to(el, {
            opacity: 1,
            duration: 1.5,
            delay: i * 0.08,
            ease: 'power3.out'
        });

        // Floating Animation (Intensified)
        gsap.to(el, {
            x: 'random(-150, 150)',
            y: 'random(-150, 150)',
            rotate: 'random(-5, 5)',
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: delay
        });
    });

    // Mouse Parallax Effect
    window.addEventListener('mousemove', (e) => {
        if (currentSlideIndex !== 1) return;

        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;

        useCaseElements.forEach(item => {
            gsap.to(item.el, {
                xPercent: mouseX * item.factor,
                yPercent: mouseY * item.factor,
                duration: 1.2,
                ease: 'power2.out'
            });
        });
    });
}

// --- Slide Management ---
const slides = document.querySelectorAll('.slide');
const slideNumberDisplay = document.querySelector('#slide-number');
let currentSlideIndex = 0;
let useCasesInitialized = false;

function updateSlideIndicator() {
    if (slideNumberDisplay) {
        slideNumberDisplay.innerText = `${currentSlideIndex + 1} / ${slides.length}`;
    }
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            // GSAP Entrance
            gsap.killTweensOf(slide);

            // Set initial state for entrance
            slide.style.display = 'flex';
            slide.style.visibility = 'visible';
            slide.style.zIndex = 50;
            slide.style.pointerEvents = 'auto';

            gsap.fromTo(slide,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    onStart: () => {
                        slide.classList.remove('slide-inactive');
                        slide.classList.add('slide-active');
                    }
                }
            );

            // Special initialization per slide
            if (index === 1 && !useCasesInitialized) {
                initUseCases();
                useCasesInitialized = true;
            }
        } else {
            if (slide.classList.contains('slide-active')) {
                gsap.killTweensOf(slide);
                gsap.to(slide, {
                    opacity: 0,
                    y: -30,
                    duration: 0.6,
                    ease: 'power3.in',
                    onComplete: () => {
                        slide.classList.remove('slide-active');
                        slide.classList.add('slide-inactive');
                        slide.style.visibility = 'hidden';
                        slide.style.display = 'none';
                        slide.style.zIndex = 0;
                        slide.style.pointerEvents = 'none';
                    }
                });
            } else {
                slide.classList.remove('slide-active');
                slide.classList.add('slide-inactive');
                slide.style.visibility = 'hidden';
                slide.style.display = 'none';
                slide.style.opacity = '0';
                slide.style.zIndex = 0;
            }
        }
    });
    updateSlideIndicator();
}

// Initial slide
showSlide(0);

// Navigation
document.querySelector('#next-btn').addEventListener('click', () => {
    if (currentSlideIndex < slides.length - 1) {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }
});

document.querySelector('#prev-btn').addEventListener('click', () => {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        showSlide(currentSlideIndex);
    }
});

// Keyboard navigation
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        if (currentSlideIndex < slides.length - 1) {
            currentSlideIndex++;
            showSlide(currentSlideIndex);
        }
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            showSlide(currentSlideIndex);
        }
    }
});
