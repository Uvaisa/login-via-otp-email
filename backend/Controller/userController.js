const users = require("../Modals/userSchema");
const userotp = require("../Modals/otpSchema");
const nodemailer = require("nodemailer");

//email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.password,
  },
});

exports.userregister = async (req, resp) => {
  const { fname, email, password } = req.body;
  if (!fname || !email || !password) {
    resp.status(400).json({ error: "all fields are required" });
  }
  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      resp.status(400).json({ error: "user already exists" });
    } else {
      const userregister = await users({
        fname,
        email,
        password,
      });
      const storeData = await userregister.save();
      resp.status(200).json(storeData);
    }
  } catch (error) {
    resp.status(400).json({ error: "invalid details error", error });
  }
};
exports.userOtpSend = async (req, resp) => {
  const { email } = req.body;
  if (!email) {
    resp.status(400).json("Please enter email");
  }

  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      const OTP = Math.floor(100000 + Math.random() * 900000);
      const existEmail = await userotp.findOne({ email: email });
      if (existEmail) {
        const updateData = await userotp.findByIdAndUpdate(
          { _id: existEmail._id },
          {
            otp: OTP,
          },
          { new: true }
        );
        await updateData.save();
        const mailOption = {
          from: process.env.EMAIL,
          to: email,
          subject: `OTP:-${OTP}`,
        };
        transporter.sendMail(mailOption, (error, info) => {
          if (error) {
            console.log("error", error);
            resp.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            resp.status(200).json({ message: "email sent successfully" });
          }
        });
      } else {
        const saveOtpData = new userotp({
          email,
          otp: OTP,
        });
        await saveOtpData.save();
        const mailOption = {
          from: process.env.EMAIL,
          to: email,
          subject: `OTP:-${OTP}`,
        };
        transporter.sendMail(mailOption, (error, info) => {
          if (error) {
            console.log("error", error);
            resp.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            resp.status(200).json({ message: "email sent successfully" });
          }
        });
      }
    } else {
      resp
        .status(400)
        .json({ error: "this user does't exists in our database" });
    }
  } catch (error) {
    resp.status(400).json({ error: "Invalid Details", error });
  }
};
exports.userLogin = async (req, resp) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    resp.status(400).json({ error: "please enter otp and password" });
  }
  try {
    const emaildata = await userotp.findOne({ email: email });
    if (emaildata.otp === otp) {
      const preuser = await users.findOne({ email: email });
      const token = await preuser.generateAuthtoken();
      resp
        .status(200)
        .json({ message: "User Login succesfully Done", userToken: token });
    } else {
      resp.status(400).json({ error: "Invalid otp" });
    }
  } catch (error) {
    resp.status(400).json({ error: "Invalid Details", error });
  }
};
