const bcrypt = require("bcryptjs");
const sequelize = require("./src/config/database");
const { User } = require("./src/models");
require("dotenv").config();

const seedAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    // Sync database (agar kolom role terbuat jika belum)
    await sequelize.sync({ alter: true });
    
    const adminEmail = "admin@burniva.id";
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });

    if (existingAdmin) {
      console.log(`Admin dengan email ${adminEmail} sudah ada.`);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin Burniva",
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    });

    console.log("Akun Admin berhasil dibuat!");
    console.log("Email: admin@burniva.id");
    console.log("Password: admin123");
    
    process.exit(0);
  } catch (error) {
    console.error("Gagal membuat admin:", error);
    process.exit(1);
  }
};

seedAdmin();
