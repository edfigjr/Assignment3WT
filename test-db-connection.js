
require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  connectTimeoutMS: 10000, // 10 seconds
  socketTimeoutMS: 45000,  // 45 seconds
})
.then(() => {
  console.log('Connected to the DataBase');
  mongoose.connection.close();
})
.catch((err) => {
  console.error('DB Connection failed:', err);
  process.exit(1);
});
