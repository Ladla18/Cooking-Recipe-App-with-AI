import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // Ensure you have this package installed

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-4 border rounded-lg bg-gray-200 cursor-pointer hover:bg-gray-300 transition"
    >
      <ReactMarkdown>{recipe.split("\n")[0]}</ReactMarkdown>{" "}
      {/* Display the first line as the title */}
    </div>
  );
};

const ChatComponent = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State for the selected recipe

  // Load saved recipes from local storage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(saved);
  }, []);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleButtonClick = async () => {
    setLoading(true);
    const apiKey = "YOUR_API_KEY"; // Use your actual API key here
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const data = {
      contents: [
        {
          parts: [
            {
              text: question,
            },
          ],
        },
      ],
    };

    try {
      const apiResponse = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const content = apiResponse.data.candidates[0].content.parts[0].text;
      setResponse(content); // Store raw markdown content
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch response from API");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = () => {
    if (response) {
      const newSavedRecipes = [...savedRecipes, response]; // Add new recipe
      setSavedRecipes(newSavedRecipes);
      localStorage.setItem("savedRecipes", JSON.stringify(newSavedRecipes)); // Save to local storage
    }
  };

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe); // Set the selected recipe for viewing
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null); // Clear the selected recipe to close modal
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          value={question}
          onChange={handleInputChange}
          placeholder="Ask a cooking question..."
          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <button
          onClick={handleButtonClick}
          className="bg-orange-500 text-white px-6 py-2 rounded-r-lg hover:bg-orange-600 transition duration-200"
        >
          Ask
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 border rounded-lg bg-red-100 text-red-600">
          {error}
        </div>
      )}
      {loading ? (
        <p className="text-center mt-10 font-bold">Loading...</p>
      ) : (
        <>
          {response && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-100">
              <h2 className="font-bold">Response:</h2>
              <ReactMarkdown>{response}</ReactMarkdown>
              <div className="flex justify-center">
                <button
                  onClick={handleSaveRecipe}
                  className="bg-black text-white rounded-2xl p-2 hover:bg-red-700"
                >
                  Save This Recipe
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Saved Recipes Section */}
      <div className="mt-8">
        <h2 className="font-bold text-lg">Saved Recipes:</h2>
        {savedRecipes.length === 0 ? (
          <p>No recipes saved yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {savedRecipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                onClick={() => handleCardClick(recipe)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Full Recipe View */}
      {selectedRecipe && (
        <div className="fixed  inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white h-5/6 overflow-scroll p-4 rounded-lg w-11/12 md:w-1/2 relative">
            <button
              onClick={handleCloseRecipe}
              className="absolute top-2 right-2 text-red-500"
            >
              Close
            </button>
            <h2 className="font-bold text-lg">Full Recipe:</h2>
            <ReactMarkdown>{selectedRecipe}</ReactMarkdown>{" "}
            {/* Show full recipe */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
