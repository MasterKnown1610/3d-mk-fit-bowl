import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/CustomBowl.scss";

// Diet to allowed options mapping
const dietOptionMap = {
  1: {
    // Weight Loss Diet
    base: ["cauliflower-rice", "brown-rice", "red-rice"],
    protein: ["chicken", "tofu", "fish", "sprouts"],
    fats: ["olive-oil", "coconut-oil"],
    veggies: ["spinach", "cabbage-carrot", "mixed-veg"],
    addons: ["salad", "mint-chutney"],
  },
  2: {
    // Muscle Gain Diet
    base: ["brown-rice", "red-rice", "bajra", "ragi-ball"],
    protein: ["paneer", "chicken", "tofu", "fish", "eggs", "rajma"],
    fats: ["ghee", "olive-oil"],
    veggies: ["spinach", "drumstick", "mixed-veg"],
    addons: ["peanut-chutney", "salad"],
  },
  3: {
    // Diabetic-Friendly Diet
    base: ["brown-rice", "cauliflower-rice"],
    protein: ["tofu", "fish", "sprouts", "eggs"],
    fats: ["olive-oil", "coconut-oil"],
    veggies: ["brinjal", "spinach", "drumstick"],
    addons: ["salad"],
  },
  4: {
    // PCOS/PCOD-Friendly Diet
    base: ["ragi-ball", "brown-rice"],
    protein: ["tofu", "chicken", "sprouts"],
    fats: ["olive-oil", "coconut-oil"],
    veggies: ["spinach", "drumstick", "cabbage-carrot"],
    addons: ["mint-chutney", "salad"],
  },
  5: {
    // Heart-Healthy Diet
    base: ["brown-rice", "red-rice", "cauliflower-rice"],
    protein: ["fish", "tofu", "sprouts"],
    fats: ["olive-oil"],
    veggies: ["spinach", "cabbage-carrot", "mixed-veg"],
    addons: ["salad"],
  },
  6: {
    // Gluten-Free Diet
    base: ["brown-rice", "red-rice", "cauliflower-rice"],
    protein: ["paneer", "chicken", "tofu", "fish", "eggs", "sprouts"],
    fats: ["olive-oil", "coconut-oil"],
    veggies: ["spinach", "drumstick", "mixed-veg"],
    addons: ["salad", "mint-chutney"],
  },
};

