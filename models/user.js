const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema); //make model with (name , schema) and load it INTO mongoose // 2 args loads in,
