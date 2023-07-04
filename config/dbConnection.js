import mongoose from "mongoose"

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        // console.log(connect);
        console.log(`Database connected: ${connect.connection.host}, ${connect.connection.db.databaseName}`);
    } catch (err) {
        console.log(err);
        process.exit(1)

    }
}

export default connectDb