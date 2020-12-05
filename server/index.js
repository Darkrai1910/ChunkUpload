const express = require('express');
const cors = require('cors');
const router = require('./routes/router');
const app = express();

app.use(cors());
app.use('/api',router);
app.use(express.static('public'));

app.listen(3005,() =>{
    console.log('server started on port 3005');
})