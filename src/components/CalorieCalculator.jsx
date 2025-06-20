import React, { useState, useEffect, useRef } from "react";
import "../styles/CalorieCalculator.scss";

const CalorieCalculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startConversation();
    }
  }, [isOpen]);

  const startConversation = () => {
    const welcomeMessage = {
      id: 1,
      type: "bot",
      text: "Hi! I'm your personal nutrition assistant. Let me help you calculate your ideal weight and suggest the perfect diet plan. What's your name?",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([welcomeMessage]);
    setCurrentStep(1);
  };

  const calculateIdealWeight = (height, gender) => {
    // Using Devine formula for ideal body weight
    const heightInCm = height;
    let idealWeight;

    if (gender === "male") {
      idealWeight = 50 + 2.3 * ((heightInCm - 152.4) / 2.54);
    } else {
      idealWeight = 45.5 + 2.3 * ((heightInCm - 152.4) / 2.54);
    }

    return Math.round(idealWeight);
  };

  const calculateBMI = (weight, height) => {
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const calculateDailyCalories = (
    weight,
    height,
    age,
    gender,
    activityLevel
  ) => {
    // Using Mifflin-St Jeor Equation
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      lightly: 1.375,
      moderately: 1.55,
      very: 1.725,
      extra: 1.9,
    };

    return Math.round(bmr * activityMultipliers[activityLevel]);
  };

  const suggestDiet = (bmi, goal) => {
    const suggestions = {
      "Weight Loss": [
        "Lean Paneer Jeera Bowl",
        "Ragi Pappu Lite Bowl",
        "Tandoori Chicken Slim Bowl",
        "Kodi Lite Fit Bowl",
      ],
      "Weight Gain": [
        "Rajma Ghee Power Bowl",
        "Sambar Kalori Bowl",
        "Creamy Chicken Mass Bowl",
        "Kodi Mass Meal Bowl",
      ],
      Keto: [
        "Keto Paneer Bowl",
        "Keto Coconut Veg Bowl",
        "Chicken Keto Masala Bowl",
        "Kodi Keto Fry Bowl",
      ],
      "Diabetic-Friendly": [
        "Diabetic Mixed Veg Bowl",
        "Fish Curry Balanced Bowl",
        "Drumstick Curry Bowl",
        "Dry Fish Green Bowl",
      ],
      "PCOS/PCOD": ["Hormone Harmony Veg Bowl", "PCOS Coconut Curry Bowl"],
      "Heart-Healthy": ["Olive Palak Paneer Bowl", "Fish Curry Leaf Bowl"],
    };

    let recommendedCategory = "Weight Loss";

    if (bmi < 18.5) {
      recommendedCategory = "Weight Gain";
    } else if (bmi >= 25) {
      recommendedCategory = "Weight Loss";
    } else {
      recommendedCategory = "Heart-Healthy";
    }

    if (goal && goal !== "maintain") {
      recommendedCategory = goal;
    }

    return {
      category: recommendedCategory,
      suggestions:
        suggestions[recommendedCategory] || suggestions["Weight Loss"],
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = inputValue.trim();
    setInputValue("");

    setTimeout(() => {
      processUserInput(userInput);
    }, 500);
  };

  const processUserInput = (input) => {
    let botResponse = "";
    let nextStep = currentStep;

    switch (currentStep) {
      case 1: // Name
        setUserData((prev) => ({ ...prev, name: input }));
        botResponse = `Nice to meet you, ${input}! What's your current weight in kg?`;
        nextStep = 2;
        break;

      case 2: // Weight
        const weight = parseFloat(input);
        if (isNaN(weight) || weight < 30 || weight > 300) {
          botResponse = "Please enter a valid weight between 30-300 kg.";
          nextStep = 2;
        } else {
          setUserData((prev) => ({ ...prev, weight }));
          botResponse = "Great! What's your height in cm?";
          nextStep = 3;
        }
        break;

      case 3: // Height
        const height = parseFloat(input);
        if (isNaN(height) || height < 100 || height > 250) {
          botResponse = "Please enter a valid height between 100-250 cm.";
          nextStep = 3;
        } else {
          setUserData((prev) => ({ ...prev, height }));
          botResponse = "What's your age?";
          nextStep = 4;
        }
        break;

      case 4: // Age
        const age = parseInt(input);
        if (isNaN(age) || age < 10 || age > 100) {
          botResponse = "Please enter a valid age between 10-100 years.";
          nextStep = 4;
        } else {
          setUserData((prev) => ({ ...prev, age }));
          botResponse = "What's your gender? (male/female)";
          nextStep = 5;
        }
        break;

      case 5: // Gender
        const gender = input.toLowerCase();
        if (!["male", "female", "m", "f"].includes(gender)) {
          botResponse = "Please enter 'male' or 'female'.";
          nextStep = 5;
        } else {
          setUserData((prev) => ({
            ...prev,
            gender:
              gender === "m" ? "male" : gender === "f" ? "female" : gender,
          }));
          botResponse =
            "What's your activity level?\n1. Sedentary (little or no exercise)\n2. Lightly active (light exercise 1-3 days/week)\n3. Moderately active (moderate exercise 3-5 days/week)\n4. Very active (hard exercise 6-7 days/week)\n5. Extra active (very hard exercise, physical job)";
          nextStep = 6;
        }
        break;

      case 6: // Activity Level
        const activityMap = {
          1: "sedentary",
          2: "lightly",
          3: "moderately",
          4: "very",
          5: "extra",
        };
        const activityLevel = activityMap[input];
        if (!activityLevel) {
          botResponse = "Please enter a number between 1-5.";
          nextStep = 6;
        } else {
          setUserData((prev) => ({ ...prev, activityLevel }));
          botResponse =
            "What's your goal?\n1. Weight Loss\n2. Weight Gain\n3. Maintain Weight\n4. Keto Diet\n5. Diabetic-Friendly\n6. PCOS/PCOD\n7. Heart-Healthy";
          nextStep = 7;
        }
        break;

      case 7: // Goal
        const goalMap = {
          1: "Weight Loss",
          2: "Weight Gain",
          3: "maintain",
          4: "Keto",
          5: "Diabetic-Friendly",
          6: "PCOS/PCOD",
          7: "Heart-Healthy",
        };
        const goal = goalMap[input];
        if (!goal) {
          botResponse = "Please enter a number between 1-7.";
          nextStep = 7;
        } else {
          setUserData((prev) => ({ ...prev, goal }));
          generateResults();
          return;
        }
        break;

      default:
        botResponse = "I'm not sure how to process that. Let's start over!";
        setCurrentStep(1);
        setUserData({});
        break;
    }

    const botMessage = {
      id: messages.length + 2,
      type: "bot",
      text: botResponse,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setCurrentStep(nextStep);
  };

  const generateResults = () => {
    const { weight, height, age, gender, activityLevel, goal } = userData;

    const idealWeight = calculateIdealWeight(height, gender);
    const bmi = calculateBMI(weight, height);
    const bmiCategory = getBMICategory(bmi);
    const dailyCalories = calculateDailyCalories(
      weight,
      height,
      age,
      gender,
      activityLevel
    );
    const dietSuggestion = suggestDiet(bmi, goal);

    const resultsText = `📊 **Your Health Analysis** 📊

👤 **Personal Info:**
• Current Weight: ${weight} kg
• Height: ${height} cm
• Age: ${age} years
• Gender: ${gender}
• Activity Level: ${activityLevel}

📈 **Calculations:**
• Ideal Weight: ${idealWeight} kg
• Current BMI: ${bmi}
• BMI Category: ${bmiCategory}
• Daily Calorie Need: ${dailyCalories} kcal

🎯 **Recommendations:**
• Weight to ${weight > idealWeight ? "lose" : "gain"}: ${Math.abs(
      weight - idealWeight
    )} kg
• Recommended Diet Category: ${dietSuggestion.category}

🍽️ **Suggested Bowls:**
${dietSuggestion.suggestions
  .map((bowl, index) => `${index + 1}. ${bowl}`)
  .join("\n")}

💡 **Tips:**
• Aim for a ${
      weight > idealWeight ? "calorie deficit" : "calorie surplus"
    } of 300-500 kcal daily
• Include regular exercise in your routine
• Stay hydrated and get adequate sleep
• Consult a nutritionist for personalized advice

Would you like me to explain any of these recommendations in detail?`;

    const botMessage = {
      id: messages.length + 2,
      type: "bot",
      text: resultsText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setCurrentStep(8);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentStep(0);
    setUserData({});
    setInputValue("");
    startConversation();
  };

  return (
    <div className="calorie-calculator">
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>🍽️ Nutrition Assistant</h3>
            <button onClick={resetChat} className="reset-btn">
              🔄 Reset
            </button>
          </div>

          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-content">
                  <pre>{message.text}</pre>
                </div>
                <div className="message-time">{message.timestamp}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={currentStep === 8}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || currentStep === 8}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator;
