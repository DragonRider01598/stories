const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   nodes: [
    {
      _id: false,
      id: { type: String, required: true },
      data: {
        cardTitle: { type: String, required: true },
        cardText: { type: String, required: true },
      },
    },
  ],
  edges: [
    {
      _id: false,
      id: { type: String, required: true },
      source: { type: String, required: true },
      target: { type: String, required: true },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;