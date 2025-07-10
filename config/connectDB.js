import mongoose from "mongoose";

const connectDB = async()=>{



    try {
        await mongoose.connect(process.env.DATABASE_URL);
        // console.log(process.env.DATABASE_URL);
        console.log(`Database has been successfully connected to ${process.env.DATABASE_URL}`);
        
    } catch (error) {
        console.log(`Error COnnecting to the database at ${process.env.DATABASE_URL}`);
    }


}

export default connectDB;