/**
 * Bulk Medics — Data Store (localStorage)
 * Comprehensive World-Approved Medicines & Vaccines Catalog
 */

const Store = (() => {
  const KEYS = {
    USERS: 'bm_users',
    CURRENT_USER: 'bm_current_user',
    ORDERS: 'bm_orders',
    CART: 'bm_cart',
    MEDICINES: 'bm_medicines_v2', // bumped key to ensure new comprehensive catalog loads
    INITIALIZED: 'bm_initialized_v2',
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

  /* ---- Comprehensive Global Medicine & Vaccine Catalog ---- */
  const SEED_MEDICINES = [
    /* === 1. VACCINES & BIOLOGICS === */
    {
      id: 'vac_001', name: 'Hepatitis B Recombinant Vaccine (20mcg/ml)', genericName: 'Hepatitis B Vaccine (rDNA)',
      category: 'Vaccines & Biologics', dosage: '20 mcg / 1.0 mL Single Dose Vial',
      description: 'Sterile suspension of purified surface antigen of hepatitis B virus. WHO prequalified, cold-chain monitored.',
      pricePerUnit: 14.50, minOrder: 50, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'vac_002', name: 'Inactivated Influenza Vaccine (Quadrivalent)', genericName: 'Influenza Virus Vaccine',
      category: 'Vaccines & Biologics', dosage: '0.5 mL Pre-filled Syringe',
      description: 'Seasonal quadrivalent influenza vaccine offering broad strain protection for high-risk populations.',
      pricePerUnit: 18.00, minOrder: 50, inStock: true, unit: 'doses', iconType: 'syringe',
    },
    {
      id: 'vac_003', name: 'MMR Vaccine (Measles, Mumps, Rubella Live)', genericName: 'MMR Vaccine Live Attenuated',
      category: 'Vaccines & Biologics', dosage: '0.5 mL Single Dose Vial with Diluent',
      description: 'Lyophilized preparation of live attenuated measles, mumps, and rubella viruses.',
      pricePerUnit: 16.20, minOrder: 40, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'vac_004', name: 'Tetanus & Diphtheria (Td) Toxoid Vaccine', genericName: 'Tetanus and Diphtheria Toxoids',
      category: 'Vaccines & Biologics', dosage: '5.0 mL 10-Dose Multi-dose Vial',
      description: 'Adsorbed toxoids for active booster immunization against tetanus and diphtheria in adolescents and adults.',
      pricePerUnit: 22.00, minOrder: 25, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'vac_005', name: 'Rabies Purified Vero Cell Vaccine', genericName: 'Inactivated Rabies Vaccine',
      category: 'Vaccines & Biologics', dosage: '2.5 IU / 0.5 mL with Diluent',
      description: 'Purified Vero cell rabies vaccine for pre-exposure and post-exposure prophylaxis against rabies virus.',
      pricePerUnit: 28.50, minOrder: 30, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'vac_006', name: 'Typhoid Vi Polysaccharide Conjugate Vaccine', genericName: 'Typhoid Conjugate Vaccine',
      category: 'Vaccines & Biologics', dosage: '25 mcg / 0.5 mL Single Dose',
      description: 'Conjugate vaccine for active prevention of typhoid fever caused by Salmonella enterica serovar Typhi.',
      pricePerUnit: 19.80, minOrder: 40, inStock: true, unit: 'doses', iconType: 'vial',
    },
    {
      id: 'vac_007', name: 'Pneumococcal Conjugate Vaccine (13-Valent)', genericName: 'Pneumococcal 13-valent Conjugate',
      category: 'Vaccines & Biologics', dosage: '0.5 mL Pre-filled Syringe',
      description: 'Sterile suspension of saccharides of capsular antigens of Streptococcus pneumoniae serotypes.',
      pricePerUnit: 42.00, minOrder: 20, inStock: true, unit: 'doses', iconType: 'syringe',
    },

    /* === 2. ANTIBIOTICS & ANTIMICROBIALS === */
    {
      id: 'med_001', name: 'Amoxicillin 500mg', genericName: 'Amoxicillin Trihydrate',
      category: 'Antibiotics', dosage: '500mg Oral Capsule',
      description: 'Broad-spectrum beta-lactam penicillin antibiotic for bacterial ear, chest, dental, and urinary tract infections.',
      pricePerUnit: 0.18, minOrder: 500, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_008', name: 'Azithromycin 500mg', genericName: 'Azithromycin Dihydrate',
      category: 'Antibiotics', dosage: '500mg Film-coated Tablet',
      description: 'Potent macrolide antibiotic for upper and lower respiratory tract infections, skin infections, and STIs.',
      pricePerUnit: 0.45, minOrder: 200, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_013', name: 'Ciprofloxacin 500mg', genericName: 'Ciprofloxacin Hydrochloride',
      category: 'Antibiotics', dosage: '500mg Film-coated Tablet',
      description: 'Second-generation fluoroquinolone antibiotic targeting severe urinary, gastrointestinal, and bone infections.',
      pricePerUnit: 0.28, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_016', name: 'Doxycycline Hyclate 100mg', genericName: 'Doxycycline Hyclate',
      category: 'Antibiotics', dosage: '100mg Capsule',
      description: 'Broad-spectrum tetracycline antibiotic indicated for chronic acne, Lyme disease, malaria prophylaxis, and chest infections.',
      pricePerUnit: 0.22, minOrder: 300, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_017', name: 'Amoxicillin + Clavulanic Acid (Augmentin 625mg)', genericName: 'Co-amoxiclav 500/125mg',
      category: 'Antibiotics', dosage: '625mg Tablet',
      description: 'Beta-lactamase inhibitor combination antibiotic for resistant bacterial infections across ENT and respiratory tracts.',
      pricePerUnit: 0.65, minOrder: 200, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_018', name: 'Ceftriaxone Sodium 1g IV/IM Injection', genericName: 'Ceftriaxone Sodium Sterile Powder',
      category: 'Antibiotics', dosage: '1.0 g Vial with Sterile Water',
      description: 'Third-generation cephalosporin broad-spectrum antibiotic for hospital inpatient care, sepsis, and meningitis.',
      pricePerUnit: 3.20, minOrder: 100, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'med_019', name: 'Metronidazole 400mg', genericName: 'Metronidazole',
      category: 'Antibiotics', dosage: '400mg Tablet',
      description: 'Antiprotozoal and antibacterial agent targeting anaerobic bacterial infections, amoebiasis, and dental abscesses.',
      pricePerUnit: 0.12, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },

    /* === 3. PAIN RELIEF & ANTI-INFLAMMATORY === */
    {
      id: 'med_002', name: 'Paracetamol 500mg (Acetaminophen)', genericName: 'Paracetamol',
      category: 'Pain Relief', dosage: '500mg Tablet',
      description: 'First-line analgesic and antipyretic for mild-to-moderate pain management, headaches, and fever reduction.',
      pricePerUnit: 0.04, minOrder: 1000, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_003', name: 'Ibuprofen 400mg', genericName: 'Ibuprofen',
      category: 'Pain Relief', dosage: '400mg Film-coated Tablet',
      description: 'Non-steroidal anti-inflammatory drug (NSAID) for arthritis, muscular pain, menstrual cramps, and dental pain.',
      pricePerUnit: 0.08, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_020', name: 'Diclofenac Sodium 50mg', genericName: 'Diclofenac Sodium Enteric Coated',
      category: 'Pain Relief', dosage: '50mg Gastro-resistant Tablet',
      description: 'Potent NSAID designed for acute joint inflammation, osteoarthritis, rheumatoid conditions, and post-op trauma.',
      pricePerUnit: 0.09, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_021', name: 'Tramadol Hydrochloride 50mg', genericName: 'Tramadol HCl',
      category: 'Pain Relief', dosage: '50mg Capsule',
      description: 'Centrally acting opioid analgesic for moderate-to-severe acute post-surgical and chronic orthopedic pain.',
      pricePerUnit: 0.35, minOrder: 200, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_022', name: 'Aspirin 75mg (Low Dose Cardio)', genericName: 'Acetylsalicylic Acid',
      category: 'Pain Relief', dosage: '75mg Gastro-resistant Tablet',
      description: 'Antiplatelet and analgesic agent for secondary prevention of thrombotic cardiovascular events and stroke.',
      pricePerUnit: 0.05, minOrder: 1000, inStock: true, unit: 'tablets', iconType: 'tablet',
    },

    /* === 4. CARDIOVASCULAR & HYPERTENSION === */
    {
      id: 'med_005', name: 'Amlodipine Besylate 5mg', genericName: 'Amlodipine',
      category: 'Cardiovascular', dosage: '5mg Tablet',
      description: 'Long-acting dihydropyridine calcium channel blocker for chronic essential hypertension and stable angina.',
      pricePerUnit: 0.07, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_012', name: 'Losartan Potassium 50mg', genericName: 'Losartan Potassium',
      category: 'Cardiovascular', dosage: '50mg Film-coated Tablet',
      description: 'Angiotensin II receptor antagonist (ARB) for blood pressure control and renal protection in diabetic patients.',
      pricePerUnit: 0.11, minOrder: 400, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_015', name: 'Atorvastatin 20mg', genericName: 'Atorvastatin Calcium',
      category: 'Cardiovascular', dosage: '20mg Film-coated Tablet',
      description: 'HMG-CoA reductase inhibitor for hypercholesterolemia and primary reduction of atherosclerotic cardiovascular risk.',
      pricePerUnit: 0.15, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_023', name: 'Telmisartan 40mg', genericName: 'Telmisartan',
      category: 'Cardiovascular', dosage: '40mg Tablet',
      description: 'Potent ARB with long half-life for smooth 24-hour ambulatory blood pressure reduction.',
      pricePerUnit: 0.14, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_024', name: 'Clopidogrel 75mg', genericName: 'Clopidogrel Bisulfate',
      category: 'Cardiovascular', dosage: '75mg Film-coated Tablet',
      description: 'Inhibitor of ADP-induced platelet aggregation for prevention of atherothrombotic events following MI and stent placement.',
      pricePerUnit: 0.25, minOrder: 200, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_025', name: 'Metoprolol Succinate ER 50mg', genericName: 'Metoprolol Succinate Extended Release',
      category: 'Cardiovascular', dosage: '50mg ER Tablet',
      description: 'Cardioselective beta-1 adrenergic receptor blocker for chronic heart failure, hypertension, and arrhythmias.',
      pricePerUnit: 0.18, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },

    /* === 5. DIABETES & METABOLIC CARE === */
    {
      id: 'med_004', name: 'Metformin Hydrochloride 500mg', genericName: 'Metformin HCl',
      category: 'Diabetes Care', dosage: '500mg Tablet',
      description: 'First-line biguanide oral antihyperglycemic for glycemic control in Type 2 Diabetes Mellitus.',
      pricePerUnit: 0.05, minOrder: 1000, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_026', name: 'Human Insulin Regular 100 IU/mL (10mL Vial)', genericName: 'Recombinant Human Insulin',
      category: 'Diabetes Care', dosage: '100 IU/mL (1000 IU / 10mL Vial)',
      description: 'Short-acting recombinant human insulin injection for urgent and maintenance glycemic control in diabetes.',
      pricePerUnit: 8.50, minOrder: 25, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'med_027', name: 'Glimepiride 2mg', genericName: 'Glimepiride',
      category: 'Diabetes Care', dosage: '2mg Tablet',
      description: 'Second-generation sulfonylurea stimulating pancreatic beta cells to produce natural insulin.',
      pricePerUnit: 0.08, minOrder: 400, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_028', name: 'Empagliflozin 25mg', genericName: 'Empagliflozin',
      category: 'Diabetes Care', dosage: '25mg Film-coated Tablet',
      description: 'SGLT2 inhibitor reducing blood glucose and providing proven cardiovascular and renal mortality benefits.',
      pricePerUnit: 0.85, minOrder: 150, inStock: true, unit: 'tablets', iconType: 'tablet',
    },

    /* === 6. GASTROINTESTINAL & DIGESTIVE === */
    {
      id: 'med_006', name: 'Omeprazole 20mg', genericName: 'Omeprazole',
      category: 'Gastrointestinal', dosage: '20mg Delayed-Release Capsule',
      description: 'Proton pump inhibitor (PPI) for gastric and duodenal ulcers, GERD, acid reflux, and H. pylori eradication.',
      pricePerUnit: 0.10, minOrder: 500, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_014', name: 'Pantoprazole Sodium 40mg', genericName: 'Pantoprazole Sodium',
      category: 'Gastrointestinal', dosage: '40mg Gastro-resistant Tablet',
      description: 'Targeted gastric acid suppressant for erosive esophagitis and Zollinger-Ellison syndrome.',
      pricePerUnit: 0.12, minOrder: 400, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_029', name: 'Ondansetron 4mg (Anti-Emetic)', genericName: 'Ondansetron HCl',
      category: 'Gastrointestinal', dosage: '4mg Orally Disintegrating Tablet',
      description: 'Serotonin 5-HT3 receptor antagonist preventing post-operative, gastroenteritis, and chemotherapy-induced nausea.',
      pricePerUnit: 0.20, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_030', name: 'Oral Rehydration Salts (ORS WHO Formula 20.5g)', genericName: 'Electrolyte & Dextrose Oral Solution',
      category: 'Gastrointestinal', dosage: '20.5g Powder Sachet for 1L Water',
      description: 'WHO-standard formulation for rehydration and electrolyte balance during severe diarrhea and dehydration.',
      pricePerUnit: 0.30, minOrder: 250, inStock: true, unit: 'sachets', iconType: 'sachet',
    },

    /* === 7. RESPIRATORY & ALLERGY === */
    {
      id: 'med_011', name: 'Salbutamol / Albuterol Inhaler (100mcg / 200 Doses)', genericName: 'Salbutamol Sulfate MDI',
      category: 'Respiratory', dosage: '100 mcg / actuation (200 Metered Doses)',
      description: 'Short-acting beta-2 agonist bronchodilator for instant relief of acute bronchospasm and asthma attacks.',
      pricePerUnit: 3.80, minOrder: 40, inStock: true, unit: 'inhalers', iconType: 'inhaler',
    },
    {
      id: 'med_031', name: 'Budesonide Inhaler 200mcg', genericName: 'Budesonide MDI',
      category: 'Respiratory', dosage: '200 mcg / actuation (200 Doses)',
      description: 'Inhaled corticosteroid providing long-term baseline control and anti-inflammatory action in asthma and COPD.',
      pricePerUnit: 6.50, minOrder: 30, inStock: true, unit: 'inhalers', iconType: 'inhaler',
    },
    {
      id: 'med_007', name: 'Cetirizine Hydrochloride 10mg', genericName: 'Cetirizine HCl',
      category: 'Allergy & Immunology', dosage: '10mg Film-coated Tablet',
      description: 'Non-drowsy second-generation antihistamine for allergic rhinitis, seasonal hay fever, and chronic urticaria.',
      pricePerUnit: 0.06, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_032', name: 'Montelukast Sodium 10mg', genericName: 'Montelukast Sodium',
      category: 'Respiratory', dosage: '10mg Film-coated Tablet',
      description: 'Leukotriene receptor antagonist for prophylaxis and chronic treatment of bronchial asthma and allergic rhinitis.',
      pricePerUnit: 0.22, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },

    /* === 8. ANTIVIRALS & ANTIFUNGALS === */
    {
      id: 'med_033', name: 'Acyclovir 400mg', genericName: 'Acyclovir',
      category: 'Antivirals & Antifungals', dosage: '400mg Tablet',
      description: 'Guanosine analog antiviral targeting Herpes Simplex virus (HSV-1, HSV-2) and Varicella Zoster (chickenpox/shingles).',
      pricePerUnit: 0.25, minOrder: 200, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_034', name: 'Fluconazole 150mg', genericName: 'Fluconazole',
      category: 'Antivirals & Antifungals', dosage: '150mg Single Dose Capsule',
      description: 'Triazole antifungal for candidiasis, systemic fungal infections, and cryptococcal meningitis.',
      pricePerUnit: 0.40, minOrder: 150, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_035', name: 'Oseltamivir 75mg (Tamiflu Generic)', genericName: 'Oseltamivir Phosphate',
      category: 'Antivirals & Antifungals', dosage: '75mg Hard Capsule',
      description: 'Neuraminidase inhibitor for oral treatment and prophylaxis of acute uncomplicated influenza A & B.',
      pricePerUnit: 1.40, minOrder: 100, inStock: true, unit: 'capsules', iconType: 'capsule',
    },

    /* === 9. VITAMINS, MINERALS & NUTRACEUTICALS === */
    {
      id: 'med_009', name: 'Vitamin D3 (Cholecalciferol 60,000 IU)', genericName: 'Cholecalciferol High Potency',
      category: 'Vitamins & Minerals', dosage: '60,000 IU Softgel Capsule',
      description: 'Weekly high-potency Vitamin D3 for clinical hypovitaminosis D, osteoporosis prevention, and bone density support.',
      pricePerUnit: 0.30, minOrder: 300, inStock: true, unit: 'softgels', iconType: 'softgel',
    },
    {
      id: 'med_010', name: 'Daily Complete Multivitamin + Minerals', genericName: 'Multivitamin Complex with Trace Elements',
      category: 'Vitamins & Minerals', dosage: 'Comprehensive Film-coated Tablet',
      description: 'All 24 essential daily micronutrients including Zinc, B-Complex, Vitamin C, Iron, and Magnesium.',
      pricePerUnit: 0.08, minOrder: 1000, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_036', name: 'Vitamin C 1000mg + Zinc 10mg Effervescent', genericName: 'Ascorbic Acid + Zinc Effervescent',
      category: 'Vitamins & Minerals', dosage: '1000mg / 10mg Effervescent Tablet',
      description: 'Fast-dissolving effervescent immune defense formulation with pharmaceutical grade bioavailability.',
      pricePerUnit: 0.18, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_037', name: 'Ferrous Ascorbate + Folic Acid Tablets', genericName: 'Iron Ascorbate 100mg + Folic Acid 1.5mg',
      category: 'Vitamins & Minerals', dosage: '100mg Elemental Iron Tablet',
      description: 'High-absorption therapeutic iron supplement for iron-deficiency anemia in adults and prenatal care.',
      pricePerUnit: 0.12, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },

    /* === 10. EMERGENCY & HOSPITAL CRITICAL CARE === */
    {
      id: 'med_038', name: 'Epinephrine Auto-Injector (Adrenaline 0.3mg)', genericName: 'Epinephrine Injection USP',
      category: 'Emergency & Critical Care', dosage: '0.3mg / 0.3 mL Single Auto-injector',
      description: 'Immediate intramuscular auto-injector for emergency life-saving treatment of severe anaphylaxis and allergic shock.',
      pricePerUnit: 34.00, minOrder: 15, inStock: true, unit: 'units', iconType: 'syringe',
    },
    {
      id: 'med_039', name: 'Normal Saline 0.9% Sodium Chloride IV (500ml)', genericName: '0.9% NaCl Sterile IV Infusion',
      category: 'Emergency & Critical Care', dosage: '500 mL Sterile Infusion Bag',
      description: 'Sterile isotonic IV infusion for fluid replacement, volume resuscitation, and IV drug reconstitution.',
      pricePerUnit: 1.10, minOrder: 100, inStock: true, unit: 'bottles', iconType: 'bottle',
    },
    {
      id: 'med_040', name: 'Hydrocortisone Sodium Succinate 100mg IV Injection', genericName: 'Hydrocortisone for Injection',
      category: 'Emergency & Critical Care', dosage: '100mg Lyophilized Sterile Vial',
      description: 'Emergency corticosteroid for acute adrenal crisis, severe status asthmaticus, and drug hypersensitivity reactions.',
      pricePerUnit: 2.10, minOrder: 50, inStock: true, unit: 'vials', iconType: 'vial',
    }
  ];

  /* ---- Initialize ---- */
  function init() {
    set(KEYS.MEDICINES, SEED_MEDICINES);
    set(KEYS.INITIALIZED, true);
    if (!get(KEYS.USERS)) set(KEYS.USERS, []);
    if (!get(KEYS.ORDERS)) set(KEYS.ORDERS, []);
    if (!get(KEYS.CART)) set(KEYS.CART, []);
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
