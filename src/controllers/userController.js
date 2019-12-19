User = require('../models/userModel');

let defaultResponseSize = 30;

exports.getall = function (req, res) {
    let limit = req.headers.limit ? req.headers.limit : defaultResponseSize;
    User.find(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else
            res.json({
                status: "success",
                message: "Users retrieved successfully",
                data: users
            });
    }).limit(parseInt(limit));
};

exports.getId = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        else
            res.json({
                message: 'User details loading..',
                data: user
            });
    });
};

exports.getAllName = function (req, res) {
    let limit = req.headers.limit ? req.headers.limit : defaultResponseSize;
    User.find({ "name": req.params.user_name}, function (err, users) {
        if (err)
            res.send(err);
        else
            res.json({
                message: 'Users loading..',
                data: users
            });
    }).limit(parseInt(limit));
};

exports.getAllEmail = function (req, res) {
    let limit = req.headers.limit ? req.headers.limit : defaultResponseSize;
    SensorPackage.find({ "email": req.params.user_email}, function (err, users) {
        if (err)
            res.send(err);
        else
            res.json({
                message: 'Users loading..',
                data: users
            });
    }).limit(parseInt(limit));
};

exports.getAllQuery = function (req, res) {
    let limit = req.headers.limit ? req.headers.limit : defaultResponseSize;
    User.find(req.body, function (err, user) {
        if (err)
            res.send(err);
        else
            res.json({
                message: 'User details loading..',
                data: user
            });
    }).limit(parseInt(limit));
};

exports.new = function (req, res) {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function (err) {
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New user created!',
                data: user
            });
    });
};

exports.update = function (req, res) {User.findById(req.params.user_id, function (err, user) {
    if (err)
        res.send(err);
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email ? req.body.email : user.email;
    user.password = req.body.password ? req.body.password : user.password;
    user.save(function (err) {
        if (err)
            res.json(err);
        else
            res.json({
                message: 'User Info updated',
                data: user
            });
    });
});
};

exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
        else
            res.json({
                status: "success",
                message: 'User deleted',
                data: user
            });
    });
};
