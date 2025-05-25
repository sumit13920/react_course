import mongoose from 'mongoose';

const connectToMongo = async () => {
  // Use environment variable for MongoDB URI
  const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/inotebook1";
  
  const options = {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10, // Maximum number of connections in the pool
  };

  try {
    await mongoose.connect(mongoURI, options);
    
    mongoose.connection.on('connected', () => {
      console.log(`Connected to MongoDB at ${mongoose.connection.host}`);
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
    
    // Close the connection when Node process ends
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectToMongo;