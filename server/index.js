import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const DATA_FILE = path.join(__dirname, '../knowledge_graph.json');

// Ensure file exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ nodes: {} }, null, 2));
}

// GET Graph
app.get('/api/graph', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error("Error reading graph:", err);
        res.status(500).json({ error: "Failed to read graph" });
    }
});

// POST Graph (Save)
app.post('/api/graph', (req, res) => {
    try {
        const graph = req.body;
        fs.writeFileSync(DATA_FILE, JSON.stringify(graph, null, 2));
        console.log("Graph saved to knowledge_graph.json");
        res.json({ success: true });
    } catch (err) {
        console.error("Error saving graph:", err);
        res.status(500).json({ error: "Failed to save graph" });
    }
});

app.listen(PORT, () => {
    console.log(`Knowledge Graph Server running on http://localhost:${PORT}`);
    console.log(`Saving data to: ${DATA_FILE}`);
});
