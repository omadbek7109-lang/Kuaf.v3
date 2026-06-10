// app.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ============ DATA ============
const countries = [
    { name: "Brazil", flag: "🇧🇷", code: "BRA", color: "#FFD700", players: 26, theme: "tropical" },
    { name: "Argentina", flag: "🇦🇷", code: "ARG", color: "#75AADB", players: 26, theme: "elegant" },
    { name: "France", flag: "🇫🇷", code: "FRA", color: "#0055A4", players: 26, theme: "luxury" },
    { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", code: "ENG", color: "#1B458F", players: 26, theme: "premium" },
    { name: "Spain", flag: "🇪🇸", code: "ESP", color: "#C60B1E", players: 26, theme: "warm" },
    { name: "Germany", flag: "🇩🇪", code: "GER", color: "#000000", players: 26, theme: "modern" },
    { name: "Japan", flag: "🇯🇵", code: "JPN", color: "#BC002D", players: 26, theme: "neon" },
    { name: "Uzbekistan", flag: "🇺🇿", code: "UZB", color: "#1EB53A", players: 26, theme: "cultural" }
];

const players = [
    { id: 1, name: "Lionel Messi", country: "Argentina", position: "Forward", club: "Inter Miami", age: 36, goals: 821, assists: 361, photo: "🐐", number: 10 },
    { id: 2, name: "Cristiano Ronaldo", country: "Portugal", position: "Forward", club: "Al Nassr", age: 38, goals: 873, assists: 248, photo: "🐐", number: 7 },
    { id: 3, name: "Kylian Mbappé", country: "France", position: "Forward", club: "PSG", age: 25, goals: 297, assists: 124, photo: "⚡", number: 7 },
    { id: 4, name: "Erling Haaland", country: "Norway", position: "Forward", club: "Man City", age: 23, goals: 232, assists: 48, photo: "🦁", number: 9 },
    { id: 5, name: "Kevin De Bruyne", country: "Belgium", position: "Midfielder", club: "Man City", age: 32, goals: 102, assists: 168, photo: "🎯", number: 17 },
    { id: 6, name: "Vinícius Jr", country: "Brazil", position: "Forward", club: "Real Madrid", age: 23, goals: 87, assists: 68, photo: "⚡", number: 7 },
    { id: 7, name: "Jude Bellingham", country: "England", position: "Midfielder", club: "Real Madrid", age: 20, goals: 45, assists: 32, photo: "⭐", number: 5 },
    { id: 8, name: "Jamal Musiala", country: "Germany", position: "Midfielder", club: "Bayern", age: 20, goals: 38, assists: 28, photo: "✨", number: 42 }
];

// ============ THREE.JS EARTH SETUP ============
let scene, camera, renderer, earth, controls;
let particles = [];

function initEarth() {
    const container = document.getElementById('earth-canvas');
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050508);
    scene.fog = new THREE.FogExp2(0x050508, 0.0005);
    
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 3.5);
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Earth Texture
    const textureLoader = new THREE.TextureLoader();
    const earthMap = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
    const earthSpecularMap = textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg');
    const earthNormalMap = textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');
    const cloudMap = textureLoader.load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png');
    
    // Earth Sphere
    const earthGeometry = new THREE.SphereGeometry(1, 128, 128);
    const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthMap,
        specularMap: earthSpecularMap,
        specular: new THREE.Color('grey'),
        shininess: 5,
        normalMap: earthNormalMap,
        normalScale: new THREE.Vector2(0.8, 0.8)
    });
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    // Clouds
    const cloudGeometry = new THREE.SphereGeometry(1.01, 128, 128);
    const cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudMap,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);
    
    // Atmosphere Glow
    const glowGeometry = new THREE.SphereGeometry(1.05, 64, 64);
    const glowMaterial = new THREE.MeshPhongMaterial({
        color: 0x00f3ff,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(atmosphere);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x111122);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    const backLight = new THREE.PointLight(0x00f3ff, 0.5);
    backLight.position.set(-2, -1, -3);
    scene.add(backLight);
    
    const fillLight = new THREE.PointLight(0xff00e6, 0.3);
    fillLight.position.set(2, 1, -2);
    scene.add(fillLight);
    
    // Stars Background
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 3000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 2000;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 500 - 200;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2, transparent: true, opacity: 0.6 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.zoomSpeed = 0.5;
    controls.maxDistance = 5;
    controls.minDistance = 2;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // autoRotate handled by OrbitControls
        clouds.rotation.y += 0.0005;
        atmosphere.rotation.y += 0.0003;
        stars.rotation.y += 0.0002;
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
}

