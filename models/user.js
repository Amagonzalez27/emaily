const mongoose = require('mongoose');
const { Schema } = mongoose;

// mongoose wants to know ahead of time all the props
// Schema describes what every record will look like
const userSchema = new Schema({
  googleId: String,
});
// create a model class and a collection needs to be created
// collection is users
mongoose.model('users', userSchema);
