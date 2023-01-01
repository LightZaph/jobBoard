const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const companyRoutes = require('./routes/company');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const applicantRoutes = require('./routes/applicant');
const exchangeRoutes = require('./routes/exchange');
const advertisementRoutes = require('./routes/adv');
const cors = require('cors');
//const path = require('path');
const logger = require('morgan');

const port = 3001;
const app = express();

dotenv.config();
app.use(cors());

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.use('/api/company', companyRoutes);
app.use('/api/applicant', applicantRoutes);
app.use('/api/exchange', exchangeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/advertisement', advertisementRoutes);

app.listen(port, () => console.log('App listening on ' + port));