// ============ PARTICLE SYSTEM ============
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    addExplosion(x, y, color) {
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1,
                color: color || '#00f3ff',
                size: Math.random() * 4 + 2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            p.vx *= 0.98;
            p.vy *= 0.98;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            this.ctx.globalAlpha = p.life * 0.8;
            this.ctx.fillStyle = p.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = p.color;
            this.ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============ UI RENDERING ============
function renderCountries() {
    const grid = document.getElementById('country-grid');
    if (!grid) return;
    
    grid.innerHTML = countries.map(country => `
        <div class="country-card" data-country="${country.name}">
            <div class="country-flag">${country.flag}</div>
            <div class="country-name">${country.name}</div>
            <div class="country-stats">⚽ ${country.players} Players</div>
        </div>
    `).join('');
    
    document.querySelectorAll('.country-card').forEach(card => {
        card.addEventListener('click', () => {
            const countryName = card.dataset.country;
            alert(`✨ Welcome to ${countryName} Football Universe! ✨\nExperience the unique atmosphere and legendary players.`);
            particleSystem.addExplosion(window.innerWidth/2, window.innerHeight/2, '#00f3ff');
        });
    });
}

function renderPlayers(searchTerm = '', positionFilter = 'all') {
    const grid = document.getElementById('players-grid');
    if (!grid) return;
    
    let filtered = players.filter(p => 
        (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
        (positionFilter === 'all' || p.position === positionFilter)
    );
    
    grid.innerHTML = filtered.map(player => `
        <div class="player-card" data-player-id="${player.id}">
            <div class="player-photo">${player.photo}</div>
            <div class="player-name">${player.name}</div>
            <div class="player-info">${player.country} • ${player.position}</div>
            <div class="player-info">${player.club} • #${player.number}</div>
        </div>
    `).join('');
    
    document.querySelectorAll('.player-card').forEach(card => {
        card.addEventListener('click', () => {
            const playerId = parseInt(card.dataset.playerId);
            showPlayerModal(playerId);
        });
    });
}

function showPlayerModal(playerId) {
    const player = players.find(p => p.id === playerId);
    if (!player) return;
    
    const modal = document.getElementById('player-modal');
    const detailDiv = document.getElementById('player-detail');
    
    detailDiv.innerHTML = `
        <div class="player-detail-name">${player.name}</div>
        <div class="player-detail-stats">
            <div class="detail-stat"><div class="detail-stat-label">COUNTRY</div><div class="detail-stat-value">${player.country}</div></div>
            <div class="detail-stat"><div class="detail-stat-label">POSITION</div><div class="detail-stat-value">${player.position}</div></div>
            <div class="detail-stat"><div class="detail-stat-label">CLUB</div><div class="detail-stat-value">${player.club}</div></div>
            <div class="detail-stat"><div class="detail-stat-label">AGE</div><div class="detail-stat-value">${player.age}</div></div>
            <div class="detail-stat"><div class="detail-stat-label">GOALS</div><div class="detail-stat-value">${player.goals}</div></div>
            <div class="detail-stat"><div class="detail-stat-label">ASSISTS</div><div class="detail-stat-value">${player.assists}</div></div>
            <div class="detail-stat"><div class="detail-stat-label">SHIRT NUMBER</div><div class="detail-stat-value">#${player.number}</div></div>
            <div class="detail-stat"><div class="detail-stat-label">MARKET VALUE</div><div class="detail-stat-value">€${Math.floor(Math.random() * 100 + 20)}M</div></div>
        </div>
        <div style="margin-top: 20px; padding: 20px; background: rgba(0,243,255,0.1); border-radius: 15px;">
            <h3 style="margin-bottom: 10px;">🏆 CAREER HIGHLIGHTS</h3>
            <p>One of the most exceptional talents in world football. Known for incredible ${player.position === 'Forward' ? 'goal-scoring ability' : 'playmaking vision'}. A true icon of the modern game.</p>
        </div>
    `;
    
    modal.classList.add('active');
    particleSystem.addExplosion(window.innerWidth/2, window.innerHeight/2, '#ff00e6');
}

// ============ PAGE NAVIGATION ============
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.dataset.page;
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(`${pageId}-page`).classList.add('active');
            
            if (pageId === 'players') {
                renderPlayers();
            }
        });
    });
    
    // Language switching
    const langBtns = document.querySelectorAll('.lang-btn');
    const translations = {
        en: { explore: 'EXPLORE', players: 'PLAYERS', teams: 'TEAMS', stats: 'STATISTICS' },
        ru: { explore: 'ИССЛЕДОВАТЬ', players: 'ИГРОКИ', teams: 'КОМАНДЫ', stats: 'СТАТИСТИКА' },
        uz: { explore: 'KASHF ET', players: 'O\'YINCHILAR', teams: 'JAMOALAR', stats: 'STATISTIKA' }
    };
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const t = translations[lang];
            document.querySelectorAll('.nav-link').forEach((link, idx) => {
                const keys = ['explore', 'players', 'teams', 'stats'];
                link.textContent = t[keys[idx]];
            });
        });
    });
}

// ============ SEARCH & FILTER ============
function initSearch() {
    const searchInput = document.getElementById('player-search');
    const positionFilter = document.getElementById('position-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderPlayers(e.target.value, positionFilter?.value || 'all');
        });
    }
    
    if (positionFilter) {
        positionFilter.addEventListener('change', (e) => {
            renderPlayers(searchInput?.value || '', e.target.value);
        });
    }
}

// ============ LOADER ============
function hideLoader() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    }, 1500);
}

// ============ INITIALIZE ============
let particleSystem;

document.addEventListener('DOMContentLoaded', () => {
    initEarth();
    particleSystem = new ParticleSystem();
    renderCountries();
    initNavigation();
    initSearch();
    hideLoader();
    
    // Explore Earth button
    const exploreBtn = document.getElementById('explore-earth-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            if (controls) {
                controls.autoRotate = false;
                camera.position.set(0, 0, 2);
                setTimeout(() => {
                    controls.autoRotate = true;
                }, 3000);
            }
            particleSystem.addExplosion(window.innerWidth/2, window.innerHeight/2, '#00f3ff');
        });
    }
    
    // Modal close
    const modal = document.getElementById('player-modal');
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Animate stats
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.innerText);
        let current = 0;
        const interval = setInterval(() => {
            current += Math.ceil(finalValue / 50);
            if (current >= finalValue) {
                current = finalValue;
                clearInterval(interval);
            }
            stat.innerText = current;
        }, 30);
    });
});

// Export for console debugging
window.playerVerse = { countries, players };
