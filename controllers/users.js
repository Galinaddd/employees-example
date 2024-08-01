const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

/**
  |============================
  | register
  |============================
*/

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: " Please fill all required fields in the form" });
    }

    const registeredUser = await prisma.user.findFirst({ where: { email } });
    if (registeredUser) {
      return res.status(400).json({ message: "such a user is exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res.status(400).json({ mesage: "user was not created" });
    }
  } catch {
    return res.status(500).json({ mesage: "something get wrong" });
  }
};

/**
  |============================
  | login
  |============================
*/

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: " Please fill all required fields in the form" });
    }

    const user = await prisma.user.findFirst({ where: { email } });
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));
    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch {
    return res.status(500).json({ mesage: "something get wrong" });
  }
};

/**
  |============================
  @route GET /api/users/current
  @desc  currentUser
  @access private
  |============================
*/
const current = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { login, register, current };