const options = {
  region: [
    { id: "north", name: "North Indian" },
    { id: "south", name: "South Indian" },
  ],
  base: [
    {
      id: "brown-rice",
      name: "Brown Rice",
      icon: "🍚",
      svg: `<svg viewBox='0 0 48 24' width='40' height='20' xmlns='http://www.w3.org/2000/svg'><ellipse cx='24' cy='16' rx='20' ry='8' fill='#fffbe8'/><ellipse cx='24' cy='13' rx='16' ry='6' fill='#f7f3d7'/><ellipse cx='24' cy='10' rx='12' ry='4' fill='#fff'/></svg>`,
      calories: 120,
      protein: 3,
      carbs: 25,
      fat: 1,
      price: 30,
    },
    {
      id: "red-rice",
      name: "Red Rice",
      icon: "🍚",
      svg: `<svg viewBox='0 0 48 24' width='40' height='20' xmlns='http://www.w3.org/2000/svg'><ellipse cx='24' cy='16' rx='20' ry='8' fill='#fffbe8'/><ellipse cx='24' cy='13' rx='16' ry='6' fill='#f7f3d7'/><ellipse cx='24' cy='10' rx='12' ry='4' fill='#fff'/></svg>`,
      calories: 110,
      protein: 2.5,
      carbs: 23,
      fat: 0.8,
      price: 35,
    },
    {
      id: "bajra",
      name: "Bajra",
      icon: "🌾",
      calories: 130,
      protein: 4,
      carbs: 26,
      fat: 1.2,
      price: 40,
    },
    {
      id: "ragi-ball",
      name: "Ragi Ball",
      icon: "🍘",
      calories: 140,
      protein: 4.5,
      carbs: 28,
      fat: 1.5,
      price: 45,
    },
    {
      id: "cauliflower-rice",
      name: "Cauliflower Rice",
      icon: "🥦",
      svg: `<svg viewBox='0 0 48 24' width='40' height='20' xmlns='http://www.w3.org/2000/svg'><ellipse cx='24' cy='16' rx='20' ry='8' fill='#fffbe8'/><ellipse cx='24' cy='13' rx='16' ry='6' fill='#f7f3d7'/><ellipse cx='24' cy='10' rx='12' ry='4' fill='#fff'/></svg>`,
      calories: 25,
      protein: 2,
      carbs: 5,
      fat: 0.3,
      price: 50,
    },
  ],
  protein: [
    {
      id: "paneer",
      name: "Paneer",
      icon: "🧀",
      calories: 265,
      protein: 18,
      carbs: 2,
      fat: 20,
      price: 60,
    },
    {
      id: "chicken",
      name: "Chicken",
      icon: "🍗",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      price: 70,
    },
    {
      id: "tofu",
      name: "Tofu",
      icon: "🍥",
      calories: 76,
      protein: 8,
      carbs: 1.9,
      fat: 4.8,
      price: 55,
    },
    {
      id: "fish",
      name: "Fish",
      icon: "🐟",
      calories: 120,
      protein: 22,
      carbs: 0,
      fat: 3.5,
      price: 80,
    },
    {
      id: "rajma",
      name: "Rajma",
      icon: "🫘",
      calories: 127,
      protein: 8.7,
      carbs: 23,
      fat: 0.5,
      price: 45,
    },
    {
      id: "eggs",
      name: "Eggs",
      icon: "🥚",
      calories: 155,
      protein: 13,
      carbs: 1.1,
      fat: 11,
      price: 40,
    },
    {
      id: "sprouts",
      name: "Sprouts",
      icon: "🌱",
      calories: 30,
      protein: 3,
      carbs: 5,
      fat: 0.2,
      price: 35,
    },
  ],
  veggies: [
    {
      id: "brinjal",
      name: "Brinjal",
      icon: "🍆",
      calories: 25,
      protein: 1,
      carbs: 6,
      fat: 0.2,
      price: 30,
    },
    {
      id: "spinach",
      name: "Spinach",
      icon: "🥬",
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      price: 35,
    },
    {
      id: "drumstick",
      name: "Drumstick",
      icon: "🥒",
      calories: 37,
      protein: 2.1,
      carbs: 8.5,
      fat: 0.2,
      price: 40,
    },
    {
      id: "cabbage-carrot",
      name: "Cabbage-Carrot",
      icon: "🥕",
      calories: 30,
      protein: 1.5,
      carbs: 7,
      fat: 0.2,
      price: 35,
    },
    {
      id: "mixed-veg",
      name: "Mixed Veg",
      icon: "🥗",
      calories: 35,
      protein: 2,
      carbs: 8,
      fat: 0.3,
      price: 40,
    },
  ],
  fats: [
    {
      id: "ghee",
      name: "Ghee",
      icon: "🧈",
      calories: 120,
      protein: 0,
      carbs: 0,
      fat: 14,
      price: 20,
    },
    {
      id: "olive-oil",
      name: "Olive Oil",
      icon: "🫒",
      calories: 120,
      protein: 0,
      carbs: 0,
      fat: 14,
      price: 25,
    },
    {
      id: "coconut-oil",
      name: "Coconut Oil",
      icon: "🥥",
      calories: 120,
      protein: 0,
      carbs: 0,
      fat: 14,
      price: 30,
    },
  ],
  addons: [
    {
      id: "mint-chutney",
      name: "Mint Chutney",
      icon: "🌿",
      calories: 20,
      protein: 1,
      carbs: 4,
      fat: 0.2,
      price: 15,
    },
    {
      id: "peanut-chutney",
      name: "Peanut Chutney",
      icon: "🥜",
      calories: 45,
      protein: 2,
      carbs: 5,
      fat: 2.5,
      price: 20,
    },
    {
      id: "salad",
      name: "Salad",
      icon: "🥗",
      calories: 15,
      protein: 1,
      carbs: 3,
      fat: 0.1,
      price: 25,
    },
  ],
};

