/* ============================================================
   NIMA YEYMIZ? — COMPLETE APP LOGIC
   Telegram Mini App | Vanilla JS | ES6+ | Production Ready
   ============================================================ */

// ==================== GLOBAL STATE ====================
const state = {
  currentUser: null,
  currentPage: 'home',
  foods: [],
  cart: [],
  categories: ['all', 'fastfood', 'milliy', 'salad', 'drinks', 'dessert'],
  currentCategory: 'all',
  searchQuery: '',
  spinsLeft: 3,
  lastSpinDate: null,
  rouletteSpinning: false,
  selectedReward: null,
  promoApplied: null,
  cashbackEnabled: true,
  notificationsEnabled: true,
  leaderboardType: 'weekly',
  winHistory: []
};

// ==================== TELEGRAM INTEGRATION ====================
const telegram = window.Telegram?.WebApp;

function initTelegram() {
  if (telegram) {
    telegram.ready();
    telegram.expand();
    telegram.enableClosingConfirmation();
    
    if (telegram.HapticFeedback) {
      window.haptic = telegram.HapticFeedback;
    }
    
    // Apply Telegram theme if available
    if (telegram.themeParams) {
      document.documentElement.style.setProperty('--bg-primary', telegram.themeParams.bg_color || '#050505');
      document.documentElement.style.setProperty('--text-primary', telegram.themeParams.text_color || '#ffffff');
    }
  }
}

function hapticImpact(style = 'light') {
  if (window.haptic) {
    window.haptic.impactOccurred(style);
  }
}

// ==================== SOUND SYSTEM ====================
const sounds = {
  click: () => playSound('click'),
  spin: () => playSound('spin'),
  win: () => playSound('win'),
  checkout: () => playSound('checkout')
};

function playSound(type) {
  try {
    const audio = new Audio();
    audio.volume = 0.3;
    // Simple beep using Web Audio API for better compatibility
    if (type === 'click') {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      gain.gain.value = 0.1;
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
      osc.stop(ctx.currentTime + 0.1);
    }
  } catch(e) { /* silent fail */ }
}

// ==================== INITIAL DATA ====================
const defaultFoods = [
  { id: 1, nameUz: "Burger", nameRu: "Бургер", emoji: "🍔", category: "fastfood", price: 25000, cashbackPercent: 5, diamondReward: 10, descriptionUz: "Mazali go'sht kotleti", descriptionRu: "Вкусная мясная котлета" },
  { id: 2, nameUz: "Pizza", nameRu: "Пицца", emoji: "🍕", category: "fastfood", price: 45000, cashbackPercent: 7, diamondReward: 15, descriptionUz: "Italyan pizza", descriptionRu: "Итальянская пицца" },
  { id: 3, nameUz: "Salat", nameRu: "Салат", emoji: "🥗", category: "salad", price: 18000, cashbackPercent: 10, diamondReward: 8, descriptionUz: "Yangi sabzavotlar", descriptionRu: "Свежие овощи" },
  { id: 4, nameUz: "Lag'mon", nameRu: "Лагман", emoji: "🍜", category: "milliy", price: 28000, cashbackPercent: 5, diamondReward: 12, descriptionUz: "Uyg'ur taomi", descriptionRu: "Уйгурское блюдо" },
  { id: 5, nameUz: "Somsa", nameRu: "Самса", emoji: "🥟", category: "milliy", price: 8000, cashbackPercent: 3, diamondReward: 5, descriptionUz: "Tandir somsa", descriptionRu: "Тандыр самса" },
  { id: 6, nameUz: "Palov", nameRu: "Плов", emoji: "🍚", category: "milliy", price: 32000, cashbackPercent: 5, diamondReward: 15, descriptionUz: "An'anaviy palov", descriptionRu: "Традиционный плов" },
  { id: 7, nameUz: "Sho'rva", nameRu: "Шурпа", emoji: "🥣", category: "milliy", price: 22000, cashbackPercent: 5, diamondReward: 10, descriptionUz: "Issiq sho'rva", descriptionRu: "Горячий суп" },
  { id: 8, nameUz: "Ichimlik", nameRu: "Напиток", emoji: "🥤", category: "drinks", price: 8000, cashbackPercent: 2, diamondReward: 3, descriptionUz: "Sovuq ichimlik", descriptionRu: "Холодный напиток" },
  { id: 9, nameUz: "Shirinlik", nameRu: "Десерт", emoji: "🍰", category: "dessert", price: 15000, cashbackPercent: 4, diamondReward: 7, descriptionUz: "Mazali shirinlik", descriptionRu: "Вкусный десерт" },
  { id: 10, nameUz: "Qozon kebab", nameRu: "Казан кебаб", emoji: "🍲", category: "milliy", price: 35000, cashbackPercent: 6, diamondReward: 12, descriptionUz: "Qozonda pishirilgan go'sht", descriptionRu: "Мясо приготовленное в казане" }
];

const wheelSegments = [
  { nameUz: "Burger", nameRu: "Бургер", emoji: "🍔", price: 25000, cashback: 5, diamonds: 10 },
  { nameUz: "Pizza", nameRu: "Пицца", emoji: "🍕", price: 45000, cashback: 7, diamonds: 15 },
  { nameUz: "Salat", nameRu: "Салат", emoji: "🥗", price: 18000, cashback: 10, diamonds: 8 },
  { nameUz: "Lag'mon", nameRu: "Лагман", emoji: "🍜", price: 28000, cashback: 5, diamonds: 12 },
  { nameUz: "Somsa", nameRu: "Самса", emoji: "🥟", price: 8000, cashback: 3, diamonds: 5 },
  { nameUz: "Palov", nameRu: "Плов", emoji: "🍚", price: 32000, cashback: 5, diamonds: 15 },
  { nameUz: "Sho'rva", nameRu: "Шурпа", emoji: "🥣", price: 22000, cashback: 5, diamonds: 10 },
  { nameUz: "Ichimlik", nameRu: "Напиток", emoji: "🥤", price: 8000, cashback: 2, diamonds: 3 }
];

// ==================== STORAGE UTILS ====================
function saveToLocalStorage() {
  localStorage.setItem('nima_user', JSON.stringify(state.currentUser));
  localStorage.setItem('nima_foods', JSON.stringify(state.foods));
  localStorage.setItem('nima_cart', JSON.stringify(state.cart));
  localStorage.setItem('nima_spins', JSON.stringify({ spinsLeft: state.spinsLeft, lastSpinDate: state.lastSpinDate }));
}

function loadFromLocalStorage() {
  const savedUser = localStorage.getItem('nima_user');
  const savedFoods = localStorage.getItem('nima_foods');
  const savedCart = localStorage.getItem('nima_cart');
  const savedSpins = localStorage.getItem('nima_spins');
  
  if (savedUser) state.currentUser = JSON.parse(savedUser);
  if (savedFoods) state.foods = JSON.parse(savedFoods);
  else state.foods = [...defaultFoods];
  if (savedCart) state.cart = JSON.parse(savedCart);
  if (savedSpins) {
    const spins = JSON.parse(savedSpins);
    state.spinsLeft = spins.spinsLeft;
    state.lastSpinDate = spins.lastSpinDate;
  }
  
  // Reset spins daily
  checkAndResetSpins();
}

function checkAndResetSpins() {
  const today = new Date().toDateString();
  if (state.lastSpinDate !== today) {
    state.spinsLeft = 3;
    state.lastSpinDate = today;
    saveToLocalStorage();
  }
}

