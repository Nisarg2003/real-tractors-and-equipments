import nodemailer from "nodemailer";
import userQueryModel from "../Model/userQueryModel.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "nisargpatelcoding@gmail.com",
      subject,
      text,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const createUserQuery = async (req, res) => {
  try {
    const { fullName, contactNo, emailId, post } = req.body;

    if (!emailId || !fullName) {
      return res
        .status(400)
        .json({ message: "Full Name and Email ID are required" });
    }
    const userQuery = new userQueryModel({
      fullName,
      contactNo,
      emailId,
      post: post,
      query: req.body.query || "Want to Contact your firm",
    });
    await userQuery.save();

    const subject = `New Query from ${fullName}`;
    const text = `
            You have received a new query through your website:
            
            Customer Name: ${fullName}
            Contact No: ${contactNo}
            Email ID: ${emailId}
            Query: ${req.body.query || "Want to Contact your firm"}
            
            Please log in to your account to view the details.
        `;
    try {
      await sendMail(subject, text);
      return res
        .status(201)
        .json({ message: "Query submitted,and mail sent successfully." });
    } catch (emailError) {
      return res
        .status(500)
        .json({ message: "Query submitted, but failed to send email." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred", error });
  }
};

export const getUserQuery = async (req, res) => {
  try {
    const { isResolvedStatus } = req.body;
    if (!isResolvedStatus) {
      const userQuery = await userQueryModel
        .find()
        .populate("post", "make model year registrationNumber")
        .sort({ createdAt: -1 });
      return res.status(201).json(userQuery);
    }
    const userQuery = await userQueryModel
      .find({ isResolved: isResolvedStatus })
      .populate("post", "make model year registrationNumber")
      .sort({ createdAt: -1 });
    return res.status(201).json(userQuery);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred in getting userQuries", error });
  }
};

export const resolveQuery = async (req, res) => {
  try {
    const { queryId } = req.body;
    const { updateIsResolvedStatus } = req.body;
    if (!queryId) {
      return res.status(400).json({ message: "Query ID is required" });
    }
    const updatedUserQuery = await userQueryModel.findByIdAndUpdate(
      queryId,
      { isResolved: updateIsResolvedStatus },
      { new: true }
    );
    return res.status(201).json({
      message: "Query resolved successfully",
      updatedUserQuery,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred in resolving query", error });
  }
};
