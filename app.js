// PLAYERVERSE VERSION 1.0
// PART 2 OF 3
// countries.js

'use strict';

/* =============================================
   DATA
============================================= */
const COUNTRIES_DB = [
  // UEFA
  { id:'brazil',      name:'Brazil',       flag:'🇧🇷', conf:'CONMEBOL', rank:1,  wc:5, players:13000, goals:8200,  color:'#009C3B', founded:1914, nickname:'The Seleção',    stadium:'Maracanã',        caps:500, trophies:['5× World Cup','9× Copa América'] },
  { id:'france',      name:'France',       flag:'🇫🇷', conf:'UEFA',    rank:2,  wc:2, players:11000, goals:6800,  color:'#002395', founded:1919, nickname:'Les Bleus',      stadium:'Stade de France', caps:500, trophies:['2× World Cup','2× Euros'] },
  { id:'germany',     name:'Germany',      flag:'🇩🇪', conf:'UEFA',    rank:3,  wc:4, players:12000, goals:7100,  color:'#000000', founded:1900, nickname:'Die Mannschaft', stadium:'Allianz Arena',   caps:500, trophies:['4× World Cup','3× Euros'] },
  { id:'argentina',   name:'Argentina',    flag:'🇦🇷', conf:'CONMEBOL',rank:4,  wc:3, players:10000, goals:7500,  color:'#74ACDF', founded:1893, nickname:'La Albiceleste', stadium:'Monumental',      caps:500, trophies:['3× World Cup','15× Copa América'] },
  { id:'spain',       name:'Spain',        flag:'🇪🇸', conf:'UEFA',    rank:5,  wc:1, players:10500, goals:6200,  color:'#AA151B', founded:1913, nickname:'La Roja',        stadium:'Bernabéu',        caps:500, trophies:['1× World Cup','4× Euros'] },
  { id:'england',     name:'England',      flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', conf:'UEFA',    rank:6,  wc:1, players:9800,  goals:5900,  color:'#FFFFFF', founded:1863, nickname:'Three Lions',    stadium:'Wembley',         caps:500, trophies:['1× World Cup'] },
  { id:'portugal',    name:'Portugal',     flag:'🇵🇹', conf:'UEFA',    rank:7,  wc:0, players:7200,  goals:4800,  color:'#006600', founded:1914, nickname:'A Seleção',      stadium:'Luz',             caps:500, trophies:['1× Euro','1× Nations League'] },
  { id:'netherlands', name:'Netherlands',  flag:'🇳🇱', conf:'UEFA',    rank:8,  wc:0, players:6800,  goals:4500,  color:'#FF6600', founded:1889, nickname:'Oranje',         stadium:'Johan Cruyff ArenA', caps:500, trophies:['1× Euro','1× Nations League'] },
  { id:'italy',       name:'Italy',        flag:'🇮🇹', conf:'UEFA',    rank:9,  wc:4, players:9200,  goals:5600,  color:'#003399', founded:1898, nickname:'Gli Azzurri',    stadium:'San Siro',        caps:500, trophies:['4× World Cup','2× Euros'] },
  { id:'belgium',     name:'Belgium',      flag:'🇧🇪', conf:'UEFA',    rank:10, wc:0, players:5100,  goals:3200,  color:'#000000', founded:1895, nickname:'Red Devils',     stadium:'King Baudouin',   caps:500, trophies:[] },
  { id:'croatia',     name:'Croatia',      flag:'🇭🇷', conf:'UEFA',    rank:11, wc:0, players:3400,  goals:2100,  color:'#FF0000', founded:1912, nickname:'Vatreni',        stadium:'Poljud',          caps:500, trophies:['1× Nations League'] },
  { id:'denmark',     name:'Denmark',      flag:'🇩🇰', conf:'UEFA',    rank:12, wc:0, players:4200,  goals:2800,  color:'#C60C30', founded:1889, nickname:'Danish Dynamite',stadium:'Parken',          caps:500, trophies:['1× Euro'] },
  { id:'uruguay',     name:'Uruguay',      flag:'🇺🇾', conf:'CONMEBOL',rank:13, wc:2, players:5200,  goals:3800,  color:'#75AADB', founded:1900, nickname:'La Celeste',     stadium:'Centenario',      caps:500, trophies:['2× World Cup','15× Copa América'] },
  { id:'colombia',    name:'Colombia',     flag:'🇨🇴', conf:'CONMEBOL',rank:14, wc:0, players:6100,  goals:3400,  color:'#FCD116', founded:1924, nickname:'Los Cafeteros',  stadium:'El Campín',       caps:500, trophies:['1× Copa América'] },
  { id:'mexico',      name:'Mexico',       flag:'🇲🇽', conf:'CONCACAF',rank:15, wc:0, players:7800,  goals:4100,  color:'#006847', founded:1927, nickname:'El Tri',         stadium:'Azteca',          caps:500, trophies:['2× Gold Cup'] },
  { id:'usa',         name:'USA',          flag:'🇺🇸', conf:'CONCACAF',rank:16, wc:0, players:8200,  goals:3200,  color:'#B22234', founded:1913, nickname:'The Stars and Stripes', stadium:'Rose Bowl', caps:500, trophies:['3× Gold Cup'] },
  { id:'senegal',     name:'Senegal',      flag:'🇸🇳', conf:'CAF',     rank:17, wc:0, players:4100,  goals:2200,  color:'#00853F', founded:1960, nickname:'Lions of Teranga',stadium:'Léopold Sédar Senghor', caps:500, trophies:['2× AFCON'] },
  { id:'morocco',     name:'Morocco',      flag:'🇲🇦', conf:'CAF',     rank:18, wc:0, players:3800,  goals:2000,  color:'#C1272D', founded:1955, nickname:'Atlas Lions',    stadium:'Grand Stade de Casablanca', caps:500, trophies:['1× AFCON'] },
  { id:'nigeria',     name:'Nigeria',      flag:'🇳🇬', conf:'CAF',     rank:19, wc:0, players:5200,  goals:2900,  color:'#008751', founded:1945, nickname:'Super Eagles',   stadium:'National Stadium Abuja', caps:500, trophies:['3× AFCON'] },
  { id:'egypt',       name:'Egypt',        flag:'🇪🇬', conf:'CAF',     rank:20, wc:0, players:4600,  goals:2700,  color:'#CE1126', founded:1921, nickname:'Pharaohs',       stadium:'Cairo International', caps:500, trophies:['7× AFCON'] },
  { id:'japan',       name:'Japan',        flag:'🇯🇵', conf:'AFC',     rank:21, wc:0, players:5600,  goals:2500,  color:'#BC002D', founded:1921, nickname:'Samurai Blue',   stadium:'Japan National', caps:500, trophies:['4× AFC Championship'] },
  { id:'southkorea',  name:'South Korea',  flag:'🇰🇷', conf:'AFC',     rank:22, wc:0, players:4800,  goals:2400,  color:'#003478', founded:1928, nickname:'Taeguk Warriors',stadium:'Seoul World Cup', caps:500, trophies:['2× AFC Championship'] },
  { id:'iran',        name:'Iran',         flag:'🇮🇷', conf:'AFC',     rank:23, wc:0, players:4200,  goals:2100,  color:'#239F40', founded:1920, nickname:'Team Melli',     stadium:'Azadi',           caps:500, trophies:['3× AFC Championship'] },
  { id:'australia',   name:'Australia',    flag:'🇦🇺', conf:'AFC',     rank:24, wc:0, players:5100,  goals:2300,  color:'#FFD700', founded:1961, nickname:'Socceroos',      stadium:'Stadium Australia', caps:500, trophies:['1× OFC Nations Cup'] },
  { id:'chile',       name:'Chile',        flag:'🇨🇱', conf:'CONMEBOL',rank:25, wc:0, players:4100,  goals:2600,  color:'#D52B1E', founded:1895, nickname:'La Roja',        stadium:'Estadio Nacional', caps:500, trophies:['2× Copa América'] },
  { id:'sweden',      name:'Sweden',       flag:'🇸🇪', conf:'UEFA',    rank:26, wc:0, players:5200,  goals:3200,  color:'#006AA7', founded:1904, nickname:'Blågult',        stadium:'Friends Arena',   caps:500, trophies:[] },
  { id:'switzerland', name:'Switzerland',  flag:'🇨🇭', conf:'UEFA',    rank:27, wc:0, players:4800,  goals:2900,  color:'#FF0000', founded:1895, nickname:'Nati',           stadium:'Stade de Suisse', caps:500, trophies:[] },
  { id:'austria',     name:'Austria',      flag:'🇦🇹', conf:'UEFA',    rank:28, wc:0, players:3900,  goals:2300,  color:'#ED2939', founded:1904, nickname:'Team Austria',   stadium:'Ernst Happel',    caps:500, trophies:[] },
  { id:'ghana',       name:'Ghana',        flag:'🇬🇭', conf:'CAF',     rank:29, wc:0, players:3600,  goals:2100,  color:'#006B3F', founded:1957, nickname:'Black Stars',    stadium:'Accra Sports',    caps:500, trophies:['4× AFCON'] },
  { id:'ecuador',     name:'Ecuador',      flag:'🇪🇨', conf:'CONMEBOL',rank:30, wc:0, players:3800,  goals:2000,  color:'#FFD100', founded:1925, nickname:'La Tricolor',    stadium:'Estadio Rodrigo Paz', caps:500, trophies:[] },
  { id:'poland',      name:'Poland',       flag:'🇵🇱', conf:'UEFA',    rank:31, wc:0, players:5300,  goals:3000,  color:'#DC143C', founded:1911, nickname:'Biało-czerwoni', stadium:'National Stadium Warsaw', caps:500, trophies:[] },
  { id:'turkey',      name:'Turkey',       flag:'🇹🇷', conf:'UEFA',    rank:32, wc:0, players:5600,  goals:3100,  color:'#E30A17', founded:1923, nickname:'Ay Yıldızlılar', stadium:'Atatürk Olympic', caps:500, trophies:[] },
  { id:'ukraine',     name:'Ukraine',      flag:'🇺🇦', conf:'UEFA',    rank:33, wc:0, players:4700,  goals:2700,  color:'#005BBB', founded:1991, nickname:'Zbirna',         stadium:'Olympic NSC',     caps:500, trophies:[] },
  { id:'russia',      name:'Russia',       flag:'🇷🇺', conf:'UEFA',    rank:34, wc:0, players:6200,  goals:3400,  color:'#D52B1E', founded:1912, nickname:'Sbornaya',       stadium:'Luzhniki',        caps:500, trophies:['1× Euro'] },
  { id:'czechia',     name:'Czech Republic',flag:'🇨🇿',conf:'UEFA',    rank:35, wc:0, players:4100,  goals:2400,  color:'#11457E', founded:1901, nickname:'Národní tým',    stadium:'Sinobo Stadium',  caps:500, trophies:['1× Euro'] },
  { id:'cameroon',    name:'Cameroon',     flag:'🇨🇲', conf:'CAF',     rank:36, wc:0, players:3900,  goals:2200,  color:'#007A5E', founded:1959, nickname:'Indomitable Lions',stadium:'Stade Omnisports', caps:500, trophies:['5× AFCON'] },
  { id:'costarica',   name:'Costa Rica',   flag:'🇨🇷', conf:'CONCACAF',rank:37, wc:0, players:2800,  goals:1600,  color:'#002B7F', founded:1921, nickname:'Los Ticos',      stadium:'Estadio Nacional', caps:500, trophies:['3× CONCACAF'] },
  { id:'serbia',      name:'Serbia',       flag:'🇷🇸', conf:'UEFA',    rank:38, wc:0, players:4200,  goals:2500,  color:'#C6363C', founded:1919, nickname:'Orlovi',         stadium:'Rajko Mitić',     caps:500, trophies:[] },
  { id:'newzealand',  name:'New Zealand',  flag:'🇳🇿', conf:'OFC',     rank:39, wc:0, players:2100,  goals:1200,  color:'#000000', founded:1938, nickname:'All Whites',     stadium:'Eden Park',       caps:500, trophies:['5× OFC Nations Cup'] },
  { id:'qatar',       name:'Qatar',        flag:'🇶🇦', conf:'AFC',     rank:40, wc:0, players:1800,  goals:900,   color:'#8D1B3D', founded:1960, nickname:'Maroon',         stadium:'Lusail',          caps:500, trophies:['1× AFC Championship'] },
];

const CONF_DATA = [
  { code:'UEFA',     name:'Union of European Football Associations', region:'Europe',        members:55,  color:'#003399', emoji:'🏆', founded:1954, wcs:13 },
  { code:'CONMEBOL', name:'South American Football Confederation',   region:'South America', members:10,  color:'#FFD700', emoji:'🌎', founded:1916, wcs:10 },
  { code:'CAF',      name:'Confederation of African Football',       region:'Africa',        members:54,  color:'#009A44', emoji:'🌍', founded:1957, wcs:1  },
  { code:'AFC',      name:'Asian Football Confederation',            region:'Asia & Oceania',members:47,  color:'#D4002D', emoji:'🌏', founded:1954, wcs:1  },
  { code:'CONCACAF', name:'Confederation of North, Central America', region:'N&C America',   members:41,  color:'#0066CC', emoji:'🌐', founded:1961, wcs:1  },
  { code:'OFC',      name:'Oceania Football Confederation',          region:'Oceania',       members:14,  color:'#00AAFF', emoji:'🏝️', founded:1966, wcs:0  },
];

/* =============================================
   STATE
============================================= */
let activeConf = 'ALL';
let activeSort = 'rank';
let searchQ    = '';
let visibleCount = 16;
const PAGE_SIZE  = 16;

/* =============================================
   RENDER COUNTRIES
============================================= */
function getFiltered() {
  let data = [...COUNTRIES_DB];
  if (activeConf !== 'ALL') data = data.filter(c => c.conf === activeConf);
  if (searchQ) data = data.filter(c => c.name.toLowerCase().includes(searchQ));
  data.sort((a, b) => {
    if (activeSort === 'rank')    return a.rank - b.rank;
    if (activeSort === 'name')    return a.name.localeCompare(b.name);
    if (activeSort === 'wc')      return b.wc - a.wc;
    if (activeSort === 'players') return b.players - a.players;
    return 0;
  });
  return data;
}

function renderCountries() {
  const grid = document.getElementById('countriesGrid');
  const filtered = getFiltered();
  const visible  = filtered.slice(0, visibleCount);

  document.getElementById('resultsCount').textContent =
    `Showing ${Math.min(visibleCount, filtered.length)} of ${filtered.length} countries`;

  document.getElementById('loadMoreWrap').style.display =
    filtered.length > visibleCount ? 'flex' : 'none';

  grid.innerHTML = visible.map((c, i) => `
    <div class="country-card reveal" style="transition-delay:${(i % PAGE_SIZE) * 0.04}s"
         data-id="${c.id}" onclick="openCountry('${c.id}')">
      <div class="card-glow" style="--glow:${c.color}"></div>
      <div class="card-top">
        <div class="card-flag">${c.flag}</div>
        <div class="card-rank-badge">#${c.rank}</div>
      </div>
      <div class="card-name">${c.name}</div>
      <div class="card-nick">${c.nickname}</div>
      <div class="card-conf-tag conf-${c.conf}">${c.conf}</div>
      <div class="card-stats-row">
        <div class="card-stat">
          <span class="cs-val">${c.wc}</span>
          <span class="cs-lbl">World Cups</span>
        </div>
        <div class="card-stat">
          <span class="cs-val">${(c.players/1000).toFixed(1)}K</span>
          <span class="cs-lbl">Players</span>
        </div>
        <div class="card-stat">
          <span class="cs-val">${(c.goals/1000).toFixed(1)}K</span>
          <span class="cs-lbl">Goals</span>
        </div>
      </div>
      <div class="card-bar">
        <div class="card-bar-fill" style="--fill:${Math.round((c.players/13000)*100)}%;--color:${c.color}"></div>
      </div>
      <div class="card-cta">View Nation <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
    </div>
  `).join('');

  if (window.pvObserveNew) window.pvObserveNew();

  // animate bars on observe
  grid.querySelectorAll('.card-bar-fill').forEach(bar => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { bar.classList.add('animated'); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(bar);
  });
}

function openCountry(id) {
  // Placeholder for Part 3 detail pages
  const c = COUNTRIES_DB.find(x => x.id === id);
  if (!c) return;
  showToast(`🌍 ${c.name} — Full page coming in Part 3!`);
}

/* =============================================
   CONFEDERATION GRID
============================================= */
function renderConfs() {
  const grid = document.getElementById('confGrid');
  grid.innerHTML = CONF_DATA.map((cf, i) => `
    <div class="conf-card reveal" style="transition-delay:${i*0.08}s">
      <div class="conf-emoji">${cf.emoji}</div>
      <div class="conf-code" style="color:${cf.color}">${cf.code}</div>
      <div class="conf-name">${cf.name}</div>
      <div class="conf-region">${cf.region}</div>
      <div class="conf-row">
        <span>${cf.members} members</span>
        <span>${cf.wcs} WC titles</span>
      </div>
      <div class="conf-bar-track">
        <div class="conf-bar-fill" style="--w:${Math.round(cf.members/55*100)}%;background:${cf.color}"></div>
      </div>
    </div>
  `).join('');
  if (window.pvObserveNew) window.pvObserveNew();
}

/* =============================================
   TOAST
============================================= */
function showToast(msg) {
  let toast = document.getElementById('pvToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'pvToast';
    toast.className = 'pv-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* =============================================
   EVENT LISTENERS
============================================= */
document.addEventListener('DOMContentLoaded', () => {
  renderCountries();
  renderConfs();

  // Conf tabs
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeConf = btn.dataset.conf;
      visibleCount = PAGE_SIZE;
      renderCountries();
    });
  });

  // Search
  const searchEl = document.getElementById('countrySearch');
  if (searchEl) {
    searchEl.addEventListener('input', e => {
      searchQ = e.target.value.trim().toLowerCase();
      visibleCount = PAGE_SIZE;
      renderCountries();
    });
  }

  // Sort buttons
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSort = btn.dataset.sort;
      renderCountries();
    });
  });

  // Load more
  document.getElementById('loadMoreBtn')?.addEventListener('click', () => {
    visibleCount += PAGE_SIZE;
    renderCountries();
  });
});
// PLAYERVERSE VERSION 1.0
// PART 2 OF 3
// players.js

