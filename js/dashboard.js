/**
 * Bulk Medics — Customer Dashboard
 * Fully hoisted functions, comprehensive medicine & vaccine product visual cards
 */
document.addEventListener('DOMContentLoaded', () => {
  /* ---- Auth Guard ---- */
  if (!Store.isLoggedIn()) {
    window.location.href = 'auth.html';
    return;
  }

  const user = Store.getCurrentUser();

  /* ---- Formatters & Helpers ---- */
  function fmt(n) {
    return `$${Number(n).toFixed(2)}`;
  }

  function fmtDate(d) {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function greetByTime() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  function dayString() {
    const d = new Date();
    const days = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
    const months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
  }

  function initials(name) {
    if (!name) return 'BM';
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }

  /* ---- Pharmaceutical Visual Product Art Helper ---- */
  function getProductVisual(m) {
    const type = m.iconType || 'tablet';
    
    // Distinct visual badge and color theme per form
    let svgIcon = '';
    let themeBg = 'hsl(174, 45%, 94%)';
    let themeColor = 'hsl(174, 62%, 30%)';
    let badgeText = m.dosage || m.unit;

    if (type === 'vial') {
      themeBg = 'hsl(200, 75%, 94%)';
      themeColor = 'hsl(200, 80%, 35%)';
      svgIcon = `
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          <rect x="24" y="8" width="16" height="6" rx="2" fill="${themeColor}" />
          <rect x="28" y="14" width="8" height="6" fill="#cbd5e1" />
          <rect x="18" y="20" width="28" height="36" rx="6" fill="#f8fafc" stroke="${themeColor}" stroke-width="2.5" />
          <rect x="22" y="28" width="20" height="18" rx="2" fill="${themeColor}" opacity="0.15" />
          <line x1="26" y1="34" x2="38" y2="34" stroke="${themeColor}" stroke-width="2" stroke-linecap="round" />
          <line x1="26" y1="39" x2="34" y2="39" stroke="${themeColor}" stroke-width="1.5" stroke-linecap="round" />
          <circle x="32" y="24" r="2" fill="#38bdf8" />
        </svg>`;
    } else if (type === 'syringe') {
      themeBg = 'hsl(270, 60%, 95%)';
      themeColor = 'hsl(270, 65%, 45%)';
      svgIcon = `
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          <line x1="14" y1="50" x2="22" y2="42" stroke="${themeColor}" stroke-width="3" stroke-linecap="round" />
          <rect x="20" y="16" width="24" height="28" rx="4" transform="rotate(-45 32 30)" fill="#f8fafc" stroke="${themeColor}" stroke-width="2.5" />
          <line x1="42" y1="10" x2="52" y2="20" stroke="${themeColor}" stroke-width="3" stroke-linecap="round" />
          <line x1="46" y1="6" x2="56" y2="16" stroke="${themeColor}" stroke-width="2.5" />
        </svg>`;
    } else if (type === 'inhaler') {
      themeBg = 'hsl(185, 65%, 93%)';
      themeColor = 'hsl(185, 75%, 32%)';
      svgIcon = `
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          <path d="M22 12h14a4 4 0 0 1 4 4v22h8a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z" fill="#f8fafc" stroke="${themeColor}" stroke-width="2.5" />
          <rect x="24" y="6" width="10" height="6" rx="1" fill="${themeColor}" />
          <circle cx="44" cy="44" r="3" fill="${themeColor}" />
        </svg>`;
    } else if (type === 'capsule') {
      themeBg = 'hsl(35, 85%, 94%)';
      themeColor = 'hsl(35, 90%, 42%)';
      svgIcon = `
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          <g transform="rotate(-35 32 32)">
            <path d="M22 16h20v16H22z" fill="${themeColor}" />
            <path d="M22 16a10 10 0 0 1 20 0v0H22z" fill="${themeColor}" />
            <path d="M22 32h20v0a10 10 0 0 1-20 0z" fill="#f8fafc" stroke="${themeColor}" stroke-width="2.5" />
            <rect x="22" y="16" width="20" height="32" rx="10" fill="none" stroke="${themeColor}" stroke-width="2.5" />
          </g>
        </svg>`;
    } else if (type === 'softgel') {
      themeBg = 'hsl(45, 90%, 93%)';
      themeColor = 'hsl(40, 95%, 38%)';
      svgIcon = `
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          <ellipse cx="32" cy="32" rx="20" ry="12" transform="rotate(-30 32 32)" fill="hsl(45, 100%, 65%)" stroke="${themeColor}" stroke-width="2.5" />
          <ellipse cx="30" cy="28" rx="10" ry="4" transform="rotate(-30 30 28)" fill="#fff" opacity="0.6" />
        </svg>`;
    } else if (type === 'sachet') {
      themeBg = 'hsl(145, 60%, 94%)';
      themeColor = 'hsl(145, 65%, 35%)';
      svgIcon = `
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          <rect x="18" y="12" width="28" height="40" rx="3" fill="#f8fafc" stroke="${themeColor}" stroke-width="2.5" />
          <line x1="22" y1="18" x2="42" y2="18" stroke="${themeColor}" stroke-width="2" stroke-dasharray="2 2" />
          <circle cx="32" cy="32" r="6" fill="${themeColor}" opacity="0.2" />
          <path d="M30 32h4M32 30v4" stroke="${themeColor}" stroke-width="2" stroke-linecap="round" />
        </svg>`;
    } else if (type === 'bottle') {
      themeBg = 'hsl(210, 65%, 94%)';
      themeColor = 'hsl(210, 70%, 40%)';
      svgIcon = `
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          <rect x="26" y="8" width="12" height="6" rx="2" fill="${themeColor}" />
          <path d="M24 16h16a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4z" fill="#f8fafc" stroke="${themeColor}" stroke-width="2.5" />
          <rect x="22" y="26" width="20" height="18" fill="${themeColor}" opacity="0.15" />
          <line x1="25" y1="33" x2="39" y2="33" stroke="${themeColor}" stroke-width="2" />
        </svg>`;
    } else {
      // Default: Tablet / Blister
      themeBg = 'hsl(174, 45%, 94%)';
      themeColor = 'hsl(174, 62%, 30%)';
      svgIcon = `
        <svg viewBox="0 0 64 64" width="48" height="48" fill="none">
          <circle cx="32" cy="32" r="18" fill="#f8fafc" stroke="${themeColor}" stroke-width="2.5" />
          <line x1="20" y1="32" x2="44" y2="32" stroke="${themeColor}" stroke-width="2" stroke-linecap="round" />
          <line x1="32" y1="20" x2="32" y2="28" stroke="${themeColor}" stroke-width="1.5" stroke-dasharray="1 2" />
        </svg>`;
    }

    return `
      <div class="product-photo-box" style="background:${themeBg}">
        <div class="product-photo-art">${svgIcon}</div>
        <span class="product-dose-tag" style="color:${themeColor}">${badgeText}</span>
      </div>`;
  }

  /* ---- DOM Elements ---- */
  const userAvatar = document.getElementById('userAvatar');
  const sidebarUserName = document.getElementById('sidebarUserName');
  const sidebarMenuBtn = document.getElementById('sidebarMenuBtn');
  const sidebarDropdown = document.getElementById('sidebarDropdown');
  const sidebar = document.getElementById('sidebar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileOverlay = document.getElementById('mobileOverlay');

  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const tabPanes = document.querySelectorAll('.tab-pane');

  const medicineGrid = document.getElementById('medicineGrid');
  const categoryFilters = document.getElementById('categoryFilters');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const globalSearch = document.getElementById('globalSearch');
  const catalogEmptyState = document.getElementById('catalogEmptyState');
  const catalogResultsCount = document.getElementById('catalogResultsCount');

  const cartBadge = document.getElementById('cartBadge');
  const cartBadgeMobile = document.getElementById('cartBadgeMobile');
  const cartHeaderCount = document.getElementById('cartHeaderCount');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartTotalDisplay = document.getElementById('cartTotalDisplay');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartPanel = document.getElementById('cartPanel');
  const customPackagingToggle = document.getElementById('customPackagingToggle');
  const customPackagingForm = document.getElementById('customPackagingForm');
  const placeOrderBtn = document.getElementById('placeOrderBtn');

  const ordersList = document.getElementById('ordersList');
  const ordersEmptyState = document.getElementById('ordersEmptyState');

  /* ---- Catalog State ---- */
  let currentSearch = '';
  let currentCategory = 'All';
  let currentSort = 'default';

  /* ---- User Setup ---- */
  if (user) {
    userAvatar.textContent = initials(user.name);
    sidebarUserName.textContent = user.name;
  }

  sidebarMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebarDropdown.classList.toggle('active');
  });
  document.addEventListener('click', () => sidebarDropdown.classList.remove('active'));

  document.getElementById('logoutBtn').addEventListener('click', () => {
    Store.logout();
    window.location.href = 'index.html';
  });

  /* ---- Mobile Sidebar ---- */
  mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
  });
  mobileOverlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    mobileOverlay.classList.remove('active');
  });

  /* ---- Tab Navigation ---- */
  function switchTab(tabId) {
    sidebarLinks.forEach(l => {
      l.classList.toggle('active', l.dataset.tab === tabId);
    });
    tabPanes.forEach(p => {
      const isActive = p.id === `${tabId}-tab`;
      p.classList.toggle('active', isActive);
    });
    window.location.hash = tabId;

    sidebar.classList.remove('active');
    mobileOverlay.classList.remove('active');

    if (tabId === 'overview') renderOverview();
    if (tabId === 'catalog') {
      renderCategoryFilters();
      renderCatalog();
    }
    if (tabId === 'orders') renderOrders();
    if (tabId === 'profile') renderProfile();
  }

  sidebarLinks.forEach(l => {
    l.addEventListener('click', () => switchTab(l.dataset.tab));
  });

  sidebarDropdown.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-tab]');
    if (btn && !btn.classList.contains('sidebar-link') && !btn.closest('.sidebar-user-dropdown')) {
      switchTab(btn.dataset.tab);
    }
  });

  /* ---- RENDER FUNCTIONS (Hoisted) ---- */

  function renderOverview() {
    const overviewDate = document.getElementById('overviewDate');
    const overviewGreeting = document.getElementById('overviewGreeting');
    if (overviewDate) overviewDate.textContent = dayString();
    if (overviewGreeting) overviewGreeting.textContent = `${greetByTime()}, ${user.name.split(' ')[0]} ✦`;

    const orders = Store.getMyOrders();
    const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'confirmed' || o.status === 'shipped');
    const packagingOrders = orders.filter(o => o.customPackaging);

    const activeEl = document.getElementById('activeOrdersCount');
    const prodEl = document.getElementById('productsCount');
    const pkgEl = document.getElementById('packagingCount');
    if (activeEl) activeEl.textContent = String(activeOrders.length).padStart(2, '0');
    if (prodEl) prodEl.textContent = String(Store.getMedicines().length).padStart(2, '0');
    if (pkgEl) pkgEl.textContent = String(packagingOrders.length).padStart(2, '0');

    const badge = document.getElementById('ordersBadge');
    if (badge) badge.textContent = activeOrders.length > 0 ? activeOrders.length : '';

    const freqGrid = document.getElementById('freqGrid');
    if (freqGrid) {
      const topMeds = Store.getMedicines().slice(0, 4);
      freqGrid.innerHTML = topMeds.map(m => `
        <div class="freq-card" data-tab="catalog">
          <div class="freq-card-cat">${m.category}</div>
          <div class="freq-card-name">${m.name}</div>
          <div class="freq-card-price"><strong>${fmt(m.pricePerUnit)}</strong> / ${m.unit}</div>
        </div>
      `).join('');
    }
  }

  function renderCategoryFilters() {
    if (!categoryFilters) return;
    const allMeds = Store.getMedicines();
    const cats = ['All', ...Store.getCategories()];

    categoryFilters.innerHTML = cats.map(c => {
      const count = c === 'All' ? allMeds.length : allMeds.filter(m => m.category === c).length;
      return `
        <button class="category-pill ${c === currentCategory ? 'active' : ''}" data-category="${c}">
          ${c} <span class="category-pill-count">${count}</span>
        </button>
      `;
    }).join('');

    categoryFilters.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        currentCategory = pill.dataset.category;
        renderCategoryFilters();
        renderCatalog();
      });
    });
  }

  function renderCatalog() {
    if (!medicineGrid) return;
    let meds = [...Store.getMedicines()];

    if (currentCategory !== 'All') {
      meds = meds.filter(m => m.category === currentCategory);
    }

    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      meds = meds.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        (m.genericName && m.genericName.toLowerCase().includes(q)) ||
        (m.description && m.description.toLowerCase().includes(q))
      );
    }

    if (currentSort === 'name-asc') {
      meds.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === 'name-desc') {
      meds.sort((a, b) => b.name.localeCompare(a.name));
    } else if (currentSort === 'price-asc') {
      meds.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
    } else if (currentSort === 'price-desc') {
      meds.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
    }

    if (catalogResultsCount) {
      catalogResultsCount.textContent = `Showing ${meds.length} ${meds.length === 1 ? 'item' : 'items'}${currentCategory !== 'All' ? ` in ${currentCategory}` : ''}`;
    }

    if (meds.length === 0) {
      medicineGrid.innerHTML = '';
      if (catalogEmptyState) catalogEmptyState.classList.remove('hidden');
    } else {
      if (catalogEmptyState) catalogEmptyState.classList.add('hidden');
      medicineGrid.innerHTML = meds.map(m => {
        const batchTotal = fmt(m.pricePerUnit * m.minOrder);
        const photoHtml = getProductVisual(m);

        return `
          <div class="medicine-card" data-med-id="${m.id}">
            <div class="mc-header">
              <span class="badge badge-primary">${m.category}</span>
              ${m.inStock ? '<span class="badge badge-success"><span class="status-dot"></span> In Stock</span>' : '<span class="badge badge-error">Out of Stock</span>'}
            </div>
            
            ${photoHtml}

            <h3 class="mc-title">${m.name}</h3>
            ${m.genericName ? `<div class="mc-generic">Generic: ${m.genericName}</div>` : ''}
            <p class="mc-desc">${m.description}</p>
            
            <div class="mc-price-row">
              <div class="mc-unit-price">${fmt(m.pricePerUnit)} <span class="mc-unit-label">/ ${m.unit}</span></div>
              <div class="mc-batch-summary">Min batch (${m.minOrder}): <strong>${batchTotal}</strong></div>
            </div>

            <div class="mc-packaging-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              Custom packaging eligible
            </div>

            <div class="mc-actions">
              <div class="mc-stepper">
                <button type="button" class="mc-stepper-btn mc-step-minus" data-id="${m.id}" aria-label="Decrease">−</button>
                <input type="number" class="mc-qty-input" id="qty-${m.id}" value="${m.minOrder}" min="${m.minOrder}" step="${m.minOrder >= 100 ? 50 : 10}" ${!m.inStock ? 'disabled' : ''}>
                <button type="button" class="mc-stepper-btn mc-step-plus" data-id="${m.id}" aria-label="Increase">+</button>
              </div>
              <button class="btn btn-primary add-to-cart-btn" data-id="${m.id}" ${!m.inStock ? 'disabled' : ''}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                Add to Order
              </button>
            </div>
          </div>
        `;
      }).join('');

      // Steppers
      document.querySelectorAll('.mc-step-minus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const input = document.getElementById(`qty-${id}`);
          const med = Store.getMedicineById(id);
          if (!input || !med) return;
          const step = med.minOrder >= 100 ? 50 : 10;
          let val = parseInt(input.value) || med.minOrder;
          val = Math.max(med.minOrder, val - step);
          input.value = val;
        });
      });

      document.querySelectorAll('.mc-step-plus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const input = document.getElementById(`qty-${id}`);
          const med = Store.getMedicineById(id);
          if (!input || !med) return;
          const step = med.minOrder >= 100 ? 50 : 10;
          let val = parseInt(input.value) || med.minOrder;
          val = val + step;
          input.value = val;
        });
      });

      // Add to Cart
      document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const qtyInput = document.getElementById(`qty-${id}`);
          const quantity = parseInt(qtyInput.value) || 0;
          const medicine = Store.getMedicineById(id);
          if (!medicine) return;

          if (quantity < medicine.minOrder) {
            Store.showToast(`Minimum batch order for ${medicine.name} is ${medicine.minOrder} ${medicine.unit}`, 'warning');
            return;
          }

          if (Store.addToCart(id, quantity)) {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `✓ Added!`;
            btn.style.background = 'var(--color-success)';
            btn.style.borderColor = 'var(--color-success)';
            setTimeout(() => {
              btn.innerHTML = originalHTML;
              btn.style.background = '';
              btn.style.borderColor = '';
            }, 1200);

            Store.showToast(`${quantity} ${medicine.unit} of ${medicine.name} added to cart`, 'success');
            updateCartBadge();
            renderCart();
          }
        });
      });
    }
  }

  function updateCartBadge() {
    const count = Store.getCartCount();
    if (cartBadge) cartBadge.textContent = count;
    if (cartBadgeMobile) cartBadgeMobile.textContent = count;
    if (cartHeaderCount) cartHeaderCount.textContent = count;
  }

  function toggleCart(show) {
    if (cartOverlay) cartOverlay.classList.toggle('active', show);
    if (cartPanel) cartPanel.classList.toggle('active', show);
    if (show) renderCart();
  }

  document.getElementById('cartBtn').addEventListener('click', () => toggleCart(true));
  if (document.getElementById('cartBtnMobile')) {
    document.getElementById('cartBtnMobile').addEventListener('click', () => toggleCart(true));
  }
  document.getElementById('closeCartBtn').addEventListener('click', () => toggleCart(false));
  if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCart(false));

  if (customPackagingToggle) {
    customPackagingToggle.addEventListener('change', (e) => {
      if (customPackagingForm) customPackagingForm.classList.toggle('hidden', !e.target.checked);
    });
  }

  function renderCart() {
    const cart = Store.getCart();
    if (cart.length === 0) {
      if (cartItemsList) cartItemsList.innerHTML = '';
      if (cartEmptyState) cartEmptyState.classList.remove('hidden');
      if (placeOrderBtn) placeOrderBtn.disabled = true;
    } else {
      if (cartEmptyState) cartEmptyState.classList.add('hidden');
      if (placeOrderBtn) placeOrderBtn.disabled = false;
      if (cartItemsList) {
        cartItemsList.innerHTML = cart.map(item => `
          <div class="cart-item">
            <div class="ci-details">
              <div class="ci-title">${item.name}</div>
              <div class="ci-price">${fmt(item.pricePerUnit)} / ${item.unit}</div>
              <div class="ci-actions">
                <div class="ci-qty-controls">
                  <button class="qty-btn qty-minus" data-id="${item.medicineId}">−</button>
                  <span class="qty-val">${item.quantity}</span>
                  <button class="qty-btn qty-plus" data-id="${item.medicineId}">+</button>
                </div>
                <button class="remove-btn" data-id="${item.medicineId}" title="Remove">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
            <div class="ci-total">${fmt(item.pricePerUnit * item.quantity)}</div>
          </div>
        `).join('');

        document.querySelectorAll('.qty-minus').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const item = cart.find(i => i.medicineId === id);
            if (item && item.quantity > item.minOrder) {
              const step = item.minOrder >= 100 ? 50 : 10;
              Store.updateCartItem(id, Math.max(item.minOrder, item.quantity - step));
              updateCartBadge(); renderCart();
            } else {
              Store.showToast(`Minimum batch order is ${item.minOrder}`, 'warning');
            }
          });
        });

        document.querySelectorAll('.qty-plus').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const item = cart.find(i => i.medicineId === id);
            if (item) {
              const step = item.minOrder >= 100 ? 50 : 10;
              Store.updateCartItem(id, item.quantity + step);
              updateCartBadge(); renderCart();
            }
          });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            Store.removeFromCart(btn.dataset.id);
            Store.showToast('Item removed from cart', 'info');
            updateCartBadge(); renderCart();
          });
        });
      }
    }
    if (cartTotalDisplay) cartTotalDisplay.textContent = fmt(Store.getCartTotal());
  }

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      if (Store.getCart().length === 0) return;
      let customPackaging = null;
      if (customPackagingToggle && customPackagingToggle.checked) {
        customPackaging = {
          brandName: document.getElementById('cpBrandName').value.trim(),
          packagingType: document.getElementById('cpType').value,
          labelNotes: document.getElementById('cpNotes').value.trim(),
        };
      }
      const result = Store.placeOrder(customPackaging);
      if (result.success) {
        Store.showToast('Order placed successfully! Check My Orders.', 'success');
        toggleCart(false);
        if (customPackagingToggle) {
          customPackagingToggle.checked = false;
          customPackagingForm.classList.add('hidden');
          document.getElementById('cpBrandName').value = '';
          document.getElementById('cpType').selectedIndex = 0;
          document.getElementById('cpNotes').value = '';
        }
        updateCartBadge();
        switchTab('orders');
      } else {
        Store.showToast(result.error || 'Failed to place order', 'error');
      }
    });
  }

  function renderOrders() {
    if (!ordersList) return;
    const orders = Store.getMyOrders();
    if (orders.length === 0) {
      ordersList.innerHTML = '';
      if (ordersEmptyState) ordersEmptyState.classList.remove('hidden');
    } else {
      if (ordersEmptyState) ordersEmptyState.classList.add('hidden');
      const statusBadge = (s) => {
        const map = { pending: 'warning', confirmed: 'info', shipped: 'primary', delivered: 'success' };
        return map[s] || 'primary';
      };
      ordersList.innerHTML = orders.map(order => `
        <div class="order-card">
          <div class="order-header">
            <div class="order-meta">
              <span class="order-id">${order.id}</span>
              <span class="order-date">${fmtDate(order.createdAt)}</span>
            </div>
            <div class="order-summary">
              <span class="badge badge-${statusBadge(order.status)}">${order.status}</span>
              <span class="order-total">${fmt(order.total)}</span>
              <svg class="order-expand-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
          <div class="order-details">
            <div class="order-details-inner">
              <h4 style="margin-bottom:0.75rem;font-size:0.85rem;color:var(--color-text-secondary);font-family:var(--font-body);font-weight:600">
                Order Items (${order.items.length})
              </h4>
              ${order.items.map(item => `
                <div class="order-item-row">
                  <div>
                    <span style="font-weight:500">${item.name}</span>
                    <span style="color:var(--color-text-muted);font-size:0.82rem;margin-left:6px">${item.quantity} × ${fmt(item.pricePerUnit)}</span>
                  </div>
                  <div style="font-weight:600">${fmt(item.quantity * item.pricePerUnit)}</div>
                </div>
              `).join('')}
              ${order.customPackaging ? `
                <div class="cp-info">
                  <h4 style="margin-bottom:0.5rem;font-size:0.82rem;font-family:var(--font-body);font-weight:600">Custom Packaging Requested</h4>
                  <p><strong>Brand:</strong> ${order.customPackaging.brandName || 'N/A'}</p>
                  <p><strong>Type:</strong> ${order.customPackaging.packagingType}</p>
                  ${order.customPackaging.labelNotes ? `<p><strong>Notes:</strong> ${order.customPackaging.labelNotes}</p>` : ''}
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `).join('');

      document.querySelectorAll('.order-header').forEach(header => {
        header.addEventListener('click', () => {
          header.closest('.order-card').classList.toggle('expanded');
        });
      });
    }
  }

  function renderProfile() {
    const u = Store.getCurrentUser();
    if (!u) return;
    const nameDisp = document.getElementById('profileNameDisplay');
    const emailDisp = document.getElementById('profileEmailDisplay');
    const phoneDisp = document.getElementById('profilePhoneDisplay');
    const dateDisp = document.getElementById('profileDateDisplay');
    const nameHead = document.getElementById('profileNameHeading');
    const avatarLg = document.getElementById('profileAvatarLg');

    if (nameDisp) nameDisp.textContent = u.name;
    if (emailDisp) emailDisp.textContent = u.email;
    if (phoneDisp) phoneDisp.textContent = u.phone || 'Not provided';
    if (dateDisp) dateDisp.textContent = fmtDate(u.createdAt);
    if (nameHead) nameHead.textContent = u.name;
    if (avatarLg) avatarLg.textContent = initials(u.name);

    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    const editPhone = document.getElementById('editPhone');
    if (editName) editName.value = u.name;
    if (editEmail) editEmail.value = u.email;
    if (editPhone) editPhone.value = u.phone || '';

    const orders = Store.getMyOrders();
    const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const statOrders = document.getElementById('statTotalOrders');
    const statSpent = document.getElementById('statTotalSpent');
    if (statOrders) statOrders.textContent = orders.length;
    if (statSpent) statSpent.textContent = fmt(totalSpent);
  }

  const editProfileBtn = document.getElementById('editProfileBtn');
  const cancelEditProfileBtn = document.getElementById('cancelEditProfileBtn');
  const profileDisplayMode = document.getElementById('profileDisplayMode');
  const profileEditForm = document.getElementById('profileEditForm');

  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
      profileDisplayMode.classList.add('hidden');
      profileEditForm.classList.remove('hidden');
    });
  }

  if (cancelEditProfileBtn) {
    cancelEditProfileBtn.addEventListener('click', () => {
      profileEditForm.classList.add('hidden');
      profileDisplayMode.classList.remove('hidden');
      renderProfile();
    });
  }

  if (profileEditForm) {
    profileEditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = document.getElementById('editName').value.trim();
      const newEmail = document.getElementById('editEmail').value.trim();
      const newPhone = document.getElementById('editPhone').value.trim();
      if (Store.updateUser({ name: newName, email: newEmail, phone: newPhone })) {
        Store.showToast('Profile updated successfully', 'success');
        sidebarUserName.textContent = newName;
        userAvatar.textContent = initials(newName);
        profileEditForm.classList.add('hidden');
        profileDisplayMode.classList.remove('hidden');
        renderProfile();
      } else {
        Store.showToast('Failed to update profile', 'error');
      }
    });
  }

  /* ---- Sort & Search Listeners ---- */
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }

  let searchTimeout;
  function handleSearch(val) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentSearch = val;
      if (searchInput && searchInput.value !== val) searchInput.value = val;
      if (globalSearch && globalSearch.value !== val) globalSearch.value = val;

      if (!document.getElementById('catalog-tab').classList.contains('active')) {
        switchTab('catalog');
      } else {
        renderCatalog();
      }
    }, 200);
  }

  if (searchInput) searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  if (globalSearch) globalSearch.addEventListener('input', (e) => handleSearch(e.target.value));

  /* ---- Initial Page Boot ---- */
  const validTabs = ['overview', 'catalog', 'orders', 'packaging', 'profile'];
  const initialHash = window.location.hash.replace('#', '');
  const startTab = validTabs.includes(initialHash) ? initialHash : 'overview';

  updateCartBadge();
  switchTab(startTab);
});
