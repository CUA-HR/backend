import express from 'express';
const app = express();
require('dotenv').config()

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello Wosrld!');
});

app.listen(port, () => {
    return console.log(`Express is listenin at http://localhost:${port}`);
});