const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Otp = require("../models/Otp");
const sendEmail = require("../utils/sendEmail");
const sendSMS = require("../utils/sendSMS");

const generateToken = (user) =>
  jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, phone, password: hashed });
  res.status(201).json({ token: generateToken(user), user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.status(201).json({ token: generateToken(user), user });
};

// exports.sendOtp = async (req, res) => {
//   const { contact } = req.body; // email or phone
//   const otp = generateOtp();
//   const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
//   await Otp.deleteMany({ contact });
//   await Otp.create({ contact, otp, expiresAt });
//   sendEmail(contact, "Your OTP Code", `Your OTP is ${otp}`);
//   res.json({ message: "OTP sent" });
// };

exports.verifyOtp = async (req, res) => {
  const { contact, otp } = req.body;
  const record = await Otp.findOne({ contact, otp });
  if (!record || record === null || record.expiresAt < new Date()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
  // await Otp.deleteOne({ _id: record._id });
  res.json({ message: "OTP verified" });
};

exports.resetPassword = async (req, res) => {
  const { contact, otp, newPassword } = req.body;
  const record = await Otp.findOne({ contact, otp });
  console.log(record)
  if (!record || record === null) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }else if(record.expiresAt < new Date()){
    return res.status(400).json({ message: "OTP has been expired!" });
  }
  const user = await User.findOne({
    $or: [{ email: contact }, { phone: contact }],
  });
  if (!user) return res.status(404).json({ message: "User not found" });
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  await Otp.deleteOne({ _id: record._id });
  res.json({ message: "Password reset successful" });
};

exports.sendOtp = async (req, res) => {
  const { contact } = req.body;
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await Otp.deleteMany({ contact });
  await Otp.create({ contact, otp, expiresAt });

  if (/^\d{10,15}$/.test(contact)) {
    await sendSMS(`+91${contact}`, `Your OTP is ${otp}`);
  } else {
    await sendEmail(contact, "Your OTP Code", `Your OTP is ${otp}`);
  }

  res.json({ message: "OTP sent" });
};
