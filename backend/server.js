const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { ethers } = require("ethers");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Verify signature and issue JWT
app.post("/login", async (req, res) => {
  const { address, message, signature } = req.body;

  try {
    const recovered = ethers.utils.verifyMessage(message, signature);

    if (recovered.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    const token = jwt.sign({ address }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Verification failed" });
  }
});

// Protected route
app.get("/protected", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);

  const token = auth.split(" ")[1];

  try {
    const data = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Welcome to the protected route!", address: data.address });
  } catch (err) {
    res.status(403).json({ error: "Token invalid" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
