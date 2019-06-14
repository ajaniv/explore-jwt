const express = require("express");
const bodyParser = require("body-parser");
const expressjwt = require("express-jwt");

const app = express();
const PORT = process.env.API_PORT || 9999;

app.use(bodyParser.json());

const jwtCheck = expressjwt({    
  secret: "mykey"
});



app.get("/asset", (req, res) => {
  res.status(200).send("Everybody can see this");
});

app.get("/asset/secret", jwtCheck, (req, res) => {
  res.status(200).send("Only logged in people can see me");
});

app.get("*", (req, res) => {    
  res.status(404).send("invalid not found");
});

app.listen(PORT, () => {    
  console.log(`Server is running on port ${PORT}.`);
});