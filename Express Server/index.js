import express from "express";
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("hello, Expressm");
});
app.listen(port, () => {
  console.log(`server connected with the port number ${port}`);
});
