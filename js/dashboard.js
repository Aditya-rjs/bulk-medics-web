/**
 * Bulk Medics — Customer Dashboard (Redesigned)
 * Sidebar navigation, overview, catalog, orders, packaging, profile
 */
document.addEventListener('DOMContentLoaded', () => {
  /* ---- Auth Guard ---- */
  if (!Store.isLoggedIn()) {
    window.location.href = 'auth.html';
    return;
  }

  const user = Store.getCurrentUser();

  /* ---- Formatters ---- */
  const fmt = (n) => `$${Number(n).toFixed(2)}`;
  const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const greetByTime = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };
  const dayString = () => {
    const d = new Date();
    const days = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
    const months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
  };
  const initials = (name) => {
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  };

  /* ---- User Setup ---- */
  const userAvatar = document.getElementById('userAvatar');
  const sidebarUserName = document.getElementById('sidebarUserName');
  const sidebarMenuBtn = document.getElementById('sidebarMenuBtn');
  const sidebarDropdown = document.getElementById('sidebarDropdown');

  if (user) {
    const ini = initials(user.name);
    userAvatar.textContent = ini;
    sidebarUserName.textContent = user.name;
  }

  // User dropdown
  sidebarMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebarDropdown.classList.toggle('active');
  });
  document.addEventListener('click', () => sidebarDropdown.classList.remove('active'));

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    Store.logout();
    window.location.href = 'index.html';
  });

  /* ---- Mobile Sidebar ---- */
  const sidebar = document.getElementById('sidebar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileOverlay = document.getElementById('mobileOverlay');

  mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
  });
  mobileOverlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    mobileOverlay.classList.remove('active');
  });

  /* ---- Tab Navigation ---- */
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const tabPanes = document.querySelectorAll('.tab-pane');

  const switchTab = (tabId) => {
    sidebarLinks.forEach(l => {
      l.classList.toggle('active', l.dataset.tab === tabId);
    });
    tabPanes.forEach(p => {
      const isActive = p.id === `${tabId}-tab`;
      p.classList.toggle('active', isActive);
    });
    window.location.hash = tabId;

    // Close mobile sidebar
    sidebar.classList.remove('active');
    mobileOverlay.classList.remove('active');

    // Tab-specific renders
    if (tabId === 'overview') renderOverview();
    if (tabId === 'catalog') renderCatalog();
    if (tabId === 'orders') renderOrders();
    if (tabId === 'profile') renderProfile();
  };

  // Sidebar click
  sidebarLinks.forEach(l => {
    l.addEventListener('click', () => switchTab(l.dataset.tab));
  });

  // Profile link in dropdown
  sidebarDropdown.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // All [data-tab] buttons across the page
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-tab]');
    if (btn && !btn.classList.contains('sidebar-link') && !btn.closest('.sidebar-user-dropdown')) {
      switchTab(btn.dataset.tab);
    }
  });

  // Init tab from hash
  const validTabs = ['overview', 'catalog', 'orders', 'packaging', 'profile'];
  const hash = window.location.hash.replace('#', '');
  switchTab(validTabs.includes(hash) ? hash : 'overview');

  /* ---- OVERVIEW ---- */
  const renderOverview = () => {
    document.getElementById('overviewDate').textContent = dayString();
    document.getElementById('overviewGreeting').textContent = `${greetByTime()}, ${user.name.split(' ')[0]} ✦`;
    
    // Stats
    const orders = Store.getMyOrders();
    const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'confirmed' || o.status === 'shipped');
    const packagingOrders = orders.filter(o => o.customPackaging);
    
    document.getElementById('activeOrdersCount').textContent = String(activeOrders.length).padStart(2, '0');
    document.getElementById('productsCount').textContent = String(Store.getMedicines().length).padStart(2, '0');
    document.getElementById('packagingCount').textContent = String(packagingOrders.length).padStart(2, '0');

    // Orders badge in sidebar
    const badge = document.getElementById('ordersBadge');
    if (activeOrders.length > 0) {
      badge.textContent = activeOrders.length;
    } else {
      badge.textContent = '';
    }

    // Frequently ordered (show first 4 medicines)
    const meds = Store.getMedicines().slice(0, 4);
    const freqGrid = document.getElementById('freqGrid');
    freqGrid.innerHTML = meds.map(m => `
      <div class="freq-card" data-tab="catalog">
        <div class="freq-card-cat">${m.category}</div>
        <div class="freq-card-name">${m.name}</div>
        <div class="freq-card-price"><strong>${fmt(m.pricePerUnit)}</strong> / ${m.unit}</div>
      </div>
    `).join('');
  };

  /* ---- PLACE ORDER (CATALOG) ---- */
  let currentSearch = '';
  let currentCategory = 'All';
  let currentSort = 'default';
  const medicineGrid = document.getElementById('medicineGrid');
  const categoryFilters = document.getElementById('categoryFilters');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const globalSearch = document.getElementById('globalSearch');
  const catalogEmptyState = document.getElementById('catalogEmptyState');
  const catalogResultsCount = document.getElementById('catalogResultsCount');

  const renderCategoryFilters = () => {
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
  };

  const renderCatalog = () => {
    if (!medicineGrid) return;
    let meds = [...Store.getMedicines()];

    // Filter by category
    if (currentCategory !== 'All') {
      meds = meds.filter(m => m.category === currentCategory);
    }

    // Filter by search query
    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      meds = meds.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.category.toLowerCase().includes(q) || 
        (m.description && m.description.toLowerCase().includes(q))
      );
    }

    // Sort medicines
    if (currentSort === 'name-asc') {
      meds.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === 'name-desc') {
      meds.sort((a, b) => b.name.localeCompare(a.name));
    } else if (currentSort === 'price-asc') {
      meds.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
    } else if (currentSort === 'price-desc') {
      meds.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
    }

    // Update result count text
    if (catalogResultsCount) {
      catalogResultsCount.textContent = `Showing ${meds.length} ${meds.length === 1 ? 'product' : 'products'}${currentCategory !== 'All' ? ` in ${currentCategory}` : ''}`;
    }

    if (meds.length === 0) {
      medicineGrid.innerHTML = '';
      catalogEmptyState.classList.remove('hidden');
    } else {
      catalogEmptyState.classList.add('hidden');
      medicineGrid.innerHTML = meds.map(m => {
        const batchTotal = fmt(m.pricePerUnit * m.minOrder);
        return `
          <div class="medicine-card" data-med-id="${m.id}">
            <div class="mc-header">
              <span class="badge badge-primary">${m.category}</span>
              ${m.inStock ? '<span class="badge badge-success"><span class="status-dot"></span> In Stock</span>' : '<span class="badge badge-error">Out of Stock</span>'}
            </div>
            <h3 class="mc-title">${m.name}</h3>
            <p class="mc-desc">${m.description || 'Pharmaceutical grade formulation with complete batch test certificates.'}</p>
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
                <button type="button" class="mc-stepper-btn mc-step-minus" data-id="${m.id}" aria-label="Decrease quantity">−</button>
                <input type="number" class="mc-qty-input" id="qty-${m.id}" value="${m.minOrder}" min="${m.minOrder}" step="50" ${!m.inStock ? 'disabled' : ''}>
                <button type="button" class="mc-stepper-btn mc-step-plus" data-id="${m.id}" aria-label="Increase quantity">+</button>
              </div>
              <button class="btn btn-primary add-to-cart-btn" data-id="${m.id}" ${!m.inStock ? 'disabled' : ''}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                Add to Order
              </button>
            </div>
          </div>
        `;
      }).join('');

      // Stepper controls
      document.querySelectorAll('.mc-step-minus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const input = document.getElementById(`qty-${id}`);
          const med = Store.getMedicineById(id);
          if (!input || !med) return;
          let val = parseInt(input.value) || med.minOrder;
          val = Math.max(med.minOrder, val - 50);
          input.value = val;
        });
      });

      document.querySelectorAll('.mc-step-plus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const input = document.getElementById(`qty-${id}`);
          const med = Store.getMedicineById(id);
          if (!input || !med) return;
          let val = parseInt(input.value) || med.minOrder;
          val = val + 50;
          input.value = val;
        });
      });

      // Add to Order / Cart handlers
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
            // Button visual feedback
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `✓ Added!`;
            btn.style.background = 'var(--color-success)';
            btn.style.borderColor = 'var(--color-success)';
            setTimeout(() => {
              btn.innerHTML = originalHTML;
              btn.style.background = '';
              btn.style.borderColor = '';
            }, 1200);

            Store.showToast(`${quantity} units of ${medicine.name} added to your order`, 'success');
            updateCartBadge();
            renderCart();
          }
        });
      });
    }
  };

  // Sort selector listener
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }

  // Search (both topbar and catalog page search)
  let searchTimeout;
  const handleSearch = (val) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentSearch = val;
      if (searchInput && searchInput.value !== val) searchInput.value = val;
      if (globalSearch && globalSearch.value !== val) globalSearch.value = val;

      if (!document.getElementById('catalog-tab').classList.contains('active')) {
        switchTab('catalog');
      }
      renderCatalog();
    }, 250);
  };

  if (searchInput) searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  if (globalSearch) globalSearch.addEventListener('input', (e) => handleSearch(e.target.value));

  // Initialize filters & catalog
  renderCategoryFilters();
  renderCatalog();

  /* ---- CART ---- */
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

  const updateCartBadge = () => {
    const count = Store.getCartCount();
    cartBadge.textContent = count;
    if (cartBadgeMobile) cartBadgeMobile.textContent = count;
    cartHeaderCount.textContent = count;
  };

  const toggleCart = (show) => {
    cartOverlay.classList.toggle('active', show);
    cartPanel.classList.toggle('active', show);
    if (show) renderCart();
  };

  document.getElementById('cartBtn').addEventListener('click', () => toggleCart(true));
  if (document.getElementById('cartBtnMobile')) {
    document.getElementById('cartBtnMobile').addEventListener('click', () => toggleCart(true));
  }
  document.getElementById('closeCartBtn').addEventListener('click', () => toggleCart(false));
  cartOverlay.addEventListener('click', () => toggleCart(false));

  customPackagingToggle.addEventListener('change', (e) => {
    customPackagingForm.classList.toggle('hidden', !e.target.checked);
  });

  const renderCart = () => {
    const cart = Store.getCart();
    if (cart.length === 0) {
      cartItemsList.innerHTML = '';
      cartEmptyState.classList.remove('hidden');
      placeOrderBtn.disabled = true;
    } else {
      cartEmptyState.classList.add('hidden');
      placeOrderBtn.disabled = false;
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
            Store.updateCartItem(id, item.quantity - 1);
            updateCartBadge(); renderCart();
          } else {
            Store.showToast(`Minimum order is ${item.minOrder}`, 'warning');
          }
        });
      });

      document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          const item = cart.find(i => i.medicineId === id);
          if (item) {
            Store.updateCartItem(id, item.quantity + 1);
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
    cartTotalDisplay.textContent = fmt(Store.getCartTotal());
  };

  placeOrderBtn.addEventListener('click', () => {
    if (Store.getCart().length === 0) return;
    let customPackaging = null;
    if (customPackagingToggle.checked) {
      customPackaging = {
        brandName: document.getElementById('cpBrandName').value.trim(),
        packagingType: document.getElementById('cpType').value,
        labelNotes: document.getElementById('cpNotes').value.trim(),
      };
    }
    const result = Store.placeOrder(customPackaging);
    if (result.success) {
      Store.showToast('Order placed successfully!', 'success');
      toggleCart(false);
      customPackagingToggle.checked = false;
      customPackagingForm.classList.add('hidden');
      document.getElementById('cpBrandName').value = '';
      document.getElementById('cpType').selectedIndex = 0;
      document.getElementById('cpNotes').value = '';
      updateCartBadge();
      switchTab('orders');
    } else {
      Store.showToast(result.error || 'Failed to place order', 'error');
    }
  });

  updateCartBadge();

  /* ---- ORDERS ---- */
  const ordersList = document.getElementById('ordersList');
  const ordersEmptyState = document.getElementById('ordersEmptyState');

  const renderOrders = () => {
    const orders = Store.getMyOrders();
    if (orders.length === 0) {
      ordersList.innerHTML = '';
      ordersEmptyState.classList.remove('hidden');
    } else {
      ordersEmptyState.classList.add('hidden');
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
                  <h4 style="margin-bottom:0.5rem;font-size:0.82rem;font-family:var(--font-body);font-weight:600">Custom Packaging</h4>
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
  };

  /* ---- PROFILE ---- */
  const profileDisplayMode = document.getElementById('profileDisplayMode');
  const profileEditForm = document.getElementById('profileEditForm');

  const renderProfile = () => {
    const u = Store.getCurrentUser();
    if (!u) return;
    document.getElementById('profileNameDisplay').textContent = u.name;
    document.getElementById('profileEmailDisplay').textContent = u.email;
    document.getElementById('profilePhoneDisplay').textContent = u.phone || 'Not provided';
    document.getElementById('profileDateDisplay').textContent = fmtDate(u.createdAt);
    document.getElementById('profileNameHeading').textContent = u.name;

    const avatarLg = document.getElementById('profileAvatarLg');
    avatarLg.textContent = initials(u.name);

    document.getElementById('editName').value = u.name;
    document.getElementById('editEmail').value = u.email;
    document.getElementById('editPhone').value = u.phone || '';

    const orders = Store.getMyOrders();
    const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    document.getElementById('statTotalOrders').textContent = orders.length;
    document.getElementById('statTotalSpent').textContent = fmt(totalSpent);
  };

  document.getElementById('editProfileBtn').addEventListener('click', () => {
    profileDisplayMode.classList.add('hidden');
    profileEditForm.classList.remove('hidden');
  });

  document.getElementById('cancelEditProfileBtn').addEventListener('click', () => {
    profileEditForm.classList.add('hidden');
    profileDisplayMode.classList.remove('hidden');
    renderProfile();
  });

  profileEditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newName = document.getElementById('editName').value.trim();
    const newEmail = document.getElementById('editEmail').value.trim();
    const newPhone = document.getElementById('editPhone').value.trim();
    if (Store.updateUser({ name: newName, email: newEmail, phone: newPhone })) {
      Store.showToast('Profile updated', 'success');
      sidebarUserName.textContent = newName;
      userAvatar.textContent = initials(newName);
      profileEditForm.classList.add('hidden');
      profileDisplayMode.classList.remove('hidden');
      renderProfile();
    } else {
      Store.showToast('Failed to update profile', 'error');
    }
  });

});
