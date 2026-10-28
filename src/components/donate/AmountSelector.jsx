import { PRESET_AMOUNTS, formatINR, getImpact } from '../../Data/donationData';
import { CheckIcon } from './icons';
import { CARD_CLASS } from './ui';

const AmountSelector = ({ amount, customInput, error, onPreset, onCustomChange }) => {
  const { sessions } = getImpact(amount);

  return (
    <div className={CARD_CLASS}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="min-w-0 text-lg font-bold tracking-tight text-[#153C5B] sm:text-xl">
          Select Donation Amount
        </h2>
        <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-[#B8E4E7] bg-[#E2F1F3] px-3 py-2 text-xs font-semibold leading-5 text-[#153C5B] sm:text-sm">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#0798A5]"></span>
          <strong>{sessions}</strong> dialysis sessions will be sponsored
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-2.5 min-[481px]:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {PRESET_AMOUNTS.map((val) => {
          const isSelected = amount === val;
          return (
            <button
              key={val}
              type="button"
              onClick={() => onPreset(val)}
              className={`relative flex min-h-12 items-center justify-center rounded-xl border px-2 py-3 text-center text-xs font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] focus-visible:ring-offset-2 sm:text-sm ${isSelected ? 'border-[#0798A5] bg-[#0798A5] text-white shadow-md shadow-[#0798A5]/20' : 'border-[#E3EBEF] bg-[#F8FBFC] text-[#153C5B] hover:border-[#0798A5]/60 hover:bg-[#E2F1F3]'}`}
            >
              <span>₹ {formatINR(val)}</span>
              {isSelected && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#153C5B] text-white">
                  <CheckIcon />
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
            inputMode="numeric"
            placeholder="Enter amount"
            value={customInput ? formatINR(customInput) : ''}
            onChange={onCustomChange}
            aria-invalid={error ? 'true' : undefined}
            className="w-full rounded-xl border border-[#E3EBEF] bg-white py-3.5 pl-9 pr-3.5 text-base font-bold text-[#153C5B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10"
          />
        </div>
        {error && (
          <span data-donation-error role="alert" className="mt-1 block text-xs font-semibold text-red-600">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default AmountSelector;