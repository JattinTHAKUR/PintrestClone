const express = require('express');
const router = express.Router();
const userModel = require('./users');
const postModel = require('./posts');
const passport = require('passport');
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/profile', function(req, res, next) {
  res.render('profile');
});
router.get('/feed', function(req, res, next) {
  res.render('feed');
});
router.get('/profile', isloggedIn , function(req, res, next) {
  res.render("profile pe apka swagat hai!")
});

// Yahaan par ek naya route banaaya gaya hai "/register" jo POST request ko handle karega.
router.post('/register', function(req, res) {
  
  // Naye user ke liye data collect karte hain jo form se aaya hai.
  const userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullName: req.body.fullName
  });
  
  // User ka password bhi collect kiya gaya hai.
  userModel.register(userData, req.body.password)
  .then(function(){
    // Agar user successfully register ho gaya hai, toh hum usko login bhi kara dete hain.
    passport.authenticate("local")(req,res, function(){
      // Redirect karte hain user ko uske profile page par.
      res.redirect('/profile');
    })
  })
});

router.post('/login',passport.authenticate('local', {
  successRedirect: "/profile",
  failureRedirect: "/login"
}) , function(req, res) {

});

router.get('/logout', function(req, res) {
  req.logout(function(err, user) {
    if (err) { return next(err); }
  res.redirect('/');
  });
});

// router.get('/logout', function(req, res) {
//   try {
//     req.logout();
//     res.redirect('/');
//   } catch (err) {
//     // Handle any errors that may occur during logout
//     console.error(err);
//     res.redirect('/');
//   }
// });

function isloggedIn(req, res, next) {
  // Corrected the function name to isAuthenticated(), and negated the condition
  if (req.isAuthenticated()) {
    // If the user is not authenticated, redirect to the home page
    return next();
  }

  // If the user is authenticated, continue to the next middleware
  res.redirect('/login');
}


module.exports = router;