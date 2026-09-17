const categoryBar = document.getElementById('categoryBar');
const itemPanel = document.getElementById('itemPanel');
const selectionStatus = document.getElementById('selectionStatus');
const achievementToast = document.getElementById('achievementToast');
const achievementToastTitle = document.getElementById('achievementToastTitle');
const achievementToastDetails = document.getElementById('achievementToastDetails');
const dateEl = document.getElementById('date');
const startupSound = document.getElementById('startup');
const navSound = document.getElementById('nav');
const browserWindow = document.getElementById('browserWindow');
const browserHeader = document.getElementById('browserHeader');
const closeBrowser = document.getElementById('closeBrowser');
const googleQuery = document.getElementById('googleQuery');
const browserSearchForm = document.getElementById('browserSearchForm');
const browserResultFrame = document.getElementById('browserResultFrame');
const systemWindow = document.getElementById('systemWindow');
const systemHeader = document.getElementById('systemHeader');
const closeSystem = document.getElementById('closeSystem');
const systemDetails = document.getElementById('systemDetails');
const storageWindow = document.getElementById('storageWindow');
const storageHeader = document.getElementById('storageHeader');
const closeStorage = document.getElementById('closeStorage');
const storageDetails = document.getElementById('storageDetails');
const settingsWindow = document.getElementById('settingsWindow');
const settingsHeader = document.getElementById('settingsHeader');
const closeSettings = document.getElementById('closeSettings');
const settingsTabList = document.getElementById('settingsTabList');
const settingsContent = document.getElementById('settingsContent');
const gameLibraryWindow = document.getElementById('gameLibraryWindow');
const gameLibraryHeader = document.getElementById('gameLibraryHeader');
const closeGameLibrary = document.getElementById('closeGameLibrary');
const shopWindow = document.getElementById('shopWindow');
const shopHeader = document.getElementById('shopHeader');
const closeShop = document.getElementById('closeShop');
const nzpGameButton = document.getElementById('nzpGameButton');
const gameWindow = document.getElementById('gameWindow');
const gameHeader = document.getElementById('gameHeader');
const closeGame = document.getElementById('closeGame');
const fullscreenGame = document.getElementById('fullscreenGame');
const gameFrame = document.getElementById('gameFrame');
const gameTitle = document.getElementById('gameTitle');
const gameFallback = document.getElementById('gameFallback');
const n64LibraryWindow = document.getElementById('n64LibraryWindow');
const n64LibraryHeader = document.getElementById('n64LibraryHeader');
const closeN64Library = document.getElementById('closeN64Library');
const n64GameWindow = document.getElementById('n64GameWindow');
const n64GameHeader = document.getElementById('n64GameHeader');
const closeN64Game = document.getElementById('closeN64Game');
const n64GameTitle = document.getElementById('n64GameTitle');
const n64GameList = document.getElementById('n64GameList');
const n64RomInput = document.getElementById('n64RomInput');
const n64Emulator = document.getElementById('n64Emulator');
const n64GameMessage = document.getElementById('n64GameMessage');
const snesWindow = document.getElementById('snesWindow');
const snesHeader = document.getElementById('snesHeader');
const closeSnes = document.getElementById('closeSnes');
const nesWindow = document.getElementById('nesWindow');
const nesHeader = document.getElementById('nesHeader');
const closeNes = document.getElementById('closeNes');
const windowsPanel = document.getElementById('windowsPanel');
const windowsHeader = document.getElementById('windowsHeader');
const closeWindowsPanel = document.getElementById('closeWindowsPanel');
const windowsList = document.getElementById('windowsList');

const menuData = [
  {
    label: 'Home',
    icon: '⌂',
    items: [
      { label: 'Welcome', subtitle: 'System overview' },
      { label: 'Windows', subtitle: 'List open apps' },
      { label: 'Search', subtitle: 'Find apps and files' },
      { label: 'Recent', subtitle: 'Open recent items' }
    ]
  },
  {
    label: 'Apps',
    icon: '▣',
    items: [
      { label: 'Browser', subtitle: 'Open web apps' },
      { label: 'Files', subtitle: 'Manage local content' },
      { label: 'Games', subtitle: 'Play installed games' },
      { label: 'Shop', subtitle: 'Browse the PlayStation shop' },
      { label: 'Terminal', subtitle: 'Run commands' }
    ]
  },
  {
    label: 'Media',
    icon: '♫',
    items: [
      { label: 'Music', subtitle: 'Playlists and albums' },
      { label: 'Photos', subtitle: 'View image library' },
      { label: 'Videos', subtitle: 'Movie collection' }
    ]
  },
  {
    label: 'Settings',
    icon: '⚙',
    items: [
      { label: 'Display', subtitle: 'Brightness and layout' },
      { label: 'Network', subtitle: 'Wi-Fi and bluetooth' },
      { label: 'System', subtitle: 'Updates and options' },
      { label: 'Storage', subtitle: 'Drive and disk usage' },
      { label: 'Theme', subtitle: 'Appearance and colors' }
    ]
  },
  {
    label: 'Power',
    icon: '◼',
    items: [
      { label: 'Sleep', subtitle: 'Pause system' },
      { label: 'Restart', subtitle: 'Reboot machine' },
      { label: 'Shutdown', subtitle: 'Power off' }
    ]
  },
  {
    label: 'Achievements',
    icon: '◇',
    items: [
      { label: 'Welcome!', subtitle: 'Bronze achievement' },
      { label: 'Explorer', subtitle: 'Bronze achievement' },
      { label: 'Launch an app', subtitle: 'Silver achievement' }
    ]
  }
];

