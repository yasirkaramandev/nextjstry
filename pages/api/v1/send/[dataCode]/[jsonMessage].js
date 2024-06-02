import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { dataCode, jsonMessage } = req.query;

    if (req.method === 'POST') {
        const dataDir = path.join(process.cwd(), 'data');
        const filePath = path.join(dataDir, `${dataCode}.json`);

        // Create data directory if it doesn't exist
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        }

        let data = [];

        // If file exists, read its contents
        if (fs.existsSync(filePath)) {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            data = JSON.parse(fileContents);
        }

        // Add new JSON message
        data.push({
            JSON: jsonMessage,
            timestamp: new Date().toISOString()
        });

        // Write updated data to file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        res.status(200).json({ message: 'JSON message saved successfully.' });
    } else {
        res.status(405).json({ message: 'Method not allowed. Use POST.' });
    }
}
