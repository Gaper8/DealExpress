require('dotenv').config('../../.env');
const mongoose = require('mongoose');

const mongoUrl = process.env.MONGODB_URL;

const dbConnect = mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
});

module.exports = {dbConnect};