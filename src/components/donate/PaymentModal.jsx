import { useState } from 'react';
import { CloseIcon } from './icons';
import UpiTab from './UpiTab';
import BankTab from './BankTab';

const TABS = [
  { id: 'upi', label: 'Scan & Pay via UPI' },
  { id: 'bank', label: 'Bank NEFT / RTGS' },
];

const PaymentModal = ({ amount, onClose }) => {
  const [tab, setTab] = useState('upi');

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#153C5B]/75 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative my-auto max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/70 bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#E3EBEF] bg-white text-[#64748B] transition hover:bg-[#E2F1F3] hover:text-[#153C5B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] sm:right-5 sm:top-5"
        >
          <CloseIcon />
        </button>

        <div className="mb-6 px-7 text-center sm:px-3">
          <div className="mb-3 inline-flex rounded-full border border-[#B8E4E7] bg-[#E2F1F3] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#153C5B]">
            Direct Trust Donation
          </div>
          <h3 className="text-xl font-extrabold leading-tight tracking-tight text-[#153C5B] sm:text-2xl">
            Donation Payment Details
          </h3>
          <p className="mt-2 text-xs leading-5 text-[#64748B] sm:text-sm">
            Shri Krishan Kanchan Sewa Trust • Unit: Shri Kanchan Dialysis Centre
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-[#F3F8FA] p-1">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`min-h-11 rounded-lg px-3 py-2.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] sm:text-sm ${tab === id ? 'bg-white text-[#153C5B] shadow-sm ring-1 ring-[#0798A5]/20' : 'text-[#64748B] hover:bg-white/70 hover:text-[#153C5B]'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'upi' ? <UpiTab amount={amount} /> : <BankTab />}
      </div>
    </div>
  );
};

export default PaymentModal;