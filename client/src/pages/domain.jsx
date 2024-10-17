import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Domain = () => {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/domains');
        setDomains(response.data);
        setError(null);
      } catch (err) {
        setError('Error fetching domains. Please try again later.');
        console.error('Error fetching domains:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, []);

  const handleDomainClick = (domain) => {
    navigate(`/problems/${domain.toLowerCase().replace(/ /g, '-')}`);
  };

  if (loading) return <div>Loading domains...</div>;
  if (error) return <div>{error}</div>;

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