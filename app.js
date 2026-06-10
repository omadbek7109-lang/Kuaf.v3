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
    { id: 8, name: "Jamal Musiala", country: "Germany", position: "Midfielder", club: "Bayern", age: 20, goals: 38, assists: 28, photo: "✨", number: 42 },
    { id: 9, name: "Pedri", country: "Spain", position: "Midfielder", club: "Barcelona", age: 21, goals: 20, assists: 15, photo: "💫", number: 8 },
    { id: 10, name: "Jaloliddin Masharipov", country: "Uzbekistan", position: "Midfielder", club: "Esteghlal", age: 30, goals: 25, assists: 18, photo: "⭐", number: 10 }
];

// ============ THREE.JS EARTH SETUP ============
let scene, camera, renderer, earth, clouds, atmosphere, stars, controls;
let particleSystem;

function initEarth() {
    const container = document.getElementById('earth-canvas');
    if (!container) return;
    
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
    
    // Create procedural earth texture (since external images might not load)
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // Draw ocean
    ctx.fillStyle = '#1a4d8c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw continents (simplified)
    ctx.fillStyle = '#4a8c3f';
    // South America
    ctx.beginPath();
    ctx.ellipse(650, 550, 120, 180, 0, 0, Math.PI * 2);
    ctx.fill();
    // North America
    ctx.beginPath();
    ctx.ellipse(450, 350, 140, 160, 0, 0, Math.PI * 2);
    ctx.fill();
    // Europe/Asia
    ctx.beginPath();
    ctx.ellipse(1400, 400, 200, 180, 0, 0, Math.PI * 2);
    ctx.fill();
    // Africa
    ctx.beginPath();
    ctx.ellipse(1200, 600, 130, 150, 0, 0, Math.PI * 2);
    ctx.fill();
    // Australia
    ctx.beginPath();
    ctx.ellipse(1700, 700, 80, 70, 0, 0, Math.PI * 2);
    ctx.fill();
    
    const earthMap = new THREE.CanvasTexture(canvas);
    
    const earthGeometry = new THREE.SphereGeometry(1, 128, 128);
    const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthMap,
        shininess: 25,
        emissive: new THREE.Color(0x0a0a2a),
        emissiveIntensity: 0.2
    });
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    
    // Add glowing dots for countries (World Cup participants)
    const countryPositions = [
        { lat: -15, lon: -55, color: 0xffd700, name: "Brazil" },      // Brazil
        { lat: -35, lon: -65, color: 0x75aadb, name: "Argentina" },    // Argentina
        { lat: 46, lon: 2, color: 0x0055a4, name: "France" },          // France
        { lat: 52, lon: -1, color: 0x1b458f, name: "England" },        // England
        { lat: 40, lon: -4, color: 0xc60b1e, name: "Spain" },          // Spain
        { lat: 51, lon: 10, color: 0x000000, name: "Germany" },        // Germany
        { lat: 36, lon: 138, color: 0xbc002d, name: "Japan" },         // Japan
        { lat: 41, lon: 64, color: 0x1eb53a, name: "Uzbekistan" }      // Uzbekistan
    ];
    
    const glowGeometry = new THREE.SphereGeometry(1.02, 32, 32);
    countryPositions.forEach(pos => {
        const phi = (90 - pos.lat) * Math.PI / 180;
        const theta = pos.lon * Math.PI / 180;
        const x = 1.05 * Math.sin(phi) * Math.cos(theta);
        const y = 1.05 * Math.cos(phi);
        const z = 1.05 * Math.sin(phi) * Math.sin(theta);
        
        const pointLight = new THREE.PointLight(pos.color, 0.5, 3);
        pointLight.position.set(x, y, z);
        scene.add(pointLight);
        
        const glowMaterial = new THREE.MeshBasicMaterial({ color: pos.color, transparent: true, opacity: 0.6 });
        const glowDot = new THREE.Mesh(new THREE.SphereGeometry(0.02, 16, 16), glowMaterial);
        glowDot.position.set(x, y, z);
        scene.add(glowDot);
    });
    
    // Clouds
    const cloudGeometry = new THREE.SphereGeometry(1.01, 128, 128);
    const cloudMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });
    clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);
    
    // Atmosphere Glow
    const glowGeometryAtmo = new THREE.SphereGeometry(1.05, 64, 64);
    const glowMaterialAtmo = new THREE.MeshPhongMaterial({
        color: 0x00f3ff,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide
    });
    atmosphere = new THREE.Mesh(glowGeometryAtmo, glowMaterialAtmo);
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
    stars = new THREE.Points(starGeometry, starMaterial);
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
        controls.update();
        if (clouds) clouds.rotation.y += 0.0005;
        if (atmosphere) atmosphere.rotation.y += 0.0003;
        if (stars) stars.rotation.y += 0.0002;
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        if (!container) return;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
}

