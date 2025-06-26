import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { assets } from "../assets";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.05, 
      when: "beforeChildren",
      duration: 0.5
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut"
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { 
      delay: i * 0.1, 
      duration: 0.4,
      ease: "backOut"
    }
  })
};

const HomeLogin = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      image: assets.teamcollaboration,
      alt: "Team collaborating on project",
      title: "Real-time Feedback",
      description: "Instant team feedback sharing",
      color: "from-cyan-400 to-blue-500"
    },
    {
      image: assets.secureenvironment,
      alt: "Secure data protection illustration",
      title: "Secure Environment",
      description: "Encrypted communication",
      color: "from-purple-400 to-indigo-500"
    },
    {
      image: assets.dashboard,
      alt: "Data analytics dashboard",
      title: "Actionable Insights",
      description: "Data-driven improvements",
      color: "from-emerald-400 to-teal-500"
    },
    {
      image: assets.highfive,
      alt: "Team members giving high fives",
      title: "Peer Recognition",
      description: "Celebrate team wins",
      color: "from-amber-400 to-orange-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000); // Reduced from 5000ms to 3000ms for faster transitions
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Vibrant Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={assets.webbackgroundimage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
      </div>

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center px-4 py-12 lg:py-24 min-h-screen"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Section - Feature Highlights */}
          <motion.div 
            className="space-y-6 lg:space-y-8 text-white text-center lg:text-left"
            variants={itemVariants}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="hidden lg:block">Welcome to</span>
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${features[currentFeature].color} inline-block mt-0 lg:mt-2`}>
                Insight Hub
              </span>
            </motion.h1>

            <motion.p 
              className="text-base md:text-lg text-gray-200 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Better feedback. Better teams.
            </motion.p>

            <motion.div 
              className="relative h-56 md:h-64 lg:h-72 rounded-xl lg:rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.3)"
                  }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ 
                    duration: 0.6, // Faster transition
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0"
                >
                  <img
                    src={features[currentFeature].image}
                    alt={features[currentFeature].alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-left">
                    <h3 className="text-xl lg:text-2xl font-bold text-white">
                      {features[currentFeature].title}
                    </h3>
                    <p className="text-gray-200 text-sm lg:text-base">
                      {features[currentFeature].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Feature Indicators */}
            <motion.ul 
              className="flex justify-center lg:justify-start gap-3 mt-4 lg:mt-6"
              variants={containerVariants}
            >
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  variants={featureVariants}
                  custom={i}
                  className={`relative cursor-pointer transition-all duration-200 ${
                    currentFeature === i ? "scale-110" : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setCurrentFeature(i)}
                  whileHover={{ y: -3 }}
                >
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg overflow-hidden border-2 border-white/30 hover:border-white/50 transition-all">
                    <img
                      src={feature.image}
                      alt={feature.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {currentFeature === i && (
                    <motion.div 
                      className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full bg-white"
                      layoutId="featureIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right Section - Login Card */}
          <motion.div 
            className="flex flex-col items-center space-y-6 w-full"
            variants={itemVariants}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="w-full max-w-sm lg:max-w-md bg-white/10 backdrop-blur-lg rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-white/20 shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="relative z-10">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">Get Started</h2>
                
                <div className="space-y-5">
                  <NavLink to="/login">
                    <motion.button
                      className={`w-full bg-gradient-to-r ${features[currentFeature].color} text-white font-bold py-3 lg:py-4 px-6 rounded-lg lg:rounded-xl shadow-lg transition-all flex items-center justify-center gap-2`}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.3)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                    >
                      <span>Login</span>
                      <motion.span
                        animate={{ x: isHovered ? 4 : 0 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </NavLink>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-3 bg-transparent text-white/70 text-sm">
                        or
                      </span>
                    </div>
                  </div>

                  <NavLink to="/requestuser">
                    <motion.button
                      className="w-full bg-white/90 hover:bg-white text-gray-900 font-semibold py-3 lg:py-4 px-6 rounded-lg lg:rounded-xl border border-white transition-all flex items-center justify-center"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 8px 20px -5px rgba(255, 255, 255, 0.2)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Request Access</span>
                    </motion.button>
                  </NavLink>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default HomeLogin;