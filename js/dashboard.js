document.addEventListener('DOMContentLoaded', () => {
  // 1. Auth Guard
  if (!Store.isLoggedIn()) {
    window.location.href = 'auth.html';
    return; // Stop execution
  }

  // Common DOM Elements
  const userNameDisplay = document.getElementById('userNameDisplay');
  const userGreetingBtn = document.getElementById('userGreetingBtn');
  const userDropdown = document.getElementById('userDropdown');
  const logoutBtn = document.getElementById('logoutBtn');
  
  const cartBtn = document.getElementById('cartBtn');
  const cartBadge = document.getElementById('cartBadge');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartPanel = document.getElementById('cartPanel');
  const closeCartBtn = document.getElementById('closeCartBtn');
  
  // Tabs
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');

  // Formatters
  const formatCurrency = (amount) => `$${Number(amount).toFixed(2)}`;
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // User Setup
  const user = Store.getCurrentUser();
  if (user) {
    userNameDisplay.textContent = user.name.split(' ')[0];
  }

  // Toggle Dropdown
  userGreetingBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = userGreetingBtn.getAttribute('aria-expanded') === 'true';
    userGreetingBtn.setAttribute('aria-expanded', !isExpanded);
    userDropdown.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!userDropdown.contains(e.target) && !userGreetingBtn.contains(e.target)) {
      userDropdown.classList.remove('active');
      userGreetingBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Logout
  logoutBtn.addEventListener('click', () => {
    Store.logout();
    window.location.href = 'index.html';
  });

  // Tab Navigation Logic
  const switchTab = (tabId) => {
    navTabs.forEach(tab => {
      const isSelected = tab.dataset.tab === tabId;
      tab.classList.toggle('active', isSelected);
      tab.setAttribute('aria-selected', isSelected);
    });
    
    tabPanes.forEach(pane => {
      const isActive = pane.id === `${tabId}-tab`;
      pane.classList.toggle('active', isActive);
      pane.hidden = !isActive;
    });

    // Update URL hash
    window.location.hash = tabId;

    // Trigger tab-specific renders
    if (tabId === 'catalog') renderCatalog();
    if (tabId === 'orders') renderOrders();
    if (tabId === 'profile') renderProfile();
  };

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Check initial hash
  const initialHash = window.location.hash.replace('#', '');
  if (['catalog', 'orders', 'profile'].includes(initialHash)) {
    switchTab(initialHash);
  } else {
    switchTab('catalog'); // Default
  }

  // --- CATALOG TAB LOGIC ---
  let currentSearch = '';
  let currentCategory = 'All';
  const medicineGrid = document.getElementById('medicineGrid');
  const categoryFilters = document.getElementById('categoryFilters');
  const searchInput = document.getElementById('searchInput');
  const catalogEmptyState = document.getElementById('catalogEmptyState');

  const renderCategoryFilters = () => {
    const categories = ['All', ...Store.getCategories()];
    categoryFilters.innerHTML = categories.map(cat => `
      <button class="category-pill ${cat === currentCategory ? 'active' : ''}" data-category="${cat}">
        ${cat}
      </button>
    `).join('');

    categoryFilters.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        currentCategory = e.target.dataset.category;
        renderCategoryFilters();
        renderCatalog();
      });
    });
  };

  const renderCatalog = () => {
    let medicines = Store.getMedicines();
    
    // Filter by Category
    if (currentCategory !== 'All') {
      medicines = medicines.filter(m => m.category === currentCategory);
    }
    
    // Filter by Search
    if (currentSearch.trim() !== '') {
      const q = currentSearch.toLowerCase();
      medicines = medicines.filter(m => 
        m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)
      );
    }

    if (medicines.length === 0) {
      medicineGrid.innerHTML = '';
      catalogEmptyState.classList.remove('hidden');
    } else {
      catalogEmptyState.classList.add('hidden');
      medicineGrid.innerHTML = medicines.map(m => `
        <div class="card medicine-card">
          <div class="card-body">
            <div class="mc-header">
              <span class="badge badge-primary">${m.category}</span>
            </div>
            <h3 class="mc-title">${m.name}</h3>
            <p class="mc-price">${formatCurrency(m.pricePerUnit)} <span style="font-size:0.8em;font-weight:400;color:var(--color-text-secondary)">/ ${m.unit}</span></p>
            <p class="mc-min-order">Min. order: ${m.minOrder} ${m.unit}s</p>
            <div class="mc-stock">
              ${m.inStock ? '<span class="badge badge-success">In Stock</span>' : '<span class="badge badge-error">Out of Stock</span>'}
            </div>
            <div class="mc-actions mt-auto">
              <input type="number" class="form-input mc-qty-input" id="qty-${m.id}" value="${m.minOrder}" min="${m.minOrder}" ${!m.inStock ? 'disabled' : ''}>
              <button class="btn btn-primary add-to-cart-btn w-100" data-id="${m.id}" ${!m.inStock ? 'disabled' : ''}>Add to Cart</button>
            </div>
          </div>
        </div>
      `).join('');

      // Add to cart listeners
      document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt(e.target.dataset.id);
          const qtyInput = document.getElementById(`qty-${id}`);
          const quantity = parseInt(qtyInput.value);
          const medicine = Store.getMedicineById(id);

          if (quantity < medicine.minOrder) {
            Store.showToast(`Minimum order quantity is ${medicine.minOrder}`, 'warning');
            return;
          }

          if (Store.addToCart(id, quantity)) {
            Store.showToast(`${medicine.name} added to cart`, 'success');
            updateCartBadge();
            renderCart();
          }
        });
      });
    }
  };

  // Debounced Search
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      currentSearch = e.target.value;
      renderCatalog();
    }, 300);
  });

  renderCategoryFilters();

  // --- CART LOGIC ---
  const cartHeaderCount = document.getElementById('cartHeaderCount');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartTotalDisplay = document.getElementById('cartTotalDisplay');
  const customPackagingToggle = document.getElementById('customPackagingToggle');
  const customPackagingForm = document.getElementById('customPackagingForm');
  const placeOrderBtn = document.getElementById('placeOrderBtn');

  const updateCartBadge = () => {
    const count = Store.getCartCount();
    cartBadge.textContent = count;
    cartHeaderCount.textContent = count;
  };

  const toggleCart = (show) => {
    cartOverlay.classList.toggle('active', show);
    cartPanel.classList.toggle('active', show);
    if (show) renderCart();
  };

  cartBtn.addEventListener('click', () => toggleCart(true));
  closeCartBtn.addEventListener('click', () => toggleCart(false));
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
            <div class="ci-price">${formatCurrency(item.pricePerUnit)} / ${item.unit}</div>
            <div class="ci-actions">
              <div class="ci-qty-controls">
                <button class="qty-btn qty-minus" data-id="${item.medicineId}">-</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn qty-plus" data-id="${item.medicineId}">+</button>
              </div>
              <button class="remove-btn" data-id="${item.medicineId}" title="Remove item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </div>
          <div class="ci-total">
            ${formatCurrency(item.pricePerUnit * item.quantity)}
          </div>
        </div>
      `).join('');

      // Attach cart item events
      document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt(e.target.dataset.id);
          const item = cart.find(i => i.medicineId === id);
          if (item.quantity > item.minOrder) {
            Store.updateCartItem(id, item.quantity - 1);
            updateCartBadge();
            renderCart();
          } else {
            Store.showToast(`Minimum order is ${item.minOrder}`, 'warning');
          }
        });
      });

      document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt(e.target.dataset.id);
          const item = cart.find(i => i.medicineId === id);
          Store.updateCartItem(id, item.quantity + 1);
          updateCartBadge();
          renderCart();
        });
      });

      document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const btnEl = e.target.closest('.remove-btn');
          const id = parseInt(btnEl.dataset.id);
          Store.removeFromCart(id);
          updateCartBadge();
          renderCart();
        });
      });
    }

    cartTotalDisplay.textContent = formatCurrency(Store.getCartTotal());
  };

  placeOrderBtn.addEventListener('click', () => {
    if (Store.getCart().length === 0) return;

    let customPackaging = null;
    if (customPackagingToggle.checked) {
      customPackaging = {
        brandName: document.getElementById('cpBrandName').value.trim(),
        packagingType: document.getElementById('cpType').value,
        labelNotes: document.getElementById('cpNotes').value.trim()
      };
    }

    const result = Store.placeOrder(customPackaging);
    
    if (result.success) {
      Store.showToast('Order placed successfully!', 'success');
      toggleCart(false);
      
      // Reset custom packaging form
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


  // --- ORDERS TAB LOGIC ---
  const ordersList = document.getElementById('ordersList');
  const ordersEmptyState = document.getElementById('ordersEmptyState');

  const renderOrders = () => {
    const orders = Store.getMyOrders();
    
    if (orders.length === 0) {
      ordersList.innerHTML = '';
      ordersEmptyState.classList.remove('hidden');
    } else {
      ordersEmptyState.classList.add('hidden');
      ordersList.innerHTML = orders.map(order => {
        const itemS = order.items.length === 1 ? 'item' : 'items';
        const badgeColor = {
          'Pending': 'warning',
          'Confirmed': 'info',
          'Shipped': 'primary',
          'Delivered': 'success'
        }[order.status] || 'primary';

        return `
          <div class="order-card">
            <div class="order-header" tabindex="0">
              <div class="order-meta">
                <span class="order-id">${order.id}</span>
                <span class="order-date">${formatDate(order.createdAt)}</span>
              </div>
              <div class="order-summary">
                <span class="badge badge-${badgeColor}">${order.status}</span>
                <span class="order-total">${formatCurrency(order.totalAmount)}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--color-text-muted)"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
            <div class="order-details">
              <h4 style="margin-bottom:12px;font-size:var(--text-sm);color:var(--color-text-secondary)">Order Items (${order.items.length} ${itemS})</h4>
              ${order.items.map(item => `
                <div class="order-item-row">
                  <div>
                    <span style="font-weight:500">${item.name}</span>
                    <span style="color:var(--color-text-muted);font-size:var(--text-sm);margin-left:8px;">${item.quantity} × ${formatCurrency(item.pricePerUnit)}</span>
                  </div>
                  <div style="font-weight:500">${formatCurrency(item.quantity * item.pricePerUnit)}</div>
                </div>
              `).join('')}
              
              ${order.customPackaging ? `
                <div class="cp-info">
                  <h4 style="margin-bottom:8px;font-size:var(--text-sm)">Custom Packaging Requested</h4>
                  <p><strong>Brand:</strong> ${order.customPackaging.brandName || 'N/A'}</p>
                  <p><strong>Type:</strong> ${order.customPackaging.packagingType}</p>
                  ${order.customPackaging.labelNotes ? `<p><strong>Notes:</strong> ${order.customPackaging.labelNotes}</p>` : ''}
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');

      // Expand/collapse logic
      document.querySelectorAll('.order-header').forEach(header => {
        header.addEventListener('click', (e) => {
          const card = e.currentTarget.closest('.order-card');
          card.classList.toggle('expanded');
          const svg = e.currentTarget.querySelector('svg');
          svg.style.transform = card.classList.contains('expanded') ? 'rotate(180deg)' : '';
          svg.style.transition = 'transform 0.2s';
        });
      });
    }
  };


  // --- PROFILE TAB LOGIC ---
  const profileDisplayMode = document.getElementById('profileDisplayMode');
  const profileEditForm = document.getElementById('profileEditForm');
  const editProfileBtn = document.getElementById('editProfileBtn');
  const cancelEditProfileBtn = document.getElementById('cancelEditProfileBtn');

  const renderProfile = () => {
    const currentUser = Store.getCurrentUser();
    if (!currentUser) return;

    // Display fields
    document.getElementById('profileNameDisplay').textContent = currentUser.name;
    document.getElementById('profileEmailDisplay').textContent = currentUser.email;
    document.getElementById('profilePhoneDisplay').textContent = currentUser.phone || 'Not provided';
    document.getElementById('profileDateDisplay').textContent = formatDate(currentUser.createdAt);

    // Form fields
    document.getElementById('editName').value = currentUser.name;
    document.getElementById('editEmail').value = currentUser.email;
    document.getElementById('editPhone').value = currentUser.phone || '';

    // Stats
    const orders = Store.getMyOrders();
    const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    document.getElementById('statTotalOrders').textContent = orders.length;
    document.getElementById('statTotalSpent').textContent = formatCurrency(totalSpent);
  };

  editProfileBtn.addEventListener('click', () => {
    profileDisplayMode.classList.add('hidden');
    profileEditForm.classList.remove('hidden');
  });

  cancelEditProfileBtn.addEventListener('click', () => {
    profileEditForm.classList.add('hidden');
    profileDisplayMode.classList.remove('hidden');
    renderProfile(); // Reset form fields
  });

  profileEditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newName = document.getElementById('editName').value.trim();
    const newEmail = document.getElementById('editEmail').value.trim();
    const newPhone = document.getElementById('editPhone').value.trim();

    if (Store.updateUser({ name: newName, email: newEmail, phone: newPhone })) {
      Store.showToast('Profile updated successfully', 'success');
      
      // Update top nav greeting
      const user = Store.getCurrentUser();
      userNameDisplay.textContent = user.name.split(' ')[0];
      
      profileEditForm.classList.add('hidden');
      profileDisplayMode.classList.remove('hidden');
      renderProfile();
    } else {
      Store.showToast('Failed to update profile', 'error');
    }
  });

});