const appTabs = ['N64', 'SNES', 'NES', 'NZP', 'Cookie Clicker'];
const settingsTabs = ['Display', 'Network', 'System', 'Storage', 'Theme'];
const achievementStorageKey = 'omarchy-xmb-achievements';
const explorerStorageKey = 'omarchy-xmb-explorer-categories';
const achievementDefinitions = [
  { name: 'Welcome!', tier: 'bronze' },
  { name: 'Explorer', tier: 'bronze' },
  { name: 'Launch an app', tier: 'silver' }
];

const memoryStorage = {
  [achievementStorageKey]: {},
  [explorerStorageKey]: []
};

function readStorageValue(key, fallback) {
  try {
    const rawValue = localStorage.getItem(key);
    if (rawValue === null) {
      return memoryStorage[key] ?? fallback;
    }

    const parsedValue = JSON.parse(rawValue);
    return parsedValue ?? fallback;
  } catch {
    return memoryStorage[key] ?? fallback;
  }
}

function writeStorageValue(key, value) {
  memoryStorage[key] = value;

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

let unlockedAchievements = {};
let visitedCategories = [];

const n64Games = [
  '007 - GoldenEye',
  '1080 Snowboarding',
  'Banjo-Kazooie',
  'Banjo-Tooie',
  'Blast Corps',
  'Bomberman 64',
  'Bomberman Hero',
  "Conker's Bad Fur Day",
  'Diddy Kong Racing',
  'Donkey Kong 64',
  'Doom 64',
  'Dr. Mario 64',
  'Duke Nukem: Zero Hour',
  'Excitebike 64',
  'F-Zero X',
  'Gauntlet Legends',
  'Gex 64',
  'Harvest Moon 64',
  'Jet Force Gemini',
  'Kirby 64: The Crystal Shards',
  'Mario Golf',
  'Mario Kart 64',
  'Mario Party',
  'Mario Party 2',
  'Mario Party 3',
  'Mario Tennis',
  'Mega Man 64',
  "The Legend of Zelda: Majora's Mask",
  'The Legend of Zelda: Ocarina of Time',
  'Mischief Makers',
  'Paper Mario',
  'Perfect Dark',
  'Pilotwings 64',
  'Pokemon Snap',
  'Pokemon Stadium',
  'Quake 64',
  'Rayman 2: The Great Escape',
  'Resident Evil 2',
  'Ridge Racer 64',
  'Star Fox 64',
  'Star Wars: Rogue Squadron',
  'Super Mario 64',
  'Super Smash Bros.',
  'Tetrisphere',
  "Tony Hawk's Pro Skater",
  'Toy Story 2',
  'Wave Race 64',
  "WWF No Mercy",
  "Yoshi's Story"
];

const state = {
  categoryIndex: 0,
  itemIndex: 0,
  appsOpen: false
};

const windowRegistry = {
  browser: { id: 'browser', label: 'Browser', element: browserWindow, open: false, minimized: false },
  system: { id: 'system', label: 'System Overview', element: systemWindow, open: false, minimized: false },
  storage: { id: 'storage', label: 'Storage', element: storageWindow, open: false, minimized: false },
  settings: { id: 'settings', label: 'Settings', element: settingsWindow, open: false, minimized: false },
  gameLibrary: { id: 'gameLibrary', label: 'Other Games', element: gameLibraryWindow, open: false, minimized: false },
  shop: { id: 'shop', label: 'PlayStation Shop', element: shopWindow, open: false, minimized: false },
  game: { id: 'game', label: 'Game', element: gameWindow, open: false, minimized: false },
  n64Library: { id: 'n64Library', label: 'N64 Games', element: n64LibraryWindow, open: false, minimized: false },
  n64Game: { id: 'n64Game', label: 'N64 Emulator', element: n64GameWindow, open: false, minimized: false },
  snes: { id: 'snes', label: 'SNES', element: snesWindow, open: false, minimized: false },
  nes: { id: 'nes', label: 'NES', element: nesWindow, open: false, minimized: false }
};

function setWindowState(windowId, { open = true, minimized = false, title = null } = {}) {
  const entry = windowRegistry[windowId];
  if (!entry || !entry.element) return;

  entry.open = open;
  entry.minimized = minimized;
  entry.label = title || entry.label;
  entry.element.hidden = !open || minimized;

  if (open && !minimized) {
    const nextZ = 20 + Object.values(windowRegistry).filter((item) => item.open && !item.minimized).length;
    entry.element.style.zIndex = String(nextZ);
  }

  renderWindowsList();
}

function closeWindow(windowId) {
  setWindowState(windowId, { open: false, minimized: false });
}

function hideWindow(windowId) {
  setWindowState(windowId, { open: true, minimized: true });
}

function restoreWindow(windowId) {
  const entry = windowRegistry[windowId];
  if (!entry || !entry.element) return;

  entry.open = true;
  entry.minimized = false;
  entry.element.hidden = false;
  const nextZ = 20 + Object.values(windowRegistry).filter((item) => item.open && !item.minimized).length;
  entry.element.style.zIndex = String(nextZ);
  renderWindowsList();
}

function openWindowsPanel() {
  if (!windowsPanel) return;
  windowsPanel.hidden = false;
  windowsPanel.style.left = '50%';
  windowsPanel.style.top = '50%';
  windowsPanel.style.transform = 'translate(-50%, -50%)';
  windowsPanel.style.zIndex = '15';
  renderWindowsList();
}

function closeWindowsPanelWindow() {
  if (windowsPanel) windowsPanel.hidden = true;
}

function renderWindowsList() {
  if (!windowsList) return;

  const openWindows = Object.values(windowRegistry).filter((entry) => entry.open && entry.element);

  if (!openWindows.length) {
    windowsList.innerHTML = '<div class="window-empty">No windows open</div>';
    return;
  }

  windowsList.innerHTML = openWindows
    .map((entry) => `
      <div class="window-item ${entry.minimized ? 'window-item-minimized' : ''}">
        <button class="window-name" data-window-id="${entry.id}" type="button">${entry.label}</button>
        <button class="window-action" data-window-action="toggle" data-window-id="${entry.id}" type="button">${entry.minimized ? 'Restore' : 'Minimize'}</button>
      </div>
    `)
    .join('');

  windowsList.querySelectorAll('[data-window-id]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const target = event.currentTarget;
      const action = target.dataset.windowAction;
      const windowId = target.dataset.windowId;

      if (action === 'toggle') {
        if (windowRegistry[windowId]?.minimized) {
          restoreWindow(windowId);
        } else {
          hideWindow(windowId);
        }
        return;
      }

      const entry = windowRegistry[windowId];
      if (!entry) return;
      if (entry.minimized) {
        restoreWindow(windowId);
      } else {
        entry.element.style.zIndex = '999';
      }
    });
  });
}

