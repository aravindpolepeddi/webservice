const app = require('./api')
const pool = require('./database')

app.listen(3000, () => {
    console.log("Server on port 3000");
})


