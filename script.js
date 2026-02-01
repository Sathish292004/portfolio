/* =======================================
   PORTFOLIO JAVASCRIPT - VANILLA JS VERSION
   Based on React portfolio functionality
   ======================================= */

// Global variables
let scene, camera, renderer, stars, geometricShapes = [];
let isLoading = true;
let loadingProgress = 0;
let mouseX = 0, mouseY = 0;

// Loading screen phrases
const loadingPhrases = [
    "Initializing 3D engine...",
    "Loading creative assets...",
    "Preparing portfolio content...",
    "Setting up interactions...",
    "Almost ready..."
];
let currentPhraseIndex = 0;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    setupLoadingScreen();
    setupCustomCursor();
    setupNavigation();
    setupScrollAnimations();
    setupContactForm();
    initEmailJS();
    
    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Loading Screen
function setupLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const loadingMessage = document.getElementById('loading-message');
    const mainContent = document.getElementById('main-content');
    
    // Create background particles
    createLoadingParticles();
    
    // Progress animation
    const progressInterval = setInterval(() => {
        loadingProgress += Math.random() * 15;
        
        if (loadingProgress >= 100) {
            loadingProgress = 100;
            clearInterval(progressInterval);
            setTimeout(() => {
                completeLoading();
            }, 500);
        }
        
        progressFill.style.width = loadingProgress + '%';
        progressText.textContent = Math.round(loadingProgress) + '%';
    }, 100);
    
    // Loading message rotation
    const messageInterval = setInterval(() => {
        if (loadingProgress >= 100) {
            clearInterval(messageInterval);
            return;
        }
        
        currentPhraseIndex = (currentPhraseIndex + 1) % loadingPhrases.length;
        loadingMessage.style.opacity = '0';
        
        setTimeout(() => {
            loadingMessage.textContent = loadingPhrases[currentPhraseIndex];
            loadingMessage.style.opacity = '1';
        }, 200);
    }, 800);
    
    function completeLoading() {
        isLoading = false;
        loadingScreen.style.opacity = '0';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
            initialize3DScene();
            triggerScrollAnimations();
        }, 500);
    }
}

function createLoadingParticles() {
    const particlesBg = document.querySelector('.particles-bg');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'var(--primary)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = '0';
        particle.style.animation = `particleFloat 2s infinite ${Math.random() * 2}s`;
        
        particlesBg.appendChild(particle);
    }
    
    // Add particle animation keyframes
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { opacity: 0; transform: scale(0); }
                50% { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Custom Cursor
function setupCustomCursor() {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        cursorOutline.style.transform = `translate(${mouseX - 16}px, ${mouseY - 16}px)`;
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .service-card, .project-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform += ' scale(2)';
            cursorOutline.style.transform += ' scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
            cursorOutline.style.transform = `translate(${mouseX - 16}px, ${mouseY - 16}px)`;
        });
    });
}

// Navigation
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements after loading is complete
    window.addEventListener('load', () => {
        setTimeout(triggerScrollAnimations, 1000);
    });
    
    function triggerScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in-up');
        animatedElements.forEach(el => observer.observe(el));
    }
}

function animateSkillBars(skillCategory) {
    const skillFills = skillCategory.querySelectorAll('.skill-fill');
    
    skillFills.forEach((fill, index) => {
        setTimeout(() => {
            const skillLevel = fill.getAttribute('data-skill');
            fill.style.width = skillLevel + '%';
        }, index * 200);
    });
}

// 3D Scene Setup
function initialize3DScene() {
    const canvas = document.getElementById('hero-canvas');
    
    if (!canvas || typeof THREE === 'undefined') {
        console.warn('Three.js not available or canvas not found');
        return;
    }
    
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x8b5cf6, 0.5);
    pointLight.position.set(-10, -10, -10);
    scene.add(pointLight);
    
    // Create stars
    createStars();
    
    // Create geometric shapes
    createGeometricShapes();
    
    // Set camera position
    camera.position.z = 10;
    
    // Start render loop
    animate3D();
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

function createStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        transparent: true,
        opacity: 0.8
    });
    
    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

