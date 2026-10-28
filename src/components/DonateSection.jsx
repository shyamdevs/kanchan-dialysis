import { useState } from 'react';
import useDonateForm from '../hooks/useDonateForm';
import CategorySelector from './donate/CategorySelector';
import AmountSelector from './donate/AmountSelector';
import PersonalInfoForm from './donate/PersonalInfoForm';
import DonationSummary from './donate/DonationSummary';
import PaymentModal from './donate/PaymentModal';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5]';

const DonateSection = () => {
  const form = useDonateForm();
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    if (form.submit(e)) setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] px-4 py-8 font-[Poppins] text-[#153C5B] sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto mb-8 max-w-7xl sm:mb-10">
        <div className="mb-7 flex items-center gap-2 text-sm font-medium text-[#64748B]">
          <a href="/" className={`rounded-sm text-[#0798A5] transition hover:text-[#087F89] hover:underline ${focusRing}`}>
            ← Home
          </a>
          <span className="text-[#94A3B8]">/</span>
          <span className="font-semibold text-[#153C5B]">Donate</span>
        </div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[#153C5B] sm:text-4xl lg:text-5xl">
          Make a Difference Today
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base">
          Your donation helps provide free life-saving dialysis, medicines, and hope to underprivileged patients in Rajasthan.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px] xl:gap-8">
        <div className="flex min-w-0 flex-col gap-6">
          <CategorySelector selected={form.selectedCategory} onSelect={form.setSelectedCategory} />
          <AmountSelector
            amount={form.amount}
            customInput={form.customInput}
            error={form.formErrors.amount}
            onPreset={form.selectPreset}
            onCustomChange={form.changeCustomAmount}
          />
          <PersonalInfoForm form={form} onSubmit={handleSubmit} />
        </div>

        <DonationSummary form={form} onDonate={handleSubmit} />
      </div>

      {showModal && <PaymentModal amount={form.amount} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default DonateSection;