// ============ PARTICLE SYSTEM ============
class ParticleSystemClass {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;
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
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    addExplosion(x, y, color) {
        for (let i = 0; i < 40; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1,
                color: color || '#00f3ff',
                size: Math.random() * 5 + 2
            });
        }
    }
    
    animate() {
        if (!this.ctx || !this.canvas) return;
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
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
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
            <div class="country-stats">⚽ ${country.players} Players • 🔥 Elite Squad</div>
        </div>
    `).join('');
    
    document.querySelectorAll('.country-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const countryName = card.dataset.country;
            const country = countries.find(c => c.name === countryName);
            if (country) {
                showCountryModal(country);
            }
            if (particleSystem) {
                particleSystem.addExplosion(e.clientX, e.clientY, '#00f3ff');
            }
        });
    });
}

function showCountryModal(country) {
    const modal = document.getElementById('player-modal');
    const detailDiv = document.getElementById('player-detail');
    
    const countryPlayers = players.filter(p => p.country === country.name);
    
    detailDiv.innerHTML = `
        <div style="text-align: center">
            <div style="font-size: 80px; margin-bottom: 20px">${country.flag}</div>
            <h2 style="font-size: 48px; margin-bottom: 10px">${country.name}</h2>
            <div style="color: #00f3ff; margin-bottom: 30px">⚡ WORLD CUP PARTICIPANT ⚡</div>
        </div>
        <div style="margin: 30px 0">
            <h3 style="margin-bottom: 20px; font-size: 24px">🌟 STAR PLAYERS</h3>
            <div style="display: grid; gap: 15px">
                ${countryPlayers.map(p => `
                    <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 15px; display: flex; justify-content: space-between; align-items: center">
                        <div>
                            <div style="font-size: 18px; font-weight: bold">${p.name}</div>
                            <div style="font-size: 14px; color: rgba(255,255,255,0.6)">${p.position} • ${p.club}</div>
                        </div>
                        <div style="font-size: 30px">${p.photo}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    if (particleSystem) {
        particleSystem.addExplosion(window.innerWidth/2, window.innerHeight/2, '#ff00e6');
    }
}

function renderPlayers(searchTerm = '', positionFilter = 'all') {
    const grid = document.getElementById('players-grid');
    if (!grid) return;
    
    let filtered = players.filter(p => 
        (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
        (positionFilter === 'all' || p.position === positionFilter)
    );
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div style="text-align: center; grid-column: 1/-1; padding: 60px">No players found 🔍</div>';
        return;
    }
    
    grid.innerHTML = filtered.map(player => `
        <div class="player-card" data-player-id="${player.id}">
            <div class="player-photo">${player.photo}</div>
            <div class="player-name">${player.name}</div>
            <div class="player-info">${player.country} • ${player.position}</div>
            <div class="player-info">${player.club} • #${player.number}</div>
            <div class="player-info">⚽ ${player.goals} goals • 🎯 ${player.assists} assists</div>
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
        <div style="text-align: center">
            <div style="font-size: 80px; margin-bottom: 10px">${player.photo}</div>
            <div class="player-detail-name" style="font-size: 48px; font-weight: 800">${player.name}</div>
            <div style="color: #00f3ff; margin-bottom: 20px">${player.country} • #${player.number}</div>
        </div>
        <div class="player-detail-stats" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 30px 0">
            <div class="detail-stat" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 15px">
                <div class="detail-stat-label" style="font-size: 11px; color: rgba(255,255,255,0.5)">POSITION</div>
                <div class="detail-stat-value" style="font-size: 24px; font-weight: 700">${player.position}</div>
            </div>
            <div class="detail-stat" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 15px">
                <div class="detail-stat-label" style="font-size: 11px; color: rgba(255,255,255,0.5)">CLUB</div>
                <div class="detail-stat-value" style="font-size: 24px; font-weight: 700">${player.club}</div>
            </div>
            <div class="detail-stat" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 15px">
                <div class="detail-stat-label" style="font-size: 11px; color: rgba(255,255,255,0.5)">AGE</div>
                <div class="detail-stat-value" style="font-size: 24px; font-weight: 700">${player.age}</div>
            </div>
            <div class="detail-stat" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 15px">
                <div class="detail-stat-label" style="font-size: 11px; color: rgba(255,255,255,0.5)">GOALS</div>
                <div class="detail-stat-value" style="font-size: 24px; font-weight: 700">${player.goals}</div>
            </div>
            <div class="detail-stat" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 15px">
                <div class="detail-stat-label" style="font-size: 11px; color: rgba(255,255,255,0.5)">ASSISTS</div>
                <div class="detail-stat-value" style="font-size: 24px; font-weight: 700">${player.assists}</div>
            </div>
            <div class="detail-stat" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 15px">
                <div class="detail-stat-label" style="font-size: 11px; color: rgba(255,255,255,0.5)">MARKET VALUE</div>
                <div class="detail-stat-value" style="font-size: 24px; font-weight: 700">€${Math.floor(Math.random() * 100 + 20)}M</div>
            </div>
        </div>
        <div style="margin-top: 20px; padding: 20px; background: linear-gradient(135deg, rgba(0,243,255,0.1), rgba(255,0,230,0.1)); border-radius: 15px">
            <h3 style="margin-bottom: 10px">🏆 CAREER HIGHLIGHTS</h3>
            <p>${player.name} is one of the most exceptional talents in world football. Known for incredible ${player.position === 'Forward' ? 'goal-scoring ability and clinical finishing' : 'playmaking vision and creative passing'}. A true icon of the modern game with ${player.goals} career goals and counting.</p>
        </div>
    `;
    
    modal.classList.add('active');
    if (particleSystem) {
        particleSystem.addExplosion(window.innerWidth/2, window.innerHeight/2, '#ff00e6');
    }
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
            const targetPage = document.getElementById(`${pageId}-page`);
            if (targetPage) targetPage.classList.add('active');
            
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
        uz: { explore: 'KASHF ET', players: "O'YINCHILAR", teams: 'JAMOALAR', stats: 'STATISTIKA' }
    };
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const t = translations[lang];
            if (t) {
                const links = document.querySelectorAll('.nav-link');
                if (links[0]) links[0].textContent = t.explore;
                if (links[1]) links[1].textContent = t.players;
                if (links[2]) links[2].textContent = t.teams;
                if (links[3]) links[3].textContent = t.stats;
            }
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

// ============ STATS ANIMATION ============
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.innerText);
        if (isNaN(finalValue)) return;
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
}

// ============ LOADER ============
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1000);
        }, 1500);
    }
}

// ============ INITIALIZE ============
document.addEventListener('DOMContentLoaded', () => {
    initEarth();
    particleSystem = new ParticleSystemClass();
    renderCountries();
    initNavigation();
    initSearch();
    animateStats();
    hideLoader();
    
    // Explore Earth button
    const exploreBtn = document.getElementById('explore-earth-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            if (controls) {
                controls.autoRotate = false;
                camera.position.set(0, 0, 2);
                setTimeout(() => {
                    controls.autoRotate = true;
                }, 3000);
            }
            if (particleSystem) {
                particleSystem.addExplosion(e.clientX, e.clientY, '#00f3ff');
            }
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
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});

console.log('🔥 PlayerVerse Initialized! Welcome to the Ultimate Football Universe!');
