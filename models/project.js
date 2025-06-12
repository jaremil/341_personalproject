const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));

const User = mongoose.model('User', { name: String, google_auth_token: String })
const Cat = mongoose.model('Cat', { name: String });
const Recipe = mongoose.model('Recipe', { name: String });

module.exports = {User, Cat, Recipe}