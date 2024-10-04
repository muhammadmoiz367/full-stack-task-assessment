import React from 'react';

const ReviewFormStep = ({ formData, prevStep, submitForm }) => (
  <div className='form-step'>
    <h2>Review Your Information</h2>
    <p>Name: {formData.name}</p>
    <p>Email: {formData.email}</p>
    {formData.phone && <p>Phone: {formData.phone}</p>}
    {formData.location && <p>Location: {formData.location}</p>}

    <button onClick={prevStep} className='btn-prev'>
      Back
    </button>
    <button onClick={submitForm} className='btn-submit'>
      Submit
    </button>
  </div>
);

export default ReviewFormStep;
