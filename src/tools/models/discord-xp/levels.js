// updates: "../../../node_modules/discord-xp/models/levels.js"
const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
  userID: { type: String },
  guildID: { type: String },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: new Date() },
  voiceExpState: { type: Boolean, default: false },
  voiceExpStart: { type: Date },
  voiceExpLastUpdated: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Levels', LevelSchema);
