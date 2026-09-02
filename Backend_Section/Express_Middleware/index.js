const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("tiny"));

app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log("I love dogs!");
  next();
});

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickennugget") {
    next();
  }
  res.send("Sorry, you need a password!");
};

// app.use((req, res, next) => {
//   console.log("This is my first middleware!");
//   return next();
//   console.log("This is my first middleware after calling next()!");
// });
// app.use((req, res, next) => {
//   console.log("This is my second middleware!");
//   return next();
// });
// app.use((req, res, next) => {
//   console.log("This is my third middleware!");
//   return next();
// });

app.get("/", (req, res) => {
  console.log(`REQUEST TIME: ${req.requestTime}`);
  res.send("Home page!");
});

app.get("/dogs", (req, res) => {
  console.log(`REQUEST TIME: ${req.requestTime}`);
  res.send("Woof woof!");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send("My secret is: I don't want to get a job.");
});

app.use((req, res) => {
  res.status(404).send("Not found!");
});

app.listen(3000, () => {
  console.log("App listening on port 3000...");
});
