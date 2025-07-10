import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Bowl3D from "../components/Bowl3D";
import Footer from "../components/Footer";
import "../styles/Home.scss";

const dietPlans = [
  {
    id: 1,
    title: "Weight Loss Diet",
    description: "Low Carb / Keto / Intermittent Fasting",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60",
    plans: ["Keto Bowl", "Low Carb Bowl", "IF Bowl"],
    icon: "🥗",
  },
  {
    id: 2,
    title: "Muscle Gain Diet",
    description: "High Protein / Balanced Macros",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=60",
    plans: ["Protein Power Bowl", "Athlete Bowl", "Strength Bowl"],
    icon: "💪",
  },
  {
    id: 3,
    title: "Diabetic-Friendly Diet",
    description: "Low Glycemic Index / Controlled Carbs",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60",
    plans: ["Sugar Control Bowl", "Balanced Bowl", "Low GI Bowl"],
    icon: "🩺",
  },
  {
    id: 4,
    title: "PCOS/PCOD-Friendly Diet",
    description: "Anti-inflammatory / Hormone Balancing",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60",
    plans: ["Hormone Balance Bowl", "Anti-inflammatory Bowl", "PCOS Special"],
    icon: "🌸",
  },
  {
    id: 5,
    title: "Heart-Healthy Diet",
    description: "Low-Cholesterol / Heart-Friendly",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60",
    plans: ["Heart Smart Bowl", "Cholesterol Control Bowl", "Cardio Bowl"],
    icon: "❤️",
  },
  {
    id: 6,
    title: "Gluten-Free Diet",
    description: "100% Gluten-Free Options",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=60",
    plans: ["GF Power Bowl", "GF Energy Bowl", "GF Delight Bowl"],
    icon: "🌾",
  },
];

const features = [
  {
    icon: "🥗",
    title: "Fresh Ingredients",
    description:
      "We use only the freshest, highest quality ingredients in our bowls.",
  },
  {
    icon: "⚡",
    title: "Quick Delivery",
    description: "Get your healthy meal delivered within 30 minutes.",
  },
  {
    icon: "🌱",
    title: "100% Organic",
    description:
      "All our ingredients are certified organic and pesticide-free.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60",
    text: "The keto bowls have been a game-changer for my fitness journey. Delicious and perfectly portioned!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marathon Runner",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
    text: "As a runner, I need proper nutrition. MK Fit Bowl's protein bowls give me the energy I need for training.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Yoga Instructor",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60",
    text: "The variety of options and attention to dietary needs is impressive. My students love it too!",
    rating: 5,
  },
];

const stats = [
  { number: "10K+", label: "Happy Customers" },
  { number: "50+", label: "Daily Orders" },
  { number: "15+", label: "Diet Plans" },
  { number: "4.9", label: "Customer Rating" },
];

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="floating-icons">
          <i className="icon fas fa-apple-alt"></i>
          <i className="icon fas fa-carrot"></i>
          <i className="icon fas fa-seedling"></i>
          <i className="icon fas fa-leaf"></i>
          <i className="icon fas fa-pepper-hot"></i>
          <i className="icon fas fa-egg"></i>
          <i className="icon fas fa-fish"></i>
          <i className="icon fas fa-drumstick-bite"></i>
        </div>
        <div className="container">
          <div className="hero-wrapper">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>Healthy Food For Your Body</h1>
              <p className="tagline">Eat Clean. Stay Lean. Live Healthy.</p>
              <div className="hero-buttons">
                <Link to="/custom-bowl" className="btn btn-primary">
                  Build Your Bowl
                </Link>
                <Link to="/menu" className="btn btn-outline">
                  View Menu
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="hero-image"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div style={{ width: "100%", height: "600px" }}>
                <Bowl3D />
              </div>
              <div className="floating-badge">
                <span className="badge-icon">🥗</span>
                <span className="badge-text">Fresh & Healthy</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <motion.div
            className="features-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diets Section */}
      <section className="diets">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Our Diet Plans</h2>
            <p>
              Choose from our specially curated diet plans for your health goals
            </p>
          </motion.div>
          <div className="grid">
            {dietPlans.map((diet, index) => (
              <motion.div
                key={diet.id}
                className="diet-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="diet-card__image">
                  <img src={diet.image} alt={diet.title} />
                  <div className="diet-card__icon">{diet.icon}</div>
                </div>
                <div className="diet-card__content">
                  <h3>{diet.title}</h3>
                  <p>{diet.description}</p>
                  {/* <div className="diet-card__plans">
                    {diet.plans.map((plan, index) => (
                      <span key={index} className="plan-tag">
                        {plan}
                      </span>
                    ))}
                  </div> */}
                  <Link to={`/menu?diet=${diet.id}`} className="btn">
                    View Plans
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>What Our Customers Say</h2>
            <p>
              Join thousands of satisfied customers who have transformed their
              lives
            </p>
          </motion.div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="testimonial-content">
                  <div className="rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">
                        ★
                      </span>
                    ))}
                  </div>
                  <p>{testimonial.text}</p>
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Start Your Healthy Journey?</h2>
            <p>
              Join thousands of satisfied customers who have transformed their
              lives with our healthy meal plans.
            </p>
            <Link to="/custom-bowl" className="btn btn-primary">
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
