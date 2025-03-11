
const Poll = require("../models/Poll");

// Create a new poll
const createPoll = async (question, options, expiresAt) => {
  try {
    const newPoll = new Poll({
      question,
      options: options,
      expiresAt: new Date(expiresAt),
    });
    await newPoll.save();
    return newPoll;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Get a poll by ID
const getPollById = async (pollId) => {
  try {
    const poll = await Poll.findById(pollId);
    return poll;
  } catch (err) {
    throw new Error('Poll not found');
  }
};

// Vote on a poll
const voteOnPoll = async (pollId, optionIndex) => {
  try {
    const poll = await Poll.findById(pollId);
    
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    
    if (poll.hasExpired()) {
      return res.status(410).json({ message: 'This poll has expired' });
    }
    
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ message: 'Invalid option index' });
    }
    
    // Increment vote count for the selected option
    poll.options[optionIndex].votes += 1;
    await poll.save();
    
    // Prepare response based on hideResults setting
    const responseData = {
      message: 'Vote recorded successfully'
    };
    
    if (!poll.hideResults) {
      responseData.updatedOptions = poll.options;
    }
    
    return poll;
  } catch (err) {
    throw new Error(err.message);
  }
};
const reactToPoll = async (id, reactionType) => {
    try {
      const poll = await Poll.findOne({ _id:id});
  
      if (!poll) {
        throw new Error('Poll not found');
      }
  
      if (poll.hasExpired()) {
        throw new Error('This poll has expired');
      }
  
      if (reactionType === 'trending') {
        poll.reactions.trending += 1;
      } else if (reactionType === 'like') {
        poll.reactions.likes += 1;
      } else {
        throw new Error('Invalid reaction type');
      }
  
      await poll.save();
      return poll.reactions;
    } catch (err) {
      throw new Error('Error adding reaction: ' + err.message);
    }
  };
  
  // Add comment to a poll
  const addCommentToPoll = async (id, text) => {
    try {
      const poll = await Poll.findOne({ _id:id });
  
      if (!poll) {
        throw new Error('Poll not found');
      }
  
      if (poll.hasExpired()) {
        throw new Error('This poll has expired');
      }
  
      poll.comments.push({ text });
      await poll.save();
  
      return poll.comments;
    } catch (err) {
      throw new Error('Error adding comment: ' + err.message);
    }
  };

module.exports = { createPoll, getPollById, voteOnPoll,reactToPoll,addCommentToPoll };
