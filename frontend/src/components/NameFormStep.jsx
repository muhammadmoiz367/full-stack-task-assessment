import React, { useState } from 'react';

const NameFormStep = ({ formData, setFormData, nextStep }) => {
  const [error, setError] = useState(null);

  const handleNext = () => {
    if (!formData.name) {
      setError('Name is required');
      return;
    }
    nextStep();
  };

  return (
    <div className='form-step'>
      <h2>Step 1: Enter Your Name</h2>
      <input
        type='text'
        placeholder='Name'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {error && <p className='error'>{error}</p>}
      <button onClick={handleNext} className='btn-next'>
        Next
      </button>
    </div>
  );
};

export default NameFormStep;
