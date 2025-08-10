import mongoose from "mongoose";

export const ConnectDB = async () => {
    try{
      const connection = await mongoose.connect(process.env.MONGO_URI)
      console.log(`MongoDB Connected : ${connection.connection.host}`);
    }
    catch(error) {
        console.log(`Error connecting to MOngoDB`, error);
        process.exit(1)
    }
}