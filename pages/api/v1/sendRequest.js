// pages/api/sendRequest.js

export default async function handler(req, res) {
  try {
    const response = await fetch('https://teknogetir.com');
    const data = await response.text();
    console.log(data);
    res.status(200).json({ message: 'Request sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send request' });
  }
}
