const passport = require('passport');

const { User, Cat, Recipe } = require("../models/project");

const routes = require("express").Router();

routes.get("/", async (req, res) => {
  res.send(`<a href="/auth/signin">Login with Google</a>`);
});

// GOOGLE LOGIN ROUTE
routes.get("/auth/signin", passport.authenticate('google', { scope: ['profile', 'email'] }));

// CALLBACK AUTHICATION ROUTE
routes.get('/auth/',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  });

// PROFILE
routes.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  //where it goes after they log in
  res.send(`Hello, ${req.user.displayName}! <a href="/logout">Logout</a>`);
});

//LOG OUT
routes.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
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