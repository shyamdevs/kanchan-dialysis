import React, { useState, useMemo } from 'react';
import upiQrImage from '../assets/upi-qr-scanner-clean.png';

const DONATION_CATEGORIES = [
  {
    id: 'dialysis',
    title: 'Free Dialysis Session',
    desc: 'Sponsor life-saving hemodialysis for underprivileged patients',
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1.4em" width="1.4em" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    ),
  },
  {
    id: 'medicines',
    title: 'Medicines & Injections',
    desc: 'Provide essential erythropoietin, iron & supportive drugs',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.4em" width="1.4em" xmlns="http://www.w3.org/2000/svg">
        <path d="M437.2 403.5L340 215V64h4c6.6 0 12-5.4 12-12V12c0-6.6-5.4-12-12-12H168c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h4v151L74.8 403.5C56.1 440.1 82.6 480 123.8 480h264.4c41.2 0 67.7-39.9 49-76.5z"></path>
      </svg>
    ),
  },
  {
    id: 'consumables',
    title: 'Dialyzer & Bloodlines',
    desc: 'Fund sterile dialyzers, filters, tubing and safety kits',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.4em" width="1.4em" xmlns="http://www.w3.org/2000/svg">
        <path d="M256 0c-73.5 0-136.5 45.4-162.6 109.8C58.1 118.6 32 149.8 32 187c0 41.6 33.7 75.3 75.3 75.3H144v-32h-36.7C86.7 230.3 64 210 64 187c0-25.6 20.7-46.3 46.3-46.3H144v-32c0-58.7 47.6-106.3 106.3-106.3S356.6 50 356.6 108.7v32H384c25.6 0 46.3 20.7 46.3 46.3 0 23-22.7 43.3-43.3 43.3H352v32h34.7c41.6 0 75.3-33.7 75.3-75.3 0-37.2-26.1-68.4-61.4-77.2C374.5 45.4 311.5 0 256 0z"></path>
      </svg>
    ),
  },
  {
    id: 'memory',
    title: 'Donate in Honor / Memory',
    desc: 'Dedicate healing in the cherished memory of a loved one',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.4em" width="1.4em" xmlns="http://www.w3.org/2000/svg">
        <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
      </svg>
    ),
  },
  {
    id: 'occasion',
    title: 'Special Occasion',
    desc: 'Celebrate your Birthday, Anniversary, or Festivities with Seva',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.4em" width="1.4em" xmlns="http://www.w3.org/2000/svg">
        <path d="M464 144h-54.4c21.8-25.9 30.4-60.6 22.4-94.4C421 7.2 384.8-8.9 344.3 3.6 295.3 18.7 264.4 78 256 108.6 247.6 78 216.7 18.7 167.7 3.6 127.2-8.9 91 7.2 80 49.6c-8 33.8.6 68.5 22.4 94.4H48c-26.5 0-48 21.5-48 48v64c0 8.8 7.2 16 16 16h16v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272h16c8.8 0 16-7.2 16-16v-64c0-26.5-21.5-48-48-48z"></path>
      </svg>
    ),
  },
  {
    id: 'csr',
    title: 'Sponsor Machine / CSR',
    desc: 'Corporate CSR partnership for new hemodialysis infrastructure',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.4em" width="1.4em" xmlns="http://www.w3.org/2000/svg">
        <path d="M480 32H32C14.3 32 0 46.3 0 64v384c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32zm-48 384H80V96h352v320z"></path>
      </svg>
    ),
  },
  {
    id: 'bank',
    title: 'Wire / Cheque / DD',
    desc: 'Direct Bank NEFT / RTGS transfer & Cheque payment details',
    icon: (
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1.4em" width="1.4em" xmlns="http://www.w3.org/2000/svg">
        <path d="M528 288H48c-26.51 0-48 21.49-48 48v128c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V336c0-26.51-21.49-48-48-48zm-16 128H64v-64h448v64zM288 32c-35.35 0-64 28.65-64 64 0 14.07 4.58 27.08 12.3 37.64L38.48 253.49C22.61 262.8 32.55 288 51.05 288h473.9c18.5 0 28.44-25.2 12.57-34.51L339.7 133.64C347.42 123.08 352 110.07 352 96c0-35.35-28.65-64-64-64z"></path>
      </svg>
    ),
  },
];

const PRESET_AMOUNTS = [
  4500, 9000, 13500, 18000, 24000,
  30000, 37500, 45000, 60000, 75000,
  90000, 105000, 150000, 201000, 500000,
];

