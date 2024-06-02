import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { dataCode } = req.query;

    if (req.method === 'POST') {
        const jsonMessage = req.body;
        const dataDir = path.join(process.cwd(), 'data');
        const filePath = path.join(dataDir, `${dataCode}.json`);

        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        }

        let data = [];
        if (fs.existsSync(filePath)) {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            data = JSON.parse(fileContents);
        }

        data.push({
            JSON: jsonMessage,
            timestamp: new Date().toISOString()
        });

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        res.status(200).json({ message: 'JSON message saved successfully.' });
    } else {
        res.status(405).json({ message: 'Method not allowed. Use POST.' });
    }
}
