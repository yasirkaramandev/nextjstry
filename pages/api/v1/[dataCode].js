import { dataStore } from './dataStore';

export default function handler(req, res) {
  const { dataCode } = req.query;

  if (req.method === 'POST') {
    const jsonMessage = req.body;

    if (!jsonMessage) {
      res.status(400).json({ error: "No JSON message provided" });
      return;
    }

    // Gelen JSON mesajını sakla
    dataStore[dataCode] = jsonMessage;

    res.status(200).json({ status: "Message saved successfully" });
  } else if (req.method === 'GET') {
    // Saklanan JSON mesajını geri gönder
    const message = dataStore[dataCode];

    if (!message) {
      res.status(404).json({ error: "Data not found" });
      return;
    }

    res.status(200).json({ status: "Message retrieved successfully", data: message });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
