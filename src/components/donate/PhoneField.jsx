import { COUNTRY_CALLING_CODES } from '../../Data/donationData';
import { FaIcon } from './icons';
import { FormField, inputClass } from './ui';

const PhoneField = ({ form }) => {
  const { formData, phoneInput, formErrors, changeMobile, blurMobile, changeCountryCode } = form;
  const describedBy = formErrors.mobile ? 'donor-mobile-error donor-mobile-help' : 'donor-mobile-help';

  return (
    <FormField
      label="Mobile Number *"
      error={formErrors.mobile}
      errorId="donor-mobile-error"
      helpId="donor-mobile-help"
      help="Choose your country, or enter the full international number starting with + (for example, +91)."
    >
      <div className="flex w-full min-w-0 gap-2">
        <select
          name="countryCode"
          aria-label="Country calling code"
          value={formData.countryCode}
          onChange={changeCountryCode}
          className="w-[142px] max-w-[45%] shrink-0 rounded-xl border border-[#E3EBEF] bg-white px-2 py-3 text-xs font-semibold text-[#153C5B] outline-none focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10"
        >
          {COUNTRY_CALLING_CODES.map(({ country, code }) => (
            <option key={`${country}-${code}`} value={code}>
              {country} ({code})
            </option>
          ))}
        </select>
        <div className="relative flex min-w-0 flex-1 items-center">
          <span className="pointer-events-none absolute left-3.5 z-10 flex text-[#94A3B8] [&_svg]:h-4 [&_svg]:w-4">
            <FaIcon name="phone" />
          </span>
          <input
            type="tel"
            name="mobile"
            inputMode="tel"
            autoComplete="tel-national"
            maxLength={24}
            placeholder="Number or +country code"
            value={phoneInput}
            onChange={changeMobile}
            onBlur={blurMobile}
            aria-describedby={describedBy}
            className={`${inputClass(formErrors.mobile)} pl-10`}
          />
        </div>
      </div>
    </FormField>
  );
};

export default PhoneField;