import React, { createContext, useState } from 'react';

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [registrations, setRegistrations] = useState({
    'FS01': 0, 
    'CL01': 0, 
    'WD01': 0,  
    'BC01': 0,  
  });

  const registerForProblem = (problemCode) => {
    setRegistrations((prev) => ({
      ...prev,
      [problemCode]: prev[problemCode] + 1,
    }));
  };

  const deregisterFromProblem = (problemCode) => {
    setRegistrations((prev) => ({
      ...prev,
      [problemCode]: Math.max(prev[problemCode] - 1, 0),
    }));
  };

  return (
    <RegistrationContext.Provider value={{ registrations, registerForProblem, deregisterFromProblem }}>
      {children}
    </RegistrationContext.Provider>
  );
};
