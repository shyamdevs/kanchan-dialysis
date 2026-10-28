import { FaIcon } from './icons';

export const CARD_CLASS =
  'min-w-0 rounded-2xl border border-[#E3EBEF] bg-white p-5 shadow-[0_8px_28px_rgba(21,60,91,0.06)] sm:p-7';

const INPUT_BASE =
  'w-full min-w-0 rounded-xl border bg-white px-3.5 py-3 text-sm text-[#153C5B] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0798A5] focus:ring-4 focus:ring-[#0798A5]/10';

export const inputClass = (error) =>
  `${INPUT_BASE} ${error ? 'border-red-500 bg-red-50' : 'border-[#E3EBEF]'}`;

export const SectionTitle = ({ icon, children }) => (
  <div className="mb-6 flex items-center gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E2F1F3] text-[#0798A5]">
      <FaIcon name={icon} size="1.1em" />
    </div>
    <h2 className="text-lg font-bold tracking-tight text-[#153C5B] sm:text-xl">{children}</h2>
  </div>
);

export const FormField = ({ label, icon, error, errorId, help, helpId, children }) => (
  <div className="flex min-w-0 flex-col gap-1.5 text-left">
    <label className="text-xs font-semibold text-[#334155]">{label}</label>
    <div className={`relative flex min-w-0 items-center ${icon ? '[&_input]:pl-10 [&_select]:pl-10' : ''}`}>
      {icon && (
        <span className="pointer-events-none absolute left-3.5 z-10 flex text-[#94A3B8] [&_svg]:h-4 [&_svg]:w-4">
          <FaIcon name={icon} />
        </span>
      )}
      {children}
    </div>
    {help && <span id={helpId} className="mt-1 block text-[11px] leading-5 text-[#64748B]">{help}</span>}
    {error && (
      <span id={errorId} data-donation-error role="alert" className="mt-1 block text-xs font-semibold text-red-600">
        {error}
      </span>
    )}
  </div>
);