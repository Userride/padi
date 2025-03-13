const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const mongoDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected");

        const doctorCollection = mongoose.connection.db.collection("doctor_data");
        global.doctordata = await doctorCollection.find({}).toArray();
        console.log("Fetched doctor Data:", global.doctordata);

        const doctorCollection2 = mongoose.connection.db.collection("doctor_data2");
        global.doctordata2 = await doctorCollection2.find({}).toArray();
        console.log("Fetched doctor Data2:", global.doctordata2);

        const doctorCollection3 = mongoose.connection.db.collection("doctor_data3");
        global.doctordata3 = await doctorCollection3.find({}).toArray();
        console.log("Fetched doctor Data3:", global.doctordata3);

        const doctorCollection4 = mongoose.connection.db.collection("doctor_data4");
        global.doctordata4 = await doctorCollection4.find({}).toArray();
        console.log("Fetched doctor Data4:", global.doctordata4);

    } catch (err) {
        console.error("Error connecting to the database:", err);
        throw err;
    }
};

module.exports = mongoDB;
