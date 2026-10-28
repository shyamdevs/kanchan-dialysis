import { useState } from 'react';
import { CheckIcon } from './icons';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex min-h-8 items-center justify-center rounded-lg bg-[#0798A5] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#087F89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] focus-visible:ring-offset-2"
    >
      {copied ? (
        <>
          <CheckIcon className="mr-1 inline" />
          Copied
        </>
      ) : (
        'Copy'
      )}
    </button>
  );
};

export default CopyButton;