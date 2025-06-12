const routes = require("express").Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
const projects = db.collection("personal_project");

const Cat = mongoose.model('Cat', { name: String });

// HTTPS PUT
routes.get("/", async (req, res) => {
  const kitty = new Cat({ name: 'Zildjian' });
  kitty.save().then(() => console.log('meow'));
  res.json(kitty.toJSON())
});

// HTTPS GET
routes.get("/:project_id", async (req, res) => {
  const id = req.params.project_id;
  const project = await Cat.find({ name: 'Zildjian' }).exec();
  res.json(project);
});

// POST
routes.post("/", async (req, res) => {
  return projects.create();
});

// DELETE


module.exports = routes;