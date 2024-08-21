import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const { domain, problemCode } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    teamLeadRollNo: '',
    teamLeadName: '',
    teamLeadMobile: '',
    student1RollNo: '',
    student1Name: '',
    teamName: '',
    abstractProof: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      abstractProof: e.target.files[0],
    });
  };

  const handleConfirmRegistration = () => {
    // Add logic to handle actual registration process here
    alert('Registration successful!');
    navigate(`/problem-statements/${domain}/${problemCode}`); // Redirect back to the problem detail page
  };

  return (
    <div className="registration-page">
      <h1>Registration for {problemCode}</h1>
      <p>Domain: {domain.replace('-', ' ').toUpperCase()}</p>
      <form>
        <div className="form-group">
          <label>Team Lead Roll No:</label>
          <input
            type="text"
            name="teamLeadRollNo"
            value={formData.teamLeadRollNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Team Lead Name:</label>
          <input
            type="text"
            name="teamLeadName"
            value={formData.teamLeadName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Team Lead Mobile No:</label>
          <input
            type="text"
            name="teamLeadMobile"
            value={formData.teamLeadMobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Student 1 Roll No:</label>
          <input
            type="text"
            name="student1RollNo"
            value={formData.student1RollNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Student 1 Name:</label>
          <input
            type="text"
            name="student1Name"
            value={formData.student1Name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Team Name:</label>
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Abstract Proof:</label>
          <input
            type="file"
            name="abstractProof"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="button" onClick={() => navigate(-1)} className="cancel-button">Cancel</button>
          <button type="button" onClick={handleConfirmRegistration} className="register-button">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