const BANK_INFO = [
  { label: 'Beneficiary Name', value: 'Shri Krishan Kanchan Sewa Trust' },
  { label: 'Bank Name', value: 'HDFC Bank Ltd' },
  { label: 'Account Number', value: '50200058222032', isAccount: true },
  { label: 'IFSC Code', value: 'HDFC0001377', isIfsc: true },
  { label: 'Account Type', value: 'Current Account' },
  { label: 'Branch', value: 'Jaipur, Rajasthan' },
];

// Common country calling codes. Keep this list dependency-free and easy to extend.
const COUNTRY_CALLING_CODES = [
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

const findCallingCode = (internationalNumber) => {
  const normalized = internationalNumber.replace(/[\s().-]/g, '');
  if (!normalized.startsWith('+')) return null;

  return [...COUNTRY_CALLING_CODES]
    .sort((a, b) => b.code.length - a.code.length)
    .find(({ code }) => normalized.startsWith(code));
};

const formatINR = (val) => {
  if (!val || isNaN(val)) return '0';
  return Number(val).toLocaleString('en-IN');
};

const DonateSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('dialysis');
  const [amount, setAmount] = useState(150000);
  const [customInput, setCustomInput] = useState('150000');
  const [citizenship, setCitizenship] = useState('indian'); // 'indian' | 'foreign'
  // Keep what the donor is typing separate so international prefixes can be parsed without interrupting typing.
  const [phoneInput, setPhoneInput] = useState('');

  // Personal Info Form State
  const [formData, setFormData] = useState({
    title: 'Mr',
    fullName: '',
    email: '',
    dob: '',
    countryCode: '+91',
    mobile: '',
    altMobile: '',
    request80G: true,
    panNumber: '',
    address: '',
    city: '',
    pincode: '',
    dedicationNote: '',
  });

  // Math Captcha State
  const [captcha, setCaptcha] = useState(() => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 2;
    return { n1, n2, answer: n1 + n2 };
  });
  const [captchaInput, setCaptchaInput] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Modal / Success State
  const [showModal, setShowModal] = useState(false);
  const [paymentTab, setPaymentTab] = useState('upi'); // 'upi' | 'bank'
  const [copiedKey, setCopiedKey] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const refreshCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 2;
    setCaptcha({ n1, n2, answer: n1 + n2 });
    setCaptchaInput('');
  };

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
  };

  const handlePresetSelect = (val) => {
    setAmount(val);
    setCustomInput(val.toString());
  };

  const handleCustomAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setCustomInput(raw);
    const num = parseInt(raw, 10);
    setAmount(isNaN(num) ? 0 : num);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleMobileChange = (e) => {
    const rawValue = e.target.value;
    setPhoneInput(rawValue);

    const normalized = rawValue.replace(/[\s().-]/g, '');
    if (normalized.startsWith('+')) {
      const matchedCountry = findCallingCode(normalized);
      if (matchedCountry) {
        const nationalNumber = normalized
          .slice(matchedCountry.code.length)
          .replace(/\D/g, '');
        setFormData((prev) => ({
          ...prev,
          countryCode: matchedCountry.code,
          mobile: nationalNumber,
        }));
      } else {
        // Do not accidentally submit digits from an unrecognised international prefix.
        setFormData((prev) => ({ ...prev, mobile: '' }));
      }
    } else {
      // For local numbers, country cannot be inferred reliably from the digits alone.
      // The donor can choose their country above; national digits are stored separately.
      setFormData((prev) => ({ ...prev, mobile: rawValue.replace(/\D/g, '') }));
    }

    if (formErrors.mobile) {
      setFormErrors((prev) => ({ ...prev, mobile: '' }));
    }
  };

  const handleMobileBlur = () => {
    const normalized = phoneInput.replace(/[\s().-]/g, '');
    if (normalized.startsWith('+')) {
      const matchedCountry = findCallingCode(normalized);
      const nationalNumber = matchedCountry
        ? normalized.slice(matchedCountry.code.length).replace(/\D/g, '')
        : '';
      if (matchedCountry && nationalNumber) setPhoneInput(nationalNumber);
    }
  };

  const handleCountryCodeChange = (e) => {
    const countryCode = e.target.value;
    setFormData((prev) => ({ ...prev, countryCode }));
    // Keep the number field as the national number after the user manually changes country.
    setPhoneInput(formData.mobile);
    if (formErrors.mobile) {
      setFormErrors((prev) => ({ ...prev, mobile: '' }));
    }
  };

  const handleCopy = (key, text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Calculations for dynamic impact
  const impactStats = useMemo(() => {
    const safeAmount = amount > 0 ? amount : 0;
    // Estimated cost per complete free dialysis session is ₹2,000
    const sessions = Math.max(1, Math.floor(safeAmount / 2000));
    const patientsSupported = Math.max(1, Math.floor(sessions / 3));
    const mealsOrCare = sessions * 2;
    return {
      sessions,
      patientsSupported,
      mealsOrCare,
    };
  }, [amount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.email.trim()) errors.email = 'Valid Email is required';
    const nationalPhoneDigits = formData.mobile.replace(/\D/g, '');
    const callingCodeDigits = formData.countryCode.replace(/\D/g, '');
    const fullPhoneLength = nationalPhoneDigits.length + callingCodeDigits.length;
    if (
      !nationalPhoneDigits ||
      fullPhoneLength < 8 ||
      fullPhoneLength > 15 ||
      (formData.countryCode === '+91' && nationalPhoneDigits.length !== 10)
    ) {
      errors.mobile = formData.countryCode === '+91'
        ? 'Enter a valid 10-digit Indian mobile number.'
        : 'Enter a valid mobile number for the selected country.';
    }
    if (formData.request80G && !formData.panNumber.trim()) {
      errors.panNumber = 'PAN Card is required for 80G Tax Exemption';
    }
    if (!agreeTerms) {
      errors.terms = 'Please accept Terms & Conditions';
    }
    if (parseInt(captchaInput, 10) !== captcha.answer) {
      errors.captcha = 'Incorrect security answer. Please try again.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // scroll to first error
      const firstErr = document.querySelector('[data-donation-error]');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setFormErrors({});
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] px-4 py-8 font-[Poppins] text-[#153C5B] sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      {/* Top Header */}
      <div className="mx-auto mb-8 max-w-7xl sm:mb-10">
        <div className="mb-7 flex items-center gap-2 text-sm font-medium text-[#64748B]">
          <a href="#/" className="rounded-sm text-[#0798A5] transition hover:text-[#087F89] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5]">← Home</a>
          <span className="text-[#94A3B8]">/</span>
          <span className="font-semibold text-[#153C5B]">Donate</span>
        </div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#153C5B] sm:text-4xl lg:text-5xl">Make a Difference Today</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base">
          Your donation helps provide free life-saving dialysis, medicines, and hope to underprivileged patients in Rajasthan.
        </p>
      </div>

      {/* Main 2-Column Donation Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px] xl:gap-8">
        {/* Left Main Form Column */}
        <div className="flex min-w-0 flex-col gap-6">
          {/* Card 1: How Would You Like to Donate? */}
          <div className="min-w-0 rounded-2xl border border-[#E3EBEF] bg-white p-5 shadow-[0_8px_28px_rgba(21,60,91,0.06)] sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E2F1F3] text-[#0798A5]">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1.1em" width="1.1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold tracking-tight text-[#153C5B] sm:text-xl">How Would You Like to Donate?</h2>
            </div>

            <div className="grid grid-cols-1 gap-3 min-[481px]:grid-cols-2 xl:grid-cols-3">
              {DONATION_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`group relative flex min-h-28 flex-col items-start gap-2 rounded-xl border p-4 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] focus-visible:ring-offset-2 sm:p-5 ${isSelected ? 'border-[#0798A5] bg-[#E2F1F3] shadow-sm' : 'border-[#E3EBEF] bg-[#F8FBFC] hover:border-[#0798A5]/50 hover:bg-white'}`}
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    <div className="flex items-center text-[#0798A5] [&_svg]:h-6 [&_svg]:w-6">{cat.icon}</div>
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="text-sm font-bold leading-snug text-[#153C5B]">{cat.title}</span>
                      <span className="text-xs leading-5 text-[#64748B]">{cat.desc}</span>
                    </div>
                    {isSelected && (
                      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#0798A5] text-white">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 2: Select Donation Amount */}
          <div className="min-w-0 rounded-2xl border border-[#E3EBEF] bg-white p-5 shadow-[0_8px_28px_rgba(21,60,91,0.06)] sm:p-7">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-lg font-bold tracking-tight text-[#153C5B] sm:text-xl">Select Donation Amount</h2>
              </div>
              <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-[#B8E4E7] bg-[#E2F1F3] px-3 py-2 text-xs font-semibold leading-5 text-[#153C5B] sm:text-sm">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#0798A5]"></span>
                <strong>{impactStats.sessions}</strong> dialysis sessions will be sponsored
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-2.5 min-[481px]:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {PRESET_AMOUNTS.map((val) => {
                const isSelected = amount === val;
                return (
                  <button
                    key={val}
                    type="button"
                    className={`relative flex min-h-12 items-center justify-center rounded-xl border px-2 py-3 text-center text-xs font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] focus-visible:ring-offset-2 sm:text-sm ${isSelected ? 'border-[#0798A5] bg-[#0798A5] text-white shadow-md shadow-[#0798A5]/20' : 'border-[#E3EBEF] bg-[#F8FBFC] text-[#153C5B] hover:border-[#0798A5]/60 hover:bg-[#E2F1F3]'}`}
                    onClick={() => handlePresetSelect(val)}
                  >
                    <span>₹ {formatINR(val)}</span>
                    {isSelected && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#153C5B] text-white">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4">
              <label htmlFor="custom-amount-input" className="mb-2 block text-sm font-semibold text-[#64748B]">
                Or enter custom amount
              </label>
              <div className="relative w-full max-w-sm">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-bold text-[#64748B]">₹</span>
                <input
                  id="custom-amount-input"
                  type="text"
                  className="w-full rounded-xl border border-[#E3EBEF] bg-white py-3.5 pl-9 pr-3.5 text-base font-bold text-[#153C5B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10"
                  placeholder="Enter amount"
                  value={customInput ? formatINR(customInput) : ''}
                  onChange={handleCustomAmountChange}
                />
              </div>
            </div>
          </div>

          {/* Card 3: Personal Information */}
          <div className="min-w-0 rounded-2xl border border-[#E3EBEF] bg-white p-5 shadow-[0_8px_28px_rgba(21,60,91,0.06)] sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E2F1F3] text-[#0798A5]">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1.1em" width="1.1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold tracking-tight text-[#153C5B] sm:text-xl">Personal Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Row 1: Title + Full Name */}
              <div className="grid gap-4 min-[769px]:grid-cols-[120px_minmax(0,1fr)]">
                <div className="flex min-w-0 flex-col gap-1.5 text-left [&_label]:text-xs [&_label]:font-semibold [&_label]:text-[#334155]">
                  <label>Title</label>
                  <div className="relative flex min-w-0 items-center [&_input]:pl-10 [&_select]:pl-10">
                    <span className="pointer-events-none absolute left-3.5 z-10 flex text-[#94A3B8] [&_svg]:h-4 [&_svg]:w-4">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                      </svg>
                    </span>
                    <select
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full min-w-0 appearance-none rounded-xl border border-[#E3EBEF] bg-white px-3.5 py-3 text-sm text-[#153C5B] outline-none transition focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10"
                    >
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                      <option value="Shri">Shri</option>
                      <option value="Smt">Smt</option>
                    </select>
                  </div>
                </div>

                <div className="flex min-w-0 flex-col gap-1.5 text-left [&_label]:text-xs [&_label]:font-semibold [&_label]:text-[#334155] min-w-0">
                  <label>Full Name *</label>
                  <div className="relative flex min-w-0 items-center [&_input]:pl-10 [&_select]:pl-10">
                    <span className="pointer-events-none absolute left-3.5 z-10 flex text-[#94A3B8] [&_svg]:h-4 [&_svg]:w-4">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full min-w-0 rounded-xl border bg-white px-3.5 py-3 text-sm text-[#153C5B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10 ${formErrors.fullName ? 'border-red-500 bg-red-50' : 'border-[#E3EBEF]'}`}
                    />
                  </div>
                  {formErrors.fullName && <span data-donation-error className="mt-1 block text-xs font-semibold text-red-600">{formErrors.fullName}</span>}
                </div>
              </div>

              {/* Row 2: Email + Date of Birth */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex min-w-0 flex-col gap-1.5 text-left [&_label]:text-xs [&_label]:font-semibold [&_label]:text-[#334155]">
                  <label>Email *</label>
                  <div className="relative flex min-w-0 items-center [&_input]:pl-10 [&_select]:pl-10">
                    <span className="pointer-events-none absolute left-3.5 z-10 flex text-[#94A3B8] [&_svg]:h-4 [&_svg]:w-4">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                      </svg>
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full min-w-0 rounded-xl border bg-white px-3.5 py-3 text-sm text-[#153C5B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10 ${formErrors.email ? 'border-red-500 bg-red-50' : 'border-[#E3EBEF]'}`}
                    />
                  </div>
                  {formErrors.email && <span data-donation-error className="mt-1 block text-xs font-semibold text-red-600">{formErrors.email}</span>}
                </div>

                <div className="flex min-w-0 flex-col gap-1.5 text-left [&_label]:text-xs [&_label]:font-semibold [&_label]:text-[#334155]">
                  <label>Date of Birth</label>
                  <div className="relative flex min-w-0 items-center [&_input]:pl-10 [&_select]:pl-10">
                    <span className="pointer-events-none absolute left-3.5 z-10 flex text-[#94A3B8] [&_svg]:h-4 [&_svg]:w-4">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                      </svg>
                    </span>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full min-w-0 rounded-xl border border-[#E3EBEF] bg-white px-3.5 py-3 text-sm text-[#153C5B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Mobile Number + Alternate Mobile */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex min-w-0 flex-col gap-1.5 text-left [&_label]:text-xs [&_label]:font-semibold [&_label]:text-[#334155]">
                  <label>Mobile Number *</label>
                  <div className="flex min-w-0 gap-2">
                    <select
                      name="countryCode"
                      aria-label="Country calling code"
                      value={formData.countryCode}
                      onChange={handleCountryCodeChange}
                      className="w-[142px] max-w-[45%] shrink-0 rounded-xl border border-[#E3EBEF] bg-white px-2 py-3 text-xs font-semibold text-[#153C5B] outline-none focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10"
                    >
                      {COUNTRY_CALLING_CODES.map(({ country, code }) => (
                        <option key={`${country}-${code}`} value={code}>
                          {country} ({code})
                        </option>
                      ))}
                    </select>
                    <div className="relative flex min-w-0 items-center [&_input]:pl-10 [&_select]:pl-10 min-w-0 flex-1">
                      <span className="pointer-events-none absolute left-3.5 z-10 flex text-[#94A3B8] [&_svg]:h-4 [&_svg]:w-4">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
                        </svg>
                      </span>
                      <input
                        type="tel"
                        name="mobile"
                        inputMode="tel"
                        autoComplete="tel-national"
                        maxLength={24}
                        placeholder="Number or +country code"
                        value={phoneInput}
                        onChange={handleMobileChange}
                        onBlur={handleMobileBlur}
                        aria-describedby={formErrors.mobile ? 'donor-mobile-error donor-mobile-help' : 'donor-mobile-help'}
                        className={`w-full min-w-0 rounded-xl border bg-white px-3.5 py-3 text-sm text-[#153C5B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10 ${formErrors.mobile ? 'border-red-500 bg-red-50' : 'border-[#E3EBEF]'}`}
                      />
                    </div>
                  </div>
                  <span id="donor-mobile-help" className="mt-1 block text-[11px] leading-5 text-[#64748B]">
                    Choose your country, or enter the full international number starting with + (for example, +91).
                  </span>
                  {formErrors.mobile && <span id="donor-mobile-error" data-donation-error role="alert" className="mt-1 block text-xs font-semibold text-red-600">{formErrors.mobile}</span>}
                </div>

                <div className="flex min-w-0 flex-col gap-1.5 text-left [&_label]:text-xs [&_label]:font-semibold [&_label]:text-[#334155]">
                  <label>Alternate Mobile (Optional)</label>
                  <div className="relative flex min-w-0 items-center [&_input]:pl-10 [&_select]:pl-10">
                    <span className="pointer-events-none absolute left-3.5 z-10 flex text-[#94A3B8] [&_svg]:h-4 [&_svg]:w-4">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
                      </svg>
                    </span>
                    <input
                      type="tel"
                      name="altMobile"
                      placeholder="Alternate number"
                      value={formData.altMobile}
                      onChange={handleInputChange}
                      className="w-full min-w-0 rounded-xl border border-[#E3EBEF] bg-white px-3.5 py-3 text-sm text-[#153C5B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10"
                    />
                  </div>
                </div>
              </div>

              {/* Dedication Note if Occasion / Memory */}
              {(selectedCategory === 'memory' || selectedCategory === 'occasion') && (
                <div className="flex min-w-0 flex-col gap-1.5 text-left [&_label]:text-xs [&_label]:font-semibold [&_label]:text-[#334155] mt-4">
                  <label>
                    {selectedCategory === 'memory' ? 'In Memory of (Name)' : 'Special Occasion Note / Name'}
                  </label>
                  <input
                    type="text"
                    name="dedicationNote"
                    placeholder="e.g. In loving memory of Late Shri Ram Sharma"
                    value={formData.dedicationNote}
                    onChange={handleInputChange}
                    className="w-full min-w-0 rounded-xl border border-[#E3EBEF] bg-white px-3.5 py-3 text-sm text-[#153C5B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10"
                  />
                </div>
              )}

              {/* 80G Tax Exemption Certificate Option */}
              <div className="mt-2 rounded-xl border border-[#E3EBEF] bg-[#F8FBFC] p-4 sm:p-5">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="request80G"
                    checked={formData.request80G}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#0798A5]"
                  />
                  <div className="flex min-w-0 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-[#153C5B]">
                      <strong>Request 80G Tax Exemption Certificate</strong>
                      <span className="rounded-md bg-[#E2F1F3] px-2 py-0.5 text-[10px] font-extrabold text-[#153C5B]">IN</span>
                    </div>
                    <span className="text-xs leading-5 text-[#64748B]">
                      Available for Indian donors - helps you save tax on your income!
                    </span>
                  </div>
                </label>

                {formData.request80G && (
                  <div className="mt-4 border-t border-dashed border-[#D6E3E9] pt-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex min-w-0 flex-col gap-1.5 text-left [&_label]:text-xs [&_label]:font-semibold [&_label]:text-[#334155]">
                        <label>PAN Card Number *</label>
                        <input
                          type="text"
                          name="panNumber"
                          maxLength="10"
                          placeholder="ABCDE1234F"
                          value={formData.panNumber.toUpperCase()}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, panNumber: e.target.value.toUpperCase() }))
                          }
                          className={`w-full min-w-0 rounded-xl border bg-white px-3.5 py-3 text-sm font-bold uppercase tracking-[1.5px] text-[#153C5B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10 ${formErrors.panNumber ? 'border-red-500 bg-red-50' : 'border-[#E3EBEF]'}`}
                        />
                        {formErrors.panNumber && (
                          <span data-donation-error className="mt-1 block text-xs font-semibold text-red-600">{formErrors.panNumber}</span>
                        )}
                      </div>

                      <div className="flex min-w-0 flex-col gap-1.5 text-left [&_label]:text-xs [&_label]:font-semibold [&_label]:text-[#334155]">
                        <label>City / State</label>
                        <input
                          type="text"
                          name="city"
                          placeholder="e.g. Jaipur, Rajasthan"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full min-w-0 rounded-xl border border-[#E3EBEF] bg-white px-3.5 py-3 text-sm text-[#153C5B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Sticky Sidebar: Donation Summary & Impact */}
        <div className="min-w-0 xl:sticky xl:top-6">
          <div className="rounded-2xl border border-[#E3EBEF] bg-white p-5 shadow-[0_8px_28px_rgba(21,60,91,0.08)] sm:p-6">
            <h3 className="mb-5 text-xl font-bold tracking-tight text-[#153C5B]">Donation Summary</h3>

            <div className="mb-3 flex items-center justify-between gap-4 text-sm text-[#64748B]">
              <span>Donation Amount</span>
              <span className="text-right font-bold tabular-nums text-[#153C5B]">₹ {formatINR(amount)}</span>
            </div>

            <div className="mb-5 flex items-center justify-between gap-4 border-y border-dashed border-[#D6E3E9] py-4 text-base font-bold text-[#153C5B]">
              <span>Total Amount</span>
              <span className="text-xl font-extrabold tabular-nums text-[#0798A5] sm:text-2xl">₹ {formatINR(amount)}</span>
            </div>

            {/* Your Impact Box */}
            <div className="mb-6 rounded-xl border border-[#B8E4E7] bg-[#E2F1F3] p-4 sm:p-5">
              <h4 className="mb-3 text-sm font-bold text-[#153C5B]">Your Impact</h4>
              <div className="mb-2 flex items-start justify-between gap-3 text-xs leading-5 text-[#64748B] last:mb-0 sm:text-sm">
                <span>Dialysis Sessions:</span>
                <strong>{impactStats.sessions}</strong>
              </div>
              <div className="mb-2 flex items-start justify-between gap-3 text-xs leading-5 text-[#64748B] last:mb-0 sm:text-sm">
                <span>Patients Supported:</span>
                <strong>{impactStats.patientsSupported}+</strong>
              </div>
              <div className="mb-2 flex items-start justify-between gap-3 text-xs leading-5 text-[#64748B] last:mb-0 sm:text-sm">
                <span>Cost Per Session:</span>
                <strong className="text-right font-bold text-[#0798A5]">₹ 2,000 (100% Free)</strong>
              </div>
            </div>

            {/* Citizenship Selector */}
            <div className="mb-5">
              <label className="mb-2 block text-xs font-bold text-[#334155]">Citizenship</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={`rounded-xl border px-3 py-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] focus-visible:ring-offset-2 sm:text-sm ${citizenship === 'indian' ? 'border-[#0798A5] bg-[#E2F1F3] text-[#153C5B]' : 'border-[#E3EBEF] bg-white text-[#64748B] hover:border-[#0798A5]/50'}`}
                  onClick={() => setCitizenship('indian')}
                >
                  Indian Citizen
                </button>
                <button
                  type="button"
                  className={`rounded-xl border px-3 py-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] focus-visible:ring-offset-2 sm:text-sm ${citizenship === 'foreign' ? 'border-[#0798A5] bg-[#E2F1F3] text-[#153C5B]' : 'border-[#E3EBEF] bg-white text-[#64748B] hover:border-[#0798A5]/50'}`}
                  onClick={() => setCitizenship('foreign')}
                >
                  Foreign National
                </button>
              </div>
            </div>

            {/* Security Check Captcha */}
            <div className="mb-5 rounded-xl border border-[#E3EBEF] bg-[#F8FBFC] p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#153C5B] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-[#0798A5]">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                </svg>
                <span>Security Check</span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-sm text-[#153C5B]">
                  Solve: <strong>{captcha.n1} + {captcha.n2} =</strong>
                </span>
                <input
                  type="number"
                  placeholder="?"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className={`w-16 rounded-lg border px-2 py-2 text-center text-base font-bold text-[#153C5B] outline-none focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10 ${formErrors.captcha ? 'border-red-500 bg-red-50' : 'border-[#E3EBEF] bg-white'}`}
                />
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#0798A5] transition hover:bg-[#E2F1F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5]"
                  title="Refresh captcha"
                  onClick={refreshCaptcha}
                >
                  <svg stroke="currentColor" fill="none" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                </button>
              </div>
              {formErrors.captcha && (
                <span data-donation-error className="mt-1 block text-xs font-semibold text-red-600 text-center">{formErrors.captcha}</span>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="mb-5">
              <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-[#64748B] [&_a]:font-semibold [&_a]:text-[#0798A5] [&_a]:underline [&_a]:underline-offset-2">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#0798A5]"
                />
                <span>
                  I agree to the <a href="#/contact">Terms &amp; Conditions</a> and <a href="#/contact">Privacy Policy</a>
                </span>
              </label>
              {formErrors.terms && (
                <span data-donation-error className="mt-1 block text-xs font-semibold text-red-600">{formErrors.terms}</span>
              )}
            </div>

            {/* Big Submit Button */}
            <button
              type="button"
              className="w-full rounded-xl bg-[#0798A5] px-4 py-4 text-base font-extrabold tracking-wide text-white shadow-lg shadow-[#0798A5]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#087F89] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] focus-visible:ring-offset-2 active:translate-y-0"
              onClick={handleSubmit}
            >
              Donate ₹ {formatINR(amount)}
            </button>

            {/* Trust Badges */}
            <div className="mt-4 flex flex-col items-center justify-center gap-3 text-xs font-semibold text-[#64748B] sm:flex-row sm:gap-4">
              <div className="flex items-center gap-1.5 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-[#0798A5]">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.1em" width="1.1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256 462.8V51.7l175.9 73.3c-3.3 152.3-81.8 261.5-175.9 337.8z"></path>
                </svg>
                <span>100% Tax Exemption 80G</span>
              </div>
              <div className="flex items-center gap-1.5 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-[#0798A5]">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1.1em" width="1.1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                </svg>
                <span>Safe &amp; Verified Trust</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation payment details modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#153C5B]/75 p-3 backdrop-blur-sm sm:p-6" onClick={() => setShowModal(false)}>
          <div className="relative my-auto max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/70 bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-8" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#E3EBEF] bg-white text-[#64748B] transition hover:bg-[#E2F1F3] hover:text-[#153C5B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] sm:right-5 sm:top-5"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            <div className="mb-6 px-7 text-center sm:px-3">
              <div className="mb-3 inline-flex rounded-full border border-[#B8E4E7] bg-[#E2F1F3] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#153C5B]">Direct Trust Donation</div>
              <h3 className="text-xl font-extrabold leading-tight tracking-tight text-[#153C5B] sm:text-2xl">Donation Payment Details</h3>
              <p className="mt-2 text-xs leading-5 text-[#64748B] sm:text-sm">
                Shri Krishan Kanchan Sewa Trust • Unit: Shri Kanchan Dialysis Centre
              </p>
            </div>

            {/* Payment Method Tabs */}
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-[#F3F8FA] p-1">
              <button
                type="button"
                className={`min-h-11 rounded-lg px-3 py-2.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] sm:text-sm ${paymentTab === 'upi' ? 'bg-white text-[#153C5B] shadow-sm ring-1 ring-[#0798A5]/20' : 'text-[#64748B] hover:bg-white/70 hover:text-[#153C5B]'}`}
                onClick={() => setPaymentTab('upi')}
              >
                Scan &amp; Pay via UPI
              </button>
              <button
                type="button"
                className={`min-h-11 rounded-lg px-3 py-2.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] sm:text-sm ${paymentTab === 'bank' ? 'bg-white text-[#153C5B] shadow-sm ring-1 ring-[#0798A5]/20' : 'text-[#64748B] hover:bg-white/70 hover:text-[#153C5B]'}`}
                onClick={() => setPaymentTab('bank')}
              >
                Bank NEFT / RTGS
              </button>
            </div>

            {/* Tab 1: UPI QR Code */}
            {paymentTab === 'upi' && (
              <div className="min-w-0">
                <div className="flex flex-col items-center gap-5 text-center">
                  <div className="rounded-2xl border border-[#E3EBEF] bg-white p-3 shadow-[0_8px_24px_rgba(21,60,91,0.08)]">
                    <img
                      src={upiQrImage}
                      alt="UPI QR Code - Shri Krishan Kanchan Sewa Trust"
                      className="block h-auto w-60 max-w-full rounded-lg object-contain"
                    />
                  </div>
                  <div className="w-full min-w-0">
                    <p className="mb-3 text-sm leading-6 text-[#64748B]">
                      Scan with any UPI App (Google Pay, PhonePe, Paytm, BHIM, CRED)
                    </p>
                    <div className="mx-auto inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-xl border border-[#E3EBEF] bg-[#F8FBFC] px-3 py-2 text-xs sm:text-sm">
                      <span className="text-[#64748B]">UPI ID:</span>
                      <strong className="break-all font-bold text-[#153C5B]">shrikanchantrust@hdfcbank</strong>
                      <button
                        type="button"
                        className="inline-flex min-h-8 items-center justify-center rounded-lg bg-[#0798A5] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#087F89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] focus-visible:ring-offset-2"
                        onClick={() => handleCopy('upi', 'shrikanchantrust@hdfcbank')}
                      >
                        {copiedKey === 'upi' ? (
                          <>
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-1 inline"><path d="M20 6L9 17l-5-5"/></svg>
                            Copied
                          </>
                        ) : 'Copy'}
                      </button>
                    </div>
                    <div className="mt-4 w-full">
                      <a
                        href={`upi://pay?pa=shrikanchantrust@hdfcbank&pn=Shri%20Krishan%20Kanchan%20Sewa%20Trust&am=${amount}&cu=INR`}
                        className="block w-full rounded-xl bg-[#0798A5] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#087F89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] focus-visible:ring-offset-2"
                      >
                        Pay ₹ {formatINR(amount)} with UPI App
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Bank Details */}
            {paymentTab === 'bank' && (
              <div className="min-w-0">
                <div className="overflow-hidden rounded-xl border border-[#E3EBEF] bg-[#F8FBFC]">
                  {BANK_INFO.map((item) => (
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 border-b border-[#E3EBEF] p-3 text-xs last:border-b-0 sm:flex sm:justify-between sm:gap-4 sm:p-4 sm:text-sm" key={item.label}>
                      <span className="text-[#64748B]">{item.label}</span>
                      <strong className="break-all text-right font-bold text-[#153C5B] sm:ml-auto">{item.value}</strong>
                      {(item.isAccount || item.isIfsc) && (
                        <button
                          type="button"
                          className="inline-flex min-h-8 items-center justify-center rounded-lg bg-[#0798A5] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#087F89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] focus-visible:ring-offset-2"
                          onClick={() => handleCopy(item.label, item.value)}
                        >
                          {copiedKey === item.label ? (
                            <>
                              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-1 inline"><path d="M20 6L9 17l-5-5"/></svg>
                              Copied
                            </>
                          ) : 'Copy'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-left text-xs leading-5 text-[#64748B]">
                  * Please mention your Mobile/PAN in transfer remarks for instant 80G tax receipt matching.
                </p>
              </div>
            )}


          </div>
        </div>
      )}
    </div>
  );
};

export default DonateSection;