function updateClock() {
  if (!dateEl) return;

  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const suffix = now.getHours() >= 12 ? 'PM' : 'AM';
  dateEl.textContent = `${hours}:${minutes} ${suffix}`;
}

function updateStatus() {
  if (!selectionStatus) return;

  if (state.appsOpen && state.categoryIndex === 1) {
    selectionStatus.textContent = `Apps / ${appTabs[state.itemIndex]}`;
    return;
  }

  const category = menuData[state.categoryIndex];
  const item = category.items[state.itemIndex];
  selectionStatus.textContent = `${category.label} / ${item.label}`;
}

let achievementToastTimer;

function loadSavedAchievements() {
  const saved = readStorageValue(achievementStorageKey, {});
  unlockedAchievements = saved && typeof saved === 'object' ? saved : {};
}

function saveAchievements() {
  writeStorageValue(achievementStorageKey, unlockedAchievements);
}

function loadVisitedCategories() {
  const saved = readStorageValue(explorerStorageKey, []);
  visitedCategories = Array.isArray(saved)
    ? saved.filter((index) => Number.isInteger(index) && index >= 0 && index < menuData.length)
    : [];
}

function saveVisitedCategories() {
  writeStorageValue(explorerStorageKey, visitedCategories);
}

function recordCategoryVisit(categoryIndex) {
  if (!visitedCategories.includes(categoryIndex)) {
    visitedCategories.push(categoryIndex);
    saveVisitedCategories();
  }

  if (visitedCategories.length === menuData.length) {
    unlockAchievement('Explorer', 'bronze');
  }
}

function getAchievement(name) {
  return achievementDefinitions.find((achievement) => achievement.name === name);
}

function unlockAchievement(name, tier = 'bronze', announce = true) {
  const definition = getAchievement(name);
  if (!definition) return false;

  const normalizedTier = ['bronze', 'silver', 'gold'].includes(String(tier).toLowerCase())
    ? String(tier).toLowerCase()
    : definition.tier;
  const alreadyUnlocked = Boolean(unlockedAchievements[name]);

  unlockedAchievements[name] = {
    tier: normalizedTier,
    unlockedAt: unlockedAchievements[name]?.unlockedAt || new Date().toISOString()
  };
  saveAchievements();
  render();

  if (announce && !alreadyUnlocked) {
    showAchievement(name, normalizedTier);
  }

  return !alreadyUnlocked;
}

function initializeAchievements() {
  loadSavedAchievements();
  loadVisitedCategories();
  recordCategoryVisit(0);
  const firstVisit = !unlockedAchievements['Welcome!'];
  unlockAchievement('Welcome!', 'bronze', firstVisit);
}

function showAchievement(name, tier = 'bronze') {
  if (!achievementToast || !achievementToastTitle || !achievementToastDetails) return;

  const normalizedTier = ['bronze', 'silver', 'gold'].includes(String(tier).toLowerCase())
    ? String(tier).toLowerCase()
    : 'bronze';

  achievementToast.className = `achievement-toast tier-${normalizedTier}`;
  achievementToast.hidden = false;
  achievementToastTitle.textContent = 'Achievement unlocked';
  achievementToastDetails.textContent = `${name} - ${normalizedTier} trophy`;

  window.clearTimeout(achievementToastTimer);
  achievementToastTimer = window.setTimeout(() => {
    achievementToast.hidden = true;
  }, 4200);
}

function clampItemIndex(max) {
  state.itemIndex = Math.min(max, Math.max(0, state.itemIndex));
}

function selectCategory(index) {
  state.categoryIndex = ((index % menuData.length) + menuData.length) % menuData.length;
  state.itemIndex = 0;
  state.appsOpen = false;
  recordCategoryVisit(state.categoryIndex);
  render();
}

function selectItem(index) {
  const max = menuData[state.categoryIndex].items.length - 1;
  state.itemIndex = Math.min(max, Math.max(0, index));
  render();
}

function moveSelection(delta) {
  const currentCategory = menuData[state.categoryIndex];
  const itemCount = currentCategory.items.length;
  state.itemIndex = (state.itemIndex + delta + itemCount) % itemCount;
  render();
}

