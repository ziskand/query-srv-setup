const express = require('express');
const queriesController = require("./controllers/queries.controller");

const app = express();
const PORT = process.env.PORT || 5000;


app.get('/load-data', async (req, res) => {
    try {
        await queriesController.loadData();

        res.send('pong');
    } catch (error) {
        console.log(error);
    }
});

app.get('/answer', (req, res) => {
    res.send('Answer Route');
});

app.get('/entitiy', (req, res) => {
    res.send('Entities Route');
});

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});