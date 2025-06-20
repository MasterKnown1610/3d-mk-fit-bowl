import React, { useState } from "react";
import "../styles/Menu.scss";

const categories = [
  "All",
  "Weight Loss",
  "Weight Gain",
  "Keto",
  "Diabetic-Friendly",
  "PCOS/PCOD",
  "Heart-Healthy",
];

const menuItems = [
  // 1. Lean Paneer Jeera Bowl (Weight Loss – Veg)
  {
    region: "North Indian",
    category: "Weight Loss",
    type: "Veg",
    name: "Lean Paneer Jeera Bowl",
    calories: 400,
    protein: 22,
    carbs: 35,
    fat: 10,
    ingredients:
      "100g Grilled Paneer, Jeera Rice, Cabbage-Carrot Mix, Olive Oil",
    // direct Unsplash URL from a “paneer bowl” search :contentReference[oaicite:2]{index=2}
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80",
  },

  // 2. Ragi Pappu Lite Bowl (Weight Loss – Veg)
  {
    region: "South Indian",
    category: "Weight Loss",
    type: "Veg",
    name: "Ragi Pappu Lite Bowl",
    calories: 390,
    protein: 20,
    carbs: 32,
    fat: 10,
    ingredients: "Ragi Ball, Palak Dal, Veg Poriyal",
    // Unsplash URL for a healthy lentil/vegetable bowl :contentReference[oaicite:3]{index=3}
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
  },

  // 3. Tandoori Chicken Slim Bowl (Weight Loss – Non-Veg)
  {
    region: "North Indian",
    category: "Weight Loss",
    type: "Non-Veg",
    name: "Tandoori Chicken Slim Bowl",
    calories: 420,
    protein: 35,
    carbs: 30,
    fat: 12,
    ingredients: "150g Tandoori Chicken, Sauteed Beans, Brown Rice, Mint Dip",
    // Unsplash URL from “tandoori chicken bowl” search :contentReference[oaicite:4]{index=4}
    image:
      "https://images.unsplash.com/photo-1604908177525-035bb2989c3a?auto=format&fit=crop&w=400&q=80",
  },

  // 4. Kodi Lite Fit Bowl (Weight Loss – Non-Veg)
  {
    region: "South Indian",
    category: "Weight Loss",
    type: "Non-Veg",
    name: "Kodi Lite Fit Bowl",
    calories: 400,
    protein: 35,
    carbs: 25,
    fat: 12,
    ingredients: "Spicy Chicken Curry, Cauliflower Rice, Brinjal Fry",
    // Unsplash URL from “healthy chicken curry bowl” :contentReference[oaicite:5]{index=5}
    image:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=400&q=80",
  },

  // 5. Rajma Ghee Power Bowl (Weight Gain – Veg)
  {
    region: "North Indian",
    category: "Weight Gain",
    type: "Veg",
    name: "Rajma Ghee Power Bowl",
    calories: 550,
    protein: 25,
    carbs: 60,
    fat: 18,
    ingredients: "Rajma, Brown Rice, Curd, Ghee Tadka",
    // Unsplash URL for a rich rajma/brown-rice bowl :contentReference[oaicite:6]{index=6}
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
  },

  // 6. Sambar Kalori Bowl (Weight Gain – Veg)
  {
    region: "South Indian",
    category: "Weight Gain",
    type: "Veg",
    name: "Sambar Kalori Bowl",
    calories: 530,
    protein: 22,
    carbs: 55,
    fat: 16,
    ingredients: "Sambar, Rice, Avial, Coconut Oil",
    // Unsplash URL for “sambar bowl” :contentReference[oaicite:7]{index=7}
    image:
      "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=400&q=80",
  },

  // 7. Creamy Chicken Mass Bowl (Weight Gain – Non-Veg)
  {
    region: "North Indian",
    category: "Weight Gain",
    type: "Non-Veg",
    name: "Creamy Chicken Mass Bowl",
    calories: 600,
    protein: 40,
    carbs: 50,
    fat: 20,
    ingredients: "Butter Chicken, Jeera Rice, Boiled Egg",
    // Unsplash URL for a butter chicken bowl :contentReference[oaicite:8]{index=8}
    image:
      "https://images.unsplash.com/photo-1598514982115-9cdf4d0d7b0b?auto=format&fit=crop&w=400&q=80",
  },

  // 8. Kodi Mass Meal Bowl (Weight Gain – Non-Veg)
  {
    region: "South Indian",
    category: "Weight Gain",
    type: "Non-Veg",
    name: "Kodi Mass Meal Bowl",
    calories: 580,
    protein: 38,
    carbs: 55,
    fat: 18,
    ingredients: "Kodi Curry, Rice, Boiled Egg, Peanut Chutney",
    // Unsplash URL for a hearty chicken-and-rice bowl :contentReference[oaicite:9]{index=9}
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
  },

  // 9. Keto Paneer Bowl (Keto – Veg)
  {
    region: "North Indian",
    category: "Keto",
    type: "Veg",
    name: "Keto Paneer Bowl",
    calories: 390,
    protein: 20,
    carbs: 10,
    fat: 25,
    ingredients: "Paneer Bhurji, Stir-Fried Zucchini, Cheese",
    // Unsplash URL from “keto paneer bowl” search :contentReference[oaicite:10]{index=10}
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
  },

  // 10. Keto Coconut Veg Bowl (Keto – Veg)
  {
    region: "South Indian",
    category: "Keto",
    type: "Veg",
    name: "Keto Coconut Veg Bowl",
    calories: 410,
    protein: 18,
    carbs: 9,
    fat: 26,
    ingredients: "Coconut Kurma, Cabbage Rice, Paneer",
    // Unsplash URL for “coconut vegetable curry bowl” :contentReference[oaicite:11]{index=11}
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=400&q=80",
  },

  // 11. Chicken Keto Masala Bowl (Keto – Non-Veg)
  {
    region: "North Indian",
    category: "Keto",
    type: "Non-Veg",
    name: "Chicken Keto Masala Bowl",
    calories: 420,
    protein: 35,
    carbs: 8,
    fat: 22,
    ingredients: "Butter Chicken, Cabbage Stir-Fry, Egg",
    // Unsplash URL for a grilled chicken keto bowl :contentReference[oaicite:12]{index=12}
    image:
      "https://images.unsplash.com/photo-1553177599-0a5cb4de3b14?auto=format&fit=crop&w=400&q=80",
  },

  // 12. Kodi Keto Fry Bowl (Keto – Non-Veg)
  {
    region: "South Indian",
    category: "Keto",
    type: "Non-Veg",
    name: "Kodi Keto Fry Bowl",
    calories: 430,
    protein: 38,
    carbs: 6,
    fat: 24,
    ingredients: "Kodi Fry, Stir Fried Cauliflower, Boiled Egg",
    // Unsplash URL for “chicken fried keto bowl” :contentReference[oaicite:13]{index=13}
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80",
  },

  // 13. Diabetic Mixed Veg Bowl (Diabetic-Friendly – Veg)
  {
    region: "North Indian",
    category: "Diabetic-Friendly",
    type: "Veg",
    name: "Diabetic Mixed Veg Bowl",
    calories: 370,
    protein: 18,
    carbs: 30,
    fat: 10,
    ingredients: "Bottle Gourd Curry, Bajra Roti, Salad",
    // Unsplash URL for a mixed veg bowl :contentReference[oaicite:14]{index=14}
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
  },

  // 14. Fish Curry Balanced Bowl (Diabetic-Friendly – Non-Veg)
  {
    region: "North Indian",
    category: "Diabetic-Friendly",
    type: "Non-Veg",
    name: "Fish Curry Balanced Bowl",
    calories: 420,
    protein: 32,
    carbs: 28,
    fat: 12,
    ingredients: "Grilled Fish, Lauki Curry, Red Rice",
    // Unsplash URL for “fish curry bowl” :contentReference[oaicite:15]{index=15}
    image:
      "https://images.unsplash.com/photo-1514516878655-49b4d7d81fda?auto=format&fit=crop&w=400&q=80",
  },

  // 15. Drumstick Curry Bowl (Diabetic-Friendly – Veg)
  {
    region: "South Indian",
    category: "Diabetic-Friendly",
    type: "Veg",
    name: "Drumstick Curry Bowl",
    calories: 380,
    protein: 20,
    carbs: 28,
    fat: 10,
    ingredients: "Drumstick Curry, Millets, Raw Veg Salad",
    // Unsplash URL for “vegetable curry bowl” :contentReference[oaicite:16]{index=16}
    image:
      "https://images.unsplash.com/photo-1544187150-b99a580bb7a6?auto=format&fit=crop&w=400&q=80",
  },

  // 16. Dry Fish Green Bowl (Diabetic-Friendly – Non-Veg)
  {
    region: "South Indian",
    category: "Diabetic-Friendly",
    type: "Non-Veg",
    name: "Dry Fish Green Bowl",
    calories: 400,
    protein: 32,
    carbs: 20,
    fat: 15,
    ingredients: "Dry Fish Curry, Bitter Gourd, Butter",
    // Unsplash URL for “fish bowl” :contentReference[oaicite:17]{index=17}
    image:
      "https://images.unsplash.com/photo-1568600891621-f37225b4716a?auto=format&fit=crop&w=400&q=80",
  },

  // 17. Hormone Harmony Veg Bowl (PCOS/PCOD – Veg)
  {
    region: "North Indian",
    category: "PCOS/PCOD",
    type: "Veg",
    name: "Hormone Harmony Veg Bowl",
    calories: 410,
    protein: 20,
    carbs: 35,
    fat: 12,
    ingredients: "Spinach Curry, Brown Rice, Sprouts, Salad",
    // Unsplash URL for “spinach salad bowl” :contentReference[oaicite:18]{index=18}
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80",
  },

  // 18. PCOS Coconut Curry Bowl (PCOS/PCOD – Veg)
  {
    region: "South Indian",
    category: "PCOS/PCOD",
    type: "Veg",
    name: "PCOS Coconut Curry Bowl",
    calories: 420,
    protein: 14,
    carbs: 30,
    fat: 14,
    ingredients: "Tofu Coconut Curry, Red Rice, Mixed Veg",
    // Unsplash URL for “coconut curry bowl” :contentReference[oaicite:19]{index=19}
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=400&q=80",
  },

  // 19. Olive Palak Paneer Bowl (Heart-Healthy – Veg)
  {
    region: "North Indian",
    category: "Heart-Healthy",
    type: "Veg",
    name: "Olive Palak Paneer Bowl",
    calories: 390,
    protein: 20,
    carbs: 30,
    fat: 12,
    ingredients: "Palak Paneer, Olive Oil, Bajra Roti, Salad",
    // Unsplash URL for “palak paneer bowl” :contentReference[oaicite:20]{index=20}
    image:
      "https://images.unsplash.com/photo-1523986371872-9d3ba2e2fbcf?auto=format&fit=crop&w=400&q=80",
  },

  // 20. Fish Curry Leaf Bowl (Heart-Healthy – Non-Veg)
  {
    region: "South Indian",
    category: "Heart-Healthy",
    type: "Non-Veg",
    name: "Fish Curry Leaf Bowl",
    calories: 410,
    protein: 32,
    carbs: 28,
    fat: 12,
    ingredients: "Grilled Fish, Leafy Veg Curry, Millet",
    // Unsplash URL for “fish curry leaf bowl” :contentReference[oaicite:21]{index=21}
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  },
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="menu-page">
      <h1>Our Bowls Menu</h1>

      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === selectedCategory ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredItems.map((item, idx) => (
          <div className="menu-card" key={idx}>
            {item.image && (
              <img src={item.image} alt={item.name} className="menu-image" />
            )}
            <h3>{item.name}</h3>
            <p>
              <b>Region:</b> {item.region}
            </p>
            <p>
              <b>Type:</b> {item.type}
            </p>
            <p>
              <b>Calories:</b> {item.calories} kcal
            </p>
            <p>
              <b>Protein:</b> {item.protein}g | <b>Carbs:</b> {item.carbs}g |{" "}
              <b>Fat:</b> {item.fat}g
            </p>
            <p>
              <b>Ingredients:</b> {item.ingredients}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
