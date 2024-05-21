import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-6">Yapım Aşamasında</h1>
      <div className="flex space-x-4">
        <a href="https://www.linkedin.com/in/sizin-linkedin-hesabınız" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
        <a href="https://github.com/sizin-github-hesabınız" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
          <i className="fab fa-github fa-2x"></i>
        </a>
      </div>
    </div>
  );
};

export default HomePage;
