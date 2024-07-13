import express from "express";
import jwt from "jsonwebtoken";
const jwtPassword = "12345678";
const app = express();
const port = 3000;
app.use(express.json());
const All_users = [
  {
    username: "gyan123@gmail.com",
    password: "1234",
    name: "Gyanendra",
  },
  {
    username: "shyam@gmail.com",
    password: "4567",
    name: "Shyam",
  },
  {
    username: "Rohan@gmail.com",
    password: "6789",
    name: "Rohan",
  },
];
function userExists(email, pswd) {
  let isFound = false;
  All_users.forEach((user) => {
    if (user.username == email && user.password == pswd) isFound = true;
  });
  return isFound;
}

//post request which return Jwt
app.post("/signin", (req, res) => {
  //res.send(req.headers.email);
  const email = req.body.email;
  const pswd = req.body.password;
  if (!userExists(email, pswd)) {
    res.status(403).send("user doesn't exist in our DB");
    return;
  }
  var token = jwt.sign({ email: email }, jwtPassword);
  res.json(token);
});

//get request check authrisation and return back the user details in responcse
app.get("/users", (req, res) => {
  const tokens = req.headers.authorization;
  const token = tokens.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtPassword);
    res.json({ user: All_users });
  } catch (err) {
    console.log("in cache");
    res.send(err);
  }
});

app.listen(port);
