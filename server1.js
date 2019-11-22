// Dependencies
// ===========================================================
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

//sets up the experss app to handle data parsing
app.use(express.urlencoded({ extend: true }));
app.use(express.json());

// Data
// ===========================================================
const characters = [
  {
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000,
    routeName: "yoda"
  },
  {
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200,
    routeName: "darthmaul"
  }
];

// Routes
// ===========================================================

//general rout
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

//get all the data
app.get("/api/characters", (req, res) => {
  return res.json(characters);
});

app.post("/api/characters", (req, res) => {
  const newCharacter = req.body;
  console.log(newCharacter);

  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  characters.push(newCharacter);
  res.json(newCharacter);
});
//get one onject from data
app.get("/api/characters/:character", (req, res) => {
  const chosen = req.params.character;
  const chosenOne = characters.filter(obj => {
    return obj.routeName === chosen;
  });
  if (chosenOne.length) {
    return res.json(chosenOne[0]);
  }
  return res.send(`character, i do not see.`);
});

//add object to data

// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
