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
  res.redirect('./project.html');
});

//LOG OUT
routes.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});


const path = require('path');

routes.get("/project.html", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  
  res.sendFile(path.resolve(__dirname, '..', 'project.html'));
});

// CRUD
// GET all cats
routes.get('/cats', async (req, res) => {
  try {
    const cats = await Cat.find({});
    res.json(cats);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// GET
routes.get('/cats/:id', async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    if (!cat) return res.status(404).json({ message: "Cat not found" });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// CREATE 
routes.post('/cats', async (req, res) => {
  try {
    const newCat = new Cat(req.body);
    await newCat.save();
    res.json({ message: "Cat created successfully!", cat: newCat });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// UPDATE
routes.put('/cats/:id', async (req, res) => {
  try {
    const updatedCat = await Cat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCat) return res.status(404).json({ message: "Cat not found" });
    res.json({ message: "Cat updated successfully!", cat: updatedCat });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// DELETE 
routes.delete('/cats/:id', async (req, res) => {
  try {
    const deletedCat = await Cat.findByIdAndRemove(req.params.id);
    if (!deletedCat) return res.status(404).json({ message: "Cat not found" });
    res.json({ message: "Cat removed successfully!" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


module.exports = routes;