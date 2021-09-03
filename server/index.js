const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({message: 'api request'})
});

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
});