function openBrowser() {
  if (!browserWindow) return;

  unlockAchievement('Launch an app', 'silver');
  browserWindow.hidden = false;
  browserWindow.style.left = '50%';
  browserWindow.style.top = '50%';
  browserWindow.style.transform = 'translate(-50%, -50%)';
  browserWindow.style.zIndex = '25';
  setWindowState('browser', { open: true, minimized: false, title: 'Browser' });
  googleQuery?.focus();
}

function searchInsideBrowser(event) {
  if (!browserSearchForm || !browserResultFrame) return;
  if (event) {
    event.preventDefault();
  }

  const rawValue = (googleQuery?.value || '').trim();
  if (!rawValue) {
    browserResultFrame.src = 'https://www.google.com';
    return;
  }

  let urlToLoad = rawValue;
  if (!/^https?:\/\//i.test(urlToLoad)) {
    if (/^(?:www\.)?[a-z0-9.-]+\.[a-z]{2,}(?:\/.*)?$/i.test(urlToLoad)) {
      urlToLoad = `https://${urlToLoad}`;
    } else {
      urlToLoad = `https://www.google.com/search?q=${encodeURIComponent(rawValue)}`;
    }
  }

  browserResultFrame.src = urlToLoad;
}

function closeBrowserWindow() {
  closeWindow('browser');
}

function makeWindowDraggable(windowElement, headerElement, closeButton) {
  if (!windowElement || !headerElement) return;

  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let dragging = false;

  headerElement.addEventListener('pointerdown', (event) => {
    if (event.target === closeButton || event.target.closest?.('button')) return;

    const bounds = windowElement.getBoundingClientRect();
    windowElement.style.left = `${bounds.left}px`;
    windowElement.style.top = `${bounds.top}px`;
    windowElement.style.transform = 'none';
    dragOffsetX = event.clientX - bounds.left;
    dragOffsetY = event.clientY - bounds.top;
    dragging = true;
    headerElement.setPointerCapture(event.pointerId);
  });

  headerElement.addEventListener('pointermove', (event) => {
    if (!dragging) return;

    windowElement.style.left = `${event.clientX - dragOffsetX}px`;
    windowElement.style.top = `${event.clientY - dragOffsetY}px`;
  });

  headerElement.addEventListener('pointerup', (event) => {
    dragging = false;
    headerElement.releasePointerCapture(event.pointerId);
  });

  headerElement.addEventListener('pointercancel', (event) => {
    dragging = false;
    headerElement.releasePointerCapture(event.pointerId);
  });
}

function getGpuInfo() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const debugInfo = context?.getExtension('WEBGL_debug_renderer_info');
    return debugInfo ? context.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unavailable';
  } catch {
    return 'Unavailable';
  }
}

function openSystemOverview() {
  if (!systemWindow || !systemDetails) return;

  const memory = navigator.deviceMemory ? `${navigator.deviceMemory} GB available to browser` : 'Unavailable';
  const platform = navigator.userAgentData?.platform || navigator.platform || 'Unknown';
  const specs = [
    ['RAM', memory],
    ['GPU', getGpuInfo()],
    ['CPU cores', navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} logical cores` : 'Unavailable'],
    ['Platform', platform],
    ['Display', `${window.screen.width} x ${window.screen.height}`]
  ];

  systemDetails.innerHTML = specs
    .map(([label, value]) => `<div class="spec-row"><span>${label}</span><strong>${value}</strong></div>`)
    .join('');
  systemWindow.hidden = false;
  systemWindow.style.left = 'calc(50% + 20rem)';
  systemWindow.style.top = '50%';
  systemWindow.style.transform = 'translate(-50%, -50%)';
  systemWindow.style.zIndex = '26';
  setWindowState('system', { open: true, minimized: false, title: 'System Overview' });
}

function closeSystemOverview() {
  closeWindow('system');
}

function openStorageOverview() {
  if (!storageWindow || !storageDetails) return;

  const total = navigator.deviceMemory ? `${Math.max(64, navigator.deviceMemory * 32)} GB` : 'Unknown';
  const usageRatio = 68;
  const used = `${usageRatio}% used`;
  const free = `${100 - usageRatio}% free`;
  const details = [
    ['Drive', 'Local Disk (C:)'],
    ['Total storage', total],
    ['Used', used],
    ['Free', free],
    ['File system', 'NTFS / ext4 / overlay'],
    ['Status', 'Healthy']
  ];

  storageDetails.innerHTML = details
    .map(([label, value]) => `<div class="spec-row"><span>${label}</span><strong>${value}</strong></div>`)
    .join('');
  storageWindow.hidden = false;
  storageWindow.style.left = 'calc(50% + 18rem)';
  storageWindow.style.top = '50%';
  storageWindow.style.transform = 'translate(-50%, -50%)';
  storageWindow.style.zIndex = '26';
  setWindowState('storage', { open: true, minimized: false, title: 'Storage' });
}

function closeStorageOverview() {
  closeWindow('storage');
}

function renderSettingsPanel(tabName = 'Storage') {
  if (!settingsTabList || !settingsContent) return;

  settingsTabList.innerHTML = settingsTabs
    .map((tab) => `
      <button class="settings-tab ${tab === tabName ? 'active' : ''}" data-settings-tab="${tab}" type="button">${tab}</button>
    `)
    .join('');

  settingsTabList.querySelectorAll('[data-settings-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      renderSettingsPanel(button.dataset.settingsTab);
    });
  });

  const contentMap = {
    Display: [
      ['Brightness', '80%'],
      ['Resolution', `${window.screen.width} x ${window.screen.height}`],
      ['Theme', 'OMARCHY Dark'],
      ['Mode', 'UI Enhanced']
    ],
    Network: [
      ['Connection', 'Wired / Wi-Fi'],
      ['Signal', 'Strong'],
      ['IP Address', '192.168.1.12'],
      ['Bluetooth', 'Connected']
    ],
    System: [
      ['Platform', navigator.userAgentData?.platform || navigator.platform || 'Unknown'],
      ['CPU cores', navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} logical cores` : 'Unavailable'],
      ['GPU', getGpuInfo()],
      ['RAM', navigator.deviceMemory ? `${navigator.deviceMemory} GB available to browser` : 'Unavailable']
    ],
    Storage: [
      ['Drive', 'Local Disk (C:)'],
      ['Total storage', navigator.deviceMemory ? `${Math.max(64, navigator.deviceMemory * 32)} GB` : 'Unknown'],
      ['Used', '68% used'],
      ['Free', '32% free'],
      ['Status', 'Healthy']
    ],
    Theme: [
      ['Theme', 'OMARCHY Dark'],
      ['Accent color', 'Ice Blue'],
      ['Background', 'Aurora Waves'],
      ['Animations', 'Enabled'],
      ['Status', 'Active']
    ]
  };

  const details = contentMap[tabName] || contentMap.Storage;
  settingsContent.innerHTML = details
    .map(([label, value]) => `<div class="spec-row"><span>${label}</span><strong>${value}</strong></div>`)
    .join('');
}

