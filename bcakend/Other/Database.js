import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://giriraj9351_db_user:Hjm12c6shk7ceNDv@cluster0.dpwk6fg.mongodb.net/?appName=Cluster0");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;