import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [registrations, setRegistrations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch registrations data from the server
  const fetchRegistrations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/registrations');
      setRegistrations(response.data); // Update registrations from DB
    } catch (err) {
      console.error('Error fetching registrations:', err);
      setError('Failed to load registrations');
    }
  };

  useEffect(() => {
    fetchRegistrations();
    setLoading(false); // This should be set only after the fetch completes
  }, []);

  // Register for a problem and update the count in both state and DB
  const registerForProblem = async (problemCode) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/register/${problemCode}`);
      
      if (response.status === 200) {
        // Update local registration count
        setRegistrations((prev) => ({
          ...prev,
          [problemCode]: prev[problemCode] ? prev[problemCode] + 1 : 1,
        }));
        return true; // Indicate success
      }
    } catch (error) {
      console.error('Error registering for problem:', error);
      setError('Failed to register for the problem');
      return false; // Indicate failure
    }
  };
  

  if (loading) {
    return <p>Loading registrations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <RegistrationContext.Provider value={{ registrations, registerForProblem, fetchRegistrations }}>
      {children}
    </RegistrationContext.Provider>
  );
};
