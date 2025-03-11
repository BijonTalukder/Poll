const pollService = require('../services/PollServices');

// Create a new poll
const createPoll = async (req, res) => {
  const { question, options, expiresAt } = req.body;

  try {
    const newPoll = await pollService.createPoll(question, options, expiresAt);
    res.status(201).json(newPoll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a poll by ID
const getPollById = async (req, res) => {
  const { id } = req.params;

  try {
    const poll = await pollService.getPollById(id);
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }
    res.status(200).json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Vote on a poll
const voteOnPoll = async (req, res) => {
  const { id } = req.params;
  const { optionIndex } = req.body;

  try {
    const updatedPoll = await pollService.voteOnPoll(id, optionIndex);
    res.status(200).json(updatedPoll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const reactToPoll = async (req, res) => {
  try {
    const { reactionType } = req.body;
    const reactions = await pollService.reactToPoll(req.params.id, reactionType);

    res.json({
      message: 'Reaction added successfully',
      reactions
    });
  } catch (err) {
    console.error('Error adding reaction:', err);
    res.status(500).json({ message: 'Failed to add reaction' });
  }
};

// Add comment to a poll
const addCommentToPoll = async (req, res) => {
  try {
    const { text } = req.body;
    const comments = await pollService.addCommentToPoll(req.params.id, text);

    res.json({
      message: 'Comment added successfully',
      comments
    });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Failed to add comment' });
  }
};
module.exports = { createPoll, getPollById, voteOnPoll,reactToPoll,addCommentToPoll };
