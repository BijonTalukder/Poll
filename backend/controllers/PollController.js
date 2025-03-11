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

module.exports = { createPoll, getPollById, voteOnPoll };
