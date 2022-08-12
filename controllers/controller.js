const student = require("../models/student");
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");

module.exports.index = (req, res) => {
    res.render("index");
}

module.exports.login = (req, res) => {
    res.render("login");
}
module.exports.view = (req, res) => {

    student.find({}, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        }
        res.render("view", {
            data: data
        })
    })
}
module.exports.loginp = async (req, res) => {
    let studentr = await student.findOne({ email: req.body.email })
    const isCorrect = bcrypt.compare(req.body.pwd, studentr.pwd);
    const token = await studentr.generateauthtoken();
    res.cookie("jwt", token, { expires: new Date(Date.now() + 30000), httpOnly: true });

    if (isCorrect) {
        student.find({}, function (err, data) {
            if (err) {
                console.log(err);
                return false;
            }
            res.render("view", {
                data: data
            })
        })
    }
    else {
        console.log("password not match");
        res.render('login')
    }
}

module.exports.register = (req, res) => {
    student.findOne({ "email": req.body.email }, async (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data) {
            if (data.email !== req.body.email) {
                //console.log(req.body.name)
            }
            else {
                console.log("email all ready exist");
            }
        }
        else {
            if (req.body.pwd === req.body.cpwd) {
                const studentsRegister = new student({
                    name: req.body.name,
                    age: req.body.age,
                    email: req.body.email,
                    pwd: req.body.pwd
                })
                const token = await studentsRegister.generateauthtoken();
                res.cookie("jwt", token, { expires: new Date(Date.now() + 30000), httpOnly: true });
                const register = await studentsRegister.save();

                //  console.log(register);
                student.find({}, function (err, data) {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    res.render("view", {
                        data: data
                    })
                })
            }
            else {
                console.log("invalid pwd and cpwd");
            }
        }
    })
}

module.exports.deleteapi = (req, res) => {
    student.findByIdAndDelete(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
            res.render("/");
        }
        console.log("delete successfully");
        student.find({}, function (err, data) {
            if (err) {
                console.log(err);
                return false;
            }
            console.log(data);
            res.render("view", { data: data });
        })

    })
}

module.exports.nameapi = (req, res) => {
    //console.log(req.params.nam);
    student.find({ "name": req.params.name }, function (err, data) {
        if (err) {
            console.log("not match");
            res.render("view");
        }
        else {
            // console.log(detaildata)
            res.render("view", {
                data: data
            })
        }
    })
}