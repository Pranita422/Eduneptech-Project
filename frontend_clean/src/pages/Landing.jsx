//landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import EP1 from "../assets/EP1.png"; // ✅ make sure the image is inside src/assets/
import "./Landing.css";

const LandingPage = () => {
  return (
    <div style={{ background: "#f0f4f8", color: "#333", fontFamily: "'Poppins', sans-serif" }}>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 50px",
          background: "#6C63FF",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
          🎓 <span style={{ color: "white" }}>Edu</span>
          <span style={{ color: "#FFD700" }}>nep</span>
          <span style={{ color: "white" }}>tech</span>
        </h1>

        <ul style={{ listStyle: "none", display: "flex", gap: "25px" }}>
          <li><a href="#hero" style={{ color: "white" }}>Home</a></li>
          <li><a href="#features" style={{ color: "white" }}>Features</a></li>
          <li><a href="#pricing" style={{ color: "white" }}>Pricing</a></li>
          <li><a href="#about" style={{ color: "white" }}>About</a></li>
        </ul>

        <Link
          to="/login"
          style={{
            padding: "10px 20px",
            background: "#FFD700",
            color: "#6C63FF",
            fontWeight: "bold",
            borderRadius: "10px",
            transition: "0.3s",
          }}
        >
          Login / Sign Up
        </Link>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 20px 80px 20px",
          background: "linear-gradient(135deg, #6C63FF, #3B82F6)",
          color: "white",
        }}
      >
        <h2 style={{ fontSize: "52px", fontWeight: "700", marginBottom: "20px" }}>
          Unlock Your Learning with Assessments
        </h2>
        <p style={{ fontSize: "20px", maxWidth: "600px", marginBottom: "40px" }}>
          Take unlimited assessments, track your progress, and grow smarter with Eduneptech’s AI-powered learning platform.
        </p>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            to="/login"
            style={{
              background: "#FFD700",
              color: "#3B82F6",
              padding: "15px 35px",
              fontWeight: "bold",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
          >
            Start Free Trial
          </Link>
          <a
            href="#pricing"
            style={{
              border: "2px solid white",
              padding: "15px 35px",
              borderRadius: "12px",
              color: "white",
            }}
          >
            View Plans
          </a>
        </div>

        <img
          src={EP1}
          alt="Dashboard Preview"
          style={{
            marginTop: "50px",
            maxWidth: "650px",
            width: "100%",
            borderRadius: "20px",
            boxShadow: "0px 15px 35px rgba(0,0,0,0.3)",
            animation: "float 4s ease-in-out infinite",
          }}
        />

        <div style={{ width: "100%", height: "100px", marginTop: "-5px" }}>
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
            <path
              d="M-0.27,53.11 C149.99,150.00 349.53,-49.98 500.84,49.98 L500.00,150.00 L0.00,150.00 Z"
              style={{ stroke: "none", fill: "#f0f4f8" }}
            ></path>
          </svg>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ background: "#fff", color: "#3B82F6", padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ color: "#6C63FF", marginBottom: "50px", fontSize: "42px" }}>Choose Your Plan</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px" }}>
          {[
            {
              title: "Free Plan",
              desc: "Get started with limited assessments and explore the platform.",
              price: "₹0 / month",
              color: "#6C63FF",
              features: ["✅ 5 Assessments / Month", "✅ Basic Progress Tracking", "❌ AI Recommendations", "❌ Certificates"],
            },
            {
              title: "Standard Plan",
              desc: "Unlimited assessments and full progress tracking for serious learners.",
              price: "₹499 / month",
              color: "#3B82F6",
              features: ["✅ Unlimited Assessments", "✅ Progress Tracking", "✅ AI Recommendations", "❌ Certificates"],
            },
            {
              title: "Premium Plan",
              desc: "All features unlocked: certificates, streaks, and AI recommendations.",
              price: "₹999 / month",
              color: "#FFD700",
              features: ["✅ Unlimited Assessments", "✅ Progress Tracking", "✅ AI Recommendations", "✅ Certificates & Streaks"],
            },
          ].map((plan, i) => (
            <div
              key={i}
              style={{
                background: "white",
                padding: "35px",
                borderRadius: "20px",
                width: "280px",
                border: `2px solid ${plan.color}`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ color: plan.color }}>{plan.title}</h3>
              <p>{plan.desc}</p>
              <p style={{ fontSize: "24px", fontWeight: "bold", margin: "15px 0" }}>{plan.price}</p>
              <ul style={{ textAlign: "left", marginBottom: "20px" }}>
                {plan.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
              <Link to="/login" style={{ background: plan.color, color: "white", padding: "10px 20px", borderRadius: "8px" }}>
                {plan.title === "Free Plan" ? "Start Free Trial" : "Subscribe Now"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: "80px 20px", background: "#f0f4f8", textAlign: "center" }}>
        <h2 style={{ fontSize: "42px", marginBottom: "60px", color: "#3B82F6" }}>Why Choose Eduneptech?</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px" }}>
          {[
            { title: "Unlimited Assessments", text: "Practice as many assessments as you want and improve continuously." },
            { title: "Track Progress", text: "Monitor your scores, streaks, and growth over time." },
            { title: "AI Recommendations", text: "Get personalized suggestions on which assessments to take next." },
            { title: "Certificates", text: "Earn certificates on completing courses and challenges." },
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                background: "white",
                padding: "35px",
                borderRadius: "20px",
                width: "280px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ color: "#6C63FF", marginBottom: "15px" }}>{feature.title}</h3>
              <p style={{ color: "#555" }}>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        style={{
          padding: "40px",
          textAlign: "center",
          background: "#f0f4f8",
          marginTop: "30px",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "#6C63FF", fontSize: "28px", marginBottom: "20px" }}>About Eduneptech</h2>
        <p style={{ color: "#333", fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
          Eduneptech is an innovative platform designed to help students follow the NEP 2020 syllabus. 
          You can track your progress, take assessments, get AI-based recommendations, and unlock premium features for an enhanced learning experience.
        </p>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "40px", background: "#6C63FF", color: "white", fontWeight: "500" }}>
        &copy; 2025 Eduneptech. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
