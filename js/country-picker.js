/**
 * Searchable Country Code Picker for Bulk Medics
 * All 197 internationally recognized countries with flag emojis & dial codes
 */

const COUNTRY_DATA = [
  { code: "+93", iso: "AF", flag: "\u{1F1E6}\u{1F1EB}", name: "Afghanistan" },
  { code: "+355", iso: "AL", flag: "\u{1F1E6}\u{1F1F1}", name: "Albania" },
  { code: "+213", iso: "DZ", flag: "\u{1F1E9}\u{1F1FF}", name: "Algeria" },
  { code: "+376", iso: "AD", flag: "\u{1F1E6}\u{1F1E9}", name: "Andorra" },
  { code: "+244", iso: "AO", flag: "\u{1F1E6}\u{1F1F4}", name: "Angola" },
  { code: "+1268", iso: "AG", flag: "\u{1F1E6}\u{1F1EC}", name: "Antigua and Barbuda" },
  { code: "+54", iso: "AR", flag: "\u{1F1E6}\u{1F1F7}", name: "Argentina" },
  { code: "+374", iso: "AM", flag: "\u{1F1E6}\u{1F1F2}", name: "Armenia" },
  { code: "+61", iso: "AU", flag: "\u{1F1E6}\u{1F1FA}", name: "Australia" },
  { code: "+43", iso: "AT", flag: "\u{1F1E6}\u{1F1F9}", name: "Austria" },
  { code: "+994", iso: "AZ", flag: "\u{1F1E6}\u{1F1FF}", name: "Azerbaijan" },
  { code: "+1242", iso: "BS", flag: "\u{1F1E7}\u{1F1F8}", name: "Bahamas" },
  { code: "+973", iso: "BH", flag: "\u{1F1E7}\u{1F1ED}", name: "Bahrain" },
  { code: "+880", iso: "BD", flag: "\u{1F1E7}\u{1F1E9}", name: "Bangladesh" },
  { code: "+1246", iso: "BB", flag: "\u{1F1E7}\u{1F1E7}", name: "Barbados" },
  { code: "+375", iso: "BY", flag: "\u{1F1E7}\u{1F1FE}", name: "Belarus" },
  { code: "+32", iso: "BE", flag: "\u{1F1E7}\u{1F1EA}", name: "Belgium" },
  { code: "+501", iso: "BZ", flag: "\u{1F1E7}\u{1F1FF}", name: "Belize" },
  { code: "+229", iso: "BJ", flag: "\u{1F1E7}\u{1F1EF}", name: "Benin" },
  { code: "+975", iso: "BT", flag: "\u{1F1E7}\u{1F1F9}", name: "Bhutan" },
  { code: "+591", iso: "BO", flag: "\u{1F1E7}\u{1F1F4}", name: "Bolivia" },
  { code: "+387", iso: "BA", flag: "\u{1F1E7}\u{1F1E6}", name: "Bosnia and Herzegovina" },
  { code: "+267", iso: "BW", flag: "\u{1F1E7}\u{1F1FC}", name: "Botswana" },
  { code: "+55", iso: "BR", flag: "\u{1F1E7}\u{1F1F7}", name: "Brazil" },
  { code: "+673", iso: "BN", flag: "\u{1F1E7}\u{1F1F3}", name: "Brunei" },
  { code: "+359", iso: "BG", flag: "\u{1F1E7}\u{1F1EC}", name: "Bulgaria" },
  { code: "+226", iso: "BF", flag: "\u{1F1E7}\u{1F1EB}", name: "Burkina Faso" },
  { code: "+257", iso: "BI", flag: "\u{1F1E7}\u{1F1EE}", name: "Burundi" },
  { code: "+238", iso: "CV", flag: "\u{1F1E8}\u{1F1FB}", name: "Cabo Verde" },
  { code: "+855", iso: "KH", flag: "\u{1F1F0}\u{1F1ED}", name: "Cambodia" },
  { code: "+237", iso: "CM", flag: "\u{1F1E8}\u{1F1F2}", name: "Cameroon" },
  { code: "+1", iso: "CA", flag: "\u{1F1E8}\u{1F1E6}", name: "Canada" },
  { code: "+236", iso: "CF", flag: "\u{1F1E8}\u{1F1EB}", name: "Central African Republic" },
  { code: "+235", iso: "TD", flag: "\u{1F1F9}\u{1F1E9}", name: "Chad" },
  { code: "+56", iso: "CL", flag: "\u{1F1E8}\u{1F1F1}", name: "Chile" },
  { code: "+86", iso: "CN", flag: "\u{1F1E8}\u{1F1F3}", name: "China" },
  { code: "+57", iso: "CO", flag: "\u{1F1E8}\u{1F1F4}", name: "Colombia" },
  { code: "+269", iso: "KM", flag: "\u{1F1F0}\u{1F1F2}", name: "Comoros" },
  { code: "+242", iso: "CG", flag: "\u{1F1E8}\u{1F1EC}", name: "Congo" },
  { code: "+243", iso: "CD", flag: "\u{1F1E8}\u{1F1E9}", name: "Congo (DRC)" },
  { code: "+506", iso: "CR", flag: "\u{1F1E8}\u{1F1F7}", name: "Costa Rica" },
  { code: "+225", iso: "CI", flag: "\u{1F1E8}\u{1F1EE}", name: "C\u00f4te d'Ivoire" },
  { code: "+385", iso: "HR", flag: "\u{1F1ED}\u{1F1F7}", name: "Croatia" },
  { code: "+53", iso: "CU", flag: "\u{1F1E8}\u{1F1FA}", name: "Cuba" },
  { code: "+357", iso: "CY", flag: "\u{1F1E8}\u{1F1FE}", name: "Cyprus" },
  { code: "+420", iso: "CZ", flag: "\u{1F1E8}\u{1F1FF}", name: "Czech Republic" },
  { code: "+45", iso: "DK", flag: "\u{1F1E9}\u{1F1F0}", name: "Denmark" },
  { code: "+253", iso: "DJ", flag: "\u{1F1E9}\u{1F1EF}", name: "Djibouti" },
  { code: "+1767", iso: "DM", flag: "\u{1F1E9}\u{1F1F2}", name: "Dominica" },
  { code: "+1809", iso: "DO", flag: "\u{1F1E9}\u{1F1F4}", name: "Dominican Republic" },
  { code: "+593", iso: "EC", flag: "\u{1F1EA}\u{1F1E8}", name: "Ecuador" },
  { code: "+20", iso: "EG", flag: "\u{1F1EA}\u{1F1EC}", name: "Egypt" },
  { code: "+503", iso: "SV", flag: "\u{1F1F8}\u{1F1FB}", name: "El Salvador" },
  { code: "+240", iso: "GQ", flag: "\u{1F1EC}\u{1F1F6}", name: "Equatorial Guinea" },
  { code: "+291", iso: "ER", flag: "\u{1F1EA}\u{1F1F7}", name: "Eritrea" },
  { code: "+372", iso: "EE", flag: "\u{1F1EA}\u{1F1EA}", name: "Estonia" },
  { code: "+268", iso: "SZ", flag: "\u{1F1F8}\u{1F1FF}", name: "Eswatini" },
  { code: "+251", iso: "ET", flag: "\u{1F1EA}\u{1F1F9}", name: "Ethiopia" },
  { code: "+679", iso: "FJ", flag: "\u{1F1EB}\u{1F1EF}", name: "Fiji" },
  { code: "+358", iso: "FI", flag: "\u{1F1EB}\u{1F1EE}", name: "Finland" },
  { code: "+33", iso: "FR", flag: "\u{1F1EB}\u{1F1F7}", name: "France" },
  { code: "+241", iso: "GA", flag: "\u{1F1EC}\u{1F1E6}", name: "Gabon" },
  { code: "+220", iso: "GM", flag: "\u{1F1EC}\u{1F1F2}", name: "Gambia" },
  { code: "+995", iso: "GE", flag: "\u{1F1EC}\u{1F1EA}", name: "Georgia" },
  { code: "+49", iso: "DE", flag: "\u{1F1E9}\u{1F1EA}", name: "Germany" },
  { code: "+233", iso: "GH", flag: "\u{1F1EC}\u{1F1ED}", name: "Ghana" },
  { code: "+30", iso: "GR", flag: "\u{1F1EC}\u{1F1F7}", name: "Greece" },
  { code: "+1473", iso: "GD", flag: "\u{1F1EC}\u{1F1E9}", name: "Grenada" },
  { code: "+502", iso: "GT", flag: "\u{1F1EC}\u{1F1F9}", name: "Guatemala" },
  { code: "+224", iso: "GN", flag: "\u{1F1EC}\u{1F1F3}", name: "Guinea" },
  { code: "+245", iso: "GW", flag: "\u{1F1EC}\u{1F1FC}", name: "Guinea-Bissau" },
  { code: "+592", iso: "GY", flag: "\u{1F1EC}\u{1F1FE}", name: "Guyana" },
  { code: "+509", iso: "HT", flag: "\u{1F1ED}\u{1F1F9}", name: "Haiti" },
  { code: "+504", iso: "HN", flag: "\u{1F1ED}\u{1F1F3}", name: "Honduras" },
  { code: "+852", iso: "HK", flag: "\u{1F1ED}\u{1F1F0}", name: "Hong Kong" },
  { code: "+36", iso: "HU", flag: "\u{1F1ED}\u{1F1FA}", name: "Hungary" },
  { code: "+354", iso: "IS", flag: "\u{1F1EE}\u{1F1F8}", name: "Iceland" },
  { code: "+91", iso: "IN", flag: "\u{1F1EE}\u{1F1F3}", name: "India" },
  { code: "+62", iso: "ID", flag: "\u{1F1EE}\u{1F1E9}", name: "Indonesia" },
  { code: "+98", iso: "IR", flag: "\u{1F1EE}\u{1F1F7}", name: "Iran" },
  { code: "+964", iso: "IQ", flag: "\u{1F1EE}\u{1F1F6}", name: "Iraq" },
  { code: "+353", iso: "IE", flag: "\u{1F1EE}\u{1F1EA}", name: "Ireland" },
  { code: "+972", iso: "IL", flag: "\u{1F1EE}\u{1F1F1}", name: "Israel" },
  { code: "+39", iso: "IT", flag: "\u{1F1EE}\u{1F1F9}", name: "Italy" },
  { code: "+1876", iso: "JM", flag: "\u{1F1EF}\u{1F1F2}", name: "Jamaica" },
  { code: "+81", iso: "JP", flag: "\u{1F1EF}\u{1F1F5}", name: "Japan" },
  { code: "+962", iso: "JO", flag: "\u{1F1EF}\u{1F1F4}", name: "Jordan" },
  { code: "+7", iso: "KZ", flag: "\u{1F1F0}\u{1F1FF}", name: "Kazakhstan" },
  { code: "+254", iso: "KE", flag: "\u{1F1F0}\u{1F1EA}", name: "Kenya" },
  { code: "+686", iso: "KI", flag: "\u{1F1F0}\u{1F1EE}", name: "Kiribati" },
  { code: "+850", iso: "KP", flag: "\u{1F1F0}\u{1F1F5}", name: "North Korea" },
  { code: "+82", iso: "KR", flag: "\u{1F1F0}\u{1F1F7}", name: "South Korea" },
  { code: "+965", iso: "KW", flag: "\u{1F1F0}\u{1F1FC}", name: "Kuwait" },
  { code: "+996", iso: "KG", flag: "\u{1F1F0}\u{1F1EC}", name: "Kyrgyzstan" },
  { code: "+856", iso: "LA", flag: "\u{1F1F1}\u{1F1E6}", name: "Laos" },
  { code: "+371", iso: "LV", flag: "\u{1F1F1}\u{1F1FB}", name: "Latvia" },
  { code: "+961", iso: "LB", flag: "\u{1F1F1}\u{1F1E7}", name: "Lebanon" },
  { code: "+266", iso: "LS", flag: "\u{1F1F1}\u{1F1F8}", name: "Lesotho" },
  { code: "+231", iso: "LR", flag: "\u{1F1F1}\u{1F1F7}", name: "Liberia" },
  { code: "+218", iso: "LY", flag: "\u{1F1F1}\u{1F1FE}", name: "Libya" },
  { code: "+423", iso: "LI", flag: "\u{1F1F1}\u{1F1EE}", name: "Liechtenstein" },
  { code: "+370", iso: "LT", flag: "\u{1F1F1}\u{1F1F9}", name: "Lithuania" },
  { code: "+352", iso: "LU", flag: "\u{1F1F1}\u{1F1FA}", name: "Luxembourg" },
  { code: "+261", iso: "MG", flag: "\u{1F1F2}\u{1F1EC}", name: "Madagascar" },
  { code: "+265", iso: "MW", flag: "\u{1F1F2}\u{1F1FC}", name: "Malawi" },
  { code: "+60", iso: "MY", flag: "\u{1F1F2}\u{1F1FE}", name: "Malaysia" },
  { code: "+960", iso: "MV", flag: "\u{1F1F2}\u{1F1FB}", name: "Maldives" },
  { code: "+223", iso: "ML", flag: "\u{1F1F2}\u{1F1F1}", name: "Mali" },
  { code: "+356", iso: "MT", flag: "\u{1F1F2}\u{1F1F9}", name: "Malta" },
  { code: "+692", iso: "MH", flag: "\u{1F1F2}\u{1F1ED}", name: "Marshall Islands" },
  { code: "+222", iso: "MR", flag: "\u{1F1F2}\u{1F1F7}", name: "Mauritania" },
  { code: "+230", iso: "MU", flag: "\u{1F1F2}\u{1F1FA}", name: "Mauritius" },
  { code: "+52", iso: "MX", flag: "\u{1F1F2}\u{1F1FD}", name: "Mexico" },
  { code: "+691", iso: "FM", flag: "\u{1F1EB}\u{1F1F2}", name: "Micronesia" },
  { code: "+373", iso: "MD", flag: "\u{1F1F2}\u{1F1E9}", name: "Moldova" },
  { code: "+377", iso: "MC", flag: "\u{1F1F2}\u{1F1E8}", name: "Monaco" },
  { code: "+976", iso: "MN", flag: "\u{1F1F2}\u{1F1F3}", name: "Mongolia" },
  { code: "+382", iso: "ME", flag: "\u{1F1F2}\u{1F1EA}", name: "Montenegro" },
  { code: "+212", iso: "MA", flag: "\u{1F1F2}\u{1F1E6}", name: "Morocco" },
  { code: "+258", iso: "MZ", flag: "\u{1F1F2}\u{1F1FF}", name: "Mozambique" },
  { code: "+95", iso: "MM", flag: "\u{1F1F2}\u{1F1F2}", name: "Myanmar" },
  { code: "+264", iso: "NA", flag: "\u{1F1F3}\u{1F1E6}", name: "Namibia" },
  { code: "+674", iso: "NR", flag: "\u{1F1F3}\u{1F1F7}", name: "Nauru" },
  { code: "+977", iso: "NP", flag: "\u{1F1F3}\u{1F1F5}", name: "Nepal" },
  { code: "+31", iso: "NL", flag: "\u{1F1F3}\u{1F1F1}", name: "Netherlands" },
  { code: "+64", iso: "NZ", flag: "\u{1F1F3}\u{1F1FF}", name: "New Zealand" },
  { code: "+505", iso: "NI", flag: "\u{1F1F3}\u{1F1EE}", name: "Nicaragua" },
  { code: "+227", iso: "NE", flag: "\u{1F1F3}\u{1F1EA}", name: "Niger" },
  { code: "+234", iso: "NG", flag: "\u{1F1F3}\u{1F1EC}", name: "Nigeria" },
  { code: "+389", iso: "MK", flag: "\u{1F1F2}\u{1F1F0}", name: "North Macedonia" },
  { code: "+47", iso: "NO", flag: "\u{1F1F3}\u{1F1F4}", name: "Norway" },
  { code: "+968", iso: "OM", flag: "\u{1F1F4}\u{1F1F2}", name: "Oman" },
  { code: "+92", iso: "PK", flag: "\u{1F1F5}\u{1F1F0}", name: "Pakistan" },
  { code: "+680", iso: "PW", flag: "\u{1F1F5}\u{1F1FC}", name: "Palau" },
  { code: "+970", iso: "PS", flag: "\u{1F1F5}\u{1F1F8}", name: "Palestine" },
  { code: "+507", iso: "PA", flag: "\u{1F1F5}\u{1F1E6}", name: "Panama" },
  { code: "+675", iso: "PG", flag: "\u{1F1F5}\u{1F1EC}", name: "Papua New Guinea" },
  { code: "+595", iso: "PY", flag: "\u{1F1F5}\u{1F1FE}", name: "Paraguay" },
  { code: "+51", iso: "PE", flag: "\u{1F1F5}\u{1F1EA}", name: "Peru" },
  { code: "+63", iso: "PH", flag: "\u{1F1F5}\u{1F1ED}", name: "Philippines" },
  { code: "+48", iso: "PL", flag: "\u{1F1F5}\u{1F1F1}", name: "Poland" },
  { code: "+351", iso: "PT", flag: "\u{1F1F5}\u{1F1F9}", name: "Portugal" },
  { code: "+974", iso: "QA", flag: "\u{1F1F6}\u{1F1E6}", name: "Qatar" },
  { code: "+40", iso: "RO", flag: "\u{1F1F7}\u{1F1F4}", name: "Romania" },
  { code: "+7", iso: "RU", flag: "\u{1F1F7}\u{1F1FA}", name: "Russia" },
  { code: "+250", iso: "RW", flag: "\u{1F1F7}\u{1F1FC}", name: "Rwanda" },
  { code: "+1869", iso: "KN", flag: "\u{1F1F0}\u{1F1F3}", name: "Saint Kitts and Nevis" },
  { code: "+1758", iso: "LC", flag: "\u{1F1F1}\u{1F1E8}", name: "Saint Lucia" },
  { code: "+1784", iso: "VC", flag: "\u{1F1FB}\u{1F1E8}", name: "Saint Vincent and the Grenadines" },
  { code: "+685", iso: "WS", flag: "\u{1F1FC}\u{1F1F8}", name: "Samoa" },
  { code: "+378", iso: "SM", flag: "\u{1F1F8}\u{1F1F2}", name: "San Marino" },
  { code: "+239", iso: "ST", flag: "\u{1F1F8}\u{1F1F9}", name: "S\u00e3o Tom\u00e9 and Pr\u00edncipe" },
  { code: "+966", iso: "SA", flag: "\u{1F1F8}\u{1F1E6}", name: "Saudi Arabia" },
  { code: "+221", iso: "SN", flag: "\u{1F1F8}\u{1F1F3}", name: "Senegal" },
  { code: "+381", iso: "RS", flag: "\u{1F1F7}\u{1F1F8}", name: "Serbia" },
  { code: "+248", iso: "SC", flag: "\u{1F1F8}\u{1F1E8}", name: "Seychelles" },
  { code: "+232", iso: "SL", flag: "\u{1F1F8}\u{1F1F1}", name: "Sierra Leone" },
  { code: "+65", iso: "SG", flag: "\u{1F1F8}\u{1F1EC}", name: "Singapore" },
  { code: "+421", iso: "SK", flag: "\u{1F1F8}\u{1F1F0}", name: "Slovakia" },
  { code: "+386", iso: "SI", flag: "\u{1F1F8}\u{1F1EE}", name: "Slovenia" },
  { code: "+677", iso: "SB", flag: "\u{1F1F8}\u{1F1E7}", name: "Solomon Islands" },
  { code: "+252", iso: "SO", flag: "\u{1F1F8}\u{1F1F4}", name: "Somalia" },
  { code: "+27", iso: "ZA", flag: "\u{1F1FF}\u{1F1E6}", name: "South Africa" },
  { code: "+211", iso: "SS", flag: "\u{1F1F8}\u{1F1F8}", name: "South Sudan" },
  { code: "+34", iso: "ES", flag: "\u{1F1EA}\u{1F1F8}", name: "Spain" },
  { code: "+94", iso: "LK", flag: "\u{1F1F1}\u{1F1F0}", name: "Sri Lanka" },
  { code: "+249", iso: "SD", flag: "\u{1F1F8}\u{1F1E9}", name: "Sudan" },
  { code: "+597", iso: "SR", flag: "\u{1F1F8}\u{1F1F7}", name: "Suriname" },
  { code: "+46", iso: "SE", flag: "\u{1F1F8}\u{1F1EA}", name: "Sweden" },
  { code: "+41", iso: "CH", flag: "\u{1F1E8}\u{1F1ED}", name: "Switzerland" },
  { code: "+963", iso: "SY", flag: "\u{1F1F8}\u{1F1FE}", name: "Syria" },
  { code: "+886", iso: "TW", flag: "\u{1F1F9}\u{1F1FC}", name: "Taiwan" },
  { code: "+992", iso: "TJ", flag: "\u{1F1F9}\u{1F1EF}", name: "Tajikistan" },
  { code: "+255", iso: "TZ", flag: "\u{1F1F9}\u{1F1FF}", name: "Tanzania" },
  { code: "+66", iso: "TH", flag: "\u{1F1F9}\u{1F1ED}", name: "Thailand" },
  { code: "+670", iso: "TL", flag: "\u{1F1F9}\u{1F1F1}", name: "Timor-Leste" },
  { code: "+228", iso: "TG", flag: "\u{1F1F9}\u{1F1EC}", name: "Togo" },
  { code: "+676", iso: "TO", flag: "\u{1F1F9}\u{1F1F4}", name: "Tonga" },
  { code: "+1868", iso: "TT", flag: "\u{1F1F9}\u{1F1F9}", name: "Trinidad and Tobago" },
  { code: "+216", iso: "TN", flag: "\u{1F1F9}\u{1F1F3}", name: "Tunisia" },
  { code: "+90", iso: "TR", flag: "\u{1F1F9}\u{1F1F7}", name: "Turkey" },
  { code: "+993", iso: "TM", flag: "\u{1F1F9}\u{1F1F2}", name: "Turkmenistan" },
  { code: "+688", iso: "TV", flag: "\u{1F1F9}\u{1F1FB}", name: "Tuvalu" },
  { code: "+256", iso: "UG", flag: "\u{1F1FA}\u{1F1EC}", name: "Uganda" },
  { code: "+380", iso: "UA", flag: "\u{1F1FA}\u{1F1E6}", name: "Ukraine" },
  { code: "+971", iso: "AE", flag: "\u{1F1E6}\u{1F1EA}", name: "United Arab Emirates" },
  { code: "+44", iso: "GB", flag: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom" },
  { code: "+1", iso: "US", flag: "\u{1F1FA}\u{1F1F8}", name: "United States" },
  { code: "+598", iso: "UY", flag: "\u{1F1FA}\u{1F1FE}", name: "Uruguay" },
  { code: "+998", iso: "UZ", flag: "\u{1F1FA}\u{1F1FF}", name: "Uzbekistan" },
  { code: "+678", iso: "VU", flag: "\u{1F1FB}\u{1F1FA}", name: "Vanuatu" },
  { code: "+379", iso: "VA", flag: "\u{1F1FB}\u{1F1E6}", name: "Vatican City" },
  { code: "+58", iso: "VE", flag: "\u{1F1FB}\u{1F1EA}", name: "Venezuela" },
  { code: "+84", iso: "VN", flag: "\u{1F1FB}\u{1F1F3}", name: "Vietnam" },
  { code: "+967", iso: "YE", flag: "\u{1F1FE}\u{1F1EA}", name: "Yemen" },
  { code: "+260", iso: "ZM", flag: "\u{1F1FF}\u{1F1F2}", name: "Zambia" },
  { code: "+263", iso: "ZW", flag: "\u{1F1FF}\u{1F1FC}", name: "Zimbabwe" }
];

/**
 * CountryCodePicker - custom searchable dropdown
 */
class CountryCodePicker {
  constructor(container, options = {}) {
    this.container = container;
    this.defaultISO = options.defaultISO || 'IN';
    this.hiddenInputId = options.hiddenInputId || null;
    this.onSelect = options.onSelect || null;
    this.countries = COUNTRY_DATA;
    this.filtered = [...this.countries];
    this.selectedCountry = this.countries.find(c => c.iso === this.defaultISO) || this.countries[0];
    this.isOpen = false;
    this.highlightIndex = -1;
    this._build();
    this._bindEvents();
    this._setSelected(this.selectedCountry, false);
  }

  _build() {
    this.container.classList.add('ccp-wrapper');
    this.container.innerHTML = '';
    this.toggleBtn = document.createElement('button');
    this.toggleBtn.type = 'button';
    this.toggleBtn.className = 'ccp-toggle';
    this.toggleBtn.setAttribute('aria-haspopup', 'listbox');
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    this.toggleBtn.innerHTML = '<span class="ccp-flag"></span><span class="ccp-code"></span><svg class="ccp-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    this.dropdown = document.createElement('div');
    this.dropdown.className = 'ccp-dropdown';
    this.dropdown.setAttribute('role', 'listbox');

    this.searchInput = document.createElement('input');
    this.searchInput.type = 'text';
    this.searchInput.className = 'ccp-search';
    this.searchInput.placeholder = 'Search country or code...';
    this.searchInput.setAttribute('autocomplete', 'off');

    this.listEl = document.createElement('div');
    this.listEl.className = 'ccp-list';

    this.dropdown.appendChild(this.searchInput);
    this.dropdown.appendChild(this.listEl);
    this.container.appendChild(this.toggleBtn);
    this.container.appendChild(this.dropdown);

    if (this.hiddenInputId) {
      this.hiddenInput = document.getElementById(this.hiddenInputId);
      if (!this.hiddenInput) {
        this.hiddenInput = document.createElement('input');
        this.hiddenInput.type = 'hidden';
        this.hiddenInput.id = this.hiddenInputId;
        this.hiddenInput.name = this.hiddenInputId;
        this.container.appendChild(this.hiddenInput);
      }
    }
    this._renderList();
  }

  _renderList() {
    this.listEl.innerHTML = '';
    if (this.filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'ccp-empty';
      empty.textContent = 'No countries found';
      this.listEl.appendChild(empty);
      return;
    }
    this.filtered.forEach((country, i) => {
      const item = document.createElement('div');
      item.className = 'ccp-item' + (country.iso === this.selectedCountry.iso ? ' selected' : '');
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', i);
      item.innerHTML = '<span class="ccp-item-flag">' + country.flag + '</span><span class="ccp-item-name">' + country.name + '</span><span class="ccp-item-code">(' + country.code + ')</span>';
      item.addEventListener('click', () => this._setSelected(country, true));
      this.listEl.appendChild(item);
    });
  }

  _setSelected(country, closeAfter) {
    this.selectedCountry = country;
    this.toggleBtn.querySelector('.ccp-flag').textContent = country.flag;
    this.toggleBtn.querySelector('.ccp-code').textContent = '(' + country.code + ')';
    if (this.hiddenInput) this.hiddenInput.value = country.code;
    this.listEl.querySelectorAll('.ccp-item').forEach(el => {
      const idx = parseInt(el.getAttribute('data-index'));
      el.classList.toggle('selected', this.filtered[idx] && this.filtered[idx].iso === country.iso);
    });
    if (closeAfter) {
      this._close();
      if (this.onSelect) this.onSelect(country);
    }
  }

  _bindEvents() {
    this.toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.isOpen ? this._close() : this._open();
    });

    this.searchInput.addEventListener('input', () => {
      const q = this.searchInput.value.trim().toLowerCase();
      if (!q) {
        this.filtered = [...this.countries];
      } else {
        this.filtered = this.countries.filter(c =>
          c.name.toLowerCase().includes(q) ||
          c.code.includes(q) ||
          c.iso.toLowerCase().includes(q) ||
          ('+' + q === c.code) ||
          c.code.replace('+','').startsWith(q.replace('+',''))
        );
      }
      this.highlightIndex = -1;
      this._renderList();
    });

    this.searchInput.addEventListener('keydown', (e) => {
      const items = this.listEl.querySelectorAll('.ccp-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.highlightIndex = Math.min(this.highlightIndex + 1, items.length - 1);
        this._updateHighlight(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.highlightIndex = Math.max(this.highlightIndex - 1, 0);
        this._updateHighlight(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (this.highlightIndex >= 0 && this.highlightIndex < this.filtered.length) {
          this._setSelected(this.filtered[this.highlightIndex], true);
        }
      } else if (e.key === 'Escape') {
        this._close();
      }
    });

    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) this._close();
    });
  }

  _updateHighlight(items) {
    items.forEach((el, i) => {
      el.classList.toggle('highlight', i === this.highlightIndex);
      if (i === this.highlightIndex) el.scrollIntoView({ block: 'nearest' });
    });
  }

  _open() {
    // Close any other open pickers first
    document.querySelectorAll('.ccp-dropdown.open').forEach(d => d.classList.remove('open'));
    this.isOpen = true;
    this.dropdown.classList.add('open');
    this.toggleBtn.setAttribute('aria-expanded', 'true');
    this.searchInput.value = '';
    this.filtered = [...this.countries];
    this._renderList();
    setTimeout(() => {
      this.searchInput.focus();
      const sel = this.listEl.querySelector('.ccp-item.selected');
      if (sel) sel.scrollIntoView({ block: 'center' });
    }, 50);
  }

  _close() {
    this.isOpen = false;
    this.dropdown.classList.remove('open');
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    this.highlightIndex = -1;
  }

  setValue(code) {
    const country = this.countries.find(c => c.code === code);
    if (country) this._setSelected(country, false);
  }

  setByISO(iso) {
    const country = this.countries.find(c => c.iso === iso);
    if (country) this._setSelected(country, false);
  }

  getValue() { return this.selectedCountry.code; }
  getCountry() { return this.selectedCountry; }
}
