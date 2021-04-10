const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const candySchema = new Schema({
  color: {
    type: String,
    required: true,
  },
  flavor: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0,
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: true
  }
});

module.exports = function (db) {
  db.model("Candies", candySchema);
};