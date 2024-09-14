import React, { useState } from 'react';

function StaffPage() {
  const [problemStatements, setProblemStatements] = useState([
    { id: 1, code: 'CC01', teamId: 22, abstract: true, status: 'Initiated' },
    { id: 2, code: 'FD07', teamId: 18, abstract: true, status: 'Approved' },
    { id: 3, code: 'CT18', teamId: 10, abstract: false, status: 'Rejected' }
  ]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const buttonName = e.nativeEvent.submitter.name;

    if (buttonName === 'addAnother') {
      const newProblemStatement = {
        id: problemStatements.length + 1,
        code: `NEW${problemStatements.length + 1}`,
        teamId: Math.floor(Math.random() * 100), // For demo purposes
        abstract: formData.description !== '',
        status: 'Initiated'
      };
      setProblemStatements([...problemStatements, newProblemStatement]);
    }

    // Reset form fields
    setFormData({
      category: '',
      domain: '',
      title: '',
      description: ''
    });
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
            <tr key={statement.id}>
              <td>{index + 1}</td>
              <td>{statement.code}</td>
              <td>{statement.teamId}</td>
              <td>
                {statement.abstract ? (
                  <span className="icon-abstract"></span>
                ) : (
                  <span className="icon-no-abstract"></span>
                )}
              </td>
              <td>
                <span className={`status-${statement.status.toLowerCase()}`}>
                  {statement.status}
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
