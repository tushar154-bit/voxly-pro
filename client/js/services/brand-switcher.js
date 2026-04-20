/**
 * Voxly Pro — Global Brand Switcher
 * Hijacks #globalSearch to double as a brand-autocomplete. Typing or focus
 * opens a dropdown listing brands from /api/brands. Selecting a brand updates
 * APIData.currentBrand (which broadcasts 'brandChanged' so every page
 * re-fetches from the API).
 */

window.BrandSwitcher = (() => {
    let brands = [];
    let input, dropdown, loaded = false;

    const init = async () => {
        input = document.getElementById('globalSearch');
        if (!input) return;

        // Build dropdown once
        dropdown = document.createElement('div');
        dropdown.className = 'brand-switch-dropdown';
        dropdown.style.display = 'none';
        input.parentElement.appendChild(dropdown);

        input.setAttribute('autocomplete', 'off');
        input.setAttribute('placeholder', 'Search or switch brand (Apple, Tesla, …)');

        // Seed value with current brand
        if (typeof APIData !== 'undefined' && APIData.brands?.[APIData.currentBrand]) {
            input.value = APIData.brands[APIData.currentBrand].name;
        }

        await fetchBrands();
        attachHandlers();
    };

    const fetchBrands = async () => {
        if (typeof window.API === 'undefined') return;
        try {
            const { brands: list } = await window.API.brands.list();
            brands = list || [];
            loaded = true;
        } catch (err) {
            console.warn('BrandSwitcher: could not load brand list —', err.message);
        }
    };

    const attachHandlers = () => {
        input.addEventListener('focus', () => render(''));
        input.addEventListener('input', () => render(input.value));
        input.addEventListener('keydown', onKeyDown);
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== input) hide();
        });
    };

    const filter = (q) => {
        q = q.trim().toLowerCase();
        if (!q) return brands.slice(0, 10);
        return brands.filter((b) =>
            b.name.toLowerCase().includes(q) ||
            b.slug.toLowerCase().includes(q) ||
            (b.industry || '').toLowerCase().includes(q)
        ).slice(0, 10);
    };

    const render = (query) => {
        if (!loaded || brands.length === 0) {
            dropdown.innerHTML = '<div class="brand-switch-empty">Loading brands…</div>';
            dropdown.style.display = '';
            return;
        }
        const results = filter(query);
        if (!results.length) {
            dropdown.innerHTML = `<div class="brand-switch-empty">No matches for "${escapeHtml(query)}"</div>`;
            dropdown.style.display = '';
            return;
        }

        const currentSlug = typeof APIData !== 'undefined' ? APIData.currentBrand : null;
        dropdown.innerHTML = results.map((b, idx) => {
            const active = b.slug === currentSlug ? ' is-current' : '';
            return `
                <div class="brand-switch-item${active}" data-slug="${b.slug}" data-idx="${idx}">
                    <div class="brand-switch-dot" style="background:${b.color || '#6366f1'};"></div>
                    <div class="brand-switch-meta">
                        <div class="brand-switch-name">${escapeHtml(b.name)}</div>
                        <div class="brand-switch-sub">${escapeHtml(b.industry || '')}${b.mentionCount ? ` · ${formatNum(b.mentionCount)} mentions` : ''}</div>
                    </div>
                    ${b.slug === currentSlug ? '<span class="material-icons brand-switch-check">check</span>' : ''}
                </div>
            `;
        }).join('');

        dropdown.querySelectorAll('.brand-switch-item').forEach((el) => {
            el.addEventListener('mousedown', (e) => {
                e.preventDefault();
                select(el.dataset.slug);
            });
        });
        dropdown.style.display = '';
    };

    const hide = () => { if (dropdown) dropdown.style.display = 'none'; };

    const select = (slug) => {
        const brand = brands.find((b) => b.slug === slug);
        if (!brand) return;
        if (input) input.value = brand.name;
        hide();
        if (typeof APIData !== 'undefined') APIData.setActiveBrand(slug);
        if (typeof Notifications !== 'undefined') {
            Notifications.info(`Switched to ${brand.name}`);
        }
    };

    const onKeyDown = (e) => {
        if (e.key === 'Escape') { hide(); return; }
        if (e.key !== 'Enter') return;
        const first = dropdown.querySelector('.brand-switch-item');
        if (first) {
            e.preventDefault();
            select(first.dataset.slug);
        }
    };

    const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) =>
        ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
    const formatNum = (n) => {
        if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
        if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
        return String(n);
    };

    return { init };
})();

// Boot after auth has verified the session (small delay so the cookie is set).
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => window.BrandSwitcher.init(), 500);
});