function openSettingsPanel() {
  if (!settingsWindow) return;

  settingsWindow.hidden = false;
  settingsWindow.style.left = '50%';
  settingsWindow.style.top = '50%';
  settingsWindow.style.transform = 'translate(-50%, -50%)';
  settingsWindow.style.zIndex = '27';
  renderSettingsPanel('Storage');
  setWindowState('settings', { open: true, minimized: false, title: 'Settings' });
}

function closeSettingsPanel() {
  closeWindow('settings');
}

function openGameLibrary() {
  if (!gameLibraryWindow) return;

  unlockAchievement('Launch an app', 'silver');
  gameLibraryWindow.hidden = false;
  gameLibraryWindow.style.left = '50%';
  gameLibraryWindow.style.top = '50%';
  gameLibraryWindow.style.transform = 'translate(-50%, -50%)';
  gameLibraryWindow.style.zIndex = '27';
  setWindowState('gameLibrary', { open: true, minimized: false, title: 'Other Games' });
}

function closeGameLibraryWindow() {
  closeWindow('gameLibrary');
}

function openShop() {
  if (!shopWindow) return;

  unlockAchievement('Launch an app', 'silver');
  shopWindow.hidden = false;
  shopWindow.style.left = '0';
  shopWindow.style.top = '0';
  shopWindow.style.right = '0';
  shopWindow.style.bottom = '0';
  shopWindow.style.width = '100vw';
  shopWindow.style.height = '100vh';
  shopWindow.style.maxWidth = '100vw';
  shopWindow.style.maxHeight = '100vh';
  shopWindow.style.transform = 'none';
  shopWindow.style.zIndex = '27';
  setWindowState('shop', { open: true, minimized: false, title: 'PlayStation Shop' });
}

function bindShopInteractions() {
  document.querySelectorAll('.shop-menu-item').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.shop-menu-item').forEach((item) => item.classList.toggle('active', item === button));
      const label = button.textContent.trim();
      if (selectionStatus) {
        selectionStatus.textContent = `Store / ${label}`;
      }
    });
  });

  document.querySelectorAll('.shop-mode').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.shop-mode').forEach((item) => item.classList.toggle('active', item === button));
      const label = button.textContent.replace(/[\u2000-\uFFFF]/g, '').replace(/\s+/g, ' ').trim();
      if (selectionStatus) {
        selectionStatus.textContent = `Store / ${label || 'Game'}`;
      }
    });
  });

  document.querySelectorAll('.shop-utility').forEach((button) => {
    button.addEventListener('click', () => {
      const label = button.textContent.trim();
      if (selectionStatus) {
        selectionStatus.textContent = `Store / ${label}`;
      }
    });
  });

  document.querySelectorAll('.shop-control').forEach((button) => {
    button.addEventListener('click', () => {
      const label = button.textContent.replace(/\s+/g, ' ').trim();
      if (label === 'Exit') {
        closeShopWindow();
        return;
      }

      if (label === 'Enter') {
        document.querySelectorAll('.shop-menu-item.active').forEach((item) => {
          item.click();
        });
      }
    });
  });

  const shopSelect = document.querySelector('.shop-foot-select');
  shopSelect?.addEventListener('click', () => {
    const activeItem = document.querySelector('.shop-menu-item.active');
    if (activeItem) {
      activeItem.click();
    }
  });
}

function closeShopWindow() {
  closeWindow('shop');
}

function openGame(gameName = 'NZP', gameUrl = 'https://nzp.gay/') {
  if (!gameWindow) return;

  unlockAchievement('Launch an app', 'silver');
  if (gameTitle) gameTitle.textContent = gameName;
  if (gameFrame) {
    gameFrame.title = gameName;
    gameFrame.src = gameUrl;
  }
  if (gameFallback) gameFallback.href = gameUrl;
  gameWindow.hidden = false;
  gameWindow.style.left = '50%';
  gameWindow.style.top = '50%';
  gameWindow.style.transform = 'translate(-50%, -50%)';
  gameWindow.style.zIndex = '28';
  setWindowState('game', { open: true, minimized: false, title: gameName });
  closeGameLibraryWindow();
}

function openGameFallback(event) {
  if (!gameFallback || !gameFallback.href) return;

  event.preventDefault();
  window.open(gameFallback.href, '_blank', 'noopener,noreferrer');
}

