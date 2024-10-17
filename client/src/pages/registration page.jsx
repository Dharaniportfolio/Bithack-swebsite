import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      abstractProof: e.target.files[0], // Select the uploaded file
    });
  };

  const handleConfirmRegistration = async () => {
    const formDataToSend = new FormData(); // Create a FormData object for file upload

    // Append all form fields
    formDataToSend.append('teamLeadRollNo', formData.teamLeadRollNo);
    formDataToSend.append('teamLeadName', formData.teamLeadName);
    formDataToSend.append('teamLeadMobile', formData.teamLeadMobile);
    formDataToSend.append('student1RollNo', formData.student1RollNo);
    formDataToSend.append('student1Name', formData.student1Name);
    formDataToSend.append('teamName', formData.teamName);
    formDataToSend.append('abstractProof', formData.abstractProof); // Append the file

    try {
      // Send a POST request to the server
      const response = await axios.post(`http://localhost:5000/register/${domain}/${problemCode}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });

      if (response.status === 200) {
        alert('Registration successful!');
        navigate(`/problem-statements/${domain}/${problemCode}`); // Redirect after successful registration
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
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
