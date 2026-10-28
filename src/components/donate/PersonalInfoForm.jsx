import { CARD_CLASS, SectionTitle, FormField, inputClass } from './ui';
import PhoneField from './PhoneField';
import TaxExemptionBox from './TaxExemptionBox';

const TITLES = ['Mr', 'Mrs', 'Ms', 'Dr', 'Shri', 'Smt'];

const PersonalInfoForm = ({ form, onSubmit }) => {
  const { formData, formErrors, changeInput, selectedCategory } = form;
  const showDedication = selectedCategory === 'memory' || selectedCategory === 'occasion';

  return (
    <div className={CARD_CLASS}>
      <SectionTitle icon="user">Personal Information</SectionTitle>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="grid gap-4 min-[769px]:grid-cols-[120px_minmax(0,1fr)]">
          <FormField label="Title" icon="user">
            <select
              name="title"
              value={formData.title}
              onChange={changeInput}
              className={`${inputClass()} appearance-none`}
            >
              {TITLES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Full Name *" icon="user" error={formErrors.fullName}>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={changeInput}
              className={inputClass(formErrors.fullName)}
            />
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Email *" icon="mail" error={formErrors.email}>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={changeInput}
              className={inputClass(formErrors.email)}
            />
          </FormField>

          <FormField label="Date of Birth" icon="calendar">
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={changeInput}
              className={inputClass()}
            />
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <PhoneField form={form} />

          <FormField label="Alternate Mobile (Optional)" icon="phone">
            <input
              type="tel"
              name="altMobile"
              placeholder="Alternate number"
              value={formData.altMobile}
              onChange={changeInput}
              className={inputClass()}
            />
          </FormField>
        </div>

        {showDedication && (
          <FormField label={selectedCategory === 'memory' ? 'In Memory of (Name)' : 'Special Occasion Note / Name'}>
            <input
              type="text"
              name="dedicationNote"
              placeholder="e.g. In loving memory of Late Shri Ram Sharma"
              value={formData.dedicationNote}
              onChange={changeInput}
              className={inputClass()}
            />
          </FormField>
        )}

        <TaxExemptionBox formData={formData} formErrors={formErrors} onChange={changeInput} />
      </form>
    </div>
  );
};

export default PersonalInfoForm;