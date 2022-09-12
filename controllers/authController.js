const User = require("../modals/User");
const jwt = require("jsonwebtoken");

//token generate
const maxAge = 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "tenx", { expiresIn: maxAge });
};

module.exports.resister = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(200).send({ status: "Success", data: user });
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.login(email, password);
  const token = createToken(user._id);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.status(200).json({ status: "Success", token: token });
};
