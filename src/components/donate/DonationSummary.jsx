import { formatINR, getImpact } from '../../Data/donationData';
import { FaIcon, RefreshIcon } from './icons';

const CITIZENSHIP = [
  { id: 'indian', label: 'Indian Citizen' },
  { id: 'foreign', label: 'Foreign National' },
];

const ImpactRow = ({ label, children }) => (
  <div className="mb-2 flex items-start justify-between gap-3 text-xs leading-5 text-[#64748B] last:mb-0 sm:text-sm">
    <span>{label}</span>
    {children}
  </div>
);

const DonationSummary = ({ form, onDonate }) => {
  const {
    amount, citizenship, setCitizenship, captcha, captchaInput, setCaptchaInput,
    refreshCaptcha, agreeTerms, setAgreeTerms, formErrors,
  } = form;
  const { sessions, patientsSupported } = getImpact(amount);

  return (
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

        <div className="mb-6 rounded-xl border border-[#B8E4E7] bg-[#E2F1F3] p-4 sm:p-5">
          <h4 className="mb-3 text-sm font-bold text-[#153C5B]">Your Impact</h4>
          <ImpactRow label="Dialysis Sessions:"><strong>{sessions}</strong></ImpactRow>
          <ImpactRow label="Patients Supported:"><strong>{patientsSupported}+</strong></ImpactRow>
          <ImpactRow label="Cost Per Session:">
            <strong className="text-right font-bold text-[#0798A5]">₹ 2,000 (100% Free)</strong>
          </ImpactRow>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-xs font-bold text-[#334155]">Citizenship</label>
          <div className="grid grid-cols-2 gap-2">
            {CITIZENSHIP.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setCitizenship(id)}
                className={`rounded-xl border px-3 py-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] focus-visible:ring-offset-2 sm:text-sm ${citizenship === id ? 'border-[#0798A5] bg-[#E2F1F3] text-[#153C5B]' : 'border-[#E3EBEF] bg-white text-[#64748B] hover:border-[#0798A5]/50'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-[#E3EBEF] bg-[#F8FBFC] p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#153C5B] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-[#0798A5]">
            <FaIcon name="lock" />
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
              title="Refresh captcha"
              onClick={refreshCaptcha}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#0798A5] transition hover:bg-[#E2F1F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5]"
            >
              <RefreshIcon />
            </button>
          </div>
          {formErrors.captcha && (
            <span data-donation-error className="mt-1 block text-center text-xs font-semibold text-red-600">
              {formErrors.captcha}
            </span>
          )}
        </div>

        <div className="mb-5">
          <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-[#64748B] [&_a]:font-semibold [&_a]:text-[#0798A5] [&_a]:underline [&_a]:underline-offset-2">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-[#0798A5]"
            />
            <span>
              I agree to the <a href="/contact">Terms &amp; Conditions</a> and <a href="/contact">Privacy Policy</a>
            </span>
          </label>
          {formErrors.terms && (
            <span data-donation-error className="mt-1 block text-xs font-semibold text-red-600">{formErrors.terms}</span>
          )}
        </div>

        <button
          type="button"
          onClick={onDonate}
          className="w-full rounded-xl bg-[#0798A5] px-4 py-4 text-base font-extrabold tracking-wide text-white shadow-lg shadow-[#0798A5]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#087F89] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] focus-visible:ring-offset-2 active:translate-y-0"
        >
          Donate ₹ {formatINR(amount)}
        </button>

        <div className="mt-4 flex flex-col items-center justify-center gap-3 text-xs font-semibold text-[#64748B] sm:flex-row sm:gap-4">
          <div className="flex items-center gap-1.5 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-[#0798A5]">
            <FaIcon name="shield" /> <span>100% Tax Exemption 80G</span>
          </div>
          <div className="flex items-center gap-1.5 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-[#0798A5]">
            <FaIcon name="lock" /> <span>Safe &amp; Verified Trust</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationSummary;