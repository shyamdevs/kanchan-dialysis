export const DONATION_CATEGORIES = [
  { id: 'dialysis', icon: 'pulse', title: 'Free Dialysis Session', desc: 'Sponsor life-saving hemodialysis for underprivileged patients' },
  { id: 'medicines', icon: 'flask', title: 'Medicines & Injections', desc: 'Provide essential erythropoietin, iron & supportive drugs' },
  { id: 'consumables', icon: 'cloud', title: 'Dialyzer & Bloodlines', desc: 'Fund sterile dialyzers, filters, tubing and safety kits' },
  { id: 'memory', icon: 'heart', title: 'Donate in Honor / Memory', desc: 'Dedicate healing in the cherished memory of a loved one' },
  { id: 'occasion', icon: 'gift', title: 'Special Occasion', desc: 'Celebrate your Birthday, Anniversary, or Festivities with Seva' },
  { id: 'csr', icon: 'box', title: 'Sponsor Machine / CSR', desc: 'Corporate CSR partnership for new hemodialysis infrastructure' },
  { id: 'bank', icon: 'bank', title: 'Wire / Cheque / DD', desc: 'Direct Bank NEFT / RTGS transfer & Cheque payment details' },
];

export const PRESET_AMOUNTS = [
  4500, 9000, 13500, 18000, 24000,
  30000, 37500, 45000, 60000, 75000,
  90000, 105000, 150000, 201000, 500000,
];

export const BANK_INFO = [
  { label: 'Beneficiary Name', value: 'Shri Krishan Kanchan Sewa Trust' },
  { label: 'Bank Name', value: 'HDFC Bank Ltd' },
  { label: 'Account Number', value: '50200058222032', copyable: true },
  { label: 'IFSC Code', value: 'HDFC0001377', copyable: true },
  { label: 'Account Type', value: 'Current Account' },
  { label: 'Branch', value: 'Jaipur, Rajasthan' },
];

// Common country calling codes. Easy to extend.
export const COUNTRY_CALLING_CODES = [
  { country: 'India', code: '+91' },
  { country: 'United States / Canada', code: '+1' },
  { country: 'United Kingdom', code: '+44' },
  { country: 'United Arab Emirates', code: '+971' },
  { country: 'Australia', code: '+61' },
  { country: 'New Zealand', code: '+64' },
  { country: 'Pakistan', code: '+92' },
  { country: 'Bangladesh', code: '+880' },
  { country: 'Nepal', code: '+977' },
  { country: 'Sri Lanka', code: '+94' },
  { country: 'Singapore', code: '+65' },
  { country: 'Malaysia', code: '+60' },
  { country: 'Saudi Arabia', code: '+966' },
  { country: 'Qatar', code: '+974' },
  { country: 'Kuwait', code: '+965' },
  { country: 'Oman', code: '+968' },
  { country: 'Bahrain', code: '+973' },
  { country: 'South Africa', code: '+27' },
  { country: 'Nigeria', code: '+234' },
  { country: 'Kenya', code: '+254' },
  { country: 'Ghana', code: '+233' },
  { country: 'Egypt', code: '+20' },
  { country: 'Germany', code: '+49' },
  { country: 'France', code: '+33' },
  { country: 'Italy', code: '+39' },
  { country: 'Spain', code: '+34' },
  { country: 'Netherlands', code: '+31' },
  { country: 'Ireland', code: '+353' },
  { country: 'Portugal', code: '+351' },
  { country: 'Russia / Kazakhstan', code: '+7' },
  { country: 'Turkey', code: '+90' },
  { country: 'Afghanistan', code: '+93' },
  { country: 'China', code: '+86' },
  { country: 'Japan', code: '+81' },
  { country: 'South Korea', code: '+82' },
  { country: 'Thailand', code: '+66' },
  { country: 'Vietnam', code: '+84' },
  { country: 'Indonesia', code: '+62' },
  { country: 'Philippines', code: '+63' },
  { country: 'Brazil', code: '+55' },
  { country: 'Mexico', code: '+52' },
  { country: 'Argentina', code: '+54' },
  { country: 'Israel', code: '+972' },
  { country: 'Hong Kong', code: '+852' },
  { country: 'Taiwan', code: '+886' },
  { country: 'Switzerland', code: '+41' },
  { country: 'Sweden', code: '+46' },
  { country: 'Norway', code: '+47' },
  { country: 'Denmark', code: '+45' },
  { country: 'Poland', code: '+48' },
  { country: 'Ukraine', code: '+380' },
  { country: 'Iran', code: '+98' },
  { country: 'Iraq', code: '+964' },
];

export const findCallingCode = (internationalNumber) => {
  const normalized = internationalNumber.replace(/[\s().-]/g, '');
  if (!normalized.startsWith('+')) return null;
  return [...COUNTRY_CALLING_CODES]
    .sort((a, b) => b.code.length - a.code.length)
    .find(({ code }) => normalized.startsWith(code));
};

export const formatINR = (val) => {
  if (!val || isNaN(val)) return '0';
  return Number(val).toLocaleString('en-IN');
};

// Estimated cost per complete free dialysis session is ₹2,000
export const getImpact = (amount) => {
  const safe = amount > 0 ? amount : 0;
  const sessions = Math.max(1, Math.floor(safe / 2000));
  return { sessions, patientsSupported: Math.max(1, Math.floor(sessions / 3)) };
};