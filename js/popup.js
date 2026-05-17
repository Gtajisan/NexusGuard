// Nexus Guard v4.0 — Clean rewrite by Ahmed Numan

const TARGET_HOSTS = [
  "aincradmods.com",
  "tarviral.com",
  "rodaemotor.com",
];

const API_BASE    = "https://aincrad-server.vercel.app/api";
const API_VERIFY  = `${API_BASE}/verify-license`;
const API_VERSION = `${API_BASE}/check-version`;

const TIMER_SECONDS = 30;
const TIMER_CIRCUMFERENCE = 339.3; // 2π × 54

let isAuthenticated = false;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateDeviceId() {
  return `device-${Math.random().toString(36).substr(2, 16)}${Date.now().toString(36)}`;
}

function $(id) { return document.getElementById(id); }

// ─── DOM Ready ───────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", async () => {

  // ── Version Check ──
  try {
    const appVersion = chrome.runtime.getManifest().version;
    const res  = await fetch(API_VERSION);
    const data = await res.json();
    if (data.success) {
      const minVer = data.config.minVersion;
      if (parseFloat(appVersion) < parseFloat(minVer)) {
        document.querySelectorAll(".app-bar, .content-area").forEach(el => el.style.display = "none");
        const su = $("screenUpdate");
        su.style.display = "flex";
        su.classList.remove("hidden");
        $("updateBtn").addEventListener("click", () => {
          chrome.tabs.create({ url: data.config.updateUrl });
        });
        return;
      }
    }
  } catch {
    console.log("Version check skipped (offline).");
  }

  // ── Drawer & Navigation ──
  const drawer        = $("drawer");
  const drawerOverlay = $("drawerOverlay");
  const menuOpenBtn   = $("menuOpenBtn");
  const menuCloseBtn  = $("menuCloseBtn");
  const navBtns       = document.querySelectorAll(".nav-btn");
  const tabContents   = document.querySelectorAll(".tab-content");

  function toggleDrawer() {
    drawer.classList.toggle("active");
    drawerOverlay.classList.toggle("active");
  }

  menuOpenBtn.addEventListener("click", toggleDrawer);
  menuCloseBtn.addEventListener("click", toggleDrawer);
  drawerOverlay.addEventListener("click", toggleDrawer);

  navBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      navBtns.forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      const targetId = e.currentTarget.dataset.tab;
      tabContents.forEach(tab => {
        if (tab.id === targetId) tab.classList.add("active");
        else tab.classList.remove("active");
      });
      if (drawer.classList.contains("active")) toggleDrawer();
    });
  });

  // ── Screens ──
  const screenWrongSite = $("screenWrongSite");
  const screenReady     = $("screenReady");
  const screenTimer     = $("screenTimer");
  const screenInject    = $("screenInject");
  const allScreens      = [screenWrongSite, screenReady, screenTimer, screenInject];

  function showScreen(screen) {
    allScreens.forEach(s => s.classList.remove("active"));
    screen.classList.add("active");
  }

  // ── Auto-authenticate and check tab immediately ──
  isAuthenticated = true;
  checkCurrentTab();

  // ── Check Current Tab ──
  function checkCurrentTab() {
    if (!isAuthenticated) return;
    if (typeof chrome === "undefined" || !chrome.tabs) {
      showScreen(screenWrongSite);
      return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || tabs.length === 0) { showScreen(screenWrongSite); return; }
      const tab = tabs[0];
      const onTarget = tab.url && TARGET_HOSTS.some(host => tab.url.includes(host));
      showScreen(onTarget ? screenReady : screenWrongSite);
    });
  }

  // Re-check on tab changes
  if (typeof chrome !== "undefined" && chrome.tabs) {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (isAuthenticated && changeInfo.status === "complete" && tab.active) {
        checkCurrentTab();
      }
    });

    chrome.tabs.onActivated.addListener(() => {
      if (isAuthenticated) checkCurrentTab();
    });
  }

  // ── Navigate to Target ──
  $("navBtn").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://aincradmods.com/getkey" });
  });

  // ── Start Timer ──
  $("startTimerBtn").addEventListener("click", () => {
    showScreen(screenTimer);

    let timeLeft  = TIMER_SECONDS;
    const display = $("timerDisplay");
    const ring    = $("timerRingFill");

    display.textContent = timeLeft;
    if (ring) ring.style.strokeDashoffset = 0;

    const countdown = setInterval(() => {
      timeLeft--;
      display.textContent = timeLeft;

      // Update SVG ring
      if (ring) {
        const elapsed = TIMER_SECONDS - timeLeft;
        ring.style.strokeDashoffset = (elapsed / TIMER_SECONDS) * TIMER_CIRCUMFERENCE;
      }

      if (timeLeft <= 0) {
        clearInterval(countdown);
        showScreen(screenInject);
      }
    }, 1000);
  });

  // ── Deploy Override (Inject) ──
  $("injectBtn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: injectPayload,
      });
    });
  });

});

// ─── Inject Payload ──────────────────────────────────────────────────────────

function injectPayload() {
  const bypassUrls = [
    "https://aincradmods.com/getkey?token=7d55282cb5774b99c3c410384303abad",
    "https://aincradmods.com/getkey?token=daba3034830 14c3c99b4775bc28255d7&__cf_chl_tk=FoyBr6FD4WKNx.ta.pcXR59nqmp.FchxMLbF239UuxY-1778671624-1.0.1.1-PBZ9mHDzGitTL.dwRmCKYMXVr4RjHpLuyEUILG7osYM",
  ];

  const baseUrl = bypassUrls[Math.floor(Math.random() * bypassUrls.length)];
  const finalUrl = `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}_cb=${Date.now()}${Math.floor(Math.random() * 616)}`;

  document.body.innerHTML = `
    <div style="
      display:flex;flex-direction:column;justify-content:center;align-items:center;
      height:100vh;background:#020c1b;color:#06b6d4;font-family:'Inter',monospace;
      text-align:center;gap:16px;
    ">
      <svg style="width:56px;height:56px;animation:pulse 2s infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
      <div style="font-size:18px;font-weight:700;letter-spacing:1px;">OVERRIDE EXECUTED</div>
      <div style="font-size:12px;color:#64748b;">Establishing secure bridge...</div>
      <style>
        @keyframes pulse { 0%,100%{opacity:1;filter:drop-shadow(0 0 8px #06b6d4);}50%{opacity:.5;filter:drop-shadow(0 0 2px #06b6d4);} }
      </style>
    </div>`;

  setTimeout(() => { window.location.replace(finalUrl); }, 800);
}
