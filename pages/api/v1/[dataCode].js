import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { dataCode } = req.query;

    if (req.method === 'GET') {
        const dataDir = path.join(process.cwd(), 'data');
        const filePath = path.join(dataDir, `${dataCode}.json`);

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(fileContents);
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: 'Data not found.' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed. Use GET.' });
    }
}
