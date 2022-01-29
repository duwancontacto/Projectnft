const express = require("express")
const cors = require("cors")
const connectDB = require("./config/dbConnect")

const routes = require("./routes")


const port = process.env.PORT || 3001;
const app = express()

app.use(express.json({ extended: true }));
app.use(cors())

connectDB() //connect to mongodb
routes(app) //all routes


app.listen(port, (err) => {
    if (err) throw err;

    console.log(` > Server Listen in port: ${port} `);
});