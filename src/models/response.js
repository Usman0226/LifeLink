

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema({
  
  requestId: {
    type: Schema.Types.ObjectId,
    ref: 'request',
    required: true,
  },
  responderId: {
    type: Schema.Types.ObjectId,
    ref: 'user', 
    required: true,
  },
 

  responderDetails: {
    username: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    }
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('response', responseSchema);