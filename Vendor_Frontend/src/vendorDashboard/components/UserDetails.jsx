import React from 'react';

const UserDetails = () => {
  const username = localStorage.getItem("vendorUsername");
  const email = localStorage.getItem("vendorEmail");

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <p><strong>Username:</strong> {username || "Not Available"}</p>
      <p><strong>Email:</strong> {email || "Not Available"}</p>
    </div>
  );
};

export default UserDetails;
