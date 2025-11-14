const { dbConnect } = require('./src/config/database');
const express = require('express');
const authRoute = require('./src/routes/auth.routes');
const { errorHandler, notFoundHandler } = require('./src/middlewares/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
dbConnect;

app.use('/api/auth', authRoute);

app.use(notFoundHandler);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log('Server ready')
});