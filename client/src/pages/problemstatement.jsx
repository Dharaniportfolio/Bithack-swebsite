import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

const ProblemStatements = () => {
  const { domain } = useParams();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  console.log(domain)

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/problems/${domain}`);
        setProblems(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching problems:', err);
        setError('Failed to load problem statements');
        setLoading(false);
      }
    };    

    fetchProblems();
  }, [domain]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="problem-statements">
      <h1>PROBLEM STATEMENTS - {domain.replace('-', ' ').toUpperCase()}</h1>
      <table className="problem-table">
        <thead>
          <tr>
            <th>Problem Code</th>
            <th>Topic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.problemCode}>
              <td>{problem.problemCode}</td>
              <td>{problem.title}</td>
              <td>
                <Link to={`/problem-statements/${domain}/${problem.problemCode}`}>
                  <button className="view-button">VIEW</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemStatements;
