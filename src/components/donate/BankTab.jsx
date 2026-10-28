import { BANK_INFO } from '../../Data/donationData';
import CopyButton from './CopyButton';

const BankTab = () => (
  <div className="min-w-0">
    <div className="overflow-hidden rounded-xl border border-[#E3EBEF] bg-[#F8FBFC]">
      {BANK_INFO.map((item) => (
        <div
          key={item.label}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 border-b border-[#E3EBEF] p-3 text-xs last:border-b-0 sm:flex sm:justify-between sm:gap-4 sm:p-4 sm:text-sm"
        >
          <span className="text-[#64748B]">{item.label}</span>
          <strong className="break-all text-right font-bold text-[#153C5B] sm:ml-auto">{item.value}</strong>
          {item.copyable && <CopyButton text={item.value} />}
        </div>
      ))}
    </div>
    <p className="mt-3 text-left text-xs leading-5 text-[#64748B]">
      * Please mention your Mobile/PAN in transfer remarks for instant 80G tax receipt matching.
    </p>
  </div>
);

export default BankTab;