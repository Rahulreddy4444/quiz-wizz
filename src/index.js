// const express = require('express');
// const path = require('path');
// const bcrypt = require("bcrypt");
// const collection = require("./config");
// const mongostore = require('connect-mongo');
// const session = require('express-session');

// const app = express();


// // Set up session middleware
// app.use(session({
//     secret: 'my-secret-key',
//     resave: false,
//     saveUninitialized: false,
//     store: mongostore.create({
//       mongoUrl: 'mongodb://localhost/my-database',
//       ttl: 14 * 24 * 60 * 60, // 14 days
//     }),
// }));

// // convert data into json format
// app.use(express.json());

// app.use(express.urlencoded({extended: false}));

// // set ejs as view engine
// app.set('view engine','ejs');
// // static file
// app.use(express.static("public"));


// app.get("/",(req,res)=>{
//     res.render("home");
// })


// app.get("/login",(req,res)=>{
//     res.render("login");
// })


// app.get("/signup",(req,res)=>{
//     res.render("signup");
// })

// app.get('/dashboard', (req, res) => {
//     const userName = req.session.userName;
//     res.render('dashboard', { userName });
// });

// app.get("/logout", (req,res) =>{
//     res.redirect("/");
// })


// //functionality for the signup page- user register
// app.post("/signup",async(req,res) =>{

//     const data = {
//         name : req.body.name,
//         email : req.body.email,
//         password :  req.body.password,
//         UserType : req.body.UserType
//     }


//     //check if user already exists
//     const existinguser = await collection.findOne({name: data.name});
//     if(existinguser){
//         res.send("user is already exists. please choose a differnt name.");
//     }
//     else{
//         //send the data into DB
//       //hash the password
//       const saltrounds = 10;
//       const hashpassword = await bcrypt.hash(data.password, saltrounds);
//       data.password = hashpassword; //replace the hash password with the orginal password
//       const userdata = await collection.insertMany(data);
//       console.log(userdata);
//       res.render("login");
//     }
// })

// //functionality for the login page- user login
// // app.post("/login", async(req,res) =>{
// //     try{
// //         const check = await collection.findOne({name: req.body.name});
// //         if(!check){
// //             res.send("user name cannot found");
// //             // res.alert("user name cannot found");
// //         }

// //         //compare the hash password form the DB with the enterd passowrd
// //         const isMatch = await bcrypt.compare(req.body.password, check.password);
// //         if(isMatch){
// //             res.render("dashboard");
// //         }
// //         else{
// //             req.send("wrong password");
// //         }
// //     }
// //     catch{
// //         res.send("invalid details");
// //     }
// // });


// app.post('/login', async (req, res) => {
//     const { name, password } = req.body;

//     const user = await collection.findOne({ name });
//     if (!user) {
//       return res.status(401).send('Invalid credentials');
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).send('Invalid credentials');
//     }
    
//     req.session.userName = user.name;
//     req.session.userType = user.UserType;
//     res.render('dashboard', {user});
// });




// const port = 5000;
// app.listen(port, () =>{
//     console.log(`server running on port: ${port}`);
// })





const express = require('express');
const path = require('path');
const session = require('express-session');
const { ensureAuthenticated } = require('./middlewares/auth.middleware');
const authRoutes = require('./routes/auth.routes');
const db = require('./config/db.config'); // Ensure DB is connected

const app = express();

const { secret } = require('./config/auth.config');

app.use(session({
    secret,
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render("dashboard", { userType: req.session.user.userType });
});

app.use(authRoutes);

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
