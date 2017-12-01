const express = require("express"),
 app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Assign PORT
let PORT = process.env.PORT || 8080

//JWT Secret Key
let secretKey = "tig3rs n373r cry";

//App configs
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//Bring in models
const User = require('./models/User');

//Connect to Mongo
const MONGO_CONNECTION_STRING = "mongodb://localhost:27017/data/db"

mongoose.connect(MONGO_CONNECTION_STRING);

const connection = mongoose.connection;

connection.on("open", () => {
    console.log("Connected to Mongo.");
    app.listen(PORT, () => {
        console.log("Server running on port " + PORT + ".");
    })
})

//Sign Up
app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.genSalt(12, (err, salt) => {
        if (err) {
            return res.send("Server error.")
        }
        bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
                return res.send("Server error.")
            }
            User({
                username: username,
                password: hashedPassword
            }).save()
            .then(savedUser => {
                res.send(savedUser);
            })
            .catch(error => {
                res.send(error);
            })
        })
    })
})

//Sign In
app.post('/signin', (req, res) => {
    const username = req.body.username;
    const passwordGuess = req.body.password;
    User.findOne({username: username})
        .then(user => {
            if (!user) {
                return res.send("Sorry, we couldn't find your account. Please try again or sign up.");
            } else {
                bcrypt.compare(passwordGuess, user.password, (err, match) => {
                    if (err) {
                        return res.send("Server error.");
                    }
                    if (match) {
                        //JWT
                        let payload = {
                            iss: 'anchors.pro',
                            sub: user.username,
                            exp: Math.floor(Date.now() / 1000) + (60 * 60)
                        }
                        let token = jwt.sign(payload, secretKey);
                        User.findOneAndUpdate(
                            {_id: user._id},
                            { $set: {token: token}}
                        )
                        .then((updatedUser) => {
                            return res.send(token);
                        })
                    } else {
                        return res.send("Incorrect password.");
                    }
                })
            }
        })
})

//Authenticate
app.post('/authenticate', (req, res) => {
    let tokenFromHeader = req.headers.authorization;
    if (tokenFromHeader) {
        tokenFromHeader = tokenFromHeader.slice(6, tokenFromHeader.length);
        jwt.verify(tokenFromHeader, secretKey, (err, decodedPayload) => {
            if (err) {
                res.status(403).send("Forbidden");
            }
            if (decodedPayload) {
                if (decodedPayload.sub === req.body.username) {
                    return res.status(200).send(decodedPayload);
                }
            }
        })
    } else {
        return res.status(403).send("Forbidden");
    }
})


