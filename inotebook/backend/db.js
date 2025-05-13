import mongoose from 'mongoose';

const connectToMongo = async () => {
  const mongoURI = "mongodb://localhost:27017/";
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToMongo; // Keep this line