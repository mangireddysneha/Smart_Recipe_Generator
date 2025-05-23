// D:\SG\backend\server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Get all pantry items
app.get('/api/pantry', (req, res) => {
  db.query('SELECT * FROM pantry', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a pantry item
app.post('/api/pantry', (req, res) => {
  const { item } = req.body;
  db.query('INSERT INTO pantry (item) VALUES (?)', [item], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Item added' });
  });
});

// Search for recipes
app.get('/api/recipes', (req, res) => {
  const { ingredients } = req.query;
  const sampleRecipes = [
    { id: 1, title: 'Tomato Pasta', ingredients: 'Tomato, Pasta', nutrition: '200 cal' },
    { id: 2, title: 'Egg Fried Rice', ingredients: 'Egg, Rice', nutrition: '250 cal' },
  ];
  const filtered = sampleRecipes.filter(r =>
    ingredients.split(',').some(i => r.ingredients.toLowerCase().includes(i.trim().toLowerCase()))
  );
  res.json(filtered);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
