import { dataStore } from '..../dataStore';

export default function handler(req, res) {
  const { dataCode, jsonMessage } = req.query;

  if (req.method === 'GET') {
    // Saklanan JSON mesajını geri gönder
    const message = dataStore[dataCode];

    if (!message) {
      res.status(404).json({ error: "Data not found" });
      return;
    }

    res.status(200).json({ status: "Message retrieved successfully", data: message });
  } else if (req.method === 'POST') {
    try {
      const parsedMessage = JSON.parse(jsonMessage);

      // Gelen JSON mesajını sakla
      dataStore[dataCode] = parsedMessage;

      res.status(200).json({ status: "Message saved successfully" });
    } catch (error) {
      res.status(400).json({ error: "Invalid JSON format" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
