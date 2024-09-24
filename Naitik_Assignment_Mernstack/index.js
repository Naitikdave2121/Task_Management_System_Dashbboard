const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors"); // Import the cors package
const connectDB = require('./conn'); // Assuming this is a function to connect to the MongoDB database
const bodyParser = require("body-parser");
const multer = require("multer");
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const {  insertcontroller, getprojectdata,updatedata,closeupdate1,Register_Auth,loginauth,cancelupdate,countdashboard,getchdata } = require("./controllers/todo_controller");
const { Registration } = require("./models/todo_models");

// Connect to MongoDB
connectDB();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Use CORS middleware to allow requests from http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware for parsing JSON data
app.use(bodyParser.json());
// Middleware for parsing URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
//Registration1

app.get("/getdata", getprojectdata);
app.post("/login",loginauth);
app.get("/count",countdashboard)
app.post("/registration",Register_Auth);
app.get("/getchartdata",getchdata)
app.post("/postdata", insertcontroller);
app.put("/updatestatus/:id",updatedata);
app.put("/closeupdate/:id",closeupdate1);
app.put("/cancel/:id",cancelupdate);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
