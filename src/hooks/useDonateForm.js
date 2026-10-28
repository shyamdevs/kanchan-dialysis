import { useState } from 'react';
import { findCallingCode } from '../Data/donationData';
import { validateDonation } from '../lib/validateDonation';

const makeCaptcha = () => {
  const n1 = Math.floor(Math.random() * 8) + 2;
  const n2 = Math.floor(Math.random() * 8) + 2;
  return { n1, n2, answer: n1 + n2 };
};

const stripPhone = (v) => v.replace(/[\s().-]/g, '');

const INITIAL_FORM = {
  title: 'Mr', fullName: '', email: '', dob: '',
  countryCode: '+91', mobile: '', altMobile: '',
  request80G: true, panNumber: '', address: '', city: '',
  pincode: '', dedicationNote: '',
};

export default function useDonateForm() {
  const [selectedCategory, setSelectedCategory] = useState('dialysis');
  const [amount, setAmount] = useState(150000);
  const [customInput, setCustomInput] = useState('150000');
  const [citizenship, setCitizenship] = useState('indian'); // 'indian' | 'foreign'
  const [phoneInput, setPhoneInput] = useState('');
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [captcha, setCaptcha] = useState(makeCaptcha);
  const [captchaInput, setCaptchaInput] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  const clearError = (name) =>
    setFormErrors((prev) => (prev[name] ? { ...prev, [name]: '' } : prev));

  const refreshCaptcha = () => {
    setCaptcha(makeCaptcha());
    setCaptchaInput('');
  };

  const selectPreset = (val) => {
    setAmount(val);
    setCustomInput(val.toString());
    clearError('amount');
  };

  const changeCustomAmount = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setCustomInput(raw);
    const num = parseInt(raw, 10);
    setAmount(isNaN(num) ? 0 : num);
    clearError('amount');
  };

  const changeInput = (e) => {
    const { name, value, type, checked } = e.target;
    const next = type === 'checkbox' ? checked : name === 'panNumber' ? value.toUpperCase() : value;
    setFormData((prev) => ({ ...prev, [name]: next }));
    clearError(name);
  };

  const changeMobile = (e) => {
    const rawValue = e.target.value;
    setPhoneInput(rawValue);
    const normalized = stripPhone(rawValue);

    if (normalized.startsWith('+')) {
      const matched = findCallingCode(normalized);
      if (matched) {
        const mobile = normalized.slice(matched.code.length).replace(/\D/g, '');
        setFormData((prev) => ({ ...prev, countryCode: matched.code, mobile }));
      } else {
        // Unrecognised international prefix: don't submit its digits.
        setFormData((prev) => ({ ...prev, mobile: '' }));
      }
    } else {
      setFormData((prev) => ({ ...prev, mobile: rawValue.replace(/\D/g, '') }));
    }
    clearError('mobile');
  };

  const blurMobile = () => {
    const normalized = stripPhone(phoneInput);
    if (!normalized.startsWith('+')) return;
    const matched = findCallingCode(normalized);
    const national = matched ? normalized.slice(matched.code.length).replace(/\D/g, '') : '';
    if (matched && national) setPhoneInput(national);
  };

  const changeCountryCode = (e) => {
    const countryCode = e.target.value;
    setFormData((prev) => ({ ...prev, countryCode }));
    setPhoneInput(formData.mobile);
    clearError('mobile');
  };

  // Returns true when the form is valid.
  const submit = (e) => {
    e.preventDefault();
    const errors = validateDonation({ amount, formData, agreeTerms, captchaInput, captcha });
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      // Wait for React to render the error messages, then scroll to the first one.
      setTimeout(() => {
        document
          .querySelector('[data-donation-error]')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 0);
      return false;
    }
    return true;
  };

  return {
    selectedCategory, setSelectedCategory,
    amount, customInput, selectPreset, changeCustomAmount,
    citizenship, setCitizenship,
    formData, changeInput,
    phoneInput, changeMobile, blurMobile, changeCountryCode,
    captcha, captchaInput, setCaptchaInput, refreshCaptcha,
    agreeTerms, setAgreeTerms,
    formErrors, submit,
  };
}