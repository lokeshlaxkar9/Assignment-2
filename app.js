const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const checkAuth = require("./middlewares/checkAuthMiddleware");
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//mongoose connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/social-media");
  console.log("Mongoose Connected");
}

app.use(authRoutes);
app.use("/posts", checkAuth, postRoutes);

app.all("*", (req, res) => {
  res.status(400).send("Page Not Found");
});

app.use((err, req, res, next) => {
  const { status = 500, message = "some error occured" } = err;
  res.status(status).send({ statusCode: status, message: message });
});

app.listen(3000, () => {
  console.log("server is running at 3000");
});
