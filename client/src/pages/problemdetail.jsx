import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RegistrationContext } from './registrationcontext';

const ProblemDetail = () => {
  const { domain, problemCode } = useParams();
  const navigate = useNavigate();
  const { registrations, registerForProblem, fetchRegistrations } = useContext(RegistrationContext);
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(domain)

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/problems/${domain}/${problemCode}`);
        setProblem(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching problem details:', err);
        setError('Failed to load problem details');
        setLoading(false);
      }
    };

    fetchProblemDetails();
  }, [domain, problemCode]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!problem) {
    return <div>Problem not found</div>;
  }

  const registered = registrations[problemCode] || 0;

  const handleRegister = async () => {
    if (registered < problem.maxParticipants) {
      await registerForProblem(problemCode); // Ensure registration happens first
      // Refetch the updated registration count after registering
      await fetchRegistrations(); // Call to refetch the registrations from the server
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
      <p><strong>Objective:</strong> {problem.description}</p>
      <p><strong>Registered:</strong> {registered}/{problem.maxParticipants}</p>
      <button onClick={handleGoBack}>GO BACK</button>
      <button onClick={handleRegister} disabled={registered >= problem.maxParticipants}>REGISTER</button>
    </div>
  );
};

export default ProblemDetail;
