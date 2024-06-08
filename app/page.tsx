// app/page.tsx
"use client"; // Bu ifadeyi ekleyin

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('https://925f2fc3-ce95-48bd-8e17-a1c9608f0b82-00-vif1gapljfm4.picard.replit.dev/api/v1/3142')
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
