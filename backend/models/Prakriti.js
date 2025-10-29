const mongoose = require('mongoose');

const prakritiSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skin: { type: String, required: true },
  bodyBuild: { type: String, required: true },
  hair: { type: String, required: true },
  eyes: { type: String, required: true },
  mindset: { type: String, required: true },
  memory: { type: String, required: true },
  emotions: { type: String, required: true },
  diet: { type: String, required: true },
  sleep: { type: String, required: true },
  energy: { type: String, required: true },
  weather: { type: String, required: true },
  stress: { type: String, required: true },
  analysis: {
    pitta: { type: Number, default: 0 },
    vata: { type: Number, default: 0 },
    kapha: { type: Number, default: 0 },
  },
  recommendations: { type: [String], default: [] },
  healthSummary: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Prakriti', prakritiSchema);