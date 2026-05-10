/* ============================================================
   NIMA YEYMIZ? — COMPLETE APP LOGIC
   Clean Architecture | Vanilla JS | Error-Safe | Telegram Mini App
   ============================================================ */

// ==================== STATE MODULE ====================
const AppState = {
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
  winHistory: [],
  isInitialized: false
};

// ==================== TELEGRAM MODULE ====================
const TelegramAPI = {
  instance: null,
  
  init() {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      this.instance = window.Telegram.WebApp;
      this.instance.ready();
      this.instance.expand();
      this.instance.enableClosingConfirmation();
      return true;
    }
    return false;
  },
  
  haptic(style = 'light') {
    if (this.instance?.HapticFeedback) {
      this.instance.HapticFeedback.impactOccurred(style);
    }
  },
  
  showPopup(title, message) {
    if (this.instance) {
      this.instance.showPopup({
        title: title,
        message: message,
        buttons: [{ type: 'ok' }]
      });
    }
  },
  
  getTheme() {
    return this.instance?.themeParams || null;
  }
};

// ==================== STORAGE MODULE ====================
const Storage = {
  save(key, data) {
    try {
      localStorage.setItem(`nima_${key}`, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Storage save error:', e);
      return false;
    }
  },
  
  load(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(`nima_${key}`);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Storage load error:', e);
      return defaultValue;
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(`nima_${key}`);
      return true;
    } catch (e) {
      return false;
    }
  },
  
  saveAll() {
    this.save('user', AppState.currentUser);
    this.save('foods', AppState.foods);
    this.save('cart', AppState.cart);
    this.save('spins', { spinsLeft: AppState.spinsLeft, lastSpinDate: AppState.lastSpinDate });
    this.save('notifications', AppState.notificationsEnabled);
  },
  
  loadAll() {
    const savedUser = this.load('user');
    const savedFoods = this.load('foods');
    const savedCart = this.load('cart');
    const savedSpins = this.load('spins');
    const savedNotif = this.load('notifications');
    
    if (savedUser) AppState.currentUser = savedUser;
    if (savedFoods) AppState.foods = savedFoods;
    if (savedCart) AppState.cart = savedCart;
    if (savedSpins) {
      AppState.spinsLeft = savedSpins.spinsLeft;
      AppState.lastSpinDate = savedSpins.lastSpinDate;
    }
    if (savedNotif !== null) AppState.notificationsEnabled = savedNotif;
    
    this.checkAndResetSpins();
  },
  
  checkAndResetSpins() {
    const today = new Date().toDateString();
    if (AppState.lastSpinDate !== today) {
      AppState.spinsLeft = 3;
      AppState.lastSpinDate = today;
      this.save('spins', { spinsLeft: AppState.spinsLeft, lastSpinDate: AppState.lastSpinDate });
    }
  }
};

