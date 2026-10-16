const express = require('express');
const app = express();

const recipeRouter = require('./routes/recipe.routes');
app.use(express.json());
app.use('/recipes',recipeRouter);



app.get('/', (req, res) => {
  res.json({
    message: 'Recipe API is running!',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});