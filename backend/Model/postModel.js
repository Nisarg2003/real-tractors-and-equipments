import mongoose from "mongoose";

const postModel = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    thumbnail: {
      fileName: { type: String, required: true },
      url: { type: String, required: true },
    },

    files: [
      {
        _id: false,
        fileName: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],

    price: {
      type: String,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    category: {
      type: String,
      enum: ["Car", "Activa", "Motorbike", "Tractors"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("post", postModel);
