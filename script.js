const topButton = document.getElementById('topButton');
const themeToggle = document.getElementById('themeToggle');
const themeStorageKey = 'immunis-theme';

const setTheme = (mode) => {
    const isDark = mode === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    if (themeToggle) {
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    }
    localStorage.setItem(themeStorageKey, mode);
};

const loadTheme = () => {
    const saved = localStorage.getItem(themeStorageKey);
    if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-loaded');
    const iframes = document.querySelectorAll('iframe');

    iframes.forEach((iframe) => {
        iframe.loading = 'lazy';
        iframe.title = iframe.title || 'Documento incorporado';
    });

    loadTheme();

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-mode');
            setTheme(isDark ? 'light' : 'dark');
        });
    }

    if (topButton) {
        const toggleButton = () => {
            const visible = window.scrollY > 260;
            topButton.classList.toggle('visible', visible);
        };

        toggleButton();
        window.addEventListener('scroll', toggleButton);

        topButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});