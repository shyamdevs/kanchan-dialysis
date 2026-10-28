import { DONATION_CATEGORIES } from '../../Data/donationData';
import { FaIcon, CheckIcon } from './icons';
import { CARD_CLASS, SectionTitle } from './ui';

const CategorySelector = ({ selected, onSelect }) => (
  <div className={CARD_CLASS}>
    <SectionTitle icon="user">How Would You Like to Donate?</SectionTitle>
    <div className="grid grid-cols-1 gap-3 min-[481px]:grid-cols-2 xl:grid-cols-3">
      {DONATION_CATEGORIES.map((cat) => {
        const isSelected = selected === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={`group relative flex min-h-28 flex-col items-start gap-2 rounded-xl border p-4 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0798A5] focus-visible:ring-offset-2 sm:p-5 ${isSelected ? 'border-[#0798A5] bg-[#E2F1F3] shadow-sm' : 'border-[#E3EBEF] bg-[#F8FBFC] hover:border-[#0798A5]/50 hover:bg-white'}`}
          >
            <div className="flex items-center text-[#0798A5]">
              <FaIcon name={cat.icon} size="1.5rem" />
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-sm font-bold leading-snug text-[#153C5B]">{cat.title}</span>
              <span className="text-xs leading-5 text-[#64748B]">{cat.desc}</span>
            </div>
            {isSelected && (
              <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#0798A5] text-white">
                <CheckIcon />
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

export default CategorySelector;