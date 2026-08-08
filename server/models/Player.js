const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  playingRole: { type: String, required: true },
  battingStyle: { type: String, required: true },
  bowlingStyle: { type: String, required: true },
  jerseyNumber: { type: Number, required: true },
  jerseySize: { type: String, required: true },
  photoBase64: { type: String, default: '' },
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Player', playerSchema);
