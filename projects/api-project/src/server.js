import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve the root index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "../")));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});