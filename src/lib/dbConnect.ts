import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

// by writing void  this means we do not care about the return value of this function
async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
}

export default dbConnect;
