import e from "express";
const app = e();
const port = 3000;
let users = [
  {
    name: "Rohan",
    kidneys: [
      {
        healthy: true,
        isExpire: false,
      },
    ],
  },
];
// app.use(express.json());
app.use(e.json());
app.get("/", (req, res) => {
  const johnkidney = users[0].kidneys;
  const totalKidney = johnkidney.length;
  let johnHealthykidney = johnkidney.filter((e) => e.healthy === true);
  let healthyKidney = johnHealthykidney.length;
  let unhealthyKidney = totalKidney - healthyKidney;
  //console.log(`${totalKidney}  ${healthyKidney}  ${unhealthyKidney}`);
  res.json({
    totalKidney: totalKidney,
    healthyKindney: healthyKidney,
    unhealthyKidney: unhealthyKidney,
  });
});

app.post("/", (req, res) => {
  const isHealthy = req.body.healthy;
  users[0].kidneys.push(req.body); // modifications to this array will be in the memory of the running process.
  res.send("Done!");
});

app.put("/", (req, res) => {
  users[0].kidneys.forEach((kidney) => {
    kidney.healthy = true;
  });
  res.json({});
});

app.delete("/", (req, res) => {
  //   users[0].kidneys.pop();
  //delete all unhealthy kidney
  let atleastOneHealthyKidney = false;
  const allHealthyKidney = users[0].kidneys.filter(
    (kidney) => kidney.healthy === true
  );
  if (users[0].kidneys.length === allHealthyKidney.length) {
    res.statusCode = 400;
    return res.json({
      status: "no Kidney is unhealthy.",
    });
  } else {
    users[0].kidneys = allHealthyKidney;
    res.send("one kidney deleted successfully!");
  }
});
app.listen(port);
