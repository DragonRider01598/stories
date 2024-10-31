const express = require('express');
const { authMiddleware } = require('../controllers/authControllers');
const { uploadStory, getStoryById ,getRandomStories } = require('../controllers/storyControllers');
const router = express.Router();

router.post('/', authMiddleware, uploadStory);
router.get('/', getRandomStories);
router.get('/:id', authMiddleware, getStoryById);

module.exports = router;