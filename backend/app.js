const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
app.listen(process.env.PORT);

const cors = require('cors');

const { StatusCodes } = require('http-status-codes');

app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/users');
const mapsRouter = require('./routes/maps');
const placesRouter = require('./routes/places');
const schedulesRouter = require('./routes/schedules');

app.use('/users', usersRouter);
app.use('/maps', mapsRouter);
app.use('/places', placesRouter);
app.use('/schedules', schedulesRouter);

const { swaggerUi, specs } = require("./swagger/swagger")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

// catch 404 and forward to error handler
app.use(function(req, res) {
    res.status(StatusCodes.NOT_FOUND).end();
});


