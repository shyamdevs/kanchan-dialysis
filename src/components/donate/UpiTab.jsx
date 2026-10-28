import upiQrImage from '../../assets/upi-qr-scanner-clean.png';
import { formatINR } from '../../Data/donationData';
import CopyButton from './CopyButton';

const UPI_ID = 'shrikanchantrust@hdfcbank';

const UpiTab = ({ amount }) => (
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
          <strong className="break-all font-bold text-[#153C5B]">{UPI_ID}</strong>
          <CopyButton text={UPI_ID} />
        </div>
        <div className="mt-4 w-full">
          <a
            href={`upi://pay?pa=${UPI_ID}&pn=Shri%20Krishan%20Kanchan%20Sewa%20Trust&am=${amount}&cu=INR`}
            className="block w-full rounded-xl bg-[#0798A5] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#087F89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] focus-visible:ring-offset-2"
          >
            Pay ₹ {formatINR(amount)} with UPI App
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default UpiTab;