// ==================== USER SYSTEM ====================
function handleRegister() {
const name = document.getElementById('reg-name')?.value.trim();
const phone = document.getElementById('reg-phone')?.value.trim();

const btn = document.getElementById('btn-register');
const btnText = btn?.querySelector('.btn-text');

if (btnText) {
btnText.style.animation = 'none';
btnText.offsetHeight;
btnText.style.animation =
'btnSpinPress 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
}

if (!name || !phone) {
showToast("Iltimos, ism va telefon raqamni to'ldiring", "warning");
hapticImpact('error');
return;
}

if (phone.length < 9) {
showToast("Telefon raqam to'liq emas", "warning");
return;
}

const isAdmin =
name === "Admin Admin" && phone === "999999999";

state.currentUser = {
id: Date.now(),
name: name,
phone: '+998' + phone,
university: 'default',
diamonds: 100,
cashback: 0,
totalOrders: 0,
level: 1,
xp: 0,
joinDate: new Date().toISOString(),
isAdmin: isAdmin
};

saveToLocalStorage();

const registerPage = document.getElementById('register-page');

if (registerPage) {
registerPage.style.animation =
'containerFloatUp 0.5s reverse';
}

setTimeout(() => {
hideSplashAndShowApp();
showToast(
"Xush kelibsiz, ${name.split(' ')[0]}! 🎉",
"success"
);
hapticImpact('success');
}, 400);
} <button class="btn-primary" id="btn-register">
  <span class="btn-text">Boshlash 🚀</span>
  <div class="btn-glow"></div>
</button>
  
function updateRegisterPageHTML() {
  const registerPage = document.getElementById('register-page');

  if (!registerPage) return;

  registerPage.innerHTML = `
    <div class="register-container">

      <div class="reg-header">
        <div class="reg-logo">
          <span>🍽️</span>
        </div>

        <h2 class="reg-title">Nima yeymiz?</h2>

        <p class="reg-subtitle">
          Smart food ordering
        </p>
      </div>

      <div class="reg-form-card">

        <div class="form-step">
          <label class="form-label">
            To'liq ismingiz
          </label>

          <div class="form-input-wrap">
            <span class="input-icon">👤</span>

            <input
              type="text"
              id="reg-name"
              class="form-input"
              placeholder="Ism Familiya"
              autocomplete="name"
            />
          </div>
        </div>

        <div class="form-step">
          <label class="form-label">
            Telefon raqam
          </label>

          <div class="form-input-wrap">
            <span class="input-icon">📱</span>

            <span class="phone-prefix">
              +998
            </span>

            <input
              type="tel"
              id="reg-phone"
              class="form-input phone-input"
              placeholder="90 123 45 67"
              maxlength="12"
              inputmode="numeric"
            />
          </div>
        </div>

        <button class="btn-primary" id="btn-register">
          <span class="btn-text">
            Boshlash 🚀
          </span>

          <div class="btn-glow"></div>
        </button>

      </div>

      <p class="reg-footer-text">
        SMS tasdiqnomasiz tezkor kirish
      </p>

    </div>
  `;

  const registerBtn = document.getElementById('btn-register');

  if (registerBtn) {
    registerBtn.onclick = handleRegister;
  }
     }

function hideSplashAndShowApp() {
  const splash = document.getElementById('splash-screen');
  const register = document.getElementById('register-page');
  const mainApp = document.getElementById('main-app');
  
  if (splash) splash.style.display = 'none';
  if (register) register.classList.add('hidden');
  if (mainApp) mainApp.classList.remove('hidden');
  
  navigate('home');
  renderHomePage();
  renderMenuPage();
  renderRewardsShop();
  initBottomNav();
}

function updateUserUI() {
  if (!state.currentUser) return;
  
  const userName = state.currentUser.name;
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  document.getElementById('greeting-name')?.setAttribute('data-name', userName);
  document.getElementById('greeting-name')?.setAttribute('data-original', userName);
  if (document.getElementById('greeting-name')) {
    document.getElementById('greeting-name').innerHTML = `${userName.split(' ')[0]} 👋`;
  }
  
  document.getElementById('avatar-initials')?.setAttribute('data-initials', initials);
  if (document.getElementById('avatar-initials')) {
    document.getElementById('avatar-initials').innerText = initials;
  }
  
  document.getElementById('home-diamonds')?.setAttribute('data-value', state.currentUser.diamonds);
  if (document.getElementById('home-diamonds')) {
    document.getElementById('home-diamonds').innerText = state.currentUser.diamonds;
  }
  
  document.getElementById('home-cashback')?.setAttribute('data-value', state.currentUser.cashback);
  if (document.getElementById('home-cashback')) {
    document.getElementById('home-cashback').innerText = state.currentUser.cashback + " so'm";
  }
  
  document.getElementById('home-level')?.setAttribute('data-value', state.currentUser.level);
  if (document.getElementById('home-level')) {
    document.getElementById('home-level').innerText = state.currentUser.level;
  }
  
  document.getElementById('hdr-diamonds')?.setAttribute('data-value', state.currentUser.diamonds);
  if (document.getElementById('hdr-diamonds')) {
    document.getElementById('hdr-diamonds').innerText = state.currentUser.diamonds;
  }
  
  document.getElementById('hdr-cashback')?.setAttribute('data-value', state.currentUser.cashback);
  if (document.getElementById('hdr-cashback')) {
    document.getElementById('hdr-cashback').innerText = state.currentUser.cashback;
  }
  
  document.getElementById('profile-name-display')?.setAttribute('data-name', state.currentUser.name);
  if (document.getElementById('profile-name-display')) {
    document.getElementById('profile-name-display').innerText = state.currentUser.name;
  }
  
  document.getElementById('profile-phone-display')?.setAttribute('data-phone', state.currentUser.phone);
  if (document.getElementById('profile-phone-display')) {
    document.getElementById('profile-phone-display').innerText = state.currentUser.phone;
  }
  
  const uniMap = { tashgu: "ToshDU", tdtu: "TDTU", inha: "INHA University", wiut: "WIUT", tmi: "TMI", other: "Boshqa" };
  const uniText = uniMap[state.currentUser.university] || state.currentUser.university;
  document.getElementById('profile-uni-display')?.setAttribute('data-uni', uniText);
  if (document.getElementById('profile-uni-display')) {
    document.getElementById('profile-uni-display').innerText = uniText;
  }
  
  document.getElementById('profile-initials-big')?.setAttribute('data-initials', initials);
  if (document.getElementById('profile-initials-big')) {
    document.getElementById('profile-initials-big').innerText = initials;
  }
  
  document.getElementById('p-total-orders')?.setAttribute('data-value', state.currentUser.totalOrders || 0);
  if (document.getElementById('p-total-orders')) {
    document.getElementById('p-total-orders').innerText = state.currentUser.totalOrders || 0;
  }
  
  document.getElementById('p-diamonds-total')?.setAttribute('data-value', state.currentUser.diamonds);
  if (document.getElementById('p-diamonds-total')) {
    document.getElementById('p-diamonds-total').innerHTML = state.currentUser.diamonds + " 💎";
  }
  
  document.getElementById('p-cashback-total')?.setAttribute('data-value', state.currentUser.cashback);
  if (document.getElementById('p-cashback-total')) {
    document.getElementById('p-cashback-total').innerText = state.currentUser.cashback;
  }
  
  const levelNames = ['Yangi boshlovchi', 'Bronza', 'Kumush', 'Oltin', 'Platina', 'Brilliant'];
  const levelIndex = Math.min(Math.floor(state.currentUser.level / 100), 5);
  document.getElementById('rank-level-name')?.setAttribute('data-level', levelNames[levelIndex]);
  if (document.getElementById('rank-level-name')) {
    document.getElementById('rank-level-name').innerText = levelNames[levelIndex];
  }
  
  document.getElementById('rank-diamonds-big')?.setAttribute('data-value', state.currentUser.diamonds);
  if (document.getElementById('rank-diamonds-big')) {
    document.getElementById('rank-diamonds-big').innerHTML = state.currentUser.diamonds + " 💎";
  }
  
  const nextLevel = Math.ceil(state.currentUser.level / 100) * 100;
  const xpPercent = (state.currentUser.level % 100);
  document.getElementById('xp-bar-fill')?.setAttribute('style', `width: ${xpPercent}%`);
  document.getElementById('xp-next-level')?.setAttribute('data-next', nextLevel);
  if (document.getElementById('xp-next-level')) {
    document.getElementById('xp-next-level').innerText = nextLevel + " 💎";
  }
  
  const rankBadges = { 1: "🥉", 2: "🥈", 3: "🥇", 4: "🏆", 5: "👑", 6: "⭐" };
  document.getElementById('rank-badge-big')?.setAttribute('data-badge', rankBadges[levelIndex + 1] || "🎯");
  if (document.getElementById('rank-badge-big')) {
    document.getElementById('rank-badge-big').innerText = rankBadges[levelIndex + 1] || "🎯";
  }
  
  // Admin panel visibility
  const adminElements = document.querySelectorAll('.admin-only-item, #admin-panel-btn');
  if (state.currentUser.isAdmin) {
    adminElements.forEach(el => el?.classList.remove('hidden'));
  } else {
    adminElements.forEach(el => el?.classList.add('hidden'));
  }
}

