const THEME_KEY = "game_index_theme"; // es la clave del localStorage

function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const isDark = saved === 'dark';
    setTheme(isDark);

    const btn = document.getElementById('theme-toggle');
    btn.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const isNowDark = !document.body.classList.contains('dark-theme');
    setTheme(isNowDark);
}

function updateButtonText(isDark) {
    const btn = document.getElementById('theme-toggle');

    btn.textContent = isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
}

function setTheme(isDark) {
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    updateButtonText(isDark);
}
