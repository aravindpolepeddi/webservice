const express = require('express');
const app = express();

app.use(express.json());


app.get("/healthz", (req, res) => {
    try {
        res.json(" 200 OK ", 200)
    } catch (err) {
        res.json(err.message);
    }
})

app.get('*', function(req, res){

    res.send('Page not found!', 404);

});

module.exports = app ;