// ==================== NAVIGATION SYSTEM ====================
function navigate(page) {
  state.currentPage = page;
  hapticImpact('light');
  
  document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
  const targetPage = document.getElementById(`page-${page}`);
  if (targetPage) targetPage.classList.add('active');
  
  document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
  const activeNav = document.getElementById(`nav-${page}`);
  if (activeNav) activeNav.classList.add('active');
  
  if (page === 'home') renderHomePage();
  if (page === 'menu') renderMenuPage();
  if (page === 'roulette') initRoulette();
  if (page === 'rewards') renderRewardsShop();
  if (page === 'profile') updateUserUI();
  if (page === 'order-history') renderOrderHistory();
  if (page === 'admin' && state.currentUser?.isAdmin) renderAdminPanel();
  if (page === 'faq') renderFAQ();
  
  updateCartBadges();
}

function goBack() {
  navigate('home');
}

function initBottomNav() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.id.replace('nav-', '');
      navigate(page);
    });
  });
}

// ==================== HOME PAGE ====================
function renderHomePage() {
  updateUserUI();
  updateGreetingTime();
  renderCategories();
  renderRecommendedFoods();
  renderSearchResults();
  updateDailyChallenge();
}

function updateGreetingTime() {
  const hour = new Date().getHours();
  let greeting = "Xayrli tong!";
  if (hour >= 12 && hour < 18) greeting = "Xayrli kun!";
  if (hour >= 18) greeting = "Xayrli kech!";
  const greetingEl = document.getElementById('greeting-time-text');
  if (greetingEl) greetingEl.innerText = greeting;
}

function renderCategories() {
  const container = document.getElementById('categories-scroll');
  if (!container) return;
  
  const currentLang = localStorage.getItem('nima_lang') || 'uz';
  const categoryNames = {
    all: { uz: "Barchasi", ru: "Все" },
    fastfood: { uz: "Fast Food", ru: "Фастфуд" },
    milliy: { uz: "Milliy taomlar", ru: "Национальные" },
    salad: { uz: "Salatlar", ru: "Салаты" },
    drinks: { uz: "Ichimliklar", ru: "Напитки" },
    dessert: { uz: "Shirinliklar", ru: "Десерты" }
  };
  
  container.innerHTML = state.categories.map(cat => `
    <button class="category-chip ${state.currentCategory === cat ? 'active' : ''}" 
            onclick="filterByCategory('${cat}')">
      ${categoryNames[cat][currentLang]}
    </button>
  `).join('');
}

function filterByCategory(category) {
  state.currentCategory = category;
  renderCategories();
  renderRecommendedFoods();
  hapticImpact('light');
}

function renderRecommendedFoods() {
  const container = document.getElementById('home-food-grid');
  if (!container) return;
  
  let filteredFoods = state.foods;
  if (state.currentCategory !== 'all') {
    filteredFoods = state.foods.filter(f => f.category === state.currentCategory);
  }
  
  const displayFoods = filteredFoods.slice(0, 6);
  const currentLang = localStorage.getItem('nima_lang') || 'uz';
  
  container.innerHTML = displayFoods.map(food => `
    <div class="food-card" onclick="addToCart(${food.id})">
      <div class="food-emoji">${food.emoji}</div>
      <div class="food-name">${currentLang === 'uz' ? food.nameUz : food.nameRu}</div>
      <div class="food-price">${food.price.toLocaleString()} so'm</div>
      <div class="food-footer">
        <span class="food-cashback">💵 +${food.cashbackPercent}%</span>
        <span class="food-diamonds">💎 +${food.diamondReward}</span>
        <button class="add-btn" onclick="event.stopPropagation(); addToCart(${food.id})">+</button>
      </div>
    </div>
  `).join('');
}

function updateDailyChallenge() {
  const ordersToday = state.currentUser?.totalOrders || 0;
  const challengeProgress = Math.min(ordersToday, 3);
  const percent = (challengeProgress / 3) * 100;
  
  const fillEl = document.getElementById('challenge-fill');
  const textEl = document.getElementById('challenge-text');
  const descEl = document.getElementById('daily-challenge-text');
  
  if (fillEl) fillEl.style.width = `${percent}%`;
  if (textEl) textEl.innerText = `${challengeProgress} / 3`;
  if (descEl) descEl.innerText = challengeProgress >= 3 ? "✅ Vazifa bajarildi!" : "3 ta ovqat buyurtma bering — 50 💎 yutib oling";
}

// ==================== SEARCH SYSTEM ====================
function handleSearch(query) {
  state.searchQuery = query;
  const searchResults = document.getElementById('search-results');
  const clearBtn = document.querySelector('.search-clear');
  
  if (query.length > 0) {
    if (searchResults) searchResults.classList.remove('hidden');
    if (clearBtn) clearBtn.classList.remove('hidden');
    renderSearchResults();
  } else {
    if (searchResults) searchResults.classList.add('hidden');
    if (clearBtn) clearBtn.classList.add('hidden');
  }
}

function renderSearchResults() {
  const container = document.getElementById('search-food-grid');
  if (!container) return;
  
  const query = state.searchQuery.toLowerCase();
  const currentLang = localStorage.getItem('nima_lang') || 'uz';
  const filtered = state.foods.filter(food => 
    (currentLang === 'uz' ? food.nameUz : food.nameRu).toLowerCase().includes(query)
  );
  
  if (filtered.length === 0) {
    container.innerHTML = '<p style="text-align:center;grid-column:1/-1;">Hech narsa topilmadi 😢</p>';
    return;
  }
  
  container.innerHTML = filtered.map(food => `
    <div class="food-card" onclick="addToCart(${food.id})">
      <div class="food-emoji">${food.emoji}</div>
      <div class="food-name">${currentLang === 'uz' ? food.nameUz : food.nameRu}</div>
      <div class="food-price">${food.price.toLocaleString()} so'm</div>
      <button class="add-btn" onclick="event.stopPropagation(); addToCart(${food.id})">+</button>
    </div>
  `).join('');
}

function clearSearch() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.value = '';
    handleSearch('');
  }
}

// ==================== MENU PAGE ====================
function renderMenuPage() {
  renderMenuCategories();
  renderMenuFoods();
}

