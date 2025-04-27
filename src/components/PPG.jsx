import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

const PPG = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [backendPassword, setBackendPassword] = useState('password123'); // fetch backend password
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const [passwordUpdated, setPasswordUpdated] = useState(false); // State for success message
  useEffect(() => {
    // fetch backend
    setTimeout(() => {
      const fakeData = {
        email: 'sehad@esi.dz',
        firstName: 'Sehad',
        lastName: 'Ahmed'
      };
      setEmail(fakeData.email);
      setFirstName(fakeData.firstName);
      setLastName(fakeData.lastName);
    }, 1000);
  }, []);
  const handlePasswordChange = (e) => {
    e.preventDefault();

    // Reset error message on new submission
    setErrorMessage('');

    // Check if current password matches the one in the backend
    if (currentPassword === backendPassword) {
      // Simulate sending the new password to the backend
      alert('Password updated successfully!');
      
      // Here, you can call your API to update the password
      setBackendPassword(newPassword); // Update the backend password with the new one

      // Optionally, reset current and new password fields
      setCurrentPassword('');
      setNewPassword('');

      // Indicate password is updated
      setPasswordUpdated(true);
    } else {
      setErrorMessage('Current password is incorrect!'); // Show error message
    }
  };
  return (
    <div className='Profil-wrapper'>
      <div className="Profil-container">
        <h2>Profile</h2>
        <form className="profil-form" onSubmit={handlePasswordChange}>
          <h3>Name,Surname,Email address</h3>
          <div className="form-control">
            <label>First Name</label>
            <p>{firstName}</p>
          </div>

          <div className="form-control">
            <label>Last Name</label>
            <p>{lastName}</p>
          </div>

          <div className="form-control">
            <label>Email</label>
            <p>{email}</p>
          </div>

             <div className="bottom-row">
             <button className="but-btn red-btn">Delete Account</button>
             <button className="but-btn yellow-btn">Change Info</button>
             </div>
             <h3>Password</h3>
             <h5>Your email adress is {email}</h5>
             <div className="form-control">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
             <div className="bottom-row">
             <button className="but-btn yellow-btn">Update password</button>

             </div>
             {passwordUpdated && (
            <div className="password-updated-message">
              <p>Password has been successfully updated!</p>
            </div>
          )}

          {errorMessage && (
            <div className="error-message">
              <p style={{ color: 'red' }}>{errorMessage}</p>
            </div>
          )}
         
        </form>
      </div>
    </div>
  );
};

export default PPG;
