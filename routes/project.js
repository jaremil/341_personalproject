const { User, Cat, Recipe } = require("../models/project");

const routes = require("express").Router();

// AUTHICATION ROUTE
routes.get("/auth/:google_auth_token", async (req, res) => {
  const id = req.params.google_auth_token;
  const project = await Cat.find({ name: 'Zildjian' }).exec();
  res.json(project);
});

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

module.exports = routes;