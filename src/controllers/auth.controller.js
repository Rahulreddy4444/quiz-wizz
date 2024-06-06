const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.signup = async (req, res) => {
    // const { name, email, password, userType } = req.body;

    // try {
    //     const existingUser = await User.findOne({ email });

    //     if (existingUser) {
    //         return res.send("User already exists. Please choose a different email.");
    //     }

    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     const newUser = new User({ name, email, password: hashedPassword, userType });

    //     await newUser.save();
    //     res.render("login");
    // } catch (error) {
    //     res.status(500).send("Error during signup");
    // }


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
    // const { password } = req.body;

    // try {
    //     const user = await User.findOne({  });

    //     if (!user) {
    //         return res.send("User not found");
    //     }

    //     const isMatch = await bcrypt.compare(password, user.password);

    //     if (isMatch) {
    //         req.session.user = user;
    //         res.redirect("/dashboard");
    //     } else {
    //         res.send("Wrong password");
    //     }
    // } catch (error) {
    //     res.status(500).send("Error during login");
    // }

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
