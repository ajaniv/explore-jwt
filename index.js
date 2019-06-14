/*
 * api for creation of json token
 * derived from https://blog.bitsrc.io/understanding-json-web-token-authentication-a1febf0e15
 */

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
//app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 7777;
const users = [
    {id: 1, username: "clarkKent", password: "superman"},
    {id: 2, username: "bruceWayne", password: "batman"}
  ];

app.get('/time', (req, res) => {
  const time = (new Date()).toLocaleTimeString();
  res.status(200).send(`The Time is ${time}`);
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

/*
app.post("/login", (req, res) => {
  const user = req.body.username;
  res.status(200).send(`User's name is ${user}`);
})
*/

app.post("/login", (req, res) => {
    if (!req.body.username || !req.body.password) {
      res.status(400).send("Error. Please enter the correct username and password");
      return;
    }
    const user = users.find((u) => {
        return u.username === req.body.username && u.password === req.body.password;
      });
    if (user){
        //res.status(200).send(`User's name is ${user.username}`);
        const token = jwt.sign({
            sub: user.id,
            username: user.username
          }, "mykey", {expiresIn: "3 hours"});
          res.status(200).send({access_token: token})
    }
    else{
        res.status(400).send("Error. Please enter the correct username and password");
    }
})
app.listen(PORT, () => {     
  console.log(`Server is running on port ${PORT}.`); 
});