function closeGameWindow() {
  closeWindow('game');
  if (gameFrame) gameFrame.src = 'about:blank';
}

function toggleGameFullscreen() {
  const fullscreenTarget = gameWindow || gameFrame;
  if (!fullscreenTarget) return;

  if (document.fullscreenElement) {
    document.exitFullscreen?.();
    return;
  }

  fullscreenTarget.requestFullscreen?.().catch(() => {});
}

function openN64Library() {
  if (!n64LibraryWindow) return;

  unlockAchievement('Launch an app', 'silver');
  renderN64Games();
  n64LibraryWindow.hidden = false;
  n64LibraryWindow.style.left = '50%';
  n64LibraryWindow.style.top = '50%';
  n64LibraryWindow.style.transform = 'translate(-50%, -50%)';
  n64LibraryWindow.style.zIndex = '29';
  setWindowState('n64Library', { open: true, minimized: false, title: 'N64 Games' });
}

function closeN64LibraryWindow() {
  closeWindow('n64Library');
}

function openN64Game(gameName) {
  if (!n64GameWindow) return;

  if (n64GameTitle) n64GameTitle.textContent = gameName;
  n64GameWindow.hidden = false;
  n64GameWindow.style.left = '50%';
  n64GameWindow.style.top = '50%';
  n64GameWindow.style.transform = 'translate(-50%, -50%)';
  n64GameWindow.style.zIndex = '30';
  setWindowState('n64Game', { open: true, minimized: false, title: gameName });
  closeN64LibraryWindow();
}

function loadN64Rom(file) {
  if (!file || !n64Emulator) return;

  const romUrl = URL.createObjectURL(file);
  window.EJS_player = '#n64Emulator';
  window.EJS_core = 'mupen64plus_next';
  window.EJS_gameUrl = romUrl;
  window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
  n64Emulator.innerHTML = '';
  if (n64GameMessage) n64GameMessage.hidden = true;

  const emulatorScript = document.createElement('script');
  emulatorScript.src = 'https://cdn.emulatorjs.org/stable/data/loader.js';
  emulatorScript.async = true;
  document.body.appendChild(emulatorScript);
}

function closeN64GameWindow() {
  closeWindow('n64Game');
}

function openConsoleWindow(name) {
  const consoleName = String(name).toUpperCase();
  const targetWindow = consoleName === 'SNES' ? snesWindow : nesWindow;
  if (!targetWindow) return;

  unlockAchievement('Launch an app', 'silver');
  targetWindow.hidden = false;
  targetWindow.style.left = '50%';
  targetWindow.style.top = '50%';
  targetWindow.style.transform = 'translate(-50%, -50%)';
  targetWindow.style.zIndex = consoleName === 'SNES' ? '31' : '32';
  setWindowState(consoleName.toLowerCase(), { open: true, minimized: false, title: consoleName });
}

function closeConsoleWindow(name) {
  const consoleName = String(name).toUpperCase();
  closeWindow(consoleName.toLowerCase());
}

function renderN64Games() {
  if (!n64GameList) return;

  n64GameList.innerHTML = n64Games
    .map((gameName) => `
      <button class="game-choice" data-n64-game="${gameName}" type="button">
        <span class="game-choice-title">${gameName}</span>
        <span class="game-choice-subtitle">N64 game</span>
      </button>
    `)
    .join('');
}

function activateSelection() {
  const category = menuData[state.categoryIndex];
  const currentItem = category.items[state.itemIndex];

  if (category.label === 'Achievements' && currentItem.label === 'Welcome!') {
    const newlyUnlocked = unlockAchievement('Welcome!', 'bronze');
    if (selectionStatus) selectionStatus.textContent = newlyUnlocked
      ? 'Achievement unlocked / Welcome!'
      : 'Trophy collected / Welcome!';
    return;
  }

  if (category.label === 'Achievements' && currentItem.label === 'Explorer') {
    if (unlockedAchievements.Explorer) {
      showAchievement('Explorer', unlockedAchievements.Explorer.tier);
      if (selectionStatus) selectionStatus.textContent = 'Trophy collected / Explorer';
    } else if (selectionStatus) {
      selectionStatus.textContent = `Explorer progress / ${visitedCategories.length} of ${menuData.length} categories`;
    }
    return;
  }

  if (category.label === 'Achievements' && currentItem.label === 'Launch an app') {
    if (unlockedAchievements['Launch an app']) {
      showAchievement('Launch an app', unlockedAchievements['Launch an app'].tier);
      if (selectionStatus) selectionStatus.textContent = 'Trophy collected / Launch an app';
    } else if (selectionStatus) {
      selectionStatus.textContent = 'Launch an app to unlock this trophy';
    }
    return;
  }

  if (category.label === 'Apps' && currentItem.label === 'Browser') {
    openBrowser();
    return;
  }

  if (category.label === 'Apps' && currentItem.label === 'Games') {
    openGameLibrary();
    return;
  }

  if (category.label === 'Apps' && currentItem.label === 'Shop') {
    openShop();
    return;
  }

  if (category.label === 'Home' && currentItem.label === 'Welcome') {
    openSystemOverview();
    return;
  }

  if (category.label === 'Home' && currentItem.label === 'Windows') {
    openWindowsPanel();
    return;
  }

  if (category.label === 'Settings' && currentItem.label === 'System') {
    openSettingsPanel();
    return;
  }

  if (category.label === 'Settings' && currentItem.label === 'Storage') {
    openStorageOverview();
    return;
  }

  if (state.categoryIndex === 1 && currentItem.label === 'Files' && !state.appsOpen) {
    state.appsOpen = true;
    state.itemIndex = 0;
    render();
    return;
  }

  if (state.categoryIndex === 1 && state.appsOpen) {
    const tab = appTabs[state.itemIndex];
    if (tab === 'N64') {
      openN64Library();
      return;
    }

    if (tab === 'SNES') {
      openConsoleWindow('SNES');
      return;
    }

    if (tab === 'NES') {
      openConsoleWindow('NES');
      return;
    }

    if (tab === 'NZP') {
      openGame('NZP', 'https://nzp.gay/');
      return;
    }

    if (tab === 'Cookie Clicker') {
      openGame('Cookie Clicker', 'https://cookieclickerplay.github.io/#google_vignette');
      return;
    }

    if (selectionStatus) {
      selectionStatus.textContent = `Launching ${tab}`;
    }
    return;
  }

  if (selectionStatus) {
    selectionStatus.textContent = `Opening ${category.label} / ${currentItem.label}`;
  }
}

