const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");


// REGISTER
const register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      confirm_password
    } = req.body;

    // VALIDASI
    if (
      !name ||
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
    if (
      password !==
      confirm_password
    ) {
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
      await bcrypt.hash(
        password,
        10
      );

    // CREATE USER
    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword
      });

    res.status(201).json({
      message:
        "Register berhasil",

      user: {
        id:
          user.id,

        name:
          user.name,

        email:
          user.email
      }
    });

  } catch (error) {

    console.error(error);

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
        id:
          user.id,

        name:
          user.name,

        email:
          user.email,

        gender:
          user.gender,

        age:
          user.age,

        university:
          user.university,

        major:
          user.major,

        semester:
          user.semester,

        profile_image:
          user.profile_image
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


// GET PROFILE
const getProfile =
  async (req, res) => {

    try {

      const user =
        await User.findByPk(
          req.user.id
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User tidak ditemukan"
        });
      }

      res.status(200).json({
        id:
          user.id,

        name:
          user.name,

        email:
          user.email,

        gender:
          user.gender,

        age:
          user.age,

        university:
          user.university,

        major:
          user.major,

        semester:
          user.semester,

        profile_image:
          user.profile_image
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


// UPDATE PROFILE
const updateProfile =
  async (req, res) => {

    try {

      const user =
        await User.findByPk(
          req.user.id
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User tidak ditemukan"
        });
      }

      const {
        name,
        email,
        gender,
        age,
        university,
        major,
        semester,
        profile_image
      } = req.body;

      await user.update({
        name,
        email,
        gender,
        age,
        university,
        major,
        semester,
        profile_image,
      });

      res.json(user);

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
  login,
  getProfile,
  updateProfile
};