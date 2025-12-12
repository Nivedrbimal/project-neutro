
// ------ Favicon Selection ------
function setFavicon() {
  if(def.darkMode) def.favicon.href = 'faviconNRB.ico';
  else def.favicon.href = 'faviconNRB.png';
}
setFavicon();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFavicon);

// ---------- Navigation ----------
const navList = [
  {key: "panel-home", url:"/index.html"},
  {key: "panel-math", url:"/mathpanel.html"},
  {key: "panel-physics", url:"/physicspanel.html"},
  {key: "panel-chemistry", url:"/chemistrypanel.html"},
  {key: "panel-games", url:"/gamespanel.html"},
  {key: "panel-utilities", url:"/utilitiespanel.html"},
  {key: "panel-info", url:"/infopanel.html"},
];
function switchTopPanel(e) {
  const targetPanelId = e.currentTarget.getAttribute("data-target");
  const nav = navList.find(n => n.key === targetPanelId);
  if(nav) {
    window.location.href = nav.url;
    return;
  }
  document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.menu-btn[data-target="${targetPanelId}"]`);
  if(btn) btn.classList.add('active');
  const app = document.getElementById('app');
  if(app) app.focus();
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.menu-btn').forEach(btn => btn.addEventListener('click', switchTopPanel));
  const sidebars = document.querySelectorAll(".sidebar");
  const toggles = document.querySelectorAll(".toggleSidebarResponsive");
  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => sidebars.forEach(sb => sb.classList.toggle("open")));
  });
  document.addEventListener("click", (e) => {
    sidebars.forEach(sb => {
      const clickedToggle = [...toggles].some(t => t === e.target);
      if(sb.classList.contains("open") && !sb.contains(e.target) && !clickedToggle) {
        sb.classList.remove("open");
      }
    });
  });
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("toggleSidebar");
  if(sidebar && toggle) {
    toggle.addEventListener("click", () => sidebar.classList.toggle("collapsed"));
  }
  const intro = document.getElementById('intro');
  const header = document.getElementById('mainHeader');
  const main = document.getElementById('app');
  if(!intro) {
    header?.classList.remove('hidden'); header?.classList.add('visible');
    sidebar?.classList.remove('hidden'); sidebar?.classList.add('visible');
    main?.classList.remove('hidden'); main?.classList.add('visible');
    document.body.style.overflow = 'auto';
  }
});

// ---------- INTRO SCREEN ----------
window.addEventListener('load', () => {
  const intro = document.getElementById('intro');
  if(!intro) return;

  const header = document.getElementById('mainHeader');
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('app');

  setTimeout(() => intro.classList.add('fade-out'), 4000);
  setTimeout(() => {
    intro.remove();
    header?.classList.remove('hidden'); header?.classList.add('visible');
    sidebar?.classList.remove('hidden'); sidebar?.classList.add('visible');
    main?.classList.remove('hidden'); main?.classList.add('visible');
    document.body.style.overflow = 'auto';
  }, 5000);
});
