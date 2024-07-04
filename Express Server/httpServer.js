//backend server in node using an external library which is Express
import express from "express";
// const http = require("http");
const port = 3000;
const app = express();
function sum(num) {
  var ans = 0;
  for (let i = 1; i <= num; i++) {
    ans += i;
  }
  return ans;
}
app.get("/", (req, res) => {
  //   console.log(req);
  const n = req.query.n; //it query parameter used to get input parameter from hhtp request
  console.log(n);
  const ans = sum(n);
  // const error = new Error("something went wrong!"); //let suppose if there is any error due to any reason like db connection failed etc. so this server should throw an error to the client.
  // throw error.message;
  res.send(`hey sum is ${ans}`);
});

app.listen(port);
