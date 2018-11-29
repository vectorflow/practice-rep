// app/routes.js
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize }   = require('express-validator/filter');
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });
 app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup',
 //    	[

 //   check('uname','Name cannot be left blank')
 //   .isLength({ min: 1 }),

 //   check('email')
 //   .isEmail().withMessage('Please enter a valid email address')
 //   .trim()
 //   .normalizeEmail()
 //   .custom(value => {
 //       return findUserByEmail(value).then(User => {
 //         //if user email already exists throw an error
 //     })
 //   }),

 //   check('password')
 //   .isLength({ min: 5 }).withMessage('Password must be at least 5 chars long')
 //   .matches(/\d/).withMessage('Password must contain one number')
 //   .custom((value,{req, loc, path}) => {
 //     if (value !== req.body.cpassword) {
 //         // throw error if passwords do not match
 //         throw new Error("Passwords don't match");
 //     } else {
 //         return value;
 //     }
 // }),

 //   check('country','Country cannot be left blank')
 //   .isLength({ min: 1 }),

 //  ], function(req, res, next) {

 //     const errors = validationResult(req);

 //   if (!errors.isEmpty()) {

 //      res.json({status : "error", message : errors.array()});

 //   }}, 
 {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
