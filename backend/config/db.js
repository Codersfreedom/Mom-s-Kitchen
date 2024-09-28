import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to ${response.connections[0].host} `);
  } catch (error) {
    console.log("Error connecting to database", error.message);
    process.exit(1);
  }
};

export default connectToDB;
