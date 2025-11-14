const { dbConnect } = require('./src/config/database');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
dbConnect;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log('Server ready')
});