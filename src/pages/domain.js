import React from 'react';
import { useNavigate } from 'react-router-dom';

const Domain = () => {
  const domains = [
    'FULL STACK',
    'CLOUD',
    'WEB DEVELOPMENT',
    'BLOCKCHAIN',
    'NLP',
    'QT',
    'ML DL',
    'AR/VR',
    'CYBER SECURITY'
  ];

  const navigate = useNavigate();

  const handleDomainClick = (domain) => {
    navigate(`/problems/${domain.toLowerCase().replace(/ /g, '-')}`);
  };

  return (
    <div className="choose-domain">
      <h1>CHOOSE DOMAIN</h1>
      <div className="domain-grid">
        {domains.map((domain, index) => (
          <div key={index} className="domain-item" onClick={() => handleDomainClick(domain)}>
            {domain}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Domain;
