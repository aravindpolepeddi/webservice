const express = require('express');
const app = express();
const pool = require('./database');
const bcrypt = require('bcryptjs');
const { copyDone } = require('pg-protocol/dist/messages');

app.use(express.json());

function decodeBase64(req) {
    const hashedHeader = req.headers.authorization;
    const encoded = hashedHeader.substring(6, hashedHeader.length);
    const base64Val = Buffer.from(encoded, 'base64');
    const decoded = base64Val.toString('utf-8');
    return decoded;
}

app.get("/healthz", (req, res) => {
    try {
        res.status(200).json("server responds with 200 OK if it is healhty.", 200)
    } catch (err) {
        res.json(err.message);
    }
})

app.get("/gettest", async (req, res) => {
try {
const allNames = await pool.query("SELECT * FROM healthz");
res.json(allNames.rows);
} catch (e) {
console.error(e.message);
}
})

app.post("/v1/user", async (req, res) => {
    try {
    const salt = await bcrypt.genSalt(10);
    const {first_name,last_name,password,username}=req.body;
    const hashedPassword = await bcrypt.hash(password, salt);
    const allNames = await pool.query("INSERT INTO healthz(first_name, last_name, username, password, account_created, account_updated) VALUES($1, $2, $3, $4, $5, $6)",[first_name,last_name,username,hashedPassword,new Date(),new Date()]);
    res.status(201).json("User created");
    } catch (e) {
    if (e.code==='23505'){
    res.status(400).json("Bad request");
    }
    }
    })



app.get("/v1/user/self", async (req, res) => {
    try {
    
    const decoded = decodeBase64(req);
    const username = decoded.substring(0, decoded.indexOf(':'));
    const password = decoded.substring(decoded.indexOf(':') + 1, decoded.length);
    const allNames = await pool.query("SELECT * FROM healthz WHERE username =$1",[username]);
    if(allNames.rows.length>0){
     bcrypt.compare(password, allNames.rows[0].password, (err, response) => {
        if(err) {
            console.error(err.message);
        }
        if(response) {
            res.status(200).json("OK");
        }
        else {
            res.status(401).json("Unauthorized");
        }
        })
    }
    else{
        res.status(401).json("Unauthorized");
    }
    } catch (e) {
    if (e.code==='23505'){
    res.status(400).json("Bad request");
    }
    }
    })


    app.put("/v1/user/self", async (req, res) => {
        try { 
            const decoded = decodeBase64(req);
            const username = decoded.substring(0, decoded.indexOf(':'));
            const password = decoded.substring(decoded.indexOf(':') + 1, decoded.length);
            const allNames = await pool.query("SELECT * FROM healthz WHERE username =$1",[username]);
            if(allNames.rows.length>0){
             bcrypt.compare(password, allNames.rows[0].password, async(err, response) => {
                if(err) {
                    console.error(err.message);
                }
                if(response) {
                    try {
                        const salt = await bcrypt.genSalt(10);
                        const {first_name,last_name,password,username}=req.body;
                        const hashedPassword =  await bcrypt.hash(password, salt);
                        const update =  await pool.query('UPDATE healthz SET first_name=$1, last_name=$2,password=$4,username=$3,account_updated=$5 WHERE id=$6',[!req.body.first_name ? first_name : req.body.first_name, !req.body.last_name ? last_name : req.body.last_name,!req.body.username ? username : req.body.username, hashedPassword, new Date(),allNames.rows[0].id]);
                        res.status(201).json("User updated");
                        } catch (e) {
                        if (e.code==='23505'){
                        res.status(400).json("Bad request");
                        }
                        }
                }
                else {
                    res.status(401).json("Unauthorized");
                }
                })
            }
            else{
                res.status(401).json("Unauthorized");
            }
            } catch (e) {
            if (e.code==='23505'){
            res.status(400).json("Bad request");
            }
            }
        })


app.get('*', function(req, res){

    res.send('Page not found!', 404);
    res.status(200).json("page not found:404", 200)

});

module.exports = app ;