const CustomBowl = () => {
  const [searchParams] = useSearchParams();
  const dietId = parseInt(searchParams.get("diet"), 10);
  const allowed = dietOptionMap[dietId] || {};

  const [region, setRegion] = useState("");
  const [selectedItems, setSelectedItems] = useState([]); // {category, item}
  const [nutrition, setNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    price: 0,
  });

  // Filter options based on diet
  const filteredOptions = Object.fromEntries(
    Object.entries(options).map(([category, items]) => {
      if (category === "region") return [category, items];
      if (!allowed[category]) return [category, items];
      return [
        category,
        items.filter((item) => allowed[category].includes(item.id)),
      ];
    })
  );

  // Nutrition calculation
  useEffect(() => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalPrice = 0;
    selectedItems.forEach(({ category, item }) => {
      totalCalories += item.calories || 0;
      totalProtein += item.protein || 0;
      totalCarbs += item.carbs || 0;
      totalFat += item.fat || 0;
      totalPrice += item.price || 0;
    });
    totalPrice = Math.round(totalPrice * 1.4);
    setNutrition({
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
      price: totalPrice,
    });
  }, [selectedItems]);

  // Add item to bowl
  const handleAddItem = (category, item) => {
    setSelectedItems((prev) => [...prev, { category, item }]);
  };

  // Remove item from bowl (only one instance)
  const handleRemoveItem = (category, itemId) => {
    const idx = selectedItems.findIndex(
      (i) => i.category === category && i.item.id === itemId
    );
    if (idx !== -1) {
      setSelectedItems((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  // WhatsApp order
  const handleOrder = () => {
    const msg =
      `Hi! I'd like to order a custom diet bowl:\n- Region: ${
        options.region.find((r) => r.id === region)?.name || "Not selected"
      }\n` +
      Object.keys(filteredOptions)
        .filter((cat) => cat !== "region")
        .map((cat) => {
          const items = selectedItems.filter((i) => i.category === cat);
          if (items.length === 0)
            return `- ${
              cat.charAt(0).toUpperCase() + cat.slice(1)
            }: Not selected`;
          if (cat === "addons") {
            return `- Add-ons: ${items.map((i) => i.item.name).join(", ")}`;
          }
          return `- ${cat.charAt(0).toUpperCase() + cat.slice(1)}: ${
            items[0].item.name
          }`;
        })
        .join("\n") +
      `\n- Total Nutrition: ${nutrition.calories}kcal | ${nutrition.protein}g Protein | ${nutrition.carbs}g Carbs | ${nutrition.fat}g Fat\n- Price: ₹${nutrition.price}\nPlease confirm my order.`;
    window.open(
      `https://wa.me/8121201610?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  // UI
  return (
    <div className="custom-bowl">
      <div className="container">
        <h1>Build Your Bowl</h1>
        {/* Step 1: Region selection */}
        {!region ? (
          <div className="region-select">
            <h2>Choose your style</h2>
            <div className="region-buttons">
              {filteredOptions.region.map((r) => (
                <button
                  key={r.id}
                  className="btn btn-primary"
                  onClick={() => setRegion(r.id)}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bowl-builder new-layout">
            {/* Left: All items */}
            <div className="selections new-selections">
              {Object.entries(filteredOptions)
                .filter(([cat]) => cat !== "region")
                .map(([category, items]) => (
                  <div key={category} className="selection-group">
                    <h3>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                    <div className="items-list">
                      {items.map((item) => {
                        const count = selectedItems.filter(
                          (i) =>
                            i.category === category && i.item.id === item.id
                        ).length;
                        return (
                          <div
                            key={item.id}
                            className={`item-card${
                              count > 0 ? " selected" : ""
                            }`}
                          >
                            <div className="item-info">
                              <span>{item.name}</span>
                              <span className="item-calories">
                                {item.calories} kcal
                              </span>
                              {count > 0 && (
                                <span className="item-count">x{count}</span>
                              )}
                            </div>
                            <button
                              className="btn btn-sm btn-outline"
                              onClick={() => handleAddItem(category, item)}
                            >
                              Add
                            </button>
                            {count > 0 && (
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  handleRemoveItem(category, item.id)
                                }
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
            {/* Right: Bowl visualization */}
            <div className="preview new-preview">
              <h3>Your Bowl</h3>
              <div className="bowl-svg-container big-bowl">
                <svg
                  width="100%"
                  height="auto"
                  viewBox="0 0 400 200"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ display: "block", maxWidth: "100%", height: "auto" }}
                >
                  <ellipse
                    cx="200"
                    cy="150"
                    rx="180"
                    ry="45"
                    fill="#f5e6c8"
                    stroke="#bfa76f"
                    strokeWidth="8"
                  />
                  {/* Items as chips inside the bowl */}
                  {selectedItems.map((i, idx) => (
                    <g key={idx}>
                      {i.item.svg ? (
                        <foreignObject
                          x={50 + (idx % 6) * 55}
                          y={134 - Math.floor(idx / 6) * 35}
                          width="48"
                          height="24"
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "100%",
                              height: "100%",
                            }}
                            dangerouslySetInnerHTML={{ __html: i.item.svg }}
                          />
                        </foreignObject>
                      ) : (
                        <text
                          x={80 + (idx % 6) * 55}
                          y={148 - Math.floor(idx / 6) * 35}
                          textAnchor="middle"
                          fontSize="22"
                          dominantBaseline="middle"
                        >
                          {i.item.icon}
                        </text>
                      )}
                    </g>
                  ))}
                </svg>
              </div>
              <div className="nutrition-checkout-card">
                <h4>Nutrition</h4>
                <div className="nutrition-values">
                  <div className="nutrition-item">
                    <span>Calories</span>
                    <strong>{nutrition.calories} kcal</strong>
                  </div>
                  <div className="nutrition-item">
                    <span>Protein</span>
                    <strong>{nutrition.protein}g</strong>
                  </div>
                  <div className="nutrition-item">
                    <span>Carbs</span>
                    <strong>{nutrition.carbs}g</strong>
                  </div>
                  <div className="nutrition-item">
                    <span>Fat</span>
                    <strong>{nutrition.fat}g</strong>
                  </div>
                  <div className="nutrition-item price">
                    <span>Price</span>
                    <strong>₹{nutrition.price}</strong>
                  </div>
                </div>
                <button
                  className="btn btn-primary checkout-btn"
                  onClick={handleOrder}
                  disabled={selectedItems.length === 0}
                >
                  Book This Bowl
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomBowl;