function renderCategories() {
  categoryBar.innerHTML = menuData
    .map((category, index) => {
      const isActive = index === state.categoryIndex;
      return `
        <button class="category ${isActive ? 'active' : ''}" data-index="${index}" aria-label="${category.label}" type="button">
          <span class="category-icon">${category.icon}</span>
          <span class="category-label">${category.label}</span>
        </button>
      `;
    })
    .join('');

  categoryBar.querySelectorAll('.category').forEach((button) => {
    button.addEventListener('click', () => {
      selectCategory(Number(button.dataset.index));
    });
  });
}

function renderItems() {
  const category = menuData[state.categoryIndex];

  if (state.appsOpen && state.categoryIndex === 1) {
    itemPanel.innerHTML = appTabs
      .map((tab, index) => {
        const isActive = index === state.itemIndex;
        return `
          <button class="menu-item app-tab ${isActive ? 'active' : ''}" data-index="${index}" aria-label="${tab}" type="button">
            <span class="menu-icon">▣</span>
            <span class="menu-copy">
              <span class="menu-label">${tab}</span>
              <span class="menu-subtitle">Emulator</span>
            </span>
          </button>
        `;
      })
      .join('');

    itemPanel.querySelectorAll('.app-tab').forEach((button) => {
      button.addEventListener('click', () => {
        const tab = appTabs[Number(button.dataset.index)];
        state.itemIndex = Number(button.dataset.index);

        if (tab === 'N64') {
          updateStatus();
          openN64Library();
          return;
        }

        if (tab === 'SNES') {
          updateStatus();
          openConsoleWindow('SNES');
          return;
        }

        if (tab === 'NES') {
          updateStatus();
          openConsoleWindow('NES');
          return;
        }

        if (tab === 'NZP') {
          updateStatus();
          openGame('NZP', 'https://nzp.gay/');
          return;
        }

        if (tab === 'Cookie Clicker') {
          updateStatus();
          openGame('Cookie Clicker', 'https://cookieclickerplay.github.io/#google_vignette');
          return;
        }

        render();
        activateSelection();
      });
    });

    return;
  }

  const items = category.items;
  clampItemIndex(items.length - 1);

  itemPanel.innerHTML = items
    .map((item, index) => {
      const isActive = index === state.itemIndex;
      const isGamesIcon = item.label === 'Games';
      const isShopIcon = item.label === 'Shop';
      const savedAchievement = category.label === 'Achievements' ? unlockedAchievements[item.label] : null;
      const isLockedAchievement = category.label === 'Achievements' && !savedAchievement;
      const itemSubtitle = savedAchievement
        ? `${savedAchievement.tier} trophy - unlocked`
        : isLockedAchievement ? 'Locked' : item.subtitle;
      return `
        <button class="menu-item ${isActive ? 'active' : ''} ${isLockedAchievement ? 'achievement-locked' : ''}" data-index="${index}" aria-label="${item.label}" type="button">
          <span class="menu-icon ${isGamesIcon ? 'ps3-disc-icon' : ''} ${isShopIcon ? 'ps3-shop-icon' : ''}">${isGamesIcon || isShopIcon ? '' : category.icon}</span>
          <span class="menu-copy">
            <span class="menu-label">${item.label}</span>
            <span class="menu-subtitle">${itemSubtitle}</span>
          </span>
        </button>
      `;
    })
    .join('');

  itemPanel.querySelectorAll('.menu-item').forEach((button) => {
    button.addEventListener('click', () => {
      selectItem(Number(button.dataset.index));
      activateSelection();
    });
  });
}

function render() {
  renderCategories();
  renderItems();
  updateStatus();
}

function shiftCategory(delta) {
  selectCategory(state.categoryIndex + delta);
}

function shiftItem(delta) {
  moveSelection(delta);
}

