var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

// get all users
router.get('/', function(req, res, next){
    User.find(function (err, users){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Found uses',
            obj: users
        });
    });
});

// follow
router.patch('/', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    var isFollow = req.query.follow;
    User.findOne({email: req.body.email}, function(err, user) {
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        User.findById(decoded.user._id, function (err, currentUser) {

            if(err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }    
            if(isFollow=='true'){      
                currentUser.following.push(user);
            }
            else{
                currentUser.following.pull(user);
            }
            currentUser.save(function(err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }         
                if(isFollow=='true'){
                    user.followed.push(currentUser);
                }
                else{
                    user.followed.pull(currentUser);
                }
                user.save(function(err, result) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }      
                    res.status(201).json({
                        message: 'Successfully followed!',
                        obj: result
                    });
    
                });
            });
        });

    });
});

// signup
router.post('/signup', function (req, res, next) {
    var user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: bcrypt.hashSync(req.body.password, 10),
            time: req.body.create_date,
            email: req.body.email
        });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'Duplicate user exist!',
                error: err
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'User created!',
            token: token,
            userId: user._id
        });

    });
    
});

// signin
router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});

// get user information
router.get('/profile', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id)
        .populate('followed','email firstName lastName')
        .populate('following', 'email firstName lastName')
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!user) {
                return res.status(401).json({
                    title: 'No user Found!',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: user
            });
    });
});

// update
router.patch('/profile', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (!user) {
                return res.status(401).json({
                    title: 'No user Found!',
                    error: err
                });
            }
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.password = bcrypt.hashSync(req.body.password, 10);
            user.email = req.body.email;
            user.save(function(err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'User updated',
                    obj: result
                });
            });
    });
});

module.exports = router;