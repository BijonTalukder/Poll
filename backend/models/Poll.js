const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      title:{type: String,  },
      votes: { type: Number, default: 0 },
    },
  ],
  expiresAt: {
    type: Date,
    required: true,
  },
  hideResults: {
    type: Boolean,
    default: true, 
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  reactions: {
    trending: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
  },
  comments: [{
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

pollSchema.methods.hasExpired = function() {
    return new Date() > this.expiresAt;
  };
  const Poll = mongoose.model('Poll', pollSchema);


module.exports = Poll;
