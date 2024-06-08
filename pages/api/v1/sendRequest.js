// pages/api/sendRequest.js

export default async function handler(req, res) {
  try {
    const response = await fetch('https://925f2fc3-ce95-48bd-8e17-a1c9608f0b82-00-vif1gapljfm4.picard.replit.dev/api/v1/3142');
    const data = await response.text();
    console.log(data);
    res.status(200).json({ message: 'Request sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send request' });
  }
}
