// const express = require("express");
// const fs = require("fs");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();

// // Middleware
// app.use(cors()); // Allows requests from different origins
// app.use(bodyParser.json()); // Parses JSON request body

// // Endpoint to save data
// app.post("/save", (req, res) => {
//     const extractedText = req.body; // Get the received text
//     console.log(extractedText);

//     // Read existing data from data.json (if available)
//     fs.readFile("data.json", "utf8", (err, fileData) => {
//         let jsonData = [];

//         if (!err && fileData) {
//             try {
//                 jsonData = JSON.parse(fileData);
//             } catch (error) {
//                 console.error("Error parsing JSON:", error);
//             }
//         }

//         // Append the new extracted text
//         jsonData.push(extractedText);

//         // Write updated data back to the JSON file
//         fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
//             if (err) {
//                 console.error("Error writing file:", err);
//                 return res.status(500).send("Error saving data");
//             }
//             res.send("Data saved successfully!");
//         });
//     });
// });

// // Start server
// app.listen(3000, () => console.log("Server running on port 3000"));

const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors()); // Allow requests from different origins
app.use(bodyParser.json()); // Parse JSON request body

// Endpoint to save data
app.post("/save", (req, res) => {
    const extractedText = req.body.text; // Get text from request body
    console.log("Received text:", extractedText);

    if (!extractedText) {
        return res.status(400).send("No text provided");
    }

    // Read existing data from data.json (if available)
    fs.readFile("data.json", "utf8", (err, fileData) => {
        let jsonData = [];

        if (!err && fileData) {
            try {
                jsonData = JSON.parse(fileData);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }

        // extText = extractedText.replace(/\\n/g, "\n");
        // Append new extracted text
        jsonData.push({ text: extractedText });

        // Write updated data back to JSON file
        fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return res.status(500).send("Error saving data");
            }
            res.send("Data saved successfully!");
        });
    });
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
