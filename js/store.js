/**
 * Bulk Medics — Data Store (localStorage)
 * Manages users, medicines, cart, orders, and auth state.
 */

const Store = (() => {
  const KEYS = {
    USERS: 'bm_users',
    CURRENT_USER: 'bm_current_user',
    ORDERS: 'bm_orders',
    CART: 'bm_cart',
    MEDICINES: 'bm_medicines',
    INITIALIZED: 'bm_initialized',
  };

  /* ---- Helpers ---- */
  function get(key) {
    try { return JSON.parse(localStorage.getItem(key)); }
    catch { return null; }
  }
  function set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  /* ---- Seed Medicine Catalog ---- */
  const SEED_MEDICINES = [
    {
      id: 'med_001', name: 'Amoxicillin 500mg', category: 'Antibiotics',
      description: 'Broad-spectrum penicillin antibiotic for respiratory, urinary, and skin infections.',
      pricePerUnit: 2.50, minOrder: 100, inStock: true, unit: 'capsules',
    },
    {
      id: 'med_002', name: 'Paracetamol 500mg', category: 'Pain Relief',
      description: 'Analgesic and antipyretic for mild to moderate pain relief and fever reduction.',
      pricePerUnit: 0.80, minOrder: 500, inStock: true, unit: 'tablets',
    },
    {
      id: 'med_003', name: 'Ibuprofen 400mg', category: 'Pain Relief',
      description: 'NSAID for pain, fever, and inflammation. Fast-acting formula.',
      pricePerUnit: 1.20, minOrder: 200, inStock: true, unit: 'tablets',
    },
    {
      id: 'med_004', name: 'Metformin 850mg', category: 'Diabetes',
      description: 'First-line medication for type 2 diabetes. Controls blood sugar levels effectively.',
      pricePerUnit: 1.80, minOrder: 200, inStock: true, unit: 'tablets',
    },
    {
      id: 'med_005', name: 'Amlodipine 5mg', category: 'Cardiovascular',
      description: 'Calcium channel blocker for hypertension and angina. Once-daily dosing.',
      pricePerUnit: 1.50, minOrder: 150, inStock: true, unit: 'tablets',
    },
    {
      id: 'med_006', name: 'Omeprazole 20mg', category: 'Gastrointestinal',
      description: 'Proton pump inhibitor for acid reflux, GERD, and gastric ulcers.',
      pricePerUnit: 2.00, minOrder: 100, inStock: true, unit: 'capsules',
    },
    {
      id: 'med_007', name: 'Cetirizine 10mg', category: 'Allergy',
      description: 'Second-generation antihistamine. Non-drowsy relief from allergies.',
      pricePerUnit: 0.90, minOrder: 300, inStock: true, unit: 'tablets',
    },
    {
      id: 'med_008', name: 'Azithromycin 250mg', category: 'Antibiotics',
      description: 'Macrolide antibiotic for respiratory, ear, and STD infections.',
      pricePerUnit: 3.50, minOrder: 50, inStock: true, unit: 'tablets',
    },
    {
      id: 'med_009', name: 'Vitamin D3 1000IU', category: 'Vitamins & Supplements',
      description: 'Essential vitamin for bone health, immune function, and calcium absorption.',
      pricePerUnit: 0.60, minOrder: 500, inStock: true, unit: 'softgels',
    },
    {
      id: 'med_010', name: 'Multivitamin Complex', category: 'Vitamins & Supplements',
      description: 'Complete daily multivitamin with essential vitamins and minerals.',
      pricePerUnit: 1.00, minOrder: 300, inStock: true, unit: 'tablets',
    },
    {
      id: 'med_011', name: 'Salbutamol Inhaler 100mcg', category: 'Respiratory',
      description: 'Quick-relief bronchodilator for asthma and COPD management.',
      pricePerUnit: 8.00, minOrder: 30, inStock: true, unit: 'inhalers',
    },
    {
      id: 'med_012', name: 'Losartan 50mg', category: 'Cardiovascular',
      description: 'ARB for hypertension and diabetic nephropathy. Well-tolerated.',
      pricePerUnit: 1.70, minOrder: 100, inStock: true, unit: 'tablets',
    },
    {
      id: 'med_013', name: 'Ciprofloxacin 500mg', category: 'Antibiotics',
      description: 'Fluoroquinolone antibiotic for UTI, respiratory, and GI infections.',
      pricePerUnit: 2.80, minOrder: 100, inStock: true, unit: 'tablets',
    },
    {
      id: 'med_014', name: 'Pantoprazole 40mg', category: 'Gastrointestinal',
      description: 'PPI for GERD, erosive esophagitis, and Zollinger-Ellison syndrome.',
      pricePerUnit: 2.20, minOrder: 100, inStock: true, unit: 'tablets',
    },
    {
      id: 'med_015', name: 'Atorvastatin 20mg', category: 'Cardiovascular',
      description: 'Statin for lowering cholesterol and reducing cardiovascular risk.',
      pricePerUnit: 1.90, minOrder: 150, inStock: true, unit: 'tablets',
    },
    {
      id: 'med_016', name: 'Doxycycline 100mg', category: 'Antibiotics',
      description: 'Tetracycline antibiotic for acne, respiratory infections, and Lyme disease.',
      pricePerUnit: 2.00, minOrder: 100, inStock: true, unit: 'capsules',
    },
  ];

  /* ---- Initialize ---- */
  function init() {
    if (!get(KEYS.INITIALIZED)) {
      set(KEYS.USERS, []);
      set(KEYS.ORDERS, []);
      set(KEYS.CART, []);
      set(KEYS.MEDICINES, SEED_MEDICINES);
      set(KEYS.INITIALIZED, true);
    }
  }

  /* ---- Auth ---- */
  function register(name, email, phone, password) {
    const users = get(KEYS.USERS) || [];
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const user = {
      id: generateId(),
      name,
      email: email.toLowerCase().trim(),
      phone,
      password,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    set(KEYS.USERS, users);
    return { success: true, user };
  }

  function login(email, password) {
    const users = get(KEYS.USERS) || [];
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );
    if (!user) {
      return { success: false, error: 'Invalid email or password.' };
    }
    const { password: _, ...safeUser } = user;
    set(KEYS.CURRENT_USER, safeUser);
    return { success: true, user: safeUser };
  }

  function logout() {
    localStorage.removeItem(KEYS.CURRENT_USER);
    set(KEYS.CART, []);
  }

  function getCurrentUser() {
    return get(KEYS.CURRENT_USER);
  }

  function isLoggedIn() {
    return !!get(KEYS.CURRENT_USER);
  }

  function updateUser(updates) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    const users = get(KEYS.USERS) || [];
    const idx = users.findIndex(u => u.id === currentUser.id);
    if (idx === -1) return false;
    users[idx] = { ...users[idx], ...updates };
    set(KEYS.USERS, users);
    const { password: _, ...safeUser } = users[idx];
    set(KEYS.CURRENT_USER, safeUser);
    return true;
  }

  /* ---- Medicines ---- */
  function getMedicines() {
    let meds = get(KEYS.MEDICINES);
    if (!meds || !Array.isArray(meds) || meds.length === 0) {
      meds = SEED_MEDICINES;
      set(KEYS.MEDICINES, SEED_MEDICINES);
    }
    return meds;
  }

  function getMedicineById(id) {
    return getMedicines().find(m => m.id === id);
  }

  function getCategories() {
    return [...new Set(getMedicines().map(m => m.category))].sort();
  }

  /* ---- Cart ---- */
  function getCart() {
    return get(KEYS.CART) || [];
  }

  function addToCart(medicineId, quantity) {
    const cart = getCart();
    const medicine = getMedicineById(medicineId);
    if (!medicine) return false;
    const existing = cart.find(item => item.medicineId === medicineId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        medicineId,
        name: medicine.name,
        pricePerUnit: medicine.pricePerUnit,
        unit: medicine.unit,
        quantity,
        minOrder: medicine.minOrder,
      });
    }
    set(KEYS.CART, cart);
    return true;
  }

  function updateCartItem(medicineId, quantity) {
    let cart = getCart();
    if (quantity <= 0) {
      cart = cart.filter(item => item.medicineId !== medicineId);
    } else {
      const item = cart.find(item => item.medicineId === medicineId);
      if (item) item.quantity = quantity;
    }
    set(KEYS.CART, cart);
  }

  function removeFromCart(medicineId) {
    set(KEYS.CART, getCart().filter(item => item.medicineId !== medicineId));
  }

  function clearCart() {
    set(KEYS.CART, []);
  }

  function getCartTotal() {
    return getCart().reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);
  }

  function getCartCount() {
    return getCart().length;
  }

  /* ---- Orders ---- */
  function placeOrder(customPackaging = null) {
    const user = getCurrentUser();
    if (!user) return { success: false, error: 'Not logged in.' };
    const cart = getCart();
    if (cart.length === 0) return { success: false, error: 'Cart is empty.' };

    const order = {
      id: 'ORD-' + generateId().toUpperCase(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone,
      items: [...cart],
      customPackaging,
      status: 'pending',
      total: getCartTotal(),
      createdAt: new Date().toISOString(),
    };
    const orders = get(KEYS.ORDERS) || [];
    orders.unshift(order);
    set(KEYS.ORDERS, orders);
    clearCart();
    return { success: true, order };
  }

  function getMyOrders() {
    const user = getCurrentUser();
    if (!user) return [];
    return (get(KEYS.ORDERS) || []).filter(o => o.userId === user.id);
  }

  function getAllOrders() {
    return get(KEYS.ORDERS) || [];
  }

  function updateOrderStatus(orderId, status) {
    const orders = get(KEYS.ORDERS) || [];
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      set(KEYS.ORDERS, orders);
      return true;
    }
    return false;
  }

  /* ---- Toast Utility ---- */
  function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Init on load
  init();

  return {
    register, login, logout, getCurrentUser, isLoggedIn, updateUser,
    getMedicines, getMedicineById, getCategories,
    getCart, addToCart, updateCartItem, removeFromCart, clearCart, getCartTotal, getCartCount,
    placeOrder, getMyOrders, getAllOrders, updateOrderStatus,
    showToast,
  };
})();
