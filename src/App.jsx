import React, { useState } from "react";
import "./App.css";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [message, setMessage] = useState("");

  const searchRecipes = async () => {
    if (!ingredient) {
      alert("Please enter an ingredient");
      return;
    }

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );

      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
        setMessage("");
      } else {
        setRecipes([]);
        setMessage("No recipes found!");
      }
    } catch (error) {
      setMessage("Error fetching recipes");
    }
  };

  return (
    <div className="container">
      <h1>Recipe Search with Ingredient Filter</h1>

      <div className="searchBox">
        <input
          type="text"
          placeholder="Enter Ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />

        <button onClick={searchRecipes}>
          Search
        </button>
      </div>

      {message && (
        <h3 className="message">{message}</h3>
      )}

      <div className="recipeContainer">
        {recipes.map((recipe) => (
          <div className="card" key={recipe.idMeal}>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
            />

            <h3>{recipe.strMeal}</h3>

            <p>ID: {recipe.idMeal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;