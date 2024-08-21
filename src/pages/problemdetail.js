import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RegistrationContext } from './registrationcontext';

const ProblemDetail = () => {
  const { domain, problemCode } = useParams();
  const navigate = useNavigate();
  const { registrations, registerForProblem } = useContext(RegistrationContext);

  const problemDetails = {
    'FS01': {
      title: 'Job Interview Preparation Tool',
      objective: 'Build a tool that helps users prepare for job interviews. Include features like interview question banks, mock interview simulations, and feedback.',
      maxParticipants: 3,
    },
    'CL01': {
      title: 'Cloud Storage Management System',
      objective: 'Develop a system for managing cloud storage efficiently with features like automatic backups, file versioning, and cost monitoring.',
      maxParticipants: 5,
    },
    'WD01': {
      title: 'E-commerce Website',
      objective: 'Build a fully functional e-commerce website with user authentication, product catalog, shopping cart, and payment integration.',
      maxParticipants: 3,
    },
    'BC01': {
      title: 'Decentralized Finance Platform',
      objective: 'Develop a decentralized finance platform with features such as lending, borrowing, and staking using blockchain technology.',
      maxParticipants: 4,
    },
  };

  const problem = problemDetails[problemCode];
  const registered = registrations[problemCode] || 0;

  if (!problem) {
    return <div>Problem not found</div>;
  }

  const handleRegister = () => {
    if (registered < problem.maxParticipants) {
      registerForProblem(problemCode);
      navigate(`/register/${domain}/${problemCode}`);
    } else {
      alert('Registration full!');
    }
  };

  const handleGoBack = () => {
    navigate(`/problems/${domain}`);
  };

  return (
    <div className="problem-detail">
      <h1>{problem.title}</h1>
      <p><strong>Problem Code:</strong> {problemCode}</p>
      <p><strong>Objective:</strong> {problem.objective}</p>
      <p><strong>Registered:</strong> {registered}/{problem.maxParticipants}</p>
      <button onClick={handleGoBack}>GO BACK</button>
      <button onClick={handleRegister} disabled={registered >= problem.maxParticipants}>REGISTER</button>
    </div>
  );
};

export default ProblemDetail;
