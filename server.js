if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
// const expressLayouts = require('express-ejs-layouts');

// const indexRouter = require('./routes/index')
const projectsRouter = require('./routes/project')

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(express.static('public'));
// app.use('/', indexRouter);

app.use('/projects', projectsRouter);

// const mongoose = require('mongoose');
// mongoose.connect('process.env.MONGODB_URI')

// const db = mongoose.connection;
// db.on('error', error => console.error(error));
// db.once('open', () => console.error('Connected to Mongoose'));

app.listen(process.env.PORT || 3000);

console.log('hosted on http://localhost:3000')