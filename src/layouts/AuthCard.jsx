import React from 'react'

const AuthCard = ({ title, children }) => {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">{title}</h2>
        {children}
      </div>
    );
  };

export default AuthCard