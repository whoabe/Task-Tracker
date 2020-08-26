const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function() {
      return this.accountType != "guest";
    }
  },
  email: {
    type: String,
    required: function() {
      return this.accountType != "guest";
    }
  },
  password: {
    type: String,
    required: function() {
      return this.accountType != "guest";
    }
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  accountType: {
    type: String,
    required: true
  },
  settings: {
    timeMode: {
      type: String,
      default: "Countdown + Timer"
    }
  }
});

module.exports = User = mongoose.model("user", UserSchema);
