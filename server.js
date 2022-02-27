const express = require('express');
const db = require('./config/connection');
//const routes = require('./routes');

// what does this do?


const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
//app.use(routes);


app.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT}!`);
    });