function renderMenuCategories() {
  const container = document.getElementById('menu-category-tabs');
  if (!container) return;
  
  const currentLang = localStorage.getItem('nima_lang') || 'uz';
  const categoryNames = {
    all: { uz: "Barchasi", ru: "Все" },
    fastfood: { uz: "Fast Food", ru: "Фастфуд" },
    milliy: { uz: "Milliy", ru: "Национальные" },
    salad: { uz: "Salatlar", ru: "Салаты" },
    drinks: { uz: "Ichimliklar", ru: "Напитки" },
    dessert: { uz: "Shirinliklar", ru: "Десерты" }
  };
  
  container.innerHTML = state.categories.map(cat => `
    <button class="category-chip ${state.currentCategory === cat ? 'active' : ''}" 
            onclick="filterMenuByCategory('${cat}')">
      ${categoryNames[cat][currentLang]}
    </button>
  `).join('');
}

function filterMenuByCategory(category) {
  state.currentCategory = category;
  renderMenuCategories();
  renderMenuFoods();
  hapticImpact('light');
}

function renderMenuFoods() {
  const container = document.getElementById('menu-food-list');
  if (!container) return;
  
  let filteredFoods = state.foods;
  if (state.currentCategory !== 'all') {
    filteredFoods = state.foods.filter(f => f.category === state.currentCategory);
  }
  
  const currentLang = localStorage.getItem('nima_lang') || 'uz';
  
  container.innerHTML = `
    <div class="food-grid">
      ${filteredFoods.map(food => `
        <div class="food-card" onclick="addToCart(${food.id})">
          <div class="food-emoji">${food.emoji}</div>
          <div class="food-name">${currentLang === 'uz' ? food.nameUz : food.nameRu}</div>
          <div class="food-price">${food.price.toLocaleString()} so'm</div>
          <div class="food-footer">
            <span class="food-cashback">💵 +${food.cashbackPercent}%</span>
            <span class="food-diamonds">💎 +${food.diamondReward}</span>
            <button class="add-btn" onclick="event.stopPropagation(); addToCart(${food.id})">+</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ==================== CART SYSTEM ====================
function addToCart(foodId, quantity = 1) {
  const food = state.foods.find(f => f.id === foodId);
  if (!food) return;
  
  const existingItem = state.cart.find(item => item.id === foodId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    state.cart.push({
      id: food.id,
      nameUz: food.nameUz,
      nameRu: food.nameRu,
      emoji: food.emoji,
      price: food.price,
      cashbackPercent: food.cashbackPercent,
      diamondReward: food.diamondReward,
      quantity: quantity
    });
  }
  
  saveToLocalStorage();
  updateCartUI();
  showToast("Savatga qo'shildi! 🛒", "success");
  hapticImpact('light');
  updateCartBadges();
}

function removeFromCart(foodId) {
  const index = state.cart.findIndex(item => item.id === foodId);
  if (index !== -1) {
    state.cart.splice(index, 1);
    saveToLocalStorage();
    updateCartUI();
    showToast("Savatdan olib tashlandi", "info");
    hapticImpact('light');
  }
}

function updateCartItemQuantity(foodId, delta) {
  const item = state.cart.find(item => item.id === foodId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(foodId);
    } else {
      saveToLocalStorage();
      updateCartUI();
    }
  }
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items-list');
  const cartEmpty = document.getElementById('cart-empty');
  const cartSummary = document.getElementById('cart-summary');
  const cartSidebarCount = document.getElementById('cart-sidebar-count');
  const fcartCount = document.getElementById('fcart-count');
  const fcartTotal = document.getElementById('fcart-total');
  const menuCartCount = document.getElementById('menu-cart-count');
  
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCashback = state.cart.reduce((sum, item) => sum + (item.price * item.quantity * item.cashbackPercent / 100), 0);
  const totalDiamonds = state.cart.reduce((sum, item) => sum + (item.diamondReward * item.quantity), 0);
  
  if (cartSidebarCount) cartSidebarCount.innerText = totalItems;
  if (fcartCount) fcartCount.innerText = totalItems;
  if (fcartTotal) fcartTotal.innerText = totalPrice.toLocaleString() + " so'm";
  if (menuCartCount) menuCartCount.innerText = totalItems;
  
  const floatingCart = document.getElementById('floating-cart-btn');
  if (floatingCart) {
    if (totalItems > 0) floatingCart.classList.remove('hidden');
    else floatingCart.classList.add('hidden');
  }
  
  if (totalItems === 0 && cartItemsContainer) {
    if (cartEmpty) cartEmpty.classList.remove('hidden');
    if (cartSummary) cartSummary.classList.add('hidden');
    if (cartItemsContainer) cartItemsContainer.innerHTML = '';
    return;
  }
  
  if (cartEmpty) cartEmpty.classList.add('hidden');
  if (cartSummary) cartSummary.classList.remove('hidden');
  
  const currentLang = localStorage.getItem('nima_lang') || 'uz';
  
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.emoji} ${currentLang === 'uz' ? item.nameUz : item.nameRu}</div>
          <div class="cart-item-price">${(item.price * item.quantity).toLocaleString()} so'm</div>
        </div>
        <div class="cart-item-actions">
          <button class="cart-qty-btn" onclick="updateCartItemQuantity(${item.id}, -1)">-</button>
          <span class="cart-item-qty">${item.quantity}</span>
          <button class="cart-qty-btn" onclick="updateCartItemQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
    `).join('');
  }
  
  const finalPrice = state.cashbackEnabled && state.currentUser?.cashback > 0 
    ? Math.max(0, totalPrice - state.currentUser.cashback)
    : totalPrice;
  
  const cartTotalPrice = document.getElementById('cart-total-price');
  const cartTotalCashback = document.getElementById('cart-total-cashback');
  const cartTotalDiamonds = document.getElementById('cart-total-diamonds');
  
  if (cartTotalPrice) cartTotalPrice.innerText = finalPrice.toLocaleString() + " so'm";
  if (cartTotalCashback) cartTotalCashback.innerText = `+ ${Math.floor(totalCashback).toLocaleString()} so'm`;
  if (cartTotalDiamonds) cartTotalDiamonds.innerText = `+ ${totalDiamonds} 💎`;
}

function updateCartBadges() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-count-badge, .fcart-count, #cart-sidebar-count');
  badges.forEach(badge => {
    if (badge) badge.innerText = totalItems;
  });
  
  const floatingCart = document.getElementById('floating-cart-btn');
  if (floatingCart) {
    if (totalItems > 0) floatingCart.classList.remove('hidden');
    else floatingCart.classList.add('hidden');
  }
}

function toggleCart() {
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  
  if (cartSidebar) cartSidebar.classList.toggle('hidden');
  if (cartOverlay) cartOverlay.classList.toggle('hidden');
  hapticImpact('light');
}

function applyPromo() {
  const promoInput = document.getElementById('promo-input');
  const promo = promoInput?.value.trim().toUpperCase();
  
  if (promo === 'WELCOME50') {
    state.promoApplied = { code: promo, discount: 5000 };
    showToast("Promo kod qo'llanildi! 5000 so'm chegirma", "success");
    updateCartUI();
  } else if (promo === 'NIMA10') {
    state.promoApplied = { code: promo, discountPercent: 10 };
    showToast("10% chegirma qo'llanildi!", "success");
    updateCartUI();
  } else if (promo) {
    showToast("Noto'g'ri promo kod", "error");
    hapticImpact('error');
  }
}

