// app/page.tsx

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('https://teknogetir.com')
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }, 15000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {/* Your existing page content */}
    </div>
  );
}
