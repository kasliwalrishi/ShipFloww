const mongoose = require("mongoose");
const CryptoJs = require("crypto-js");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.DB);
    console.log("DB connection successful");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@sendit.com" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const encryptedPassword = CryptoJs.AES.encrypt(
      "admin123",
      process.env.PASS
    ).toString();

    const adminUser = new User({
      fullname: "Admin User",
      email: "admin@sendit.com",
      age: 30,
      country: "Kenya",
      address: "Nairobi",
      password: encryptedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
    console.log("Email: admin@sendit.com");
    console.log("Password: admin123");
    process.exit(0);
  } catch (error) {
    console.log("Error:", error);
    process.exit(1);
  }
}

seedAdmin();
