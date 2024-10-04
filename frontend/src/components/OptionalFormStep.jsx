import React from 'react';

const OptionalFormStep = ({ formData, setFormData, prevStep, nextStep }) => (
  <div className='form-step'>
    <h2>Step 3: Optional Information</h2>
    <input
      type='text'
      placeholder='Phone (Optional)'
      value={formData.phone}
      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
    />
    <input
      type='text'
      placeholder='Location (Optional)'
      value={formData.location}
      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
    />
    <button onClick={prevStep} className='btn-prev'>
      Back
    </button>
    <button onClick={nextStep} className='btn-next'>
      Next
    </button>
  </div>
);

export default OptionalFormStep;
