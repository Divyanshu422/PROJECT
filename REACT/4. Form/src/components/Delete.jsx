import React, { useState } from 'react';

function Delete() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Regex for basic email validation
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setIsValid(emailRegex.test(value));
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={email}
        onChange={handleChange}
        placeholder="Enter email"
        className={`border p-2 ${isValid ? 'border-green-500' : 'border-red-500'}`}
      />
      <p>{isValid ? 'Valid email' : 'Invalid email'}</p>
    </div>
  );
}

export default Delete;
