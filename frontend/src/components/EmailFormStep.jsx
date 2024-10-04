import React, { useState } from 'react';

const EmailFormStep = ({ formData, setFormData, prevStep, nextStep }) => {
  const [error, setError] = useState(null);

  const handleNext = () => {
    if (!formData.email) {
      setError('Email is required');
      return;
    }
    nextStep();
  };

  return (
    <div className='form-step'>
      <h2>Step 2: Enter Your Email</h2>
      <input
        type='email'
        placeholder='Email'
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {error && <p className='error'>{error}</p>}
      <button onClick={prevStep} className='btn-prev'>
        Back
      </button>
      <button onClick={handleNext} className='btn-next'>
        Next
      </button>
    </div>
  );
};

export default EmailFormStep;