// ==================== CHECKOUT SYSTEM ====================
function handleCheckout() {
  if (state.cart.length === 0) {
    showToast("Savat bo'sh", "warning");
    return;
  }
  
  const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCashbackEarn = Math.floor(state.cart.reduce((sum, item) => sum + (item.price * item.quantity * item.cashbackPercent / 100), 0));
  const totalDiamondsEarn = state.cart.reduce((sum, item) => sum + (item.diamondReward * item.quantity), 0);
  
  let finalPrice = totalPrice;
  if (state.cashbackEnabled && state.currentUser.cashback > 0) {
    const usedCashback = Math.min(state.currentUser.cashback, totalPrice);
    finalPrice = totalPrice - usedCashback;
    state.currentUser.cashback -= usedCashback;
  }
  
  if (state.promoApplied) {
    if (state.promoApplied.discount) finalPrice = Math.max(0, finalPrice - state.promoApplied.discount);
    if (state.promoApplied.discountPercent) finalPrice = finalPrice * (1 - state.promoApplied.discountPercent / 100);
    state.promoApplied = null;
  }
  
  // Create order
  const order = {
    id: '#' + Math.floor(Math.random() * 10000),
    date: new Date().toISOString(),
    items: [...state.cart],
    total: finalPrice,
    cashbackEarned: totalCashbackEarn,
    diamondsEarned: totalDiamondsEarn
  };
  
  // Update user
  state.currentUser.diamonds += totalDiamondsEarn;
  state.currentUser.cashback += totalCashbackEarn;
  state.currentUser.totalOrders = (state.currentUser.totalOrders || 0) + 1;
  state.currentUser.xp = (state.currentUser.xp || 0) + totalDiamondsEarn;
  
  // Level up
  const newLevel = Math.floor(state.currentUser.xp / 100) + 1;
  if (newLevel > state.currentUser.level) {
    state.currentUser.level = newLevel;
    showToast(`🎉 Darajangiz oshdi! Level ${newLevel}`, "success");
  }
  
  // Save order history
  const orders = JSON.parse(localStorage.getItem('nima_orders') || '[]');
  orders.unshift(order);
  localStorage.setItem('nima_orders', JSON.stringify(orders));
  
  // Clear cart
  state.cart = [];
  saveToLocalStorage();
  updateCartUI();
  updateUserUI();
  updateDailyChallenge();
  
  // Show success modal
  document.getElementById('success-order-id').innerText = order.id;
  document.getElementById('success-diamonds').innerHTML = `+${totalDiamondsEarn} 💎`;
  document.getElementById('success-cashback').innerHTML = `+${totalCashbackEarn} so'm keshbek`;
  document.getElementById('checkout-modal').classList.remove('hidden');
  
  sounds.checkout();
  hapticImpact('success');
  
  if (telegram) {
    telegram.showPopup({
      title: "Buyurtma qabul qilindi!",
      message: `Buyurtma raqami: ${order.id}\nTaxminiy vaqt: 15-20 daqiqa`,
      buttons: [{ type: "ok" }]
    });
  }
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal').classList.add('hidden');
  navigate('home');
}

function renderOrderHistory() {
  const container = document.getElementById('order-history-list');
  if (!container) return;
  
  const orders = JSON.parse(localStorage.getItem('nima_orders') || '[]');
  const currentLang = localStorage.getItem('nima_lang') || 'uz';
  
  if (orders.length === 0) {
    container.innerHTML = '<p style="text-align:center;padding:40px;">Hech qanday buyurtma yo\'q 😢</p>';
    return;
  }
  
  container.innerHTML = orders.map(order => `
    <div class="food-card" style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
        <span style="font-family:Orbitron;">${order.id}</span>
        <span style="font-size:12px;color:var(--neon-primary);">${new Date(order.date).toLocaleDateString()}</span>
      </div>
      <div style="margin-bottom:8px;">
        ${order.items.map(item => `${item.emoji} ${currentLang === 'uz' ? item.nameUz : item.nameRu} x${item.quantity}`).join(', ')}
      </div>
      <div style="display:flex;justify-content:space-between;">
        <span>Jami: ${Math.floor(order.total).toLocaleString()} so'm</span>
        <span style="color:#ffcc00;">+${order.diamondsEarned} 💎</span>
      </div>
    </div>
  `).join('');
}

// ==================== ROULETTE WHEEL ====================
let rouletteCanvas = null;
let ctx = null;
let currentAngle = 0;
let spinning = false;
let spinVelocity = 0;
let spinDecay = 0.98;
let spinRequestId = null;
let selectedSegment = null;

function initRoulette() {
  rouletteCanvas = document.getElementById('roulette-canvas');
  if (!rouletteCanvas) return;
  
  ctx = rouletteCanvas.getContext('2d');
  drawWheel();
  updateSpinsDisplay();
}

function drawWheel() {
  if (!ctx || !rouletteCanvas) return;
  
  const size = rouletteCanvas.width;
  const center = size / 2;
  const radius = size / 2 - 5;
  const segmentAngle = (Math.PI * 2) / wheelSegments.length;
  
  ctx.clearRect(0, 0, size, size);
  
  for (let i = 0; i < wheelSegments.length; i++) {
    const start = currentAngle + i * segmentAngle;
    const end = start + segmentAngle;
    const segment = wheelSegments[i];
    
    // Gradient colors for segments
    const colors = ['#00ff88', '#00cc6a', '#00ffaa', '#00994d', '#33ff99', '#00e675', '#55ffaa', '#00cc88'];
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, start, end);
    ctx.closePath();
    
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.strokeStyle = '#050505';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw emoji
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(start + segmentAngle / 2);
    ctx.font = 'bold 28px "Segoe UI Emoji"';
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#00ff88';
    ctx.fillText(segment.emoji, radius * 0.65, 10);
    ctx.restore();
  }
  
  // Draw center circle
  ctx.beginPath();
  ctx.arc(center, center, 25, 0, Math.PI * 2);
  ctx.fillStyle = '#050505';
  ctx.fill();
  ctx.strokeStyle = '#00ff88';
  ctx.lineWidth = 3;
  ctx.stroke();
}

