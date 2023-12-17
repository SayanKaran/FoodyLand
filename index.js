const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt'); // require bcrypt for password hashing

const uri = 'mongodb+srv://Sayan:4D0E2xyIDlN7onUv@foodyland.ocqotpf.mongodb.net/foodapp?retryWrites=true&w=majority';
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
  var foodapp = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    password: {
      type: String,
      required: true
    }
    
  });
  
  var food = mongoose.model('Foody', foodapp);

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/login", async (req, res) => { // use async function to handle promises
  try {
    let eml=req.body.g2;
    let pass=req.body.g4;
    // find the user with the given email
    let user = await food.findOne({email: eml});
    if (user) {
      // compare the passwords using bcrypt
      let match = await bcrypt.compare(pass, user.password);
      if (match) {
        res.redirect('/menu.html');
      } else {
        res.redirect('/invalid.html');
      }
    } else {
      // send error response if user not found
      res.redirect('/usernf.html');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).redirect('/error.html');
  }
});

app.post("/signup", async (req, res) => { // use async function to handle promises
  try {
    let nm=req.body.g1;
    let eml=req.body.g2;
    let ph=req.body.g3;
    let pass=req.body.g4;
    let cpass=req.body.g5;

    let existingUser=await food.findOne({email: eml});
    // hash the password using bcrypt
    let hashedPass = await bcrypt.hash(pass, 10);
    if(pass===cpass){
    if (existingUser) {
      // send error response if email exists
      res.redirect('/return.html')
    }else{
       // create a new user document with the email and hashed password
    let newUser = new food({name:nm,email: eml,phone:ph, password: hashedPass});
    // save the user document to the database
    await newUser.save();
    res.redirect('/menu.html');
    }
  } }catch (error) {
    console.error('Error:', error);
    res.status(500).redirect('/error.html');
  }
});

app.post("/storeTotalPrice", async (req, res) => {
  try {
      const totalPrice = req.body.totalPrice;
      // Assuming you have a new model/schema for storing total prices
      

      res.json({ success: true });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).redirect('/error.html');
  }
});
app.listen(8080, () => {
  console.log("http://127.0.0.1:8080/");
});


