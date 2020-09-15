const express = require('express');
require('express-async-errors');
const app = express();
const dotenv = require('dotenv').config();
const preMiddleware = require('./middlewares/preMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');
const initDB = require('./config/db');
const routes = require('./routes/userRoutes');


preMiddleware(app);

//Route request through Router engine
app.use('/', routes);

//error middleware
errorMiddleware(app);

//DATABASE & PORT
//instantiate Database and listen for connections
initDB();
const port = (process.env.PORT || 3000);
app.listen(port, () => console.log(`::: Server listening on Port ${port}. Open via http://localhost:${port}/`))