import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    rollNo: '',
    labName: '',
    labId: '',
    phoneNo: ''
  });

  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const storedRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];
    setRegistrations(storedRegistrations);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // Save profile data to localStorage or handle accordingly
    console.log('Profile saved:', profile);
  };

  return (
    <div className="profile-page bg-purple-900 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8">Profile</h1>
      
      <div className="profile-form bg-purple-800 p-8 rounded-md shadow-lg mb-8">
        <div className="mb-4">
          <label className="block text-lg">Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-purple-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg">Roll No:</label>
          <input
            type="text"
            name="rollNo"
            value={profile.rollNo}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-purple-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg">Lab Name:</label>
          <input
            type="text"
            name="labName"
            value={profile.labName}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-purple-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg">Lab ID:</label>
          <input
            type="text"
            name="labId"
            value={profile.labId}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-purple-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg">Phone No:</label>
          <input
            type="text"
            name="phoneNo"
            value={profile.phoneNo}
            onChange={handleInputChange}
            className="w-full p-2 rounded-md bg-purple-700 text-white"
          />
        </div>
        <button
          onClick={handleSaveProfile}
          className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-md w-full"
        >
          Save
        </button>
      </div>

      <section className="profile-info w-full max-w-3xl bg-purple-800 p-6 rounded-md shadow-lg">
        <h2 className="text-2xl mb-4">Current Status</h2>
        <table className="w-full text-left text-lg">
          <thead>
            <tr>
              <th className="p-2">Problem Code</th>
              <th className="p-2">Problem Title</th>
              <th className="p-2">Category</th>
              <th className="p-2">Abstract</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length > 0 ? (
              registrations.map((registration, index) => (
                <tr key={index} className="border-b border-purple-700">
                  <td className="p-2">{registration.problemCode}</td>
                  <td className="p-2">{registration.problemTitle}</td>
                  <td className="p-2">{registration.category}</td>
                  <td className="p-2">
                    <button className="text-white">View</button>
                  </td>
                  <td className="p-2">
                    <button className="text-white">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center">No registered problem statements.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ProfilePage;
