const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.signup = async (req, res) => {
   
    const data = {
         name : req.body.name,
         email : req.body.email,
         password :  req.body.password,
         UserType : req.body.UserType
    }
        
        
            //check if user already exists
            const existinguser = await User.findOne({name: data.name});
            if(existinguser){
                res.send("user is already exists. please choose a differnt name.");
            }
            else{
              //send the data into DB
              //hash the password
              const saltrounds = 10;
              const hashpassword = await bcrypt.hash(data.password, saltrounds);
              data.password = hashpassword; //replace the hash password with the orginal password
              const userdata = await User.insertMany(data);
              console.log(userdata);
              res.render("login");
            }


};

exports.login = async (req, res) => {
    
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }
    
    req.session.userName = user.name;
    req.session.userType = user.UserType;
    res.render('dashboard', {user});


};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
};
