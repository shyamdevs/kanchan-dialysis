import { FormField, inputClass } from './ui';

const TaxExemptionBox = ({ formData, formErrors, onChange }) => (
  <div className="mt-2 rounded-xl border border-[#E3EBEF] bg-[#F8FBFC] p-4 sm:p-5">
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        name="request80G"
        checked={formData.request80G}
        onChange={onChange}
        className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#0798A5]"
      />
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#153C5B]">
          <strong>Request 80G Tax Exemption Certificate</strong>
          <span className="rounded-md bg-[#E2F1F3] px-2 py-0.5 text-[10px] font-extrabold text-[#153C5B]">IN</span>
        </div>
        <span className="text-xs leading-5 text-[#64748B]">
          Available for Indian donors - helps you save tax on your income!
        </span>
      </div>
    </label>

    {formData.request80G && (
      <div className="mt-4 border-t border-dashed border-[#D6E3E9] pt-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="PAN Card Number *" error={formErrors.panNumber}>
            <input
              type="text"
              name="panNumber"
              maxLength="10"
              placeholder="ABCDE1234F"
              value={formData.panNumber}
              onChange={onChange}
              className={`${inputClass(formErrors.panNumber)} font-bold uppercase tracking-[1.5px]`}
            />
          </FormField>
          <FormField label="City / State">
            <input
              type="text"
              name="city"
              placeholder="e.g. Jaipur, Rajasthan"
              value={formData.city}
              onChange={onChange}
              className={inputClass()}
            />
          </FormField>
        </div>
      </div>
    )}
  </div>
);

export default TaxExemptionBox;