'use strict';

/* =============================================
   PLAYER DATABASE
============================================= */
const PLAYERS_DB = [
  // Legends
  { id:'messi',      name:'Lionel Messi',      country:'🇦🇷 Argentina', club:'Inter Miami',      pos:'FWD', era:'ACTIVE',  conf:'CONMEBOL', age:37, goals:894,  apps:1050, rating:97, ballon:8, number:10, color:'#74ACDF', desc:'The greatest of all time. Eight Ballon d\'Or awards, three World Cups entered, one lifted.' },
  { id:'ronaldo',    name:'Cristiano Ronaldo',  country:'🇵🇹 Portugal',  club:'Al Nassr',         pos:'FWD', era:'ACTIVE',  conf:'UEFA',     age:39, goals:914,  apps:1100, rating:96, ballon:5, number:7,  color:'#006600', desc:'The most decorated goal scorer in football history. Five Ballon d\'Or, 900+ goals.' },
  { id:'pele',       name:'Pelé',               country:'🇧🇷 Brazil',    club:'Retired',          pos:'FWD', era:'LEGEND',  conf:'CONMEBOL', age:82, goals:1283, apps:1363, rating:99, ballon:0, number:10, color:'#009C3B', desc:'The King. Three World Cups. An eternal symbol of the beautiful game.' },
  { id:'maradona',   name:'Diego Maradona',     country:'🇦🇷 Argentina', club:'Retired',          pos:'MID', era:'LEGEND',  conf:'CONMEBOL', age:60, goals:312,  apps:491,  rating:98, ballon:1, number:10, color:'#74ACDF', desc:'The Hand of God. The Goal of the Century. The soul of Argentine football.' },
  { id:'cruyff',     name:'Johan Cruyff',       country:'🇳🇱 Netherlands',club:'Retired',         pos:'FWD', era:'LEGEND',  conf:'UEFA',     age:68, goals:291,  apps:514,  rating:97, ballon:3, number:14, color:'#FF6600', desc:'Total Football. Three Ballon d\'Or. Revolutionary genius.' },
  { id:'zidane',     name:'Zinedine Zidane',    country:'🇫🇷 France',    club:'Retired',          pos:'MID', era:'LEGEND',  conf:'UEFA',     age:51, goals:125,  apps:618,  rating:97, ballon:3, number:10, color:'#002395', desc:'Elegance personified. World Cup, Euro, three Champions Leagues as player and coach.' },
  { id:'ronaldinho', name:'Ronaldinho',          country:'🇧🇷 Brazil',    club:'Retired',          pos:'MID', era:'LEGEND',  conf:'CONMEBOL', age:44, goals:280,  apps:636,  rating:96, ballon:2, number:10, color:'#009C3B', desc:'Magic in human form. He made football look like art.' },
  { id:'mbappe',     name:'Kylian Mbappé',      country:'🇫🇷 France',    club:'Real Madrid',      pos:'FWD', era:'ACTIVE',  conf:'UEFA',     age:25, goals:348,  apps:430,  rating:95, ballon:0, number:7,  color:'#002395', desc:'The future is now. World Cup winner at 19, fastest in modern football.' },
  { id:'haaland',    name:'Erling Haaland',     country:'🇳🇴 Norway',    club:'Man City',         pos:'FWD', era:'ACTIVE',  conf:'UEFA',     age:23, goals:271,  apps:300,  rating:94, ballon:0, number:9,  color:'#003087', desc:'A goal-scoring machine. Records fall wherever he plays.' },
  { id:'bellingham', name:'Jude Bellingham',    country:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 England',   club:'Real Madrid',      pos:'MID', era:'ACTIVE',  conf:'UEFA',     age:21, goals:98,   apps:310,  rating:93, ballon:0, number:5,  color:'#FFFFFF', desc:'A generational talent. Engine, vision and goals — complete midfielder.' },
  { id:'vinicius',   name:'Vinícius Jr.',       country:'🇧🇷 Brazil',    club:'Real Madrid',      pos:'FWD', era:'ACTIVE',  conf:'CONMEBOL', age:23, goals:145,  apps:310,  rating:93, ballon:1, number:7,  color:'#009C3B', desc:'Dazzling pace and flair. Ballon d\'Or 2024 winner.' },
  { id:'saka',       name:'Bukayo Saka',         country:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 England',   club:'Arsenal',          pos:'FWD', era:'RISING',  conf:'UEFA',     age:22, goals:112,  apps:280,  rating:91, ballon:0, number:7,  color:'#EF0107', desc:'Arsenal\'s heartbeat. England\'s brightest spark.' },
  { id:'pedri',      name:'Pedri',               country:'🇪🇸 Spain',     club:'Barcelona',        pos:'MID', era:'RISING',  conf:'UEFA',     age:22, goals:48,   apps:220,  rating:91, ballon:0, number:8,  color:'#AA151B', desc:'The heir to Iniesta\'s throne. Vision beyond his years.' },
  { id:'yamal',      name:'Lamine Yamal',        country:'🇪🇸 Spain',     club:'Barcelona',        pos:'FWD', era:'RISING',  conf:'UEFA',     age:17, goals:38,   apps:120,  rating:90, ballon:0, number:19, color:'#AA151B', desc:'The most exciting teenager on the planet. Euro 2024 star at 16.' },
  { id:'salah',      name:'Mohamed Salah',       country:'🇪🇬 Egypt',     club:'Liverpool',        pos:'FWD', era:'ACTIVE',  conf:'CAF',      age:32, goals:310,  apps:530,  rating:92, ballon:0, number:11, color:'#CE1126', desc:'The Egyptian King. Premier League\'s deadliest forward this decade.' },
  { id:'kane',       name:'Harry Kane',          country:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 England',   club:'Bayern Munich',    pos:'FWD', era:'ACTIVE',  conf:'UEFA',     age:30, goals:340,  apps:560,  rating:92, ballon:0, number:9,  color:'#FFFFFF', desc:'England\'s all-time top scorer. A centre-forward of the highest order.' },
  { id:'debruyne',   name:'Kevin De Bruyne',     country:'🇧🇪 Belgium',   club:'Man City',         pos:'MID', era:'ACTIVE',  conf:'UEFA',     age:32, goals:120,  apps:560,  rating:93, ballon:0, number:17, color:'#000000', desc:'The architect. Perhaps the finest creative midfielder of his generation.' },
  { id:'lewandowski',name:'Robert Lewandowski',  country:'🇵🇱 Poland',    club:'Barcelona',        pos:'FWD', era:'ACTIVE',  conf:'UEFA',     age:35, goals:638,  apps:850,  rating:91, ballon:0, number:9,  color:'#DC143C', desc:'600+ club goals. Bundesliga\'s greatest ever striker.' },
  { id:'osimhen',    name:'Victor Osimhen',      country:'🇳🇬 Nigeria',   club:'Galatasaray',      pos:'FWD', era:'ACTIVE',  conf:'CAF',      age:25, goals:152,  apps:260,  rating:90, ballon:0, number:9,  color:'#008751', desc:'African Footballer of the Year. Raw power meets electric finishing.' },
  { id:'diatta',     name:'Lamine Diatta',       country:'🇸🇳 Senegal',   club:'PSG',              pos:'DEF', era:'RISING',  conf:'CAF',      age:21, goals:12,   apps:180,  rating:88, ballon:0, number:4,  color:'#00853F', desc:'Senegal\'s defensive rock of the future.' },
  { id:'ter_stegen', name:'Marc-André ter Stegen',country:'🇩🇪 Germany',  club:'Barcelona',        pos:'GK',  era:'ACTIVE',  conf:'UEFA',     age:32, goals:0,    apps:520,  rating:91, ballon:0, number:1,  color:'#000000', desc:'World-class sweeper-keeper. Barcelona\'s last line of defence for a decade.' },
  { id:'alisson',    name:'Alisson Becker',      country:'🇧🇷 Brazil',    club:'Liverpool',        pos:'GK',  era:'ACTIVE',  conf:'CONMEBOL', age:31, goals:1,    apps:420,  rating:92, ballon:0, number:1,  color:'#009C3B', desc:'The world\'s best goalkeeper. Calm, commanding, and occasionally scores headers.' },
  { id:'modric',     name:'Luka Modrić',         country:'🇭🇷 Croatia',   club:'Real Madrid',      pos:'MID', era:'ACTIVE',  conf:'UEFA',     age:38, goals:87,   apps:780,  rating:91, ballon:1, number:10, color:'#FF0000', desc:'Ballon d\'Or 2018. Real Madrid\'s ageless orchestrator.' },
  { id:'ibrahimovic',name:'Zlatan Ibrahimović',  country:'🇸🇪 Sweden',    club:'Retired',          pos:'FWD', era:'LEGEND',  conf:'UEFA',     age:42, goals:575,  apps:1001, rating:93, ballon:0, number:11, color:'#006AA7', desc:'Larger than life. 500+ club goals across 13 clubs in 9 countries. There is only one Zlatan.' },
];

/* =============================================
   LEGENDS CAROUSEL DATA
============================================= */
const LEGENDS = ['messi','ronaldo','mbappe','pele','maradona','zidane','ronaldinho','cruyff']
  .map(id => PLAYERS_DB.find(p => p.id === id));

/* =============================================
   STATE
============================================= */
let posFilter  = 'ALL';
let confFilter = 'ALL';
let eraFilter  = 'ALL';
let sortKey    = 'rating';
let searchQ    = '';
let visibleCount = 12;
const PAGE_SIZE  = 12;
let carouselIdx  = 0;
let carouselTimer;

/* =============================================
   RENDER LEGENDS CAROUSEL
============================================= */
function renderLegends() {
  const track = document.getElementById('legendsCarousel');
  const dots  = document.getElementById('carouselDots');
  if (!track) return;

  track.innerHTML = LEGENDS.map((p, i) => `
    <div class="legend-card ${i === 0 ? 'active' : ''}" data-idx="${i}">
      <div class="legend-number">${p.number}</div>
      <div class="legend-avatar" style="background:linear-gradient(135deg,${p.color}33,${p.color}11)">
        <div class="legend-avatar-inner" style="--c:${p.color}">${p.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
      </div>
      <div class="legend-info">
        <div class="legend-name">${p.name}</div>
        <div class="legend-country">${p.country}</div>
        <div class="legend-club">${p.club}</div>
        <p class="legend-desc">${p.desc}</p>
        <div class="legend-stats">
          <div class="ls"><span class="ls-val">${p.goals.toLocaleString()}</span><span class="ls-lbl">Goals</span></div>
          <div class="ls"><span class="ls-val">${p.apps.toLocaleString()}</span><span class="ls-lbl">Apps</span></div>
          <div class="ls"><span class="ls-val">${p.rating}</span><span class="ls-lbl">Rating</span></div>
          ${p.ballon > 0 ? `<div class="ls"><span class="ls-val">${p.ballon}×</span><span class="ls-lbl">Ballon d'Or</span></div>` : ''}
        </div>
      </div>
      <div class="legend-bg-num">${p.number}</div>
    </div>
  `).join('');

  dots.innerHTML = LEGENDS.map((_, i) => `<button class="dot ${i===0?'active':''}" data-i="${i}"></button>`).join('');

  dots.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => goCarousel(+dot.dataset.i));
  });

  startCarousel();
}

function goCarousel(idx) {
  carouselIdx = (idx + LEGENDS.length) % LEGENDS.length;
  document.querySelectorAll('.legend-card').forEach((c, i) => c.classList.toggle('active', i === carouselIdx));
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === carouselIdx));
  resetCarousel();
}

function startCarousel() {
  carouselTimer = setInterval(() => goCarousel(carouselIdx + 1), 5000);
}

function resetCarousel() {
  clearInterval(carouselTimer);
  startCarousel();
}

/* =============================================
   RENDER PLAYERS GRID
============================================= */
function getFiltered() {
  let data = [...PLAYERS_DB];
  if (posFilter  !== 'ALL') data = data.filter(p => p.pos  === posFilter);
  if (confFilter !== 'ALL') data = data.filter(p => p.conf === confFilter);
  if (eraFilter  !== 'ALL') data = data.filter(p => p.era  === eraFilter);
  if (searchQ) data = data.filter(p =>
    p.name.toLowerCase().includes(searchQ) ||
    p.country.toLowerCase().includes(searchQ) ||
    p.club.toLowerCase().includes(searchQ)
  );
  data.sort((a, b) => {
    if (sortKey === 'rating') return b.rating - a.rating;
    if (sortKey === 'goals')  return b.goals  - a.goals;
    if (sortKey === 'name')   return a.name.localeCompare(b.name);
    if (sortKey === 'age')    return a.age    - b.age;
    return 0;
  });
  return data;
}

const POS_COLORS = { GK:'#FFD700', DEF:'#00D2FF', MID:'#00FF87', FWD:'#FF6B6B' };
const ERA_LABELS = { ACTIVE:'● Active', LEGEND:'★ Legend', RISING:'↑ Rising' };

function renderPlayers() {
  const grid    = document.getElementById('playersGrid');
  const filtered = getFiltered();
  const visible  = filtered.slice(0, visibleCount);

  document.getElementById('playerResultsCount').textContent =
    `Showing ${Math.min(visibleCount, filtered.length)} of ${filtered.length} players`;
  document.getElementById('playerLoadWrap').style.display =
    filtered.length > visibleCount ? 'flex' : 'none';

  grid.innerHTML = visible.map((p, i) => `
    <div class="player-card reveal" style="transition-delay:${(i%PAGE_SIZE)*0.04}s;--accent:${p.color}"
         onclick="openPlayer('${p.id}')">
      <div class="pc-top">
        <div class="pc-number">${p.number}</div>
        <div class="pc-era ${p.era.toLowerCase()}">${ERA_LABELS[p.era]}</div>
      </div>
      <div class="pc-avatar" style="background:linear-gradient(135deg,${p.color}40,${p.color}15)">
        <div class="pc-initials" style="color:${p.color}">${p.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
        <div class="pc-pos-badge" style="background:${POS_COLORS[p.pos]}">${p.pos}</div>
      </div>
      <div class="pc-name">${p.name}</div>
      <div class="pc-meta">${p.country} · ${p.club}</div>
      <div class="pc-stats">
        <div class="pc-stat"><span class="pcs-v">${p.goals}</span><span class="pcs-l">Goals</span></div>
        <div class="pc-stat"><span class="pcs-v">${p.apps}</span><span class="pcs-l">Apps</span></div>
        <div class="pc-stat"><span class="pcs-v">${p.rating}</span><span class="pcs-l">Rating</span></div>
      </div>
      <div class="pc-rating-bar">
        <div class="pc-rating-fill" style="--w:${p.rating}%;--c:${p.color}"></div>
      </div>
      <div class="pc-cta">View Profile <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
    </div>
  `).join('');

  if (window.pvObserveNew) window.pvObserveNew();

  grid.querySelectorAll('.pc-rating-fill').forEach(bar => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { bar.classList.add('animated'); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(bar);
  });
}

/* =============================================
   PLAYER MODAL
============================================= */
function openPlayer(id) {
  const p = PLAYERS_DB.find(x => x.id === id);
  if (!p) return;
  const modal   = document.getElementById('playerModal');
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <div class="modal-header" style="--c:${p.color}">
      <div class="modal-num">${p.number}</div>
      <div class="modal-avatar-big" style="background:linear-gradient(135deg,${p.color}50,${p.color}20)">
        <div class="modal-initials" style="color:${p.color}">${p.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
      </div>
      <div class="modal-name">${p.name}</div>
      <div class="modal-meta-row">
        <span class="modal-country">${p.country}</span>
        <span class="modal-dot">·</span>
        <span class="modal-club">${p.club}</span>
        <span class="modal-dot">·</span>
        <span class="modal-pos" style="color:${POS_COLORS[p.pos]}">${p.pos}</span>
        <span class="modal-dot">·</span>
        <span class="modal-age">Age ${p.age}</span>
      </div>
      <div class="modal-era ${p.era.toLowerCase()}">${ERA_LABELS[p.era]}</div>
    </div>
    <div class="modal-body">
      <p class="modal-desc">${p.desc}</p>
      <div class="modal-stats-grid">
        <div class="modal-stat"><span class="ms-v">${p.goals.toLocaleString()}</span><span class="ms-l">Goals</span></div>
        <div class="modal-stat"><span class="ms-v">${p.apps.toLocaleString()}</span><span class="ms-l">Appearances</span></div>
        <div class="modal-stat"><span class="ms-v">${p.rating}</span><span class="ms-l">Rating</span></div>
        <div class="modal-stat"><span class="ms-v">${p.age}</span><span class="ms-l">Age</span></div>
        ${p.ballon > 0 ? `<div class="modal-stat"><span class="ms-v">${p.ballon}×</span><span class="ms-l">Ballon d'Or</span></div>` : ''}
      </div>
      <div class="modal-rating-section">
        <div class="modal-rating-label">Overall Rating</div>
        <div class="modal-rating-track">
          <div class="modal-rating-bar" style="--w:${p.rating}%;--c:${p.color}"></div>
        </div>
        <div class="modal-rating-val" style="color:${p.color}">${p.rating}</div>
      </div>
      <p class="modal-part3-hint">⚡ Full stats, career timeline & match history coming in Part 3</p>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    modal.querySelector('.modal-rating-bar')?.classList.add('animated');
  }, 200);
}

function closePlayer() {
  document.getElementById('playerModal').classList.remove('open');
  document.body.style.overflow = '';
}

/* =============================================
   PITCH VISUAL ANIMATION
============================================= */
function initPitchNodes() {
  document.querySelectorAll('.position-node').forEach(node => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { node.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(node);
  });
}

/* =============================================
   EVENTS
============================================= */
document.addEventListener('DOMContentLoaded', () => {
  renderLegends();
  renderPlayers();
  initPitchNodes();

  // Filters
  document.getElementById('posFilter')?.addEventListener('change', e => {
    posFilter = e.target.value; visibleCount = PAGE_SIZE; renderPlayers();
  });
  document.getElementById('confFilter')?.addEventListener('change', e => {
    confFilter = e.target.value; visibleCount = PAGE_SIZE; renderPlayers();
  });
  document.getElementById('eraFilter')?.addEventListener('change', e => {
    eraFilter = e.target.value; visibleCount = PAGE_SIZE; renderPlayers();
  });
  document.getElementById('playerSearch')?.addEventListener('input', e => {
    searchQ = e.target.value.trim().toLowerCase(); visibleCount = PAGE_SIZE; renderPlayers();
  });

  // Sort
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sortKey = btn.dataset.sort;
      renderPlayers();
    });
  });

  // Load more
  document.getElementById('playerLoadBtn')?.addEventListener('click', () => {
    visibleCount += PAGE_SIZE; renderPlayers();
  });

  // Modal close
  document.getElementById('modalClose')?.addEventListener('click', closePlayer);
  document.getElementById('modalBackdrop')?.addEventListener('click', closePlayer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePlayer(); });
});
// PLAYERVERSE VERSION 1.0
// PART 2 OF 3
// shared.js — runs on every page