function spinRoulette() {
  if (spinning) return;
  if (state.spinsLeft <= 0) {
    showToast("Bugun limit tugadi! Ertaga qaytib keling", "warning");
    hapticImpact('error');
    return;
  }
  
  spinning = true;
  sounds.spin();
  
  // Random spin velocity between 15 and 30
  spinVelocity = 15 + Math.random() * 15;
  const targetIndex = Math.floor(Math.random() * wheelSegments.length);
  const targetAngle = (Math.PI * 2) / wheelSegments.length;
  const currentSegIndex = Math.floor(((currentAngle % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2) / targetAngle);
  const deltaSegments = (targetIndex - currentSegIndex + wheelSegments.length) % wheelSegments.length;
  const targetRotation = currentAngle + (Math.PI * 2 * 5) + (deltaSegments * targetAngle);
  
  let finalVelocity = 15;
  let lastTimestamp = 0;
  
  function animateSpin(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = Math.min(50, timestamp - lastTimestamp);
    lastTimestamp = timestamp;
    
    if (spinVelocity > 0.5) {
      currentAngle += spinVelocity * (delta / 16);
      spinVelocity *= spinDecay;
      drawWheel();
      spinRequestId = requestAnimationFrame(animateSpin);
    } else {
      cancelAnimationFrame(spinRequestId);
      spinning = false;
      
      // Determine final segment
      const segmentAngleSize = (Math.PI * 2) / wheelSegments.length;
      let rawAngle = currentAngle % (Math.PI * 2);
      if (rawAngle < 0) rawAngle += Math.PI * 2;
      const pointerAngle = Math.PI / 2;
      let selectedIndex = Math.floor(((pointerAngle - rawAngle + segmentAngleSize) % (Math.PI * 2)) / segmentAngleSize);
      selectedIndex = (selectedIndex + wheelSegments.length) % wheelSegments.length;
      
      selectedSegment = wheelSegments[selectedIndex];
      state.spinsLeft--;
      saveToLocalStorage();
      updateSpinsDisplay();
      
      showRouletteResult(selectedSegment);
      sounds.win();
      hapticImpact('success');
    }
  }
  
  spinRequestId = requestAnimationFrame(animateSpin);
}

function showRouletteResult(segment) {
  const resultDiv = document.getElementById('roulette-result');
  const resultEmoji = document.getElementById('result-emoji');
  const resultFoodName = document.getElementById('result-food-name');
  const resultPrice = document.getElementById('result-price');
  const resultDiamonds = document.getElementById('result-diamonds');
  
  const currentLang = localStorage.getItem('nima_lang') || 'uz';
  
  if (resultEmoji) resultEmoji.innerText = segment.emoji;
  if (resultFoodName) resultFoodName.innerText = currentLang === 'uz' ? segment.nameUz : segment.nameRu;
  if (resultPrice) resultPrice.innerText = segment.price.toLocaleString() + " so'm";
  if (resultDiamonds) resultDiamonds.innerText = `+${segment.diamonds} 💎`;
  
  if (resultDiv) resultDiv.classList.remove('hidden');
  
  // Store selected segment for adding to cart
  window.lastRouletteResult = segment;
}

function addRouletteResultToCart() {
  if (window.lastRouletteResult) {
    // Find matching food or create temp
    let food = state.foods.find(f => 
      (f.nameUz === window.lastRouletteResult.nameUz) || 
      (f.nameRu === window.lastRouletteResult.nameRu)
    );
    
    if (food) {
      addToCart(food.id);
    } else {
      // Add temp item
      state.cart.push({
        id: Date.now(),
        nameUz: window.lastRouletteResult.nameUz,
        nameRu: window.lastRouletteResult.nameRu,
        emoji: window.lastRouletteResult.emoji,
        price: window.lastRouletteResult.price,
        cashbackPercent: window.lastRouletteResult.cashback,
        diamondReward: window.lastRouletteResult.diamonds,
        quantity: 1
      });
      saveToLocalStorage();
      updateCartUI();
      showToast("Savatga qo'shildi! 🛒", "success");
    }
    
    document.getElementById('roulette-result')?.classList.add('hidden');
    hapticImpact('light');
  }
}

function updateSpinsDisplay() {
  const spinsLeftSpan = document.getElementById('spins-left-count');
  const todaySpinsUsed = document.getElementById('today-spins-used');
  const totalWonSpan = document.getElementById('total-won-diamonds');
  
  if (spinsLeftSpan) spinsLeftSpan.innerText = state.spinsLeft;
  if (todaySpinsUsed) todaySpinsUsed.innerText = `${3 - state.spinsLeft} / 3`;
  
  const totalWon = state.currentUser?.diamonds || 0;
  if (totalWonSpan) totalWonSpan.innerText = totalWon;
}

// ==================== REWARDS SYSTEM ====================
const rewardItems = [
  { id: 1, nameUz: "20% chegirma", nameRu: "20% скидка", emoji: "🏷️", cost: 150, type: 'discount', value: 20 },
  { id: 2, nameUz: "Bepul Ichimlik", nameRu: "Бесплатный напиток", emoji: "🥤", cost: 80, type: 'free', value: 'drink' },
  { id: 3, nameUz: "50 ta Olmos", nameRu: "50 Алмазов", emoji: "💎", cost: 50, type: 'diamonds', value: 50 },
  { id: 4, nameUz: "Premium Keshbek", nameRu: "Премиум кешбэк", emoji: "💵", cost: 200, type: 'cashback', value: 10000 }
];

function renderRewardsShop() {
  const container = document.getElementById('rewards-shop-grid');
  if (!container) return;
  
  const currentLang = localStorage.getItem('nima_lang') || 'uz';
  
  container.innerHTML = rewardItems.map(reward => `
    <div class="reward-card" onclick="openRewardModal(${reward.id})">
      <div class="reward-icon">${reward.emoji}</div>
      <div class="reward-name">${currentLang === 'uz' ? reward.nameUz : reward.nameRu}</div>
      <div class="reward-cost">${reward.cost} 💎</div>
    </div>
  `).join('');
}

function openRewardModal(rewardId) {
  const reward = rewardItems.find(r => r.id === rewardId);
  if (!reward) return;
  
  state.selectedReward = reward;
  const currentLang = localStorage.getItem('nima_lang') || 'uz';
  
  document.getElementById('reward-claim-title').innerText = currentLang === 'uz' ? reward.nameUz : reward.nameRu;
  document.getElementById('reward-claim-icon').innerHTML = reward.emoji;
  document.getElementById('reward-claim-desc').innerHTML = `${currentLang === 'uz' ? 'Narxi:' : 'Стоимость:'} ${reward.cost} 💎`;
  document.getElementById('reward-claim-cost-val').innerText = reward.cost;
  document.getElementById('reward-claim-modal').classList.remove('hidden');
  hapticImpact('light');
}

function closeRewardModal() {
  document.getElementById('reward-claim-modal').classList.add('hidden');
  state.selectedReward = null;
}

function confirmClaimReward() {
  if (!state.selectedReward || !state.currentUser) return;
  
  if (state.currentUser.diamonds >= state.selectedReward.cost) {
    state.currentUser.diamonds -= state.selectedReward.cost;
    
    switch (state.selectedReward.type) {
      case 'discount':
        state.promoApplied = { code: 'REWARD', discountPercent: state.selectedReward.value };
        showToast(`${state.selectedReward.value}% chegirma qo'llanildi!`, "success");
        break;
      case 'diamonds':
        state.currentUser.diamonds += state.selectedReward.value;
        showToast(`+${state.selectedReward.value} 💎 olmos qo'shildi!`, "success");
        break;
      case 'cashback':
        state.currentUser.cashback += state.selectedReward.value;
        showToast(`+${state.selectedReward.value} so'm keshbek qo'shildi!`, "success");
        break;
    }
    
    saveToLocalStorage();
    updateUserUI();
    closeRewardModal();
    hapticImpact('success');
  } else {
    showToast("Yetarlicha olmos yo'q!", "error");
    hapticImpact('error');
  }
}

function switchLeaderboard(type) {
  state.leaderboardType = type;
  document.querySelectorAll('.lb-tab').forEach(tab => tab.classList.remove('active'));
  const activeTab = document.querySelector(`.lb-tab[onclick*="${type}"]`);
  if (activeTab) activeTab.classList.add('active');
  renderLeaderboard();
}

function renderLeaderboard() {
  const container = document.getElementById('leaderboard-list');
  if (!container) return;
  
  const mockUsers = [
    { name: "Sarvar", score: 1250 },
    { name: "Dilnoza", score: 980 },
    { name: "Jasur", score: 870 },
    { name: "Madina", score: 650 },
    { name: "Aziz", score: 540 }
  ];
  
  container.innerHTML = mockUsers.map((user, idx) => `
    <div class="lb-item">
      <div class="lb-rank">${idx + 1}</div>
      <div class="lb-name">${user.name}</div>
      <div class="lb-score">${user.score} 💎</div>
    </div>
  `).join('');
}

function claimMonthlyGift() {
  const lastClaim = localStorage.getItem('monthly_gift_claim');
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${now.getMonth()}`;
  
  if (lastClaim === currentMonth) {
    showToast("Siz bu oy sovg'asini olgansiz!", "warning");
    return;
  }
  
  state.currentUser.diamonds += 100;
  state.currentUser.cashback += 5000;
  localStorage.setItem('monthly_gift_claim', currentMonth);
  saveToLocalStorage();
  updateUserUI();
  showToast("🎁 Oylik sovg'a olindi! +100 💎 va +5000 so'm", "success");
  hapticImpact('success');
}

// ==================== ADMIN PANEL ====================
function renderAdminPanel() {
  if (!state.currentUser?.isAdmin) {
    navigate('home');
    return;
  }
  
  renderAdminFoodList();
  updateAdminStats();
}

function renderAdminFoodList() {
  const container = document.getElementById('admin-food-list');
  if (!container) return;
  
  const currentLang = localStorage.getItem('nima_lang') || 'uz';
  
  container.innerHTML = state.foods.map(food => `
    <div style="background:var(--bg-glass);border-radius:16px;padding:12px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <span style="font-size:24px;">${food.emoji}</span>
        <span>${currentLang === 'uz' ? food.nameUz : food.nameRu}</span>
        <span style="color:var(--neon-primary);margin-left:8px;">${food.price.toLocaleString()} so'm</span>
      </div>
      <div>
        <button onclick="openAdminEdit(${food.id})" style="background:var(--neon-primary);border:none;padding:6px 12px;border-radius:8px;margin-right:8px;">✏️</button>
        <button onclick="deleteFood(${food.id})" style="background:#ff4444;border:none;padding:6px 12px;border-radius:8px;">🗑️</button>
      </div>
    </div>
  `).join('');
}

function updateAdminStats() {
  const totalFoods = document.getElementById('admin-total-foods');
  const totalOrders = document.getElementById('admin-total-orders');
  const totalUsers = document.getElementById('admin-total-users');
  
  const orders = JSON.parse(localStorage.getItem('nima_orders') || '[]');
  
  if (totalFoods) totalFoods.innerText = state.foods.length;
  if (totalOrders) totalOrders.innerText = orders.length;
  if (totalUsers) totalUsers.innerText = 1;
}

function adminAddFood() {
  const nameUz = document.getElementById('admin-food-name-uz')?.value;
  const nameRu = document.getElementById('admin-food-name-ru')?.value;
  const price = parseInt(document.getElementById('admin-food-price')?.value);
  const category = document.getElementById('admin-food-category')?.value;
  const cashback = parseInt(document.getElementById('admin-food-cashback')?.value) || 5;
  const diamonds = parseInt(document.getElementById('admin-food-diamonds')?.value) || 10;
  const emoji = document.getElementById('admin-food-emoji')?.value || '🍽️';
  const descUz = document.getElementById('admin-food-desc-uz')?.value || '';
  
  if (!nameUz || !price || !category) {
    showToast("Iltimos, barcha maydonlarni to'ldiring!", "warning");
    return;
  }
  
  const newFood = {
    id: Date.now(),
    nameUz,
    nameRu: nameRu || nameUz,
    emoji,
    category,
    price,
    cashbackPercent: cashback,
    diamondReward: diamonds,
    descriptionUz: descUz,
    descriptionRu: descUz
  };
  
  state.foods.push(newFood);
  saveToLocalStorage();
  renderAdminFoodList();
  renderHomePage();
  renderMenuPage();
  showToast("Ovqat qo'shildi! ✅", "success");
  hapticImpact('success');
  
  // Clear form
  document.getElementById('admin-food-name-uz').value = '';
  document.getElementById('admin-food-name-ru').value = '';
  document.getElementById('admin-food-price').value = '';
  document.getElementById('admin-food-emoji').value = '';
  document.getElementById('admin-food-desc-uz').value = '';
}

let editingFoodId = null;

function openAdminEdit(foodId) {
  const food = state.foods.find(f => f.id === foodId);
  if (!food) return;
  
  editingFoodId = foodId;
  document.getElementById('edit-food-id').value = food.id;
  document.getElementById('edit-food-name-uz').value = food.nameUz;
  document.getElementById('edit-food-price').value = food.price;
  document.getElementById('edit-food-cashback').value = food.cashbackPercent;
  document.getElementById('edit-food-diamonds').value = food.diamondReward;
  document.getElementById('admin-edit-modal').classList.remove('hidden');
}

function closeAdminEdit() {
  document.getElementById('admin-edit-modal').classList.add('hidden');
  editingFoodId = null;
}

function saveAdminEdit() {
  if (!editingFoodId) return;
  
  const foodIndex = state.foods.findIndex(f => f.id === editingFoodId);
  if (foodIndex !== -1) {
    state.foods[foodIndex].nameUz = document.getElementById('edit-food-name-uz')?.value || state.foods[foodIndex].nameUz;
    state.foods[foodIndex].price = parseInt(document.getElementById('edit-food-price')?.value) || state.foods[foodIndex].price;
    state.foods[foodIndex].cashbackPercent = parseInt(document.getElementById('edit-food-cashback')?.value) || state.foods[foodIndex].cashbackPercent;
    state.foods[foodIndex].diamondReward = parseInt(document.getElementById('edit-food-diamonds')?.value) || state.foods[foodIndex].diamondReward;
    
    saveToLocalStorage();
    renderAdminFoodList();
    renderHomePage();
    renderMenuPage();
    showToast("Ovqat tahrirlandi! ✅", "success");
    hapticImpact('success');
  }
  
  closeAdminEdit();
}

function deleteFood(foodId) {
  if (confirm("Ovqatni o'chirmoqchimisiz?")) {
    state.foods = state.foods.filter(f => f.id !== foodId);
    saveToLocalStorage();
    renderAdminFoodList();
    renderHomePage();
    renderMenuPage();
    showToast("Ovqat o'chirildi", "info");
    hapticImpact('light');
  }
}

// ==================== PROFILE & SETTINGS ====================
function openEditProfile() {
  document.getElementById('edit-name').value = state.currentUser?.name || '';
  document.getElementById('edit-phone').value = state.currentUser?.phone?.replace('+998', '') || '';
  document.getElementById('edit-profile-modal').classList.remove('hidden');
}

function closeEditProfile() {
  document.getElementById('edit-profile-modal').classList.add('hidden');
}

function saveEditProfile() {
  const newName = document.getElementById('edit-name')?.value;
  const newPhone = document.getElementById('edit-phone')?.value;
  
  if (newName) state.currentUser.name = newName;
  if (newPhone) state.currentUser.phone = '+998' + newPhone;
  
  saveToLocalStorage();
  updateUserUI();
  closeEditProfile();
  showToast("Profil yangilandi!", "success");
  hapticImpact('success');
}

function confirmLogout() {
  document.getElementById('logout-modal').classList.remove('hidden');
}

function doLogout() {
  state.currentUser = null;
  state.cart = [];
  localStorage.removeItem('nima_user');
  localStorage.removeItem('nima_cart');
  
  document.getElementById('main-app').classList.add('hidden');
  document.getElementById('register-page').classList.remove('hidden');
  document.getElementById('logout-modal').classList.add('hidden');
  
  showToast("Chiqildi", "info");
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('nima_theme', isDark ? 'light' : 'dark');
  hapticImpact('light');
}

function toggleNotifSetting() {
  const toggle = document.getElementById('notif-toggle');
  if (toggle) {
    state.notificationsEnabled = toggle.checked;
    localStorage.setItem('nima_notif', state.notificationsEnabled);
    showToast(state.notificationsEnabled ? "Bildirishnomalar yoqildi" : "Bildirishnomalar o'chirildi", "info");
  }
}

// ==================== FAQ PAGE ====================
function renderFAQ() {
  const container = document.getElementById('faq-list');
  if (!container) return;
  
  const currentLang = localStorage.getItem('nima_lang') || 'uz';
  const faqs = [
    { qUz: "Qanday buyurtma berish mumkin?", qRu: "Как заказать?", aUz: "Ovqatni tanlang va savatga qo'shing, so'ng 'Buyurtma berish' tugmasini bosing.", aRu: "Выберите еду и добавьте в корзину, затем нажмите 'Оформить заказ'." },
    { qUz: "Keshbek qanday ishlaydi?", qRu: "Как работает кешбэк?", aUz: "Har bir buyurtmadan % keshbek hisoblanadi.", aRu: "С каждого заказа начисляется % кешбэка." },
    { qUz: "Olmoslarni qanday yutib olish mumkin?", qRu: "Как получить алмазы?", aUz: "Buyurtma berish yoki ruletkada aylantirish orqali.", aRu: "Через заказы или вращение рулетки." }
  ];
  
  container.innerHTML = faqs.map(faq => `
    <div style="background:var(--bg-glass);border-radius:16px;padding:16px;margin-bottom:12px;">
      <div style="font-weight:700;margin-bottom:8px;">${currentLang === 'uz' ? faq.qUz : faq.qRu}</div>
      <div style="font-size:14px;color:var(--text-dim);">${currentLang === 'uz' ? faq.aUz : faq.aRu}</div>
    </div>
  `).join('');
}

// ==================== NOTIFICATIONS ====================
function toggleNotifications() {
  const panel = document.getElementById('notif-panel');
  if (panel) panel.classList.toggle('hidden');
  
  const dot = document.getElementById('notif-dot');
  if (dot) dot.classList.add('hidden');
}

function addNotification(title, message) {
  const notifList = document.getElementById('notif-list');
  if (!notifList) return;
  
  const notifItem = document.createElement('div');
  notifItem.style.cssText = 'padding:12px;border-bottom:1px solid rgba(255,255,255,0.05);';
  notifItem.innerHTML = `<strong>${title}</strong><br><small>${message}</small>`;
  notifList.prepend(notifItem);
  
  const dot = document.getElementById('notif-dot');
  if (dot) dot.classList.remove('hidden');
  
  if (state.notificationsEnabled && telegram) {
    telegram.showPopup({ title, message, buttons: [{ type: "ok" }] });
  }
}

// ==================== TOAST SYSTEM ====================
let toastTimeout = null;

function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toast-icon');
  const toastMsg = document.getElementById('toast-msg');
  
  if (!toast) return;
  
  const icons = { success: '✓', error: '✕', warning: '⚠️', info: 'ℹ️' };
  if (toastIcon) toastIcon.innerText = icons[type] || icons.info;
  if (toastMsg) toastMsg.innerText = message;
  
  toast.classList.remove('hidden');
  
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2500);
}

// ==================== LANGUAGE SYSTEM ====================
function switchLang(lang) {
  localStorage.setItem('nima_lang', lang);
  
  document.querySelectorAll('[data-uz]').forEach(el => {
    if (lang === 'uz' && el.getAttribute('data-uz')) {
      el.innerText = el.getAttribute('data-uz');
    } else if (lang === 'ru' && el.getAttribute('data-ru')) {
      el.innerText = el.getAttribute('data-ru');
    }
  });
  
  document.querySelectorAll('.lang-pill').forEach(pill => pill.classList.remove('active'));
  if (lang === 'uz') document.getElementById('pill-uz')?.classList.add('active');
  else document.getElementById('pill-ru')?.classList.add('active');
  
  document.querySelectorAll('#reg-lang-uz, #reg-lang-ru').forEach(btn => btn.classList.remove('active'));
  if (lang === 'uz') document.getElementById('reg-lang-uz')?.classList.add('active');
  else document.getElementById('reg-lang-ru')?.classList.add('active');
  
  renderHomePage();
  renderMenuPage();
  renderRewardsShop();
  renderFAQ();
  updateCartUI();
  
  hapticImpact('light');
}

// ==================== GLOBAL UPDATE ====================
function updateAllUI() {
  updateUserUI();
  renderHomePage();
  renderMenuPage();
  updateCartUI();
  initRoulette();
}

// ==================== SPLASH SCREEN ====================
function initSplash() {
  let progress = 0;
  const loaderFill = document.getElementById('loader-fill');
  const loaderPercent = document.getElementById('loader-percent');
  
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      if (loaderFill) loaderFill.style.width = '100%';
      if (loaderPercent) loaderPercent.innerText = '100%';
      
      setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        const register = document.getElementById('register-page');
        
        if (splash) splash.style.display = 'none';
        if (register) register.classList.remove('hidden');
        
        if (state.currentUser) {
          hideSplashAndShowApp();
        }
      }, 500);
    }
    
    if (loaderFill) loaderFill.style.width = `${progress}%`;
    if (loaderPercent) loaderPercent.innerText = `${Math.floor(progress)}%`;
  }, 80);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  initTelegram();
  loadFromLocalStorage();
  
  // Apply saved theme
  const savedTheme = localStorage.getItem('nima_theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Apply saved language
  const savedLang = localStorage.getItem('nima_lang') || 'uz';
  switchLang(savedLang);
  
  // Apply saved notification setting
  const savedNotif = localStorage.getItem('nima_notif');
  if (savedNotif !== null) {
    state.notificationsEnabled = savedNotif === 'true';
    const notifToggle = document.getElementById('notif-toggle');
    if (notifToggle) notifToggle.checked = state.notificationsEnabled;
  }
  
  // Register button
  const registerBtn = document.getElementById('btn-register');
  if (registerBtn) {
    registerBtn.onclick = handleRegister;
  }
  
  // Check if user exists
  if (state.currentUser) {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('register-page').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
    updateAllUI();
    navigate('home');
  } else {
    initSplash();
  }
  
  // Add floating particles
  const particleBg = document.createElement('div');
  particleBg.className = 'particle-bg';
  document.body.appendChild(particleBg);
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = particle.style.height = Math.random() * 6 + 2 + 'px';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = Math.random() * 8 + 6 + 's';
    particleBg.appendChild(particle);
  }
});

// Make functions global for onclick handlers
window.navigate = navigate;
window.goBack = goBack;
window.handleRegister = handleRegister;
window.switchLang = switchLang;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartItemQuantity = updateCartItemQuantity;
window.toggleCart = toggleCart;
window.applyPromo = applyPromo;
window.handleCheckout = handleCheckout;
window.closeCheckoutModal = closeCheckoutModal;
window.filterByCategory = filterByCategory;
window.filterMenuByCategory = filterMenuByCategory;
window.handleSearch = handleSearch;
window.clearSearch = clearSearch;
window.spinRoulette = spinRoulette;
window.addRouletteResultToCart = addRouletteResultToCart;
window.switchLeaderboard = switchLeaderboard;
window.claimMonthlyGift = claimMonthlyGift;
window.openRewardModal = openRewardModal;
window.closeRewardModal = closeRewardModal;
window.confirmClaimReward = confirmClaimReward;
window.openEditProfile = openEditProfile;
window.closeEditProfile = closeEditProfile;
window.saveEditProfile = saveEditProfile;
window.confirmLogout = confirmLogout;
window.doLogout = doLogout;
window.toggleTheme = toggleTheme;
window.toggleNotifSetting = toggleNotifSetting;
window.toggleNotifications = toggleNotifications;
window.adminAddFood = adminAddFood;
window.openAdminEdit = openAdminEdit;
window.closeAdminEdit = closeAdminEdit;
window.saveAdminEdit = saveAdminEdit;
window.deleteFood = deleteFood; 
