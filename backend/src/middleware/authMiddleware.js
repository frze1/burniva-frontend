const jwt = require("jsonwebtoken");

const authMiddleware = (
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;

    // CHECK TOKEN
    if (!authHeader) {

      return res.status(401)
      .json({
        message:
        "Token tidak ditemukan"
      });

    }

    // FORMAT:
    // Bearer tokenxxxxx
    const token =
      authHeader.split(" ")[1];

    // VERIFY JWT
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // SIMPAN USER LOGIN
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401)
    .json({
      message:
      "Token tidak valid"
    });

  }

};

module.exports =
authMiddleware;