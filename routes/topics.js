const express = require('express');
const router = express.Router();
const topics = require('../data/topics.json');

router.get('/:id', (req, res) => {
  const index = topics.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).render('404', { currentPath: '' });
  }

  const topic = topics[index];
  const prevTopic = index > 0 ? topics[index - 1] : null;
  const nextTopic = index < topics.length - 1 ? topics[index + 1] : null;

  res.render('topic', {
    topic,
    prevTopic,
    nextTopic,
    currentPath: `/topics/${topic.id}`
  });
});

module.exports = router;