function handleKeydown(event) {
  if (n64GameWindow && !n64GameWindow.hidden && event.key === 'Escape') {
    closeN64GameWindow();
    return;
  }

  if (n64LibraryWindow && !n64LibraryWindow.hidden && event.key === 'Escape') {
    closeN64LibraryWindow();
    return;
  }

  if (gameWindow && !gameWindow.hidden && event.key === 'Escape') {
    closeGameWindow();
    return;
  }

  if (gameLibraryWindow && !gameLibraryWindow.hidden && event.key === 'Escape') {
    closeGameLibraryWindow();
    return;
  }

  if (browserWindow && !browserWindow.hidden) {
    if (event.key === 'Escape') {
      closeBrowserWindow();
      return;
    }

    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLButtonElement) {
      return;
    }
  }

  if (systemWindow && !systemWindow.hidden) {
    if (event.key === 'Escape') {
      closeSystemOverview();
      return;
    }

    if (event.target instanceof HTMLButtonElement) {
      return;
    }
  }

  if (storageWindow && !storageWindow.hidden) {
    if (event.key === 'Escape') {
      closeStorageOverview();
      return;
    }

    if (event.target instanceof HTMLButtonElement) {
      return;
    }
  }

  if (settingsWindow && !settingsWindow.hidden) {
    if (event.key === 'Escape') {
      closeSettingsPanel();
      return;
    }

    if (event.target instanceof HTMLButtonElement) {
      return;
    }
  }

  const key = event.key;
  const normalizedKey = key.toLowerCase();

  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', ' ', 'Backspace', 'Escape'].includes(key) || ['w', 'a', 's', 'd'].includes(normalizedKey)) {
    event.preventDefault();
  }

  if (navSound && typeof navSound.play === 'function') {
    navSound.currentTime = 0;
    navSound.play().catch(() => {});
  }

  if (state.appsOpen && state.categoryIndex === 1) {
    if (key === 'Backspace' || key === 'Escape') {
      state.appsOpen = false;
      state.itemIndex = 0;
      render();
      return;
    }

    if (key === 'ArrowRight' || key === 'ArrowDown' || normalizedKey === 'd' || normalizedKey === 's') {
      state.itemIndex = (state.itemIndex + 1) % appTabs.length;
      render();
      return;
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp' || normalizedKey === 'a' || normalizedKey === 'w') {
      state.itemIndex = (state.itemIndex - 1 + appTabs.length) % appTabs.length;
      render();
      return;
    }

    if (key === 'Enter' || key === ' ') {
      activateSelection();
      return;
    }
  }

  if (key === 'ArrowRight' || normalizedKey === 'd') {
    shiftCategory(1);
  } else if (key === 'ArrowLeft' || normalizedKey === 'a') {
    shiftCategory(-1);
  } else if (key === 'ArrowDown' || normalizedKey === 's') {
    moveSelection(1);
  } else if (key === 'ArrowUp' || normalizedKey === 'w') {
    moveSelection(-1);
  } else if (key === 'Enter' || key === ' ') {
    activateSelection();
  }
}

window.addEventListener('load', () => {
  if (startupSound && typeof startupSound.play === 'function') {
    startupSound.play().catch(() => {});
  }
  initializeAchievements();
  updateClock();
  render();
  renderWindowsList();
  bindShopInteractions();
  makeWindowDraggable(browserWindow, browserHeader, closeBrowser);
  makeWindowDraggable(systemWindow, systemHeader, closeSystem);
  makeWindowDraggable(storageWindow, storageHeader, closeStorage);
  makeWindowDraggable(settingsWindow, settingsHeader, closeSettings);
  makeWindowDraggable(gameLibraryWindow, gameLibraryHeader, closeGameLibrary);
  makeWindowDraggable(shopWindow, shopHeader, closeShop);
  makeWindowDraggable(gameWindow, gameHeader, closeGame);
  makeWindowDraggable(n64LibraryWindow, n64LibraryHeader, closeN64Library);
  makeWindowDraggable(n64GameWindow, n64GameHeader, closeN64Game);
  makeWindowDraggable(snesWindow, snesHeader, closeSnes);
  makeWindowDraggable(nesWindow, nesHeader, closeNes);
  makeWindowDraggable(windowsPanel, windowsHeader, closeWindowsPanel);
});

document.addEventListener('keydown', handleKeydown);
browserSearchForm?.addEventListener('submit', searchInsideBrowser);
closeBrowser?.addEventListener('click', closeBrowserWindow);
closeSystem?.addEventListener('click', closeSystemOverview);
closeStorage?.addEventListener('click', closeStorageOverview);
closeSettings?.addEventListener('click', closeSettingsPanel);
closeGameLibrary?.addEventListener('click', closeGameLibraryWindow);
closeShop?.addEventListener('click', closeShopWindow);
gameLibraryWindow?.addEventListener('click', (event) => {
  const gameButton = event.target.closest('[data-game-url]');
  if (gameButton) {
    openGame(gameButton.dataset.gameTitle, gameButton.dataset.gameUrl);
  }
});
closeGame?.addEventListener('click', closeGameWindow);
gameFallback?.addEventListener('click', openGameFallback);
fullscreenGame?.addEventListener('click', toggleGameFullscreen);
closeN64Library?.addEventListener('click', closeN64LibraryWindow);
closeN64Game?.addEventListener('click', closeN64GameWindow);
closeSnes?.addEventListener('click', () => closeConsoleWindow('SNES'));
closeNes?.addEventListener('click', () => closeConsoleWindow('NES'));
closeWindowsPanel?.addEventListener('click', closeWindowsPanelWindow);
windowsList?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-window-id]');
  if (!button) return;

  const windowId = button.dataset.windowId;
  const action = button.dataset.windowAction;

  if (action === 'toggle') {
    if (windowRegistry[windowId]?.minimized) restoreWindow(windowId);
    else hideWindow(windowId);
    return;
  }

  const entry = windowRegistry[windowId];
  if (!entry) return;
  if (entry.minimized) restoreWindow(windowId);
  else entry.element?.focus?.();
});
n64RomInput?.addEventListener('change', (event) => {
  loadN64Rom(event.target.files[0]);
});
n64GameList?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-n64-game]');
  if (button) openN64Game(button.dataset.n64Game);
});
setInterval(updateClock, 1000);
