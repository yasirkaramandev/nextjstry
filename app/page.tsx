import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-6">Yapım Aşamasında</h1>
      <div className="flex space-x-4">
        <a href="https://www.linkedin.com/in/yasirkaraman/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline hover:text-blue-800">
          LinkedIn
        </a>
        <a href="https://github.com/yasirkaramandev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline hover:text-blue-800">
          GitHub
        </a>
      </div>
    </div>
  );
};

export default HomePage;
