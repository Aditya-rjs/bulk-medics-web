/**
 * Bulk Medics — Data Store (localStorage)
 * Exhaustive Global Medicine, Vaccine & Pharmaceutical Therapeutic Database
 */

const Store = (() => {
  const KEYS = {
    USERS: 'bm_users',
    CURRENT_USER: 'bm_current_user',
    ORDERS: 'bm_orders',
    CART: 'bm_cart',
    MEDICINES: 'bm_medicines_v3', // bumped version
    INITIALIZED: 'bm_initialized_v3',
  };

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

  /* ---- Massive Global Pharmaceutical & Vaccine Catalog (100+ Essential Items) ---- */
  const SEED_MEDICINES = [
    /* =========================================================================
       1. ANTIBIOTICS & ANTIMICROBIALS
       ========================================================================= */
    {
      id: 'med_001', name: 'Amoxicillin 500mg', genericName: 'Amoxicillin Trihydrate',
      category: 'Antibiotics', dosage: '500mg Capsule',
      description: 'Broad-spectrum beta-lactam penicillin antibiotic for bacterial ear, chest, dental, and urinary tract infections.',
      pricePerUnit: 0.18, minOrder: 500, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_002', name: 'Augmentin 625mg (Amoxicillin + Clavulanate)', genericName: 'Co-amoxiclav 500/125mg',
      category: 'Antibiotics', dosage: '625mg Film-coated Tablet',
      description: 'Beta-lactamase inhibitor combination antibiotic for resistant bacterial infections across ENT and lower respiratory tract.',
      pricePerUnit: 0.65, minOrder: 200, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_003', name: 'Azithromycin 500mg', genericName: 'Azithromycin Dihydrate',
      category: 'Antibiotics', dosage: '500mg Film-coated Tablet',
      description: 'Potent macrolide antibiotic for upper and lower respiratory tract infections, skin infections, and STIs.',
      pricePerUnit: 0.45, minOrder: 200, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_004', name: 'Ciprofloxacin 500mg', genericName: 'Ciprofloxacin Hydrochloride',
      category: 'Antibiotics', dosage: '500mg Film-coated Tablet',
      description: 'Second-generation fluoroquinolone antibiotic targeting severe urinary, gastrointestinal, and bone infections.',
      pricePerUnit: 0.28, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_005', name: 'Doxycycline Hyclate 100mg', genericName: 'Doxycycline Hyclate',
      category: 'Antibiotics', dosage: '100mg Capsule',
      description: 'Broad-spectrum tetracycline antibiotic for acne, Lyme disease, malaria prophylaxis, and atypical pneumonia.',
      pricePerUnit: 0.22, minOrder: 300, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_006', name: 'Ceftriaxone Sodium 1g IV/IM Injection', genericName: 'Ceftriaxone Sodium Sterile',
      category: 'Antibiotics', dosage: '1.0 g Sterile Vial with Diluent',
      description: 'Third-generation cephalosporin for hospital inpatient care, bacterial meningitis, sepsis, and surgical prophylaxis.',
      pricePerUnit: 3.20, minOrder: 100, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'med_007', name: 'Metronidazole 400mg', genericName: 'Metronidazole',
      category: 'Antibiotics', dosage: '400mg Tablet',
      description: 'Antiprotozoal and antibacterial targeting anaerobic bacterial infections, amoebiasis, and dental abscesses.',
      pricePerUnit: 0.12, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_008', name: 'Levofloxacin 500mg', genericName: 'Levofloxacin Hemihydrate',
      category: 'Antibiotics', dosage: '500mg Film-coated Tablet',
      description: 'Third-generation fluoroquinolone for community-acquired pneumonia, acute pyelonephritis, and sinusitis.',
      pricePerUnit: 0.40, minOrder: 250, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_009', name: 'Clarithromycin 500mg', genericName: 'Clarithromycin',
      category: 'Antibiotics', dosage: '500mg Tablet',
      description: 'Macrolide antibiotic active against H. pylori, streptococcal pharyngitis, and skin infections.',
      pricePerUnit: 0.55, minOrder: 200, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_010', name: 'Cephalexin 500mg', genericName: 'Cephalexin Monohydrate',
      category: 'Antibiotics', dosage: '500mg Capsule',
      description: 'First-generation oral cephalosporin widely indicated for cellulitis, mastitis, and UTI.',
      pricePerUnit: 0.25, minOrder: 400, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_011', name: 'Cotrimoxazole (Sulfamethoxazole 800mg + Trimethoprim 160mg)', genericName: 'Co-trimoxazole DS',
      category: 'Antibiotics', dosage: '960mg Double Strength Tablet',
      description: 'Synergistic folate antagonist antibiotic for recurrent UTIs, shigellosis, and Pneumocystis prophylaxis.',
      pricePerUnit: 0.16, minOrder: 400, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_012', name: 'Vancomycin 500mg IV Infusion', genericName: 'Vancomycin Hydrochloride',
      category: 'Antibiotics', dosage: '500mg Lyophilized Powder Vial',
      description: 'Glycopeptide antibiotic for severe MRSA (Methicillin-Resistant S. Aureus) and enterococcal infections.',
      pricePerUnit: 7.50, minOrder: 50, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'med_013', name: 'Meropenem 1g IV Injection', genericName: 'Meropenem Trihydrate',
      category: 'Antibiotics', dosage: '1.0 g Powder for Injection',
      description: 'Ultra broad-spectrum carbapenem antibiotic for severe multidrug-resistant nosocomial and ICU infections.',
      pricePerUnit: 11.50, minOrder: 40, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'med_014', name: 'Nitrofurantoin 100mg', genericName: 'Nitrofurantoin Macrocrystals',
      category: 'Antibiotics', dosage: '100mg Capsule',
      description: 'Specific urinary antiseptic antibiotic for uncomplicated acute cystitis and bladder infections.',
      pricePerUnit: 0.30, minOrder: 200, inStock: true, unit: 'capsules', iconType: 'capsule',
    },

    /* =========================================================================
       2. PAIN RELIEF, ANALGESICS & NSAIDs
       ========================================================================= */
    {
      id: 'med_015', name: 'Paracetamol 500mg (Acetaminophen)', genericName: 'Paracetamol',
      category: 'Pain Relief', dosage: '500mg Tablet',
      description: 'First-line analgesic and antipyretic for mild-to-moderate pain management, headaches, and fever reduction.',
      pricePerUnit: 0.04, minOrder: 1000, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_016', name: 'Paracetamol 650mg (Fast Action)', genericName: 'Paracetamol High Potency',
      category: 'Pain Relief', dosage: '650mg Tablet',
      description: 'High-strength paracetamol for severe viral fevers, body aches, and post-vaccination discomfort.',
      pricePerUnit: 0.06, minOrder: 800, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_017', name: 'Ibuprofen 400mg', genericName: 'Ibuprofen',
      category: 'Pain Relief', dosage: '400mg Film-coated Tablet',
      description: 'Non-steroidal anti-inflammatory drug (NSAID) for arthritis, muscular pain, menstrual cramps, and dental pain.',
      pricePerUnit: 0.08, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_018', name: 'Diclofenac Sodium 50mg', genericName: 'Diclofenac Sodium Gastro-resistant',
      category: 'Pain Relief', dosage: '50mg Tablet',
      description: 'Potent NSAID for acute joint inflammation, osteoarthritis, rheumatoid conditions, and post-op trauma.',
      pricePerUnit: 0.09, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_019', name: 'Naproxen 500mg', genericName: 'Naproxen',
      category: 'Pain Relief', dosage: '500mg Tablet',
      description: 'Long-acting NSAID for chronic joint inflammation, ankylosing spondylitis, acute gout, and migraines.',
      pricePerUnit: 0.15, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_020', name: 'Tramadol Hydrochloride 50mg', genericName: 'Tramadol HCl',
      category: 'Pain Relief', dosage: '50mg Capsule',
      description: 'Centrally acting opioid analgesic for moderate-to-severe acute post-surgical and orthopedic pain.',
      pricePerUnit: 0.35, minOrder: 200, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_021', name: 'Aspirin 75mg (Low Dose Cardio)', genericName: 'Acetylsalicylic Acid',
      category: 'Pain Relief', dosage: '75mg Gastro-resistant Tablet',
      description: 'Antiplatelet and analgesic agent for secondary prevention of thrombotic cardiovascular events and stroke.',
      pricePerUnit: 0.05, minOrder: 1000, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_022', name: 'Celecoxib 200mg', genericName: 'Celecoxib',
      category: 'Pain Relief', dosage: '200mg Capsule',
      description: 'Selective COX-2 inhibitor with reduced gastrointestinal ulceration risk for chronic arthritis pain.',
      pricePerUnit: 0.38, minOrder: 200, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_023', name: 'Ketorolac Tromethamine 10mg', genericName: 'Ketorolac Tromethamine',
      category: 'Pain Relief', dosage: '10mg Tablet',
      description: 'Potent non-narcotic analgesic for short-term management of moderate to severe acute postoperative pain.',
      pricePerUnit: 0.22, minOrder: 250, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_024', name: 'Mefenamic Acid 500mg', genericName: 'Mefenamic Acid',
      category: 'Pain Relief', dosage: '500mg Tablet',
      description: 'Non-steroidal analgesic specialized for severe primary dysmenorrhea and menorrhagia.',
      pricePerUnit: 0.14, minOrder: 400, inStock: true, unit: 'tablets', iconType: 'tablet',
    },

    /* =========================================================================
       3. CARDIOVASCULAR & HYPERTENSION
       ========================================================================= */
    {
      id: 'med_025', name: 'Amlodipine Besylate 5mg', genericName: 'Amlodipine',
      category: 'Cardiovascular', dosage: '5mg Tablet',
      description: 'Long-acting dihydropyridine calcium channel blocker for chronic essential hypertension and stable angina.',
      pricePerUnit: 0.07, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_026', name: 'Losartan Potassium 50mg', genericName: 'Losartan Potassium',
      category: 'Cardiovascular', dosage: '50mg Film-coated Tablet',
      description: 'Angiotensin II receptor antagonist (ARB) for blood pressure control and renal protection in diabetic nephropathy.',
      pricePerUnit: 0.11, minOrder: 400, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_027', name: 'Telmisartan 40mg', genericName: 'Telmisartan',
      category: 'Cardiovascular', dosage: '40mg Tablet',
      description: 'Potent ARB with long half-life for smooth 24-hour ambulatory blood pressure reduction.',
      pricePerUnit: 0.14, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_028', name: 'Atorvastatin 20mg', genericName: 'Atorvastatin Calcium',
      category: 'Cardiovascular', dosage: '20mg Film-coated Tablet',
      description: 'HMG-CoA reductase inhibitor for hypercholesterolemia and reduction of atherosclerotic cardiovascular risk.',
      pricePerUnit: 0.15, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_029', name: 'Rosuvastatin Calcium 10mg', genericName: 'Rosuvastatin Calcium',
      category: 'Cardiovascular', dosage: '10mg Film-coated Tablet',
      description: 'High-intensity statin providing substantial LDL-C lowering and cardiovascular event reduction.',
      pricePerUnit: 0.24, minOrder: 250, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_030', name: 'Clopidogrel 75mg', genericName: 'Clopidogrel Bisulfate',
      category: 'Cardiovascular', dosage: '75mg Film-coated Tablet',
      description: 'Inhibitor of platelet aggregation for prevention of atherothrombotic events following MI and coronary stenting.',
      pricePerUnit: 0.25, minOrder: 200, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_031', name: 'Metoprolol Succinate ER 50mg', genericName: 'Metoprolol Succinate Extended Release',
      category: 'Cardiovascular', dosage: '50mg ER Tablet',
      description: 'Cardioselective beta-1 adrenergic receptor blocker for chronic heart failure, angina, and hypertension.',
      pricePerUnit: 0.18, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_032', name: 'Enalapril Maleate 5mg', genericName: 'Enalapril Maleate',
      category: 'Cardiovascular', dosage: '5mg Tablet',
      description: 'ACE inhibitor improving left ventricular dysfunction, post-infarction survival, and arterial pressure.',
      pricePerUnit: 0.08, minOrder: 400, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_033', name: 'Furosemide 40mg (Lasix Generic)', genericName: 'Furosemide',
      category: 'Cardiovascular', dosage: '40mg Tablet',
      description: 'Loop diuretic for prompt elimination of acute pulmonary edema, congestive heart failure fluid, and ascites.',
      pricePerUnit: 0.06, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_034', name: 'Spironolactone 25mg', genericName: 'Spironolactone',
      category: 'Cardiovascular', dosage: '25mg Tablet',
      description: 'Potassium-sparing aldosterone receptor antagonist for severe heart failure, resistant hypertension, and cirrhosis.',
      pricePerUnit: 0.13, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_035', name: 'Hydrochlorothiazide 25mg', genericName: 'Hydrochlorothiazide',
      category: 'Cardiovascular', dosage: '25mg Tablet',
      description: 'Thiazide diuretic reducing peripheral vascular resistance in primary essential hypertension.',
      pricePerUnit: 0.05, minOrder: 600, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_036', name: 'Apixaban 5mg (Eliquis Generic)', genericName: 'Apixaban',
      category: 'Cardiovascular', dosage: '5mg Film-coated Tablet',
      description: 'Direct Factor Xa inhibitor oral anticoagulant for stroke prevention in non-valvular atrial fibrillation and DVT/PE.',
      pricePerUnit: 1.10, minOrder: 100, inStock: true, unit: 'tablets', iconType: 'tablet',
    },

    /* =========================================================================
       4. DIABETES & ENDOCRINE METABOLISM
       ========================================================================= */
    {
      id: 'med_037', name: 'Metformin Hydrochloride 500mg', genericName: 'Metformin HCl',
      category: 'Diabetes Care', dosage: '500mg Tablet',
      description: 'First-line biguanide oral antihyperglycemic for glycemic control in Type 2 Diabetes Mellitus.',
      pricePerUnit: 0.05, minOrder: 1000, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_038', name: 'Metformin 1000mg Sustained Release', genericName: 'Metformin HCl SR',
      category: 'Diabetes Care', dosage: '1000mg SR Tablet',
      description: 'Once-daily sustained release formulation for enhanced gastrointestinal tolerability.',
      pricePerUnit: 0.09, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_039', name: 'Recombinant Human Insulin Regular 100 IU/mL', genericName: 'Human Insulin Regular (rDNA)',
      category: 'Diabetes Care', dosage: '100 IU/mL (10mL Vial)',
      description: 'Fast-acting human insulin injection for precise mealtime glycemic control and diabetic ketoacidosis management.',
      pricePerUnit: 8.50, minOrder: 25, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'med_040', name: 'Insulin Glargine 100 U/mL (Lantus Generic)', genericName: 'Insulin Glargine (rDNA)',
      category: 'Diabetes Care', dosage: '100 U/mL (3mL Cartridge / Pen)',
      description: 'Peakless 24-hour long-acting basal insulin analog providing stable overnight glycemic management.',
      pricePerUnit: 16.50, minOrder: 20, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'med_041', name: 'Glimepiride 2mg', genericName: 'Glimepiride',
      category: 'Diabetes Care', dosage: '2mg Tablet',
      description: 'Second-generation sulfonylurea stimulating pancreatic beta cells to produce natural insulin.',
      pricePerUnit: 0.08, minOrder: 400, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_042', name: 'Empagliflozin 25mg (Jardiance Generic)', genericName: 'Empagliflozin',
      category: 'Diabetes Care', dosage: '25mg Film-coated Tablet',
      description: 'SGLT2 inhibitor reducing blood glucose and providing cardiovascular and renal protection.',
      pricePerUnit: 0.85, minOrder: 150, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_043', name: 'Dapagliflozin 10mg (Forxiga Generic)', genericName: 'Dapagliflozin Propanediol',
      category: 'Diabetes Care', dosage: '10mg Tablet',
      description: 'Selective SGLT2 inhibitor promoting urinary glucose excretion and managing heart failure with reduced ejection fraction.',
      pricePerUnit: 0.75, minOrder: 150, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_044', name: 'Sitagliptin 100mg (Januvia Generic)', genericName: 'Sitagliptin Phosphate',
      category: 'Diabetes Care', dosage: '100mg Film-coated Tablet',
      description: 'DPP-4 inhibitor enhancing incretin hormones to stimulate glucose-dependent insulin release without hypoglycemia.',
      pricePerUnit: 0.60, minOrder: 200, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_045', name: 'Levothyroxine Sodium 100mcg', genericName: 'Levothyroxine Sodium',
      category: 'Diabetes Care', dosage: '100 mcg Tablet',
      description: 'Synthetic T4 thyroid hormone replacement for primary, secondary, and tertiary hypothyroidism.',
      pricePerUnit: 0.08, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },

    /* =========================================================================
       5. GASTROINTESTINAL & DIGESTIVE
       ========================================================================= */
    {
      id: 'med_046', name: 'Omeprazole 20mg', genericName: 'Omeprazole',
      category: 'Gastrointestinal', dosage: '20mg Delayed-Release Capsule',
      description: 'Proton pump inhibitor (PPI) for gastric and duodenal ulcers, GERD, acid reflux, and H. pylori eradication.',
      pricePerUnit: 0.10, minOrder: 500, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_047', name: 'Pantoprazole Sodium 40mg', genericName: 'Pantoprazole Sodium',
      category: 'Gastrointestinal', dosage: '40mg Gastro-resistant Tablet',
      description: 'Targeted gastric acid suppressant for erosive esophagitis and Zollinger-Ellison syndrome.',
      pricePerUnit: 0.12, minOrder: 400, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_048', name: 'Esomeprazole 40mg (Nexium Generic)', genericName: 'Esomeprazole Magnesium',
      category: 'Gastrointestinal', dosage: '40mg Tablet',
      description: 'S-isomer of omeprazole providing sustained gastric acid suppression and ulcer healing.',
      pricePerUnit: 0.22, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_049', name: 'Ondansetron 4mg (Anti-Emetic)', genericName: 'Ondansetron HCl',
      category: 'Gastrointestinal', dosage: '4mg Orally Disintegrating Tablet',
      description: '5-HT3 receptor antagonist preventing post-operative, viral gastroenteritis, and chemotherapy nausea.',
      pricePerUnit: 0.20, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_050', name: 'Domperidone 10mg', genericName: 'Domperidone',
      category: 'Gastrointestinal', dosage: '10mg Tablet',
      description: 'Peripheral dopamine D2 receptor antagonist for relief of nausea, vomiting, and gastric fullness in gastroparesis.',
      pricePerUnit: 0.08, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_051', name: 'Loperamide Hydrochloride 2mg', genericName: 'Loperamide HCl',
      category: 'Gastrointestinal', dosage: '2mg Capsule',
      description: 'Opioid receptor agonist anti-diarrheal slowing intestinal motility in acute non-infectious diarrhea.',
      pricePerUnit: 0.07, minOrder: 500, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_052', name: 'Oral Rehydration Salts (WHO Formula 20.5g)', genericName: 'Electrolyte & Dextrose Solution',
      category: 'Gastrointestinal', dosage: '20.5g Sachet for 1 Litre Water',
      description: 'WHO-standard formulation for rehydration and electrolyte replenishment during acute dehydrating illnesses.',
      pricePerUnit: 0.30, minOrder: 250, inStock: true, unit: 'sachets', iconType: 'sachet',
    },

    /* =========================================================================
       6. RESPIRATORY & PULMONOLOGY
       ========================================================================= */
    {
      id: 'med_053', name: 'Salbutamol Inhaler (100mcg / 200 Doses)', genericName: 'Salbutamol Sulfate MDI',
      category: 'Respiratory', dosage: '100 mcg / actuation (200 Metered Doses)',
      description: 'Short-acting beta-2 agonist bronchodilator for instant relief of acute bronchospasm and asthma exacerbations.',
      pricePerUnit: 3.80, minOrder: 40, inStock: true, unit: 'inhalers', iconType: 'inhaler',
    },
    {
      id: 'med_054', name: 'Budesonide Inhaler 200mcg (Pulmicort Generic)', genericName: 'Budesonide MDI',
      category: 'Respiratory', dosage: '200 mcg / actuation (200 Doses)',
      description: 'Inhaled corticosteroid providing long-term baseline control and airway anti-inflammatory action in asthma and COPD.',
      pricePerUnit: 6.50, minOrder: 30, inStock: true, unit: 'inhalers', iconType: 'inhaler',
    },
    {
      id: 'med_055', name: 'Fluticasone Propionate Inhaler 125mcg', genericName: 'Fluticasone Propionate',
      category: 'Respiratory', dosage: '125 mcg (120 Metered Actuations)',
      description: 'Potent synthetic glucocorticoid inhaler for continuous prophylactic management of severe persistent asthma.',
      pricePerUnit: 7.20, minOrder: 30, inStock: true, unit: 'inhalers', iconType: 'inhaler',
    },
    {
      id: 'med_056', name: 'Montelukast Sodium 10mg', genericName: 'Montelukast Sodium',
      category: 'Respiratory', dosage: '10mg Film-coated Tablet',
      description: 'Leukotriene receptor antagonist for prophylaxis and chronic treatment of bronchial asthma and allergic rhinitis.',
      pricePerUnit: 0.22, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_057', name: 'Acetylcysteine 600mg Effervescent', genericName: 'N-Acetylcysteine (NAC)',
      category: 'Respiratory', dosage: '600mg Effervescent Tablet',
      description: 'Mucolytic agent dissolving thick bronchial secretions in bronchitis, cystic fibrosis, and paracetamol toxicity antidote.',
      pricePerUnit: 0.35, minOrder: 200, inStock: true, unit: 'tablets', iconType: 'tablet',
    },

    /* =========================================================================
       7. ALLERGY & IMMUNOLOGY
       ========================================================================= */
    {
      id: 'med_058', name: 'Cetirizine Hydrochloride 10mg', genericName: 'Cetirizine HCl',
      category: 'Allergy & Immunology', dosage: '10mg Film-coated Tablet',
      description: 'Second-generation non-sedating antihistamine for seasonal hay fever, perennial allergic rhinitis, and urticaria.',
      pricePerUnit: 0.06, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_059', name: 'Levocetirizine Dihydrochloride 5mg', genericName: 'Levocetirizine HCl',
      category: 'Allergy & Immunology', dosage: '5mg Tablet',
      description: 'Pure active R-enantiomer of cetirizine offering high receptor affinity and rapid allergy relief.',
      pricePerUnit: 0.09, minOrder: 400, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_060', name: 'Fexofenadine 180mg (Allegra Generic)', genericName: 'Fexofenadine HCl',
      category: 'Allergy & Immunology', dosage: '180mg Tablet',
      description: 'Non-sedating third-generation antihistamine with zero central nervous system penetration for all-day allergy relief.',
      pricePerUnit: 0.28, minOrder: 250, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_061', name: 'Loratadine 10mg (Claritin Generic)', genericName: 'Loratadine',
      category: 'Allergy & Immunology', dosage: '10mg Tablet',
      description: 'Long-acting tricyclic peripheral histamine H1-receptor blocker for ocular and nasal allergy symptoms.',
      pricePerUnit: 0.08, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },

    /* =========================================================================
       8. ANTIVIRALS & ANTIFUNGALS
       ========================================================================= */
    {
      id: 'med_062', name: 'Acyclovir 400mg', genericName: 'Acyclovir',
      category: 'Antivirals & Antifungals', dosage: '400mg Tablet',
      description: 'Synthetic purine nucleoside antiviral for Herpes Simplex (HSV) and Varicella Zoster (shingles) infections.',
      pricePerUnit: 0.25, minOrder: 200, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_063', name: 'Valacyclovir 500mg (Valtrex Generic)', genericName: 'Valacyclovir HCl',
      category: 'Antivirals & Antifungals', dosage: '500mg Caplet',
      description: 'L-valyl ester prodrug of acyclovir offering three- to five-fold greater oral bioavailability.',
      pricePerUnit: 0.65, minOrder: 150, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_064', name: 'Fluconazole 150mg', genericName: 'Fluconazole',
      category: 'Antivirals & Antifungals', dosage: '150mg Single Dose Capsule',
      description: 'Triazole antifungal inhibiting fungal cytochrome P450 for candidiasis and systemic mycoses.',
      pricePerUnit: 0.40, minOrder: 150, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_065', name: 'Itraconazole 100mg', genericName: 'Itraconazole',
      category: 'Antivirals & Antifungals', dosage: '100mg Pellet Capsule',
      description: 'Broad-spectrum systemic antifungal for aspergillosis, blastomycosis, onychomycosis, and histoplasmosis.',
      pricePerUnit: 0.55, minOrder: 150, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_066', name: 'Oseltamivir 75mg (Tamiflu Generic)', genericName: 'Oseltamivir Phosphate',
      category: 'Antivirals & Antifungals', dosage: '75mg Hard Capsule',
      description: 'Neuraminidase inhibitor indicated for acute treatment and prophylaxis of Influenza A and B viral infections.',
      pricePerUnit: 1.40, minOrder: 100, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_067', name: 'Tenofovir Disoproxil Fumarate 300mg', genericName: 'TDF 300mg',
      category: 'Antivirals & Antifungals', dosage: '300mg Film-coated Tablet',
      description: 'Nucleotide reverse transcriptase inhibitor for chronic Hepatitis B and combination HIV-1 antiretroviral therapy.',
      pricePerUnit: 0.90, minOrder: 100, inStock: true, unit: 'tablets', iconType: 'tablet',
    },

    /* =========================================================================
       9. NEUROLOGY & MENTAL HEALTH
       ========================================================================= */
    {
      id: 'med_068', name: 'Sertraline Hydrochloride 50mg (Zoloft Generic)', genericName: 'Sertraline HCl',
      category: 'Neurology & Mental Health', dosage: '50mg Film-coated Tablet',
      description: 'Selective serotonin reuptake inhibitor (SSRI) for major depressive disorder, OCD, panic disorder, and PTSD.',
      pricePerUnit: 0.20, minOrder: 250, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_069', name: 'Escitalopram 10mg (Lexapro Generic)', genericName: 'Escitalopram Oxalate',
      category: 'Neurology & Mental Health', dosage: '10mg Film-coated Tablet',
      description: 'Pure active S-enantiomer SSRI for generalized anxiety disorder (GAD) and clinical depression.',
      pricePerUnit: 0.18, minOrder: 300, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_070', name: 'Gabapentin 300mg', genericName: 'Gabapentin',
      category: 'Neurology & Mental Health', dosage: '300mg Capsule',
      description: 'GABA analog for neuropathic pain associated with diabetic neuropathy, postherpetic neuralgia, and partial seizures.',
      pricePerUnit: 0.22, minOrder: 300, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_071', name: 'Pregabalin 75mg (Lyrica Generic)', genericName: 'Pregabalin',
      category: 'Neurology & Mental Health', dosage: '75mg Capsule',
      description: 'Voltage-gated calcium channel alpha-2-delta subunit ligand for fibromyalgia, peripheral neuropathy, and generalized anxiety.',
      pricePerUnit: 0.32, minOrder: 200, inStock: true, unit: 'capsules', iconType: 'capsule',
    },
    {
      id: 'med_072', name: 'Levetiracetam 500mg (Keppra Generic)', genericName: 'Levetiracetam',
      category: 'Neurology & Mental Health', dosage: '500mg Film-coated Tablet',
      description: 'Broad-spectrum antiepileptic targeting SV2A vesicle protein for myoclonic, tonic-clonic, and partial onset seizures.',
      pricePerUnit: 0.36, minOrder: 200, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_073', name: 'Sodium Valproate 500mg CR', genericName: 'Sodium Valproate Controlled Release',
      category: 'Neurology & Mental Health', dosage: '500mg CR Tablet',
      description: 'Anticonvulsant and mood stabilizer for absence, generalized seizures, and bipolar affective disorder mania.',
      pricePerUnit: 0.26, minOrder: 250, inStock: true, unit: 'tablets', iconType: 'tablet',
    },

    /* =========================================================================
       10. VITAMINS, MINERALS & NUTRACEUTICALS
       ========================================================================= */
    {
      id: 'med_074', name: 'Vitamin D3 (Cholecalciferol 60,000 IU)', genericName: 'Cholecalciferol High Potency',
      category: 'Vitamins & Minerals', dosage: '60,000 IU Softgel Capsule',
      description: 'Weekly high-potency Vitamin D3 for clinical hypovitaminosis D, osteoporosis prevention, and bone density support.',
      pricePerUnit: 0.30, minOrder: 300, inStock: true, unit: 'softgels', iconType: 'softgel',
    },
    {
      id: 'med_075', name: 'Daily Complete Multivitamin + Minerals', genericName: 'Multivitamin Complex with Trace Elements',
      category: 'Vitamins & Minerals', dosage: 'Comprehensive Film-coated Tablet',
      description: 'All 24 essential daily micronutrients including Zinc, B-Complex, Vitamin C, Iron, and Magnesium.',
      pricePerUnit: 0.08, minOrder: 1000, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_076', name: 'Vitamin C 1000mg + Zinc 10mg Effervescent', genericName: 'Ascorbic Acid + Zinc Effervescent',
      category: 'Vitamins & Minerals', dosage: '1000mg / 10mg Effervescent Tablet',
      description: 'Fast-dissolving effervescent immune defense formulation with pharmaceutical grade bioavailability.',
      pricePerUnit: 0.18, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_077', name: 'Ferrous Ascorbate + Folic Acid Tablets', genericName: 'Iron Ascorbate 100mg + Folic Acid 1.5mg',
      category: 'Vitamins & Minerals', dosage: '100mg Elemental Iron Tablet',
      description: 'High-absorption therapeutic iron supplement for iron-deficiency anemia in adults and prenatal care.',
      pricePerUnit: 0.12, minOrder: 500, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_078', name: 'Methylcobalamin (Vitamin B12) 1500mcg', genericName: 'Methylcobalamin Sublingual',
      category: 'Vitamins & Minerals', dosage: '1500 mcg Tablet',
      description: 'Active coenzyme form of B12 supporting myelin sheath regeneration, peripheral neuropathy, and RBC synthesis.',
      pricePerUnit: 0.14, minOrder: 400, inStock: true, unit: 'tablets', iconType: 'tablet',
    },
    {
      id: 'med_079', name: 'Calcium Carbonate 500mg + Vitamin D3', genericName: 'Calcium 500mg + D3 250IU',
      category: 'Vitamins & Minerals', dosage: '500mg Tablet',
      description: 'Essential mineral supplement for bone mineralization, osteopenia, and postmenopausal calcium balance.',
      pricePerUnit: 0.09, minOrder: 600, inStock: true, unit: 'tablets', iconType: 'tablet',
    },

    /* =========================================================================
       11. EMERGENCY, CRITICAL CARE & SURGICAL
       ========================================================================= */
    {
      id: 'med_080', name: 'Epinephrine Auto-Injector (Adrenaline 0.3mg)', genericName: 'Epinephrine Injection USP',
      category: 'Emergency & Critical Care', dosage: '0.3mg / 0.3 mL Single Auto-injector',
      description: 'Immediate intramuscular auto-injector for emergency life-saving treatment of severe anaphylaxis and allergic shock.',
      pricePerUnit: 34.00, minOrder: 15, inStock: true, unit: 'units', iconType: 'syringe',
    },
    {
      id: 'med_081', name: 'Normal Saline 0.9% Sodium Chloride IV (500ml)', genericName: '0.9% NaCl Sterile IV Infusion',
      category: 'Emergency & Critical Care', dosage: '500 mL Sterile Infusion Bag',
      description: 'Sterile isotonic IV infusion for fluid replacement, volume resuscitation, and IV drug reconstitution.',
      pricePerUnit: 1.10, minOrder: 100, inStock: true, unit: 'bottles', iconType: 'bottle',
    },
    {
      id: 'med_082', name: 'Ringer Lactate Solution IV (500ml)', genericName: 'Compound Sodium Lactate Infusion',
      category: 'Emergency & Critical Care', dosage: '500 mL Sterile Bottle',
      description: 'Balanced crystalloid fluid restoring extracellular volume and electrolyte losses in surgical shock and trauma.',
      pricePerUnit: 1.25, minOrder: 100, inStock: true, unit: 'bottles', iconType: 'bottle',
    },
    {
      id: 'med_083', name: 'Hydrocortisone Sodium Succinate 100mg IV Injection', genericName: 'Hydrocortisone for Injection',
      category: 'Emergency & Critical Care', dosage: '100mg Lyophilized Sterile Vial',
      description: 'Emergency corticosteroid for acute adrenal crisis, severe status asthmaticus, and drug hypersensitivity reactions.',
      pricePerUnit: 2.10, minOrder: 50, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'med_084', name: 'Atropine Sulfate 0.6mg/mL Injection', genericName: 'Atropine Sulfate USP',
      category: 'Emergency & Critical Care', dosage: '0.6mg / 1 mL Ampoule',
      description: 'Anticholinergic agent for symptomatic sinus bradycardia, organophosphate poisoning antidote, and pre-anesthetic drying.',
      pricePerUnit: 0.85, minOrder: 100, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'med_085', name: 'Lidocaine / Lignocaine 2% Injection (30ml Vial)', genericName: 'Lidocaine HCl 20mg/mL',
      category: 'Emergency & Critical Care', dosage: '2% (20mg/mL) 30mL Multiple Dose Vial',
      description: 'Local anesthetic for minor surgical infiltration, dental nerve block, and acute ventricular arrhythmia suppression.',
      pricePerUnit: 2.40, minOrder: 40, inStock: true, unit: 'vials', iconType: 'vial',
    },

    /* =========================================================================
       12. VACCINES & IMMUNIZATIONS (WHO Global Pre-qualified)
       ========================================================================= */
    {
      id: 'vac_086', name: 'Hepatitis B Recombinant Vaccine (20mcg/ml)', genericName: 'Hepatitis B Vaccine (rDNA)',
      category: 'Vaccines & Biologics', dosage: '20 mcg / 1.0 mL Single Dose Vial',
      description: 'Purified recombinant DNA surface antigen vaccine for immunization against Hepatitis B virus. Cold-chain verified.',
      pricePerUnit: 14.50, minOrder: 50, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'vac_087', name: 'Inactivated Influenza Vaccine (Quadrivalent)', genericName: 'Influenza Virus Vaccine',
      category: 'Vaccines & Biologics', dosage: '0.5 mL Pre-filled Syringe',
      description: 'Seasonal quadrivalent influenza vaccine offering broad strain protection against circulating flu viruses.',
      pricePerUnit: 18.00, minOrder: 50, inStock: true, unit: 'doses', iconType: 'syringe',
    },
    {
      id: 'vac_088', name: 'MMR Vaccine (Measles, Mumps, Rubella Live)', genericName: 'MMR Vaccine Live Attenuated',
      category: 'Vaccines & Biologics', dosage: '0.5 mL Single Dose Vial with Diluent',
      description: 'Lyophilized live attenuated vaccine providing combined immunity against measles, mumps, and rubella.',
      pricePerUnit: 16.20, minOrder: 40, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'vac_089', name: 'Tetanus & Diphtheria (Td) Toxoid Vaccine', genericName: 'Tetanus and Diphtheria Toxoids',
      category: 'Vaccines & Biologics', dosage: '5.0 mL 10-Dose Multi-dose Vial',
      description: 'Adsorbed toxoids for active booster immunization against tetanus and diphtheria in adolescents and adults.',
      pricePerUnit: 22.00, minOrder: 25, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'vac_090', name: 'Rabies Purified Vero Cell Vaccine', genericName: 'Inactivated Rabies Vaccine',
      category: 'Vaccines & Biologics', dosage: '2.5 IU / 0.5 mL with Diluent',
      description: 'Purified Vero cell rabies vaccine for pre-exposure and post-exposure prophylaxis against rabies virus.',
      pricePerUnit: 28.50, minOrder: 30, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'vac_091', name: 'Typhoid Vi Polysaccharide Conjugate Vaccine', genericName: 'Typhoid Conjugate Vaccine',
      category: 'Vaccines & Biologics', dosage: '25 mcg / 0.5 mL Single Dose',
      description: 'Conjugate vaccine for active prevention of typhoid fever caused by Salmonella enterica serovar Typhi.',
      pricePerUnit: 19.80, minOrder: 40, inStock: true, unit: 'doses', iconType: 'vial',
    },
    {
      id: 'vac_092', name: 'Pneumococcal Conjugate Vaccine (13-Valent)', genericName: 'Pneumococcal 13-valent Conjugate',
      category: 'Vaccines & Biologics', dosage: '0.5 mL Pre-filled Syringe',
      description: 'Sterile suspension of saccharides of capsular antigens of Streptococcus pneumoniae serotypes.',
      pricePerUnit: 42.00, minOrder: 20, inStock: true, unit: 'doses', iconType: 'syringe',
    },
    {
      id: 'vac_093', name: 'Inactivated Poliovirus Vaccine (IPV)', genericName: 'Poliovirus Vaccine Inactivated',
      category: 'Vaccines & Biologics', dosage: '0.5 mL Single Dose Ampoule',
      description: 'Trivalent inactivated vaccine containing Mahoney type 1, MEF-1 type 2, and Saukett type 3 polioviruses.',
      pricePerUnit: 15.00, minOrder: 50, inStock: true, unit: 'doses', iconType: 'vial',
    },
    {
      id: 'vac_094', name: 'BCG Vaccine for Tuberculosis (Freeze-Dried)', genericName: 'Bacillus Calmette-Guerin Vaccine',
      category: 'Vaccines & Biologics', dosage: '0.1 mL Multi-dose Vial (10 Doses)',
      description: 'Live attenuated Mycobacterium bovis strain for primary neonatal prophylaxis against tuberculosis and TB meningitis.',
      pricePerUnit: 18.50, minOrder: 30, inStock: true, unit: 'vials', iconType: 'vial',
    },
    {
      id: 'vac_095', name: 'HPV Vaccine (Human Papillomavirus 9-Valent)', genericName: 'Recombinant HPV 9-Valent',
      category: 'Vaccines & Biologics', dosage: '0.5 mL Single Dose Pre-filled Syringe',
      description: 'Non-infectious recombinant vaccine protecting against HPV types 6, 11, 16, 18, 31, 33, 45, 52, and 58.',
      pricePerUnit: 85.00, minOrder: 15, inStock: true, unit: 'doses', iconType: 'syringe',
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
    if (!meds || !Array.isArray(meds) || meds.length < 50) {
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
