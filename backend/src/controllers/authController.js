const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");


// REGISTER
const register = async (req, res) => {

  try {

    const {
      fullname,
      email,
      password,
      confirm_password
    } = req.body;

    // VALIDASI
    if (
      !fullname ||
      !email ||
      !password ||
      !confirm_password
    ) {
      return res.status(400).json({
        message:
          "Semua field wajib diisi"
      });
    }

    // PASSWORD MATCH
    if (password !== confirm_password) {
      return res.status(400).json({
        message:
          "Konfirmasi password tidak sama"
      });
    }

    // CHECK EMAIL
    const existingUser =
      await User.findOne({
        where: { email }
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Email sudah digunakan"
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER
    const user =
      await User.create({
        fullname,
        email,
        password:
          hashedPassword
      });

    res.status(201).json({
      message:
        "Register berhasil",
      user
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Server error",
      error:
        error.message
    });

  }

};


// LOGIN
const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({
        where: { email }
      });

    if (!user) {
      return res.status(404).json({
        message:
          "Email tidak ditemukan"
      });
    }

    const isPasswordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordMatch) {
      return res.status(400).json({
        message:
          "Password salah"
      });
    }

    // JWT TOKEN
    const token =
      jwt.sign(
        {
          id: user.id,
          email: user.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn:
            process.env.JWT_EXPIRES
        }
      );

    res.status(200).json({
      message:
        "Login berhasil",

      token,

      user: {
        id: user.id,
        fullname:
          user.fullname,
        email:
          user.email
      }
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Server error",
      error:
        error.message
    });

  }

};

module.exports = {
  register,
  login
};