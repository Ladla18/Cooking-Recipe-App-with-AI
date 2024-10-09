import React, { useState, useEffect } from "react";
import { Search, User, Book, Video, Utensils, Bell, Menu ,Pin} from "lucide-react"; // Ensure you import Menu for the burger icon
import RecipeDetails from "./RecipeDetail";
import { allRecipes } from "../assets/recipes";
import { sessions } from "../assets/sessions";
import ChatComponent from "./ChatComponent";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("recipes");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility


  
  
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = allRecipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowercasedQuery) ||
        recipe.author.toLowerCase().includes(lowercasedQuery) ||
        recipe.difficulty.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredRecipes(filtered);
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const deleteRecipe = ()=>{
    console.log("Recipe Deleted")
    localStorage.removeItem("");
  }
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 z-10 bg-white shadow-md transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block md:w-64`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-orange-500">CookTogether</h1>
        </div>
        <nav className="mt-8">
          <a
            className={`flex items-center px-4 py-2 text-gray-700 ${
              activeTab === "recipes" ? "bg-orange-100" : ""
            }`}
            href="#"
            onClick={() => {
              setActiveTab("recipes");
              setSidebarOpen(false); // Close the sidebar on menu item click
            }}
          >
            <Book className="mr-3" size={20} />
            Recipes
          </a>
          <a
            className={`flex items-center px-4 py-2 text-gray-700 ${
              activeTab === "sessions" ? "bg-orange-100" : ""
            }`}
            href="#"
            onClick={() => {
              setActiveTab("sessions");
              setSidebarOpen(false); // Close the sidebar on menu item click
            }}
          >
            <Video className="mr-3" size={20} />
            Live Sessions
          </a>
          <a
            className={`flex items-center px-4 py-2 text-gray-700 ${
              activeTab === "ai" ? "bg-orange-100" : ""
            }`}
            href="#"
            onClick={() => {
              setActiveTab("ai");
              setSidebarOpen(false); // Close the sidebar on menu item click
            }}
          >
            <Utensils className="mr-3" size={20} />
            AI Assistant
          </a>
         
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="md:hidden">
                <Menu className="text-gray-600" size={24} />
              </button>
              <div className="relative ml-4">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="pl-10 pr-4 py-2 border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={20}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="text-gray-600" size={24} />
              <User className="text-gray-600" size={24} />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 overflow-auto h-[calc(100vh-70px)]">
          {activeTab === "recipes" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Recipe Library</h2>
              {selectedRecipe ? (
                <RecipeDetails
                  recipe={selectedRecipe}
                  onClose={handleCloseRecipeDetails}
                />
              ) : filteredRecipes.length === 0 ? (
                <p className="text-gray-600">
                  No recipes found. Try a different search term.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition duration-200"
                      onClick={() => handleRecipeClick(recipe)}
                    >
                      <div className="h-48 bg-gray-300"></div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">
                          {recipe.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          by {recipe.author}
                        </p>
                        <div className="flex justify-between mt-4 text-sm">
                          <span>{recipe.time}</span>
                          <span>{recipe.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "sessions" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Live Cooking Sessions By Top Chefs
              </h2>
              <p className="bg-green-700 mb-10 text-white ps-10 rounded-lg py-2">This Feature is coming Soon ... </p>
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center cursor-pointer"
                  >
                    <div>
                      <h3 className="font-semibold text-lg">{session.title}</h3>
                      <p className="text-sm text-gray-600">
                        Hosted by {session.host}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {session.participants} participants
                      </p>
                      <p className="text-sm font-semibold">
                        Starts at {session.startTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "ai" && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                AI Cooking Assistant
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 mb-4">
                  How can I assist you with your cooking today? Ask me about
                  ingredient substitutions, cooking techniques, or timing
                  reminders.
                </p>
                <ChatComponent />
              </div>
            </div>
          )}

         
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
