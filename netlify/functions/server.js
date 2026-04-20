const serverless = require('serverless-http');
const express = require('express');
const path = require('path');
const topicsRoute = require('../../routes/topics');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../views'));

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.json());

app.get('/', (req, res) => {
  const topics = require('../../data/topics.json');
  res.render('index', { topics, currentPath: '/' });
});

app.use('/topics', topicsRoute);

app.get('/about', (req, res) => {
  res.render('about', { currentPath: '/about' });
});

app.use((req, res) => {
  res.status(404).render('404', { currentPath: '' });
});

module.exports.handler = serverless(app);