'use strict';

/* =============================================
   MOUSE LIGHT
============================================= */
(function initMouseLight() {
  const light = document.getElementById('mouseLight');
  if (!light) return;
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let lx = mx, ly = my;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function loop() {
    lx += (mx - lx) * 0.08;
    ly += (my - ly) * 0.08;
    light.style.left = lx + 'px';
    light.style.top  = ly + 'px';
    requestAnimationFrame(loop);
  }
  loop();
})();

/* =============================================
   PARTICLES
============================================= */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 80;
  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = -(Math.random() * 0.5 + 0.15);
      this.r = Math.random() * 1.2 + 0.2;
      this.life = 0; this.maxLife = Math.random() * 280 + 180;
      const p = [[0,210,255],[0,255,135],[255,215,0],[255,255,255]];
      this.color = p[Math.floor(Math.random() * p.length)];
    }
    update() { this.x += this.vx; this.y += this.vy; this.life++; if (this.life > this.maxLife || this.y < -10) this.reset(); }
    draw() {
      const pr = this.life / this.maxLife;
      const a = pr < 0.1 ? pr * 10 * 0.5 : pr > 0.8 ? (1 - pr) * 5 * 0.5 : 0.5;
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.join(',')},${a})`;
      ctx.shadowColor = `rgba(${this.color.join(',')},0.4)`; ctx.shadowBlur = 5;
      ctx.fill();
    }
  }

  const particles = Array.from({ length: COUNT }, () => new Particle());
  function loop() {
    ctx.clearRect(0, 0, W, H); ctx.shadowBlur = 0;
    // connections
    for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 100) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(0,210,255,${(1-d/100)*0.1})`; ctx.lineWidth = 0.4; ctx.stroke(); }
    }
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* =============================================
   NAV SCROLL
