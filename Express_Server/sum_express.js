import express from "express";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());
app.get("/", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  const totalSum = parseInt(a) + parseInt(b);
  console.log(totalSum);
  res.send(`${totalSum}`);
});
app.listen(port, () => {
  console.log(`server connected with the port number ${port}`);
});
