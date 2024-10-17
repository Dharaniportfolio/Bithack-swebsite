import React, { useState } from 'react';

function StaffPage() {
  const [problemStatements, setProblemStatements] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    domain: '',
    title: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const buttonName = e.nativeEvent.submitter.name;
  
    const newProblemStatement = {
      ...formData,
      maxParticipants: 3,
      problemCode: `NEW-${Date.now()}` // Use timestamp for uniqueness
    };
  
    console.log('New Problem Statement:', newProblemStatement); // Log before sending
  
    try {
      const response = await fetch('http://localhost:5000/problems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProblemStatement),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create problem statement: ${errorData.error}`);
      }
  
      if (buttonName === 'addAnother') {
        setProblemStatements([...problemStatements, newProblemStatement]);
      }
  
      // Reset form fields
      setFormData({
        category: '',
        domain: '',
        title: '',
        description: ''
      });
    } catch (error) {
      console.error(error);
      alert('Error adding problem statement: ' + error.message);
    }
  };
  
  
  const handleCreateOnly = () => {
    // Just reset the form without submitting
    setFormData({
      category: '',
      domain: '',
      title: '',
      description: ''
    });
  };

  return (
    <div className="staff-page">
      <h1 className="page-title">ADD PROBLEM STATEMENT</h1>
      <form className="problem-form" onSubmit={handleSubmit}>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Domain:
          <input
            type="text"
            name="domain"
            value={formData.domain}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Problem Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <div className="form-buttons">
          <button type="submit" name="addAnother">Create & Add Another</button>
          <button type="button" name="createOnly" onClick={handleCreateOnly}>
            Create
          </button>
        </div>
      </form>

      <table className="problem-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Problem Code</th>
            <th>Team Id</th>
            <th>Abstract</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
  {problemStatements.map((statement, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{statement.problemCode}</td>
      <td>{statement.teamId || 'N/A'}</td> {/* Set default value */}
      <td>
        {statement.abstract ? (
          <span className="icon-abstract"></span>
        ) : (
          <span className="icon-no-abstract"></span>
        )}
      </td>
      <td>
        <span className={`status-${statement.status ? statement.status.toLowerCase() : 'unknown'}`}>
          {statement.status || 'Unknown'} {/* Set default value */}
        </span>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

export default StaffPage;