function createGeometricShapes() {
    const shapes = [
        { position: [-3, 2, 0], rotation: [0.5, 0.5, 0], scale: 0.8 },
        { position: [3, -1, -2], rotation: [1, 1, 0.5], scale: 1.2 },
        { position: [0, 3, -3], rotation: [0, 0.5, 1], scale: 1 },
        { position: [-2, -2, 1], rotation: [1.5, 0, 0.5], scale: 0.6 }
    ];
    
    shapes.forEach(shapeData => {
        const geometry = new THREE.IcosahedronGeometry(1, 0);
        const material = new THREE.MeshStandardMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.8,
            wireframe: true,
            emissive: 0x1e40af,
            emissiveIntensity: 0.2
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(...shapeData.position);
        mesh.rotation.set(...shapeData.rotation);
        mesh.scale.setScalar(shapeData.scale);
        
        geometricShapes.push(mesh);
        scene.add(mesh);
    });
}

function animate3D() {
    requestAnimationFrame(animate3D);
    
    // Rotate stars
    if (stars) {
        stars.rotation.x += 0.0005;
        stars.rotation.y += 0.0005;
    }
    
    // Animate geometric shapes
    geometricShapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 * (index + 1);
        shape.rotation.y += 0.015 * (index + 1);
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
    });
    
    // Auto-rotate scene
    if (scene) {
        scene.rotation.y += 0.002;
    }
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || !camera || !renderer) return;
    
    camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
}

// Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + '-error');
    
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (!value) errorMessage = 'Name is required';
            else if (value.length < 2) errorMessage = 'Name must be at least 2 characters';
            break;
            
        case 'email':
            if (!value) errorMessage = 'Email is required';
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMessage = 'Please enter a valid email address';
            break;
            
        case 'subject':
            if (!value) errorMessage = 'Subject is required';
            else if (value.length < 5) errorMessage = 'Subject must be at least 5 characters';
            break;
            
        case 'message':
            if (!value) errorMessage = 'Message is required';
            else if (value.length < 10) errorMessage = 'Message must be at least 10 characters';
            break;
    }
    
    if (errorMessage) {
        field.style.borderColor = 'var(--destructive)';
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'flex';
        return false;
    } else {
        field.style.borderColor = 'var(--border)';
        errorElement.style.display = 'none';
        return true;
    }
}

function clearFieldError(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + '-error');
    
    field.style.borderColor = 'var(--border)';
    errorElement.style.display = 'none';
}

function validateForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showToast('Please fix the errors in the form', 'error');
        return;
    }
    
    const submitBtn = document.getElementById('submit-btn');
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = `
        <div class="spinner"></div>
        <span>Sending...</span>
    `;
    submitBtn.disabled = true;
    
    try {
        // Simulate form submission (replace with actual EmailJS integration)
        await simulateFormSubmission(formData);
        
        // Show success state
        showFormSuccess();
        form.reset();
        
        showToast('Message sent successfully!', 'success');
        
    } catch (error) {
        console.error('Form submission error:', error);
        showToast('Failed to send message. Please try again later.', 'error');
    } finally {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = `
            <i data-lucide="send"></i>
            <span>Send Message</span>
        `;
        submitBtn.disabled = false;
        
        // Recreate icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('Simulated network error'));
            }
        }, 2000);
    });
}

function showFormSuccess() {
    const form = document.getElementById('contact-form');
    const successDiv = document.getElementById('form-success');
    
    form.style.display = 'none';
    successDiv.style.display = 'block';
    
    // Recreate icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function resetForm() {
    const form = document.getElementById('contact-form');
    const successDiv = document.getElementById('form-success');
    
    form.style.display = 'block';
    successDiv.style.display = 'none';
    form.reset();
}

// Email JS Integration (placeholder)
function initEmailJS() {
    // Initialize EmailJS here if you have the keys
    // emailjs.init("YOUR_PUBLIC_KEY");
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card);
        color: var(--foreground);
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-depth);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? 'var(--destructive)' : 'var(--primary)'};
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Global functions for HTML onclick handlers
window.scrollToSection = scrollToSection;
window.resetForm = resetForm;