// ==================== DEFAULT DATA ====================
const DefaultFoods = [
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

const WheelSegments = [
  { nameUz: "Burger", nameRu: "Бургер", emoji: "🍔", price: 25000, cashback: 5, diamonds: 10 },
  { nameUz: "Pizza", nameRu: "Пицца", emoji: "🍕", price: 45000, cashback: 7, diamonds: 15 },
  { nameUz: "Salat", nameRu: "Салат", emoji: "🥗", price: 18000, cashback: 10, diamonds: 8 },
  { nameUz: "Lag'mon", nameRu: "Лагман", emoji: "🍜", price: 28000, cashback: 5, diamonds: 12 },
  { nameUz: "Somsa", nameRu: "Самса", emoji: "🥟", price: 8000, cashback: 3, diamonds: 5 },
  { nameUz: "Palov", nameRu: "Плов", emoji: "🍚", price: 32000, cashback: 5, diamonds: 15 },
  { nameUz: "Sho'rva", nameRu: "Шурпа", emoji: "🥣", price: 22000, cashback: 5, diamonds: 10 },
  { nameUz: "Ichimlik", nameRu: "Напиток", emoji: "🥤", price: 8000, cashback: 2, diamonds: 3 }
];

const RewardItems = [
  { id: 1, nameUz: "20% chegirma", nameRu: "20% скидка", emoji: "🏷️", cost: 150, type: 'discount', value: 20 },
  { id: 2, nameUz: "Bepul Ichimlik", nameRu: "Бесплатный напиток", emoji: "🥤", cost: 80, type: 'free', value: 'drink' },
  { id: 3, nameUz: "50 ta Olmos", nameRu: "50 Алмазов", emoji: "💎", cost: 50, type: 'diamonds', value: 50 },
  { id: 4, nameUz: "Premium Keshbek", nameRu: "Премиум кешбэк", emoji: "💵", cost: 200, type: 'cashback', value: 10000 }
];

// ==================== RENDER MODULE ====================
const Renderer = {
  currentLang: 'uz',
  
  init() {
    this.currentLang = Storage.load('lang', 'uz');
    this.applyLanguage();
  },
  
  applyLanguage() {
    document.querySelectorAll('[data-uz]').forEach(el => {
      if (this.currentLang === 'uz' && el.dataset.uz) {
        el.textContent = el.dataset.uz;
      } else if (this.currentLang === 'ru' && el.dataset.ru) {
        el.textContent = el.dataset.ru;
      }
    });
    
    const pillUz = document.getElementById('pill-uz');
    const pillRu = document.getElementById('pill-ru');
    if (pillUz) pillUz.classList.toggle('active', this.currentLang === 'uz');
    if (pillRu) pillRu.classList.toggle('active', this.currentLang === 'ru');
  },
  
  setLanguage(lang) {
    this.currentLang = lang;
    Storage.save('lang', lang);
    this.applyLanguage();
    this.updateAll();
  },
  
  updateAll() {
    this.renderHomePage();
    this.renderMenuPage();
    this.renderRewardsShop();
    this.renderFAQ();
    this.updateCartUI();
    this.updateUserUI();
  },
  
  updateUserUI() {
    const user = AppState.currentUser;
    if (!user) return;
    
    const name = user.name || 'Foydalanuvchi';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const firstName = name.split(' ')[0];
    
    this.safeSetText('greeting-name', `${firstName} 👋`);
    this.safeSetText('avatar-initials', initials);
    this.safeSetText('home-diamonds', user.diamonds || 0);
    this.safeSetText('home-cashback', (user.cashback || 0) + " so'm");
    this.safeSetText('home-level', user.level || 1);
    this.safeSetText('hdr-diamonds', user.diamonds || 0);
    this.safeSetText('hdr-cashback', user.cashback || 0);
    this.safeSetText('profile-name-display', name);
    this.safeSetText('profile-phone-display', user.phone || '');
    this.safeSetText('profile-initials-big', initials);
    this.safeSetText('p-total-orders', user.totalOrders || 0);
    this.safeSetText('p-diamonds-total', (user.diamonds || 0) + " 💎");
    this.safeSetText('p-cashback-total', user.cashback || 0);
    
    const levelNames = ['Yangi boshlovchi', 'Bronza', 'Kumush', 'Oltin', 'Platina', 'Brilliant'];
    const levelIndex = Math.min(Math.floor((user.level || 1) / 100), 5);
    this.safeSetText('rank-level-name', levelNames[levelIndex]);
    this.safeSetText('rank-diamonds-big', (user.diamonds || 0) + " 💎");
    
    const nextLevel = Math.ceil((user.level || 1) / 100) * 100;
    const xpPercent = (user.level || 1) % 100;
    const fillEl = document.getElementById('xp-bar-fill');
    if (fillEl) fillEl.style.width = `${xpPercent}%`;
    this.safeSetText('xp-next-level', nextLevel + " 💎");
    
    const rankBadges = { 1: "🥉", 2: "🥈", 3: "🥇", 4: "🏆", 5: "👑", 6: "⭐" };
    this.safeSetText('rank-badge-big', rankBadges[levelIndex + 1] || "🎯");
    
    const adminElements = document.querySelectorAll('.admin-only-item, #admin-panel-btn');
    adminElements.forEach(el => {
      if (el) el.classList.toggle('hidden', !user.isAdmin);
    });
  },
  
  safeSetText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  },
  
  renderHomePage() {
    this.renderCategories();
    this.renderRecommendedFoods();
    this.renderSearchResults();
    this.updateDailyChallenge();
    this.updateGreetingTime();
  },
  
  renderCategories() {
    const container = document.getElementById('categories-scroll');
    if (!container) return;
    
    const categoryNames = {
      all: { uz: "Barchasi", ru: "Все" },
      fastfood: { uz: "Fast Food", ru: "Фастфуд" },
      milliy: { uz: "Milliy taomlar", ru: "Национальные" },
      salad: { uz: "Salatlar", ru: "Салаты" },
      drinks: { uz: "Ichimliklar", ru: "Напитки" },
      dessert: { uz: "Shirinliklar", ru: "Десерты" }
    };
    
    container.innerHTML = AppState.categories.map(cat => `
      <button class="category-chip ${AppState.currentCategory === cat ? 'active' : ''}" data-category="${cat}">
        ${categoryNames[cat][this.currentLang]}
      </button>
    `).join('');
    
    container.querySelectorAll('.category-chip').forEach(btn => {
      btn.removeEventListener('click', this.handleCategoryClick);
      btn.addEventListener('click', this.handleCategoryClick);
    });
  },
  
  handleCategoryClick(e) {
    const category = e.currentTarget.dataset.category;
    AppState.currentCategory = category;
    Renderer.renderCategories();
    Renderer.renderRecommendedFoods();
    TelegramAPI.haptic('light');
  },
  
  renderRecommendedFoods() {
    const container = document.getElementById('home-food-grid');
    if (!container) return;
    
    let filtered = AppState.foods;
    if (AppState.currentCategory !== 'all') {
      filtered = AppState.foods.filter(f => f.category === AppState.currentCategory);
    }
    
    const displayFoods = filtered.slice(0, 6);
    
    container.innerHTML = displayFoods.map(food => `
      <div class="food-card" data-food-id="${food.id}">
        <div class="food-emoji">${food.emoji}</div>
        <div class="food-name">${this.currentLang === 'uz' ? food.nameUz : food.nameRu}</div>
        <div class="food-price">${food.price.toLocaleString()} so'm</div>
        <div class="food-footer">
          <span class="food-cashback">💵 +${food.cashbackPercent}%</span>
          <span class="food-diamonds">💎 +${food.diamondReward}</span>
          <button class="add-btn" data-food-id="${food.id}">+</button>
        </div>
      </div>
    `).join('');
    
    container.querySelectorAll('.add-btn, .food-card').forEach(el => {
      el.removeEventListener('click', this.handleAddToCart);
      el.addEventListener('click', this.handleAddToCart);
    });
  },
  
  handleAddToCart(e) {
    e.stopPropagation();
    let foodId = e.currentTarget.dataset.foodId;
    if (!foodId && e.currentTarget.closest('.food-card')) {
      foodId = e.currentTarget.closest('.food-card').dataset.foodId;
    }
    if (foodId) Cart.addToCart(parseInt(foodId));
  },
  
  renderSearchResults() {
    const container = document.getElementById('search-food-grid');
    if (!container) return;
    
    if (!AppState.searchQuery) {
      container.innerHTML = '';
      return;
    }
    
    const query = AppState.searchQuery.toLowerCase();
    const filtered = AppState.foods.filter(food => 
      (this.currentLang === 'uz' ? food.nameUz : food.nameRu).toLowerCase().includes(query)
    );
    
    if (filtered.length === 0) {
      container.innerHTML = '<p style="text-align:center;grid-column:1/-1;">Hech narsa topilmadi 😢</p>';
      return;
    }
    
    container.innerHTML = filtered.map(food => `
      <div class="food-card" data-food-id="${food.id}">
        <div class="food-emoji">${food.emoji}</div>
        <div class="food-name">${this.currentLang === 'uz' ? food.nameUz : food.nameRu}</div>
        <div class="food-price">${food.price.toLocaleString()} so'm</div>
        <button class="add-btn" data-food-id="${food.id}">+</button>
      </div>
    `).join('');
    
    container.querySelectorAll('.add-btn, .food-card').forEach(el => {
      el.removeEventListener('click', this.handleAddToCart);
      el.addEventListener('click', this.handleAddToCart);
    });
  },
  
  updateDailyChallenge() {
    const ordersToday = AppState.currentUser?.totalOrders || 0;
    const progress = Math.min(ordersToday, 3);
    const percent = (progress / 3) * 100;
    
    const fillEl = document.getElementById('challenge-fill');
    const textEl = document.getElementById('challenge-text');
    const descEl = document.getElementById('daily-challenge-text');
    
    if (fillEl) fillEl.style.width = `${percent}%`;
    if (textEl) textEl.textContent = `${progress} / 3`;
    if (descEl) {
      descEl.textContent = progress >= 3 ? "✅ Vazifa bajarildi!" : "3 ta ovqat buyurtma bering — 50 💎 yutib oling";
    }
  },
  
  updateGreetingTime() {
    const hour = new Date().getHours();
    let greeting = "Xayrli tong!";
    if (hour >= 12 && hour < 18) greeting = "Xayrli kun!";
    if (hour >= 18) greeting = "Xayrli kech!";
    const el = document.getElementById('greeting-time-text');
    if (el) el.textContent = greeting;
  },
  
  renderMenuPage() {
    this.renderMenuCategories();
    this.renderMenuFoods();
  },
  
  renderMenuCategories() {
    const container = document.getElementById('menu-category-tabs');
    if (!container) return;
    
    const categoryNames = {
      all: { uz: "Barchasi", ru: "Все" },
      fastfood: { uz: "Fast Food", ru: "Фастфуд" },
      milliy: { uz: "Milliy", ru: "Национальные" },
      salad: { uz: "Salatlar", ru: "Салаты" },
      drinks: { uz: "Ichimliklar", ru: "Напитки" },
      dessert: { uz: "Shirinliklar", ru: "Десерты" }
    };
    
    container.innerHTML = AppState.categories.map(cat => `
      <button class="category-chip ${AppState.currentCategory === cat ? 'active' : ''}" data-category="${cat}">
        ${categoryNames[cat][this.currentLang]}
      </button>
    `).join('');
    
    container.querySelectorAll('.category-chip').forEach(btn => {
      btn.removeEventListener('click', this.handleMenuCategoryClick);
      btn.addEventListener('click', this.handleMenuCategoryClick);
    });
  },
  
  handleMenuCategoryClick(e) {
    const category = e.currentTarget.dataset.category;
    AppState.currentCategory = category;
    Renderer.renderMenuCategories();
    Renderer.renderMenuFoods();
    TelegramAPI.haptic('light');
  },
  
  renderMenuFoods() {
    const container = document.getElementById('menu-food-list');
    if (!container) return;
    
    let filtered = AppState.foods;
    if (AppState.currentCategory !== 'all') {
      filtered = AppState.foods.filter(f => f.category === AppState.currentCategory);
    }
    
    container.innerHTML = `
      <div class="food-grid">
        ${filtered.map(food => `
          <div class="food-card" data-food-id="${food.id}">
            <div class="food-emoji">${food.emoji}</div>
            <div class="food-name">${this.currentLang === 'uz' ? food.nameUz : food.nameRu}</div>
            <div class="food-price">${food.price.toLocaleString()} so'm</div>
            <div class="food-footer">
              <span class="food-cashback">💵 +${food.cashbackPercent}%</span>
              <span class="food-diamonds">💎 +${food.diamondReward}</span>
              <button class="add-btn" data-food-id="${food.id}">+</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    container.querySelectorAll('.add-btn, .food-card').forEach(el => {
      el.removeEventListener('click', this.handleAddToCart);
      el.addEventListener('click', this.handleAddToCart);
    });
  },
  
  renderRewardsShop() {
    const container = document.getElementById('rewards-shop-grid');
    if (!container) return;
    
    container.innerHTML = RewardItems.map(reward => `
      <div class="reward-card" data-reward-id="${reward.id}">
        <div class="reward-icon">${reward.emoji}</div>
        <div class="reward-name">${this.currentLang === 'uz' ? reward.nameUz : reward.nameRu}</div>
        <div class="reward-cost">${reward.cost} 💎</div>
      </div>
    `).join('');
    
    container.querySelectorAll('.reward-card').forEach(card => {
      card.removeEventListener('click', this.handleRewardClick);
      card.addEventListener('click', this.handleRewardClick);
    });
  },
  
  handleRewardClick(e) {
    const card = e.currentTarget;
    const rewardId = parseInt(card.dataset.rewardId);
    const reward = RewardItems.find(r => r.id === rewardId);
    if (reward) {
      AppState.selectedReward = reward;
      UI.openRewardModal(reward);
    }
  },
  
  renderFAQ() {
    const container = document.getElementById('faq-list');
    if (!container) return;
    
    const faqs = [
      { qUz: "Qanday buyurtma berish mumkin?", qRu: "Как заказать?", aUz: "Ovqatni tanlang va savatga qo'shing, so'ng 'Buyurtma berish' tugmasini bosing.", aRu: "Выберите еду и добавьте в корзину, затем нажмите 'Оформить заказ'." },
      { qUz: "Keshbek qanday ishlaydi?", qRu: "Как работает кешбэк?", aUz: "Har bir buyurtmadan % keshbek hisoblanadi.", aRu: "С каждого заказа начисляется % кешбэка." },
      { qUz: "Olmoslarni qanday yutib olish mumkin?", qRu: "Как получить алмазы?", aUz: "Buyurtma berish yoki ruletkada aylantirish orqali.", aRu: "Через заказы или вращение рулетки." }
    ];
    
    container.innerHTML = faqs.map(faq => `
      <div class="faq-item">
        <div class="faq-question">${this.currentLang === 'uz' ? faq.qUz : faq.qRu}</div>
        <div class="faq-answer">${this.currentLang === 'uz' ? faq.aUz : faq.aRu}</div>
      </div>
    `).join('');
  },
  
  updateCartUI() {
    const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalCashback = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity * item.cashbackPercent / 100), 0);
    const totalDiamonds = AppState.cart.reduce((sum, item) => sum + (item.diamondReward * item.quantity), 0);
    
    const sidebarCount = document.getElementById('cart-sidebar-count');
    const fcartCount = document.getElementById('fcart-count');
    const fcartTotal = document.getElementById('fcart-total');
    const menuCartCount = document.getElementById('menu-cart-count');
    const floatingCart = document.getElementById('floating-cart-btn');
    
    if (sidebarCount) sidebarCount.textContent = totalItems;
    if (fcartCount) fcartCount.textContent = totalItems;
    if (fcartTotal) fcartTotal.textContent = totalPrice.toLocaleString() + " so'm";
    if (menuCartCount) menuCartCount.textContent = totalItems;
    if (floatingCart) floatingCart.classList.toggle('hidden', totalItems === 0);
    
    const cartItemsContainer = document.getElementById('cart-items-list');
    const cartEmpty = document.getElementById('cart-empty');
    const cartSummary = document.getElementById('cart-summary');
    
    if (totalItems === 0) {
      if (cartEmpty) cartEmpty.classList.remove('hidden');
      if (cartSummary) cartSummary.classList.add('hidden');
      if (cartItemsContainer) cartItemsContainer.innerHTML = '';
      return;
    }
    
    if (cartEmpty) cartEmpty.classList.add('hidden');
    if (cartSummary) cartSummary.classList.remove('hidden');
    
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = AppState.cart.map(item => `
        <div class="cart-item" data-cart-id="${item.id}">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.emoji} ${this.currentLang === 'uz' ? item.nameUz : item.nameRu}</div>
            <div class="cart-item-price">${(item.price * item.quantity).toLocaleString()} so'm</div>
          </div>
          <div class="cart-item-actions">
            <button class="cart-qty-btn" data-action="decr" data-id="${item.id}">-</button>
            <span class="cart-item-qty">${item.quantity}</span>
            <button class="cart-qty-btn" data-action="incr" data-id="${item.id}">+</button>
            <button class="cart-qty-btn" data-action="remove" data-id="${item.id}">🗑️</button>
          </div>
        </div>
      `).join('');
    }
    
    let finalPrice = totalPrice;
    if (AppState.cashbackEnabled && AppState.currentUser?.cashback > 0) {
      finalPrice = Math.max(0, totalPrice - AppState.currentUser.cashback);
    }
    if (AppState.promoApplied) {
      if (AppState.promoApplied.discount) finalPrice = Math.max(0, finalPrice - AppState.promoApplied.discount);
      if (AppState.promoApplied.discountPercent) finalPrice = finalPrice * (1 - AppState.promoApplied.discountPercent / 100);
    }
    
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartTotalCashback = document.getElementById('cart-total-cashback');
    const cartTotalDiamonds = document.getElementById('cart-total-diamonds');
    
    if (cartTotalPrice) cartTotalPrice.textContent = finalPrice.toLocaleString() + " so'm";
    if (cartTotalCashback) cartTotalCashback.textContent = `+ ${Math.floor(totalCashback).toLocaleString()} so'm`;
    if (cartTotalDiamonds) cartTotalDiamonds.textContent = `+ ${totalDiamonds} 💎`;
    
    document.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.removeEventListener('click', this.handleCartAction);
      btn.addEventListener('click', this.handleCartAction);
    });
  },
  
  handleCartAction(e) {
    e.stopPropagation();
    const action = e.currentTarget.dataset.action;
    const id = parseInt(e.currentTarget.dataset.id);
    if (action === 'incr') Cart.updateQuantity(id, 1);
    if (action === 'decr') Cart.updateQuantity(id, -1);
    if (action === 'remove') Cart.removeFromCart(id);
  },
  
  renderLeaderboard() {
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
  },
  
  renderOrderHistory() {
    const container = document.getElementById('order-history-list');
    if (!container) return;
    
    const orders = Storage.load('orders', []);
    
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
          ${order.items.map(item => `${item.emoji} ${this.currentLang === 'uz' ? item.nameUz : item.nameRu} x${item.quantity}`).join(', ')}
        </div>
        <div style="display:flex;justify-content:space-between;">
          <span>Jami: ${Math.floor(order.total).toLocaleString()} so'm</span>
          <span style="color:#ffcc00;">+${order.diamondsEarned} 💎</span>
        </div>
      </div>
    `).join('');
  },
  
  renderAdminFoodList() {
    const container = document.getElementById('admin-food-list');
    if (!container) return;
    
    container.innerHTML = AppState.foods.map(food => `
      <div class="admin-food-item" data-food-id="${food.id}">
        <div class="admin-food-info">
          <span style="font-size:24px;">${food.emoji}</span>
          <span>${this.currentLang === 'uz' ? food.nameUz : food.nameRu}</span>
          <span style="color:var(--neon-primary);margin-left:8px;">${food.price.toLocaleString()} so'm</span>
        </div>
        <div class="admin-food-actions">
          <button class="admin-edit-btn" data-action="edit" data-id="${food.id}">✏️</button>
          <button class="admin-delete-btn" data-action="delete" data-id="${food.id}">🗑️</button>
        </div>
      </div>
    `).join('');
    
    container.querySelectorAll('.admin-edit-btn, .admin-delete-btn').forEach(btn => {
      btn.removeEventListener('click', this.handleAdminAction);
      btn.addEventListener('click', this.handleAdminAction);
    });
  },
  
  handleAdminAction(e) {
    e.stopPropagation();
    const action = e.currentTarget.dataset.action;
    const id = parseInt(e.currentTarget.dataset.id);
    if (action === 'edit') Admin.openEditModal(id);
    if (action === 'delete') Admin.deleteFood(id);
  },
  
  updateAdminStats() {
    const totalFoods = document.getElementById('admin-total-foods');
    const totalOrders = document.getElementById('admin-total-orders');
    const totalUsers = document.getElementById('admin-total-users');
    const orders = Storage.load('orders', []);
    
    if (totalFoods) totalFoods.textContent = AppState.foods.length;
    if (totalOrders) totalOrders.textContent = orders.length;
    if (totalUsers) totalUsers.textContent = 1;
  }
};

// ==================== CART MODULE ====================
const Cart = {
  addToCart(foodId, quantity = 1) {
    const food = AppState.foods.find(f => f.id === foodId);
    if (!food) return;
    
    const existing = AppState.cart.find(item => item.id === foodId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      AppState.cart.push({
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
    
    Storage.save('cart', AppState.cart);
    Renderer.updateCartUI();
    UI.showToast("Savatga qo'shildi! 🛒", "success");
    TelegramAPI.haptic('light');
  },
  
  removeFromCart(foodId) {
    const index = AppState.cart.findIndex(item => item.id === foodId);
    if (index !== -1) {
      AppState.cart.splice(index, 1);
      Storage.save('cart', AppState.cart);
      Renderer.updateCartUI();
      UI.showToast("Savatdan olib tashlandi", "info");
      TelegramAPI.haptic('light');
    }
  },
  
  updateQuantity(foodId, delta) {
    const item = AppState.cart.find(item => item.id === foodId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeFromCart(foodId);
      } else {
        Storage.save('cart', AppState.cart);
        Renderer.updateCartUI();
      }
    }
  },
  
  checkout() {
    if (AppState.cart.length === 0) {
      UI.showToast("Savat bo'sh", "warning");
      return;
    }
    
    const totalPrice = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalCashbackEarn = Math.floor(AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity * item.cashbackPercent / 100), 0));
    const totalDiamondsEarn = AppState.cart.reduce((sum, item) => sum + (item.diamondReward * item.quantity), 0);
    
    let finalPrice = totalPrice;
    if (AppState.cashbackEnabled && AppState.currentUser?.cashback > 0) {
      const usedCashback = Math.min(AppState.currentUser.cashback, totalPrice);
      finalPrice = totalPrice - usedCashback;
      AppState.currentUser.cashback -= usedCashback;
    }
    
    if (AppState.promoApplied) {
      if (AppState.promoApplied.discount) finalPrice = Math.max(0, finalPrice - AppState.promoApplied.discount);
      if (AppState.promoApplied.discountPercent) finalPrice = finalPrice * (1 - AppState.promoApplied.discountPercent / 100);
      AppState.promoApplied = null;
    }
    
    const order = {
      id: '#' + Math.floor(Math.random() * 10000),
      date: new Date().toISOString(),
      items: [...AppState.cart],
      total: finalPrice,
      cashbackEarned: totalCashbackEarn,
      diamondsEarned: totalDiamondsEarn
    };
    
    if (AppState.currentUser) {
      AppState.currentUser.diamonds += totalDiamondsEarn;
      AppState.currentUser.cashback += totalCashbackEarn;
      AppState.currentUser.totalOrders = (AppState.currentUser.totalOrders || 0) + 1;
      AppState.currentUser.xp = (AppState.currentUser.xp || 0) + totalDiamondsEarn;
      
      const newLevel = Math.floor(AppState.currentUser.xp / 100) + 1;
      if (newLevel > AppState.currentUser.level) {
        AppState.currentUser.level = newLevel;
        UI.showToast(`🎉 Darajangiz oshdi! Level ${newLevel}`, "success");
      }
      Storage.save('user', AppState.currentUser);
    }
    
    const orders = Storage.load('orders', []);
    orders.unshift(order);
    Storage.save('orders', orders);
    
    AppState.cart = [];
    Storage.save('cart', AppState.cart);
    Renderer.updateCartUI();
    Renderer.updateUserUI();
    Renderer.updateDailyChallenge();
    
    UI.showCheckoutSuccess(order.id, totalDiamondsEarn, totalCashbackEarn);
    TelegramAPI.haptic('success');
    
    if (TelegramAPI.instance) {
      TelegramAPI.showPopup("Buyurtma qabul qilindi!", `Buyurtma raqami: ${order.id}\nTaxminiy vaqt: 15-20 daqiqa`);
    }
  }
};

// ==================== AUTH MODULE ====================
const Auth = {
  register() {
    const nameInput = document.getElementById('reg-name');
    const phoneInput = document.getElementById('reg-phone');
    
    const name = nameInput?.value?.trim();
    const phone = phoneInput?.value?.trim();
    
    const btn = document.getElementById('btn-register');
    const btnText = btn?.querySelector('.btn-text');
    
    if (btnText) {
      btnText.style.animation = 'none';
      btnText.offsetHeight;
      btnText.style.animation = 'btnSpinPress 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }
    
    if (!name || !phone) {
      UI.showToast("Iltimos, ism va telefon raqamni to'ldiring", "warning");
      TelegramAPI.haptic('error');
      return;
    }
    
    if (phone.length < 9) {
      UI.showToast("Telefon raqam to'liq emas", "warning");
      return;
    }
    
    const isAdmin = name === "Admin Admin" && phone === "999999999";
    
    AppState.currentUser = {
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
    
    Storage.save('user', AppState.currentUser);
    
    const registerPage = document.getElementById('register-page');
    if (registerPage) {
      registerPage.style.animation = 'containerFloatUp 0.5s reverse';
    }
    
    setTimeout(() => {
      const splash = document.getElementById('splash-screen');
      const register = document.getElementById('register-page');
      const mainApp = document.getElementById('main-app');
      
      if (splash) splash.style.display = 'none';
      if (register) register.classList.add('hidden');
      if (mainApp) mainApp.classList.remove('hidden');
      
      Navigation.navigate('home');
      Renderer.updateAll();
      UI.showToast(`Xush kelibsiz, ${name.split(' ')[0]}! 🎉`, "success");
      TelegramAPI.haptic('success');
    }, 400);
  },
  
  logout() {
    AppState.currentUser = null;
    AppState.cart = [];
    Storage.remove('user');
    Storage.remove('cart');
    
    const mainApp = document.getElementById('main-app');
    const registerPage = document.getElementById('register-page');
    
    if (mainApp) mainApp.classList.add('hidden');
    if (registerPage) registerPage.classList.remove('hidden');
    
    UI.closeModal('logout-modal');
    UI.showToast("Chiqildi", "info");
  },
  
  updateProfile() {
    const newName = document.getElementById('edit-name')?.value;
    const newPhone = document.getElementById('edit-phone')?.value;
    
    if (newName && AppState.currentUser) AppState.currentUser.name = newName;
    if (newPhone && AppState.currentUser) AppState.currentUser.phone = '+998' + newPhone;
    
    if (AppState.currentUser) {
      Storage.save('user', AppState.currentUser);
      Renderer.updateUserUI();
      UI.closeModal('edit-profile-modal');
      UI.showToast("Profil yangilandi!", "success");
      TelegramAPI.haptic('success');
    }
  }
};

// ==================== ROULETTE MODULE ====================
const Roulette = {
  canvas: null,
  ctx: null,
  currentAngle: 0,
  spinning: false,
  spinVelocity: 0,
  spinDecay: 0.98,
  spinRequestId: null,
  lastRouletteResult: null,
  
  init() {
    this.canvas = document.getElementById('roulette-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.drawWheel();
    this.updateSpinsDisplay();
  },
  
  drawWheel() {
    if (!this.ctx || !this.canvas) return;
    
    const size = this.canvas.width;
    const center = size / 2;
    const radius = size / 2 - 5;
    const segmentAngle = (Math.PI * 2) / WheelSegments.length;
    
    this.ctx.clearRect(0, 0, size, size);
    
    const colors = ['#00ff88', '#00cc6a', '#00ffaa', '#00994d', '#33ff99', '#00e675', '#55ffaa', '#00cc88'];
    
    for (let i = 0; i < WheelSegments.length; i++) {
      const start = this.currentAngle + i * segmentAngle;
      const end = start + segmentAngle;
      const segment = WheelSegments[i];
      
      this.ctx.beginPath();
      this.ctx.moveTo(center, center);
      this.ctx.arc(center, center, radius, start, end);
      this.ctx.closePath();
      
      this.ctx.fillStyle = colors[i % colors.length];
      this.ctx.fill();
      this.ctx.strokeStyle = '#050505';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      
      this.ctx.save();
      this.ctx.translate(center, center);
      this.ctx.rotate(start + segmentAngle / 2);
      this.ctx.font = 'bold 28px "Segoe UI Emoji"';
      this.ctx.fillStyle = '#fff';
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = '#00ff88';
      this.ctx.fillText(segment.emoji, radius * 0.65, 10);
      this.ctx.restore();
    }
    
    this.ctx.beginPath();
    this.ctx.arc(center, center, 25, 0, Math.PI * 2);
    this.ctx.fillStyle = '#050505';
    this.ctx.fill();
    this.ctx.strokeStyle = '#00ff88';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
  },
  
  spin() {
    if (this.spinning) return;
    if (AppState.spinsLeft <= 0) {
      UI.showToast("Bugun limit tugadi! Ertaga qaytib keling", "warning");
      TelegramAPI.haptic('error');
      return;
    }
    
    this.spinning = true;
    this.spinVelocity = 15 + Math.random() * 15;
    let lastTimestamp = 0;
    
    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = Math.min(50, timestamp - lastTimestamp);
      lastTimestamp = timestamp;
      
      if (this.spinVelocity > 0.5) {
        this.currentAngle += this.spinVelocity * (delta / 16);
        this.spinVelocity *= this.spinDecay;
        this.drawWheel();
        this.spinRequestId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(this.spinRequestId);
        this.spinning = false;
        this.determineWinner();
      }
    };
    
    this.spinRequestId = requestAnimationFrame(animate);
  },
  
  determineWinner() {
    const segmentAngle = (Math.PI * 2) / WheelSegments.length;
    let rawAngle = this.currentAngle % (Math.PI * 2);
    if (rawAngle < 0) rawAngle += Math.PI * 2;
    const pointerAngle = Math.PI / 2;
    let selectedIndex = Math.floor(((pointerAngle - rawAngle + segmentAngle) % (Math.PI * 2)) / segmentAngle);
    selectedIndex = (selectedIndex + WheelSegments.length) % WheelSegments.length;
    
    this.lastRouletteResult = WheelSegments[selectedIndex];
    AppState.spinsLeft--;
    Storage.save('spins', { spinsLeft: AppState.spinsLeft, lastSpinDate: AppState.lastSpinDate });
    this.updateSpinsDisplay();
    this.showResult(this.lastRouletteResult);
    TelegramAPI.haptic('success');
  },
  
  showResult(segment) {
    const resultDiv = document.getElementById('roulette-result');
    const resultEmoji = document.getElementById('result-emoji');
    const resultFoodName = document.getElementById('result-food-name');
    const resultPrice = document.getElementById('result-price');
    const resultDiamonds = document.getElementById('result-diamonds');
    
    if (resultEmoji) resultEmoji.textContent = segment.emoji;
    if (resultFoodName) resultFoodName.textContent = Renderer.currentLang === 'uz' ? segment.nameUz : segment.nameRu;
    if (resultPrice) resultPrice.textContent = segment.price.toLocaleString() + " so'm";
    if (resultDiamonds) resultDiamonds.textContent = `+${segment.diamonds} 💎`;
    if (resultDiv) resultDiv.classList.remove('hidden');
  },
  
  addResultToCart() {
    if (this.lastRouletteResult) {
      let food = AppState.foods.find(f => 
        f.nameUz === this.lastRouletteResult.nameUz || 
        f.nameRu === this.lastRouletteResult.nameRu
      );
      
      if (food) {
        Cart.addToCart(food.id);
      } else {
        AppState.cart.push({
          id: Date.now(),
          nameUz: this.lastRouletteResult.nameUz,
          nameRu: this.lastRouletteResult.nameRu,
          emoji: this.lastRouletteResult.emoji,
          price: this.lastRouletteResult.price,
          cashbackPercent: this.lastRouletteResult.cashback,
          diamondReward: this.lastRouletteResult.diamonds,
          quantity: 1
        });
        Storage.save('cart', AppState.cart);
        Renderer.updateCartUI();
        UI.showToast("Savatga qo'shildi! 🛒", "success");
      }
      
      const resultDiv = document.getElementById('roulette-result');
      if (resultDiv) resultDiv.classList.add('hidden');
      TelegramAPI.haptic('light');
    }
  },
  
  updateSpinsDisplay() {
    const spinsLeftSpan = document.getElementById('spins-left-count');
    const todaySpinsUsed = document.getElementById('today-spins-used');
    if (spinsLeftSpan) spinsLeftSpan.textContent = AppState.spinsLeft;
    if (todaySpinsUsed) todaySpinsUsed.textContent = `${3 - AppState.spinsLeft} / 3`;
  }
};

// ==================== ADMIN MODULE ====================
const Admin = {
  editingFoodId: null,
  
  addFood() {
    const nameUz = document.getElementById('admin-food-name-uz')?.value;
    const nameRu = document.getElementById('admin-food-name-ru')?.value;
    const price = parseInt(document.getElementById('admin-food-price')?.value);
    const category = document.getElementById('admin-food-category')?.value;
    const cashback = parseInt(document.getElementById('admin-food-cashback')?.value) || 5;
    const diamonds = parseInt(document.getElementById('admin-food-diamonds')?.value) || 10;
    const emoji = document.getElementById('admin-food-emoji')?.value || '🍽️';
    const descUz = document.getElementById('admin-food-desc-uz')?.value || '';
    
    if (!nameUz || !price || !category) {
      UI.showToast("Iltimos, barcha maydonlarni to'ldiring!", "warning");
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
    
    AppState.foods.push(newFood);
    Storage.save('foods', AppState.foods);
    Renderer.renderAdminFoodList();
    Renderer.renderHomePage();
    Renderer.renderMenuPage();
    UI.showToast("Ovqat qo'shildi! ✅", "success");
    TelegramAPI.haptic('success');
    
    document.getElementById('admin-food-name-uz').value = '';
    document.getElementById('admin-food-name-ru').value = '';
    document.getElementById('admin-food-price').value = '';
    document.getElementById('admin-food-emoji').value = '';
    document.getElementById('admin-food-desc-uz').value = '';
  },
  
  openEditModal(foodId) {
    const food = AppState.foods.find(f => f.id === foodId);
    if (!food) return;
    
    this.editingFoodId = foodId;
    const idInput = document.getElementById('edit-food-id');
    const nameInput = document.getElementById('edit-food-name-uz');
    const priceInput = document.getElementById('edit-food-price');
    const cashbackInput = document.getElementById('edit-food-cashback');
    const diamondsInput = document.getElementById('edit-food-diamonds');
    
    if (idInput) idInput.value = food.id;
    if (nameInput) nameInput.value = food.nameUz;
    if (priceInput) priceInput.value = food.price;
    if (cashbackInput) cashbackInput.value = food.cashbackPercent;
    if (diamondsInput) diamondsInput.value = food.diamondReward;
    
    UI.openModal('admin-edit-modal');
  },
  
  saveEdit() {
    if (!this.editingFoodId) return;
    
    const foodIndex = AppState.foods.findIndex(f => f.id === this.editingFoodId);
    if (foodIndex !== -1) {
      const nameInput = document.getElementById('edit-food-name-uz');
      const priceInput = document.getElementById('edit-food-price');
      const cashbackInput = document.getElementById('edit-food-cashback');
      const diamondsInput = document.getElementById('edit-food-diamonds');
      
      if (nameInput) AppState.foods[foodIndex].nameUz = nameInput.value;
      if (priceInput) AppState.foods[foodIndex].price = parseInt(priceInput.value);
      if (cashbackInput) AppState.foods[foodIndex].cashbackPercent = parseInt(cashbackInput.value);
      if (diamondsInput) AppState.foods[foodIndex].diamondReward = parseInt(diamondsInput.value);
      
      Storage.save('foods', AppState.foods);
      Renderer.renderAdminFoodList();
      Renderer.renderHomePage();
      Renderer.renderMenuPage();
      UI.showToast("Ovqat tahrirlandi! ✅", "success");
      TelegramAPI.haptic('success');
    }
    
    UI.closeModal('admin-edit-modal');
    this.editingFoodId = null;
  },
  
  deleteFood(foodId) {
    if (confirm("Ovqatni o'chirmoqchimisiz?")) {
      AppState.foods = AppState.foods.filter(f => f.id !== foodId);
      Storage.save('foods', AppState.foods);
      Renderer.renderAdminFoodList();
      Renderer.renderHomePage();
      Renderer.renderMenuPage();
      UI.showToast("Ovqat o'chirildi", "info");
      TelegramAPI.haptic('light');
    }
  }
};

// ==================== UI MODULE ====================
const UI = {
  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toast-icon');
    const toastMsg = document.getElementById('toast-msg');
    
    if (!toast) return;
    
    const icons = { success: '✓', error: '✕', warning: '⚠️', info: 'ℹ️' };
    if (toastIcon) toastIcon.textContent = icons[type] || icons.info;
    if (toastMsg) toastMsg.textContent = message;
    
    toast.classList.remove('hidden');
    
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 2500);
  },
  
  showCheckoutSuccess(orderId, diamonds, cashback) {
    const idEl = document.getElementById('success-order-id');
    const diamondsEl = document.getElementById('success-diamonds');
    const cashbackEl = document.getElementById('success-cashback');
    
    if (idEl) idEl.textContent = orderId;
    if (diamondsEl) diamondsEl.innerHTML = `+${diamonds} 💎`;
    if (cashbackEl) cashbackEl.innerHTML = `+${cashback} so'm keshbek`;
    
    this.openModal('checkout-modal');
  },
  
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('hidden');
  },
  
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
  },
  
  openRewardModal(reward) {
    const titleEl = document.getElementById('reward-claim-title');
    const iconEl = document.getElementById('reward-claim-icon');
    const costEl = document.getElementById('reward-claim-cost-val');
    
    if (titleEl) titleEl.textContent = Renderer.currentLang === 'uz' ? reward.nameUz : reward.nameRu;
    if (iconEl) iconEl.innerHTML = reward.emoji;
    if (costEl) costEl.textContent = reward.cost;
    
    this.openModal('reward-claim-modal');
  },
  
  confirmClaimReward() {
    const reward = AppState.selectedReward;
    if (!reward || !AppState.currentUser) return;
    
    if (AppState.currentUser.diamonds >= reward.cost) {
      AppState.currentUser.diamonds -= reward.cost;
      
      switch (reward.type) {
        case 'discount':
          AppState.promoApplied = { code: 'REWARD', discountPercent: reward.value };
          this.showToast(`${reward.value}% chegirma qo'llanildi!`, "success");
          break;
        case 'diamonds':
          AppState.currentUser.diamonds += reward.value;
          this.showToast(`+${reward.value} 💎 olmos qo'shildi!`, "success");
          break;
        case 'cashback':
          AppState.currentUser.cashback += reward.value;
          this.showToast(`+${reward.value} so'm keshbek qo'shildi!`, "success");
          break;
      }
      
      Storage.save('user', AppState.currentUser);
      Renderer.updateUserUI();
      this.closeModal('reward-claim-modal');
      TelegramAPI.haptic('success');
    } else {
      this.showToast("Yetarlicha olmos yo'q!", "error");
      TelegramAPI.haptic('error');
    }
  },
  
  toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (sidebar) sidebar.classList.toggle('hidden');
    if (overlay) overlay.classList.toggle('hidden');
    TelegramAPI.haptic('light');
  },
  
  toggleNotifications() {
    const panel = document.getElementById('notif-panel');
    if (panel) panel.classList.toggle('hidden');
    const dot = document.getElementById('notif-dot');
    if (dot) dot.classList.add('hidden');
  },
  
  toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    Storage.save('theme', isDark ? 'light' : 'dark');
    TelegramAPI.haptic('light');
  },
  
  toggleNotifSetting() {
    const toggle = document.getElementById('notif-toggle');
    if (toggle) {
      AppState.notificationsEnabled = toggle.checked;
      Storage.save('notifications', AppState.notificationsEnabled);
      this.showToast(AppState.notificationsEnabled ? "Bildirishnomalar yoqildi" : "Bildirishnomalar o'chirildi", "info");
    }
  },
  
  applyPromo() {
    const promoInput = document.getElementById('promo-input');
    const promo = promoInput?.value?.trim()?.toUpperCase();
    
    if (promo === 'WELCOME50') {
      AppState.promoApplied = { code: promo, discount: 5000 };
      this.showToast("Promo kod qo'llanildi! 5000 so'm chegirma", "success");
      Renderer.updateCartUI();
    } else if (promo === 'NIMA10') {
      AppState.promoApplied = { code: promo, discountPercent: 10 };
      this.showToast("10% chegirma qo'llanildi!", "success");
      Renderer.updateCartUI();
    } else if (promo) {
      this.showToast("Noto'g'ri promo kod", "error");
      TelegramAPI.haptic('error');
    }
  },
  
  claimMonthlyGift() {
    const lastClaim = Storage.load('monthly_gift_claim');
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${now.getMonth()}`;
    
    if (lastClaim === currentMonth) {
      this.showToast("Siz bu oy sovg'asini olgansiz!", "warning");
      return;
    }
    
    if (AppState.currentUser) {
      AppState.currentUser.diamonds += 100;
      AppState.currentUser.cashback += 5000;
      Storage.save('monthly_gift_claim', currentMonth);
      Storage.save('user', AppState.currentUser);
      Renderer.updateUserUI();
      this.showToast("🎁 Oylik sovg'a olindi! +100 💎 va +5000 so'm", "success");
      TelegramAPI.haptic('success');
    }
  }
};

// ==================== NAVIGATION MODULE ====================
const Navigation = {
  navigate(page) {
    AppState.currentPage = page;
    TelegramAPI.haptic('light');
    
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) targetPage.classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    const activeNav = document.getElementById(`nav-${page}`);
    if (activeNav) activeNav.classList.add('active');
    
    if (page === 'home') Renderer.renderHomePage();
    if (page === 'menu') Renderer.renderMenuPage();
    if (page === 'roulette') Roulette.init();
    if (page === 'rewards') Renderer.renderRewardsShop();
    if (page === 'profile') Renderer.updateUserUI();
    if (page === 'order-history') Renderer.renderOrderHistory();
    if (page === 'admin' && AppState.currentUser?.isAdmin) {
      Renderer.renderAdminFoodList();
      Renderer.updateAdminStats();
    }
    if (page === 'faq') Renderer.renderFAQ();
    
    Renderer.updateCartUI();
  },
  
  goBack() {
    this.navigate('home');
  }
};

// ==================== SPLASH MODULE ====================
const Splash = {
  init() {
    let progress = 0;
    const loaderFill = document.getElementById('loader-fill');
    const loaderPercent = document.getElementById('loader-percent');
    
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        if (loaderFill) loaderFill.style.width = '100%';
        if (loaderPercent) loaderPercent.textContent = '100%';
        
        setTimeout(() => {
          const splash = document.getElementById('splash-screen');
          const register = document.getElementById('register-page');
          
          if (splash) splash.style.display = 'none';
          if (register) register.classList.remove('hidden');
          
          if (AppState.currentUser) {
            const splashEl = document.getElementById('splash-screen');
            const registerEl = document.getElementById('register-page');
            const mainApp = document.getElementById('main-app');
            
            if (splashEl) splashEl.style.display = 'none';
            if (registerEl) registerEl.classList.add('hidden');
            if (mainApp) mainApp.classList.remove('hidden');
            
            Navigation.navigate('home');
            Renderer.updateAll();
          }
        }, 500);
      }
      
      if (loaderFill) loaderFill.style.width = `${progress}%`;
      if (loaderPercent) loaderPercent.textContent = `${Math.floor(progress)}%`;
    }, 80);
  }
};

// ==================== EVENT LISTENERS SETUP ====================
function setupEventListeners() {
  // Bottom navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.id.replace('nav-', '');
      Navigation.navigate(page);
    });
  });
  
  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      const results = document.getElementById('search-results');
      const clearBtn = document.querySelector('.search-clear');
      
      if (AppState.searchQuery.length > 0) {
        if (results) results.classList.remove('hidden');
        if (clearBtn) clearBtn.classList.remove('hidden');
        Renderer.renderSearchResults();
      } else {
        if (results) results.classList.add('hidden');
        if (clearBtn) clearBtn.classList.add('hidden');
      }
    });
  }
  
  // Search clear button
  const clearBtn = document.querySelector('.search-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      AppState.searchQuery = '';
      const results = document.getElementById('search-results');
      if (results) results.classList.add('hidden');
      clearBtn.classList.add('hidden');
      Renderer.renderSearchResults();
    });
  }
  
  // Floating cart button
  const floatingCart = document.getElementById('floating-cart-btn');
  if (floatingCart) {
    floatingCart.addEventListener('click', () => UI.toggleCart());
  }
  
  // Cart overlay
  const cartOverlay = document.getElementById('cart-overlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', () => UI.toggleCart());
  }
  
  // Cart close button
  const cartClose = document.querySelector('.cart-close-btn');
  if (cartClose) {
    cartClose.addEventListener('click', () => UI.toggleCart());
  }
  
  // Checkout button
  const checkoutBtn = document.getElementById('btn-checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => Cart.checkout());
  }
  
  // Promo apply button
  const promoBtn = document.querySelector('.promo-apply-btn');
  if (promoBtn) {
    promoBtn.addEventListener('click', () => UI.applyPromo());
  }
  
  // Spin button
  const spinBtn = document.getElementById('spin-btn');
  if (spinBtn) {
    spinBtn.addEventListener('click', () => Roulette.spin());
  }
  
  // Add roulette result to cart
  const resultAddBtn = document.getElementById('result-add-btn');
  if (resultAddBtn) {
    resultAddBtn.addEventListener('click', () => Roulette.addResultToCart());
  }
  
  // Result spin again
  const resultSpinBtn = document.querySelector('.result-btn-spin');
  if (resultSpinBtn) {
    resultSpinBtn.addEventListener('click', () => Roulette.spin());
  }
  
  // Language pills
  const pillUz = document.getElementById('pill-uz');
  const pillRu = document.getElementById('pill-ru');
  if (pillUz) pillUz.addEventListener('click', () => Renderer.setLanguage('uz'));
  if (pillRu) pillRu.addEventListener('click', () => Renderer.setLanguage('ru'));
  
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', () => UI.toggleTheme());
  }
  
  // Notifications toggle
  const notifToggle = document.getElementById('notif-toggle');
  if (notifToggle) {
    notifToggle.addEventListener('change', () => UI.toggleNotifSetting());
  }
  
  // Notification bell
  const notifBell = document.getElementById('btn-notifications');
  if (notifBell) {
    notifBell.addEventListener('click', () => UI.toggleNotifications());
  }
  
  // Leaderboard tabs
  document.querySelectorAll('.lb-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const type = e.currentTarget.textContent === 'Haftalik' || e.currentTarget.textContent === 'Нед.' ? 'weekly' : 'monthly';
      AppState.leaderboardType = type;
      document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      Renderer.renderLeaderboard();
    });
  });
  
  // Monthly gift button
  const giftBtn = document.querySelector('.btn-gift');
  if (giftBtn) {
    giftBtn.addEventListener('click', () => UI.claimMonthlyGift());
  }
  
  // Admin add food button
  const adminAddBtn = document.querySelector('.admin-add-btn');
  if (adminAddBtn) {
    adminAddBtn.addEventListener('click', () => Admin.addFood());
  }
  
  // Modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.currentTarget.closest('.modal-overlay');
      if (modal) modal.classList.add('hidden');
    });
  });
  
  // Checkout modal continue button
  const checkoutContinue = document.querySelector('#checkout-modal .btn-primary');
  if (checkoutContinue) {
    checkoutContinue.addEventListener('click', () => UI.closeModal('checkout-modal'));
  }
  
  // Edit profile save
  const saveProfileBtn = document.querySelector('#edit-profile-modal .btn-primary');
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', () => Auth.updateProfile());
  }
  
  // Logout confirm
  const logoutConfirm = document.querySelector('#logout-modal .btn-logout-confirm');
  if (logoutConfirm) {
    logoutConfirm.addEventListener('click', () => Auth.logout());
  }
  
  // Cancel logout
  const logoutCancel = document.querySelector('#logout-modal .btn-secondary');
  if (logoutCancel) {
    logoutCancel.addEventListener('click', () => UI.closeModal('logout-modal'));
  }
  
  // Reward claim
  const claimRewardBtn = document.querySelector('#reward-claim-modal .btn-primary');
  if (claimRewardBtn) {
    claimRewardBtn.addEventListener('click', () => UI.confirmClaimReward());
  }
  
  const cancelRewardBtn = document.querySelector('#reward-claim-modal .btn-secondary');
  if (cancelRewardBtn) {
    cancelRewardBtn.addEventListener('click', () => UI.closeModal('reward-claim-modal'));
  }
  
  // Admin edit save
  const saveEditBtn = document.querySelector('#admin-edit-modal .btn-primary');
  if (saveEditBtn) {
    saveEditBtn.addEventListener('click', () => Admin.saveEdit());
  }
  
  const cancelEditBtn = document.querySelector('#admin-edit-modal .modal-close');
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => UI.closeModal('admin-edit-modal'));
  }
  
  // Profile edit button
  const editProfileBtn = document.querySelector('.profile-edit-btn');
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => UI.openModal('edit-profile-modal'));
  }
  
  // Logout button
  const logoutBtn = document.querySelector('.btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => UI.openModal('logout-modal'));
  }
}

// ==================== INITIALIZATION ====================
function init() {
  // Initialize Telegram
  TelegramAPI.init();
  
  // Load data from storage
  Storage.loadAll();
  
  // Initialize foods if empty
  if (AppState.foods.length === 0) {
    AppState.foods = [...DefaultFoods];
    Storage.save('foods', AppState.foods);
  }
  
  // Apply saved theme
  const savedTheme = Storage.load('theme');
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Setup event listeners
  setupEventListeners();
  
  // Update register page HTML
  const registerFormHtml = `
    <div class="register-container">
      <div class="reg-header">
        <div class="reg-logo"><span>🍽️</span></div>
        <h2 class="reg-title">Nima yeymiz?</h2>
        <p class="reg-subtitle">Smart food ordering</p>
      </div>
      <div class="reg-form-card">
        <div class="form-step">
          <label class="form-label">To'liq ismingiz</label>
          <div class="form-input-wrap">
            <span class="input-icon">👤</span>
            <input type="text" id="reg-name" class="form-input" placeholder="Ism Familiya" />
          </div>
        </div>
        <div class="form-step">
          <label class="form-label">Telefon raqam</label>
          <div class="form-input-wrap">
            <span class="input-icon">📱</span>
            <span class="phone-prefix">+998</span>
            <input type="tel" id="reg-phone" class="form-input phone-input" placeholder="90 123 45 67" maxlength="12" />
          </div>
        </div>
        <button class="btn-primary" id="btn-register">
          <span class="btn-text">Boshlash 🚀</span>
          <div class="btn-glow"></div>
        </button>
      </div>
      <p class="reg-footer-text">SMS tasdiqnomasiz tezkor kirish</p>
    </div>
  `;
  
  const registerPage = document.getElementById('register-page');
  if (registerPage) {
    registerPage.innerHTML = registerFormHtml;
  }
  
  // Bind register button
  const registerBtn = document.getElementById('btn-register');
  if (registerBtn) {
    registerBtn.addEventListener('click', () => Auth.register());
  }
  
  // Initialize renderer
  Renderer.init();
  
  // Check if user exists and start app
  if (AppState.currentUser) {
    const splash = document.getElementById('splash-screen');
    const register = document.getElementById('register-page');
    const mainApp = document.getElementById('main-app');
    
    if (splash) splash.style.display = 'none';
    if (register) register.classList.add('hidden');
    if (mainApp) mainApp.classList.remove('hidden');
    
    Navigation.navigate('home');
    Renderer.updateAll();
  } else {
    Splash.init();
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
}

// Start the app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
                     }
