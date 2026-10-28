export const validateDonation = ({ amount, formData, agreeTerms, captchaInput, captcha }) => {
  const errors = {};

  if (!(amount >= 1)) errors.amount = 'Please choose or enter a donation amount of at least ₹1.';
  if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errors.email = 'Valid Email is required';

  const nationalDigits = formData.mobile.replace(/\D/g, '');
  const codeDigits = formData.countryCode.replace(/\D/g, '');
  const fullLength = nationalDigits.length + codeDigits.length;
  const isIndia = formData.countryCode === '+91';
  if (!nationalDigits || fullLength < 8 || fullLength > 15 || (isIndia && nationalDigits.length !== 10)) {
    errors.mobile = isIndia
      ? 'Enter a valid 10-digit Indian mobile number.'
      : 'Enter a valid mobile number for the selected country.';
  }

  const pan = formData.panNumber.trim().toUpperCase();
  if (formData.request80G && !pan) {
    errors.panNumber = 'PAN Card is required for 80G Tax Exemption';
  } else if (pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
    errors.panNumber = 'Enter a valid 10-character PAN (for example ABCDE1234F).';
  }

  if (!agreeTerms) errors.terms = 'Please accept Terms & Conditions';
  if (parseInt(captchaInput, 10) !== captcha.answer) {
    errors.captcha = 'Incorrect security answer. Please try again.';
  }

  return errors;
};