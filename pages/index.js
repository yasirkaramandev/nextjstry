import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [inputData, setInputData] = useState('');
  const [dataCode, setDataCode] = useState('myDataCode');

  const sendData = () => {
    fetch(`/api/v1/${dataCode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: inputData }),
    })
      .then(response => response.json())
      .then(data => console.log('Data sent:', data))
      .catch(error => console.error('Error:', error));
  };

  const fetchData = () => {
    fetch(`/api/v1/${dataCode}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Next.js API Example</h1>
      <div>
        <input
          type="text"
          value={inputData}
          onChange={e => setInputData(e.target.value)}
          placeholder="Enter your message"
        />
        <button onClick={sendData}>Send Data</button>
      </div>
      <div>
        <button onClick={fetchData}>Fetch Data</button>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  );
}
