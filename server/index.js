require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const route = require('./routes');

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.r7hwd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Connect to MongoDB successfully!`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();

const app = express();

/**
 * Middleware
 */
app.use(express.urlencoded({ extended: true })); // handle send data with HTML form
app.use(express.json());
app.use(cors());

/**
 * Routing
 */
route(app);

/**
 * Launch server
 */
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
