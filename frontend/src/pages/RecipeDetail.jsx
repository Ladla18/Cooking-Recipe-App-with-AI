import React from "react";
import { Clock, Users, ChefHat, ArrowLeft, Scale } from "lucide-react";
import {motion} from "framer-motion"
const RecipeDetails = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <motion.div
      initial={{ opacity: 0,x:500 }}
      animate={{  opacity: 1 , x:0}} // Set a value that covers the full height
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative h-64 bg-orange-100">
        <img
          src={recipe.images}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onClose}
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-200"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
      </div>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          {recipe.title}
        </h2>
        <p className="text-gray-600 mb-6">by {recipe.author}</p>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Clock size={20} className="text-orange-500 mr-2" />
            <span>{recipe.time}</span>
          </div>
          <div className="flex items-center">
            <Users size={20} className="text-orange-500 mr-2" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center">
            <ChefHat size={20} className="text-orange-500 mr-2" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Ingredients
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-600">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Instructions
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="text-gray-600">
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Notes</h3>
          <p className="text-gray-600">{recipe.notes}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeDetails;
