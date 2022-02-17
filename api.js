const express = require('express');
const app = express();

app.use(express.json());


app.get("/healthz", (req, res) => {
    try {
        res.status(400).json("server responds with 200 OK if it is healhty.", 400)
    } catch (err) {
        res.json(err.message);
    }
})

app.get('*', function(req, res){

    res.send('Page not found!', 404);
    res.status(200).json("page not found:404", 200)

});

module.exports = app ;