============================================= */
(function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  const onScroll = () => { nav.classList.toggle('scrolled', window.scrollY > 60); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }
})();

/* =============================================
   SCROLL REVEAL
============================================= */
(function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  function observe() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  }
  observe();
  // re-observe after dynamic content
  window.pvObserveNew = observe;
})();
// PLAYERVERSE VERSION 1.0
// PART 1 OF 3

'use strict';

/* =============================================
   LOADER
============================================= */
(function initLoader() {
  const loader  = document.getElementById('loader');
  const bar     = document.getElementById('loaderBar');
  const text    = document.getElementById('loaderText');

  const messages = [
    'INITIALISING UNIVERSE...',
    'LOADING PLAYER DATABASE...',
    'MAPPING CONTINENTS...',
    'CALIBRATING ORBIT...',
    'ENTERING PLAYERVERSE...',
  ];

  let progress = 0;
  let msgIndex = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress > 100) progress = 100;

    bar.style.width = progress + '%';

    const newIndex = Math.min(
      Math.floor((progress / 100) * messages.length),
      messages.length - 1
    );
    if (newIndex !== msgIndex) {
      msgIndex = newIndex;
      text.textContent = messages[msgIndex];
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('fade-out');
        document.body.classList.add('loaded');
        initHeroReveal();
      }, 400);
    }
  }, 90);
})();

/* =============================================
   HERO REVEAL + TYPEWRITER
============================================= */
function initHeroReveal() {
  const content = document.querySelector('.hero-content');
  content.classList.add('visible');

  const subtitleEl = document.getElementById('heroSubtitle');
  const phrases = [
    'The Ultimate Football Universe',
    'Every Player. Every Nation.',
    'From Kickoff to Legend.',
    'The Beautiful Game. Everywhere.',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let cursor    = document.createElement('span');
  cursor.classList.add('cursor');

  function type() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      charIdx++;
      subtitleEl.textContent = current.slice(0, charIdx);
      subtitleEl.appendChild(cursor);

      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 50 + Math.random() * 30);
    } else {
      charIdx--;
      subtitleEl.textContent = current.slice(0, charIdx);
      subtitleEl.appendChild(cursor);

      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 300);
        return;
      }
      setTimeout(type, 28);
    }
  }

  setTimeout(type, 600);
}

/* =============================================
   MOUSE LIGHT + CUSTOM CURSOR
============================================= */
(function initMouseLight() {
  const light = document.getElementById('mouseLight');
  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let lx = mx, ly = my;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateLight() {
    lx += (mx - lx) * 0.08;
    ly += (my - ly) * 0.08;
    light.style.left = lx + 'px';
    light.style.top  = ly + 'px';
    requestAnimationFrame(animateLight);
  }
  animateLight();
})();

/* =============================================
   PARTICLE CANVAS
============================================= */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 120;
  const particles = [];

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.6 + 0.2);
      this.r  = Math.random() * 1.5 + 0.3;
      this.life    = 0;
      this.maxLife = Math.random() * 300 + 200;
      const palette = [
        [0, 210, 255],
        [0, 255, 135],
        [255, 215, 0],
        [255, 255, 255],
      ];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    }

    update() {
      this.x    += this.vx;
      this.y    += this.vy;
      this.life += 1;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }

    draw() {
      const progress = this.life / this.maxLife;
      const alpha    = progress < 0.1
        ? progress * 10 * 0.6
        : progress > 0.8
          ? (1 - progress) * 5 * 0.6
          : 0.6;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${alpha})`;
      ctx.shadowColor = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},0.5)`;
      ctx.shadowBlur  = 6;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  // Connecting lines
  function drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,210,255,${alpha})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    ctx.shadowBlur = 0;
    drawConnections();
    for (const p of particles) { p.update(); p.draw(); }
    requestAnimationFrame(loop);
  }
  loop();
})();

/* =============================================
   NAV SCROLL EFFECT
============================================= */
(function initNav() {
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else                      nav.classList.remove('scrolled');
  }, { passive: true });
})();

/* =============================================
   PARALLAX
============================================= */
(function initParallax() {
  const hero  = document.getElementById('hero');
  const globe = document.getElementById('globeContainer');

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;

    // Hero parallax
    if (hero) {
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${sy * 0.28}px)`;
      }
    }

    // Globe subtle float
    if (globe) {
      const section    = document.getElementById('globe-section');
      const rect       = section.getBoundingClientRect();
      const progress   = -rect.top / (rect.height + window.innerHeight);
      globe.style.transform = `translateY(${progress * -40}px)`;
    }
  }, { passive: true });
})();

/* =============================================
   ORBIT DOTS
============================================= */
(function initOrbitDots() {
  const container = document.getElementById('orbitDots');
  if (!container) return;

  const COUNT = 12;
  for (let i = 0; i < COUNT; i++) {
    const dot = document.createElement('div');
    dot.classList.add('orbit-dot');

    const angle  = (i / COUNT) * 360;
    const radius = 50; // % from center
    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

    dot.style.cssText = `
      left: ${x}%;
      top:  ${y}%;
      width:  ${i % 3 === 0 ? 5 : 3}px;
      height: ${i % 3 === 0 ? 5 : 3}px;
      opacity: ${0.3 + (i % 4) * 0.15};
      margin: -2px 0 0 -2px;
    `;
    container.appendChild(dot);
  }
})();

/* =============================================
   ANIMATED COUNTERS
============================================= */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let started    = false;

  function formatNum(val, max) {
    if (max >= 1000000) return (val / 1000000).toFixed(1) + 'M';
    if (max >= 100000)  return (val / 1000).toFixed(0) + 'K';
    return Math.round(val).toLocaleString();
  }

  function startCounters() {
    if (started) return;
    started = true;

    counters.forEach((el) => {
      const target   = parseInt(el.dataset.val, 10);
      const duration = 2200;
      const start    = performance.now();

      function step(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = formatNum(eased * target, target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = formatNum(target, target);
      }
      requestAnimationFrame(step);
    });

    // Animate bars
    document.querySelectorAll('.stat-bar-fill').forEach((bar) => {
      setTimeout(() => bar.classList.add('animated'), 200);
    });
  }

  // Intersection observer
  const section = document.getElementById('stats-section');
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) startCounters();
    },
    { threshold: 0.25 }
  );
  observer.observe(section);
})();

/* =============================================
   SCROLL REVEAL
============================================= */
(function initReveal() {
  // Add reveal class to key elements
  const targets = [
    '#globe-section .globe-badge',
    '#globe-section .globe-heading',
    '#globe-section .globe-body',
    '#globe-section .globe-stat-row',
    '#stats-section .stats-header',
    '.stat-card',
    '#footer-cta .footer-eyebrow',
    '#footer-cta .footer-title',
    '#footer-cta .footer-body',
    '#footer-cta .btn-primary',
  ];

  targets.forEach((selector, idx) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      if (i > 0) el.classList.add(`reveal-delay-${Math.min(i, 4)}`);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

/* =============================================
   DYNAMIC BACKGROUND GRADIENT (follows scroll)
============================================= */
(function initBgGradient() {
  const body = document.body;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const hue1 = Math.round(200 + progress * 60);  // cyan → green
      const hue2 = Math.round(160 - progress * 30);
      body.style.background = `
        radial-gradient(
          ellipse 100% 60% at 50% ${20 + progress * 60}%,
          hsl(${hue1}, 80%, 4%) 0%,
          hsl(${hue2}, 50%, 2%) 50%,
          #050810 100%
        )`;
      ticking = false;
    });
  }, { passive: true });
})();

/* =============================================
   EARTH MOUSE PARALLAX (subtle tilt)
============================================= */
(function initEarthTilt() {
  const earth = document.getElementById('earth');
  if (!earth) return;

  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    earth.style.animationPlayState = 'running';
    // Layered on top of existing CSS keyframe spin
    earth.style.transform = `rotateY(${dx * 12}deg) rotateX(${15 - dy * 8}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    earth.style.transform = '';
  });
})();

/* =============================================
   HERO TITLE GLITCH ON HOVER
============================================= */
(function initTitleGlitch() {
  const lines = document.querySelectorAll('.title-line');
  lines.forEach((line) => {
    line.addEventListener('mouseenter', () => {
      line.style.filter = 'drop-shadow(0 0 30px rgba(0,210,255,0.8))';
      line.style.transform = `skewX(${(Math.random() - 0.5) * 2}deg)`;
      setTimeout(() => {
        line.style.filter    = '';
        line.style.transform = '';
      }, 180);
    });
  });
})();
