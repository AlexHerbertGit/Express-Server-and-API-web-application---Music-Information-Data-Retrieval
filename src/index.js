//Initialize APi variables
const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const artistRoutes = require('./routes/artistRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//Body parser to parse JSON files
app.use(bodyParser.json());

//Routes
app.use('/api', artistRoutes); //Mounts artist routes on /api.


app.get('/', (req, res) => {
    res.send('Hello world!')
});

//Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});