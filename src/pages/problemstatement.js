import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
const ProblemStatements = () => {
  const { domain } = useParams();

  // Example data structure for different domains
  const domainProblems = {
    'full-stack': [
      { code: 'FS01', topic: 'Job Interview Preparation Tool' },
      { code: 'FS02', topic: 'Sports Statistics Tracker' },
      { code: 'FS03', topic: 'Social Media App' }
    ],
    'cloud': [
      { code: 'CL01', topic: 'Cloud Storage Management System' },
      { code: 'CL02', topic: 'Cloud Cost Optimization Tool' },
      { code: 'CL03', topic: 'Cloud Monitoring Dashboard' }
    ],
    'web-development': [
      { code: 'WD01', topic: 'E-commerce Website' },
      { code: 'WD02', topic: 'Portfolio Website' },
      { code: 'WD03', topic: 'Real-time Chat Application' }
    ],
    'blockchain': [
      { code: 'BC01', topic: 'Decentralized Finance Platform' },
      { code: 'BC02', topic: 'Blockchain-based Voting System' },
      { code: 'BC03', topic: 'NFT Marketplace' }
    ],
    'nlp': [
      { code: 'NLP01', topic: 'Chatbot Development' },
      { code: 'NLP02', topic: 'Sentiment Analysis Tool' },
      { code: 'NLP03', topic: 'Text Summarization App' }
    ],
    'qt': [
      { code: 'QT01', topic: 'Cross-platform Application' },
      { code: 'QT02', topic: 'Embedded System UI' },
      { code: 'QT03', topic: 'Multi-touch Interface' }
    ],
    'ml-dl': [
      { code: 'MLDL01', topic: 'Image Classification' },
      { code: 'MLDL02', topic: 'Object Detection System' },
      { code: 'MLDL03', topic: 'Predictive Analytics Tool' }
    ],
    'ar-vr': [
      { code: 'ARVR01', topic: 'Virtual Reality Game' },
      { code: 'ARVR02', topic: 'Augmented Reality Shopping App' },
      { code: 'ARVR03', topic: 'VR-based Training Simulator' }
    ],
    'cyber-security': [
      { code: 'CS01', topic: 'Intrusion Detection System' },
      { code: 'CS02', topic: 'Encryption Tool' },
      { code: 'CS03', topic: 'Cybersecurity Awareness App' }
    ]
  };

  // Get problems for the selected domain
  const problems = domainProblems[domain] || [];

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
            <tr key={problem.code}>
              <td>{problem.code}</td>
              <td>{problem.topic}</td>
              <td>
              <Link to={`/problem-statements/${domain}/${problem.code}`}>
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
