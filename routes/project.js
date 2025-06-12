const routes = require("express").Router();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
const projects = db.collection("personal_project");

routes.get("/", async (req, res) => {
    console.log(await projects.find())
  res.json(await projects.find())
});

routes.get("/:project_id", async (req, res) => {
  const id = req.params.project_id;
  const project = await projects.findOne({ _id: new ObjectId(id) });
  res.json(project);
});

routes.post("/", async (req, res) => {
  return projects.create();
});

module.exports = routes;