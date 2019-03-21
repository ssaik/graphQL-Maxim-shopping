const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/',(req,res,next) => {
    res.send("hello world");
})
app.listen(4000);

//Start the server by `npm start`
//==> Now goto localhost:4000/
//To Verify the server is working or not.