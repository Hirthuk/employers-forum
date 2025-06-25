import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { assets } from "../assets";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, 
      when: "beforeChildren",
      duration: 0.8
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.6, -0.05, 0.01, 0.99],
      type: "spring",
      stiffness: 100
    }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { 
      delay: i * 0.15, 
      duration: 0.6,
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
      description: "Share and receive feedback instantly with your team",
      color: "from-cyan-400 to-blue-500"
    },
    {
      image: assets.secureenvironment,
      alt: "Secure data protection illustration",
      title: "Secure Environment",
      description: "Private and encrypted communication for your organization",
      color: "from-purple-400 to-indigo-500"
    },
    {
      image: assets.dashboard,
      alt: "Data analytics dashboard",
      title: "Actionable Insights",
      description: "Turn feedback into measurable improvements",
      color: "from-emerald-400 to-teal-500"
    },
    {
      image: assets.highfive,
      alt: "Team members giving high fives",
      title: "Peer Recognition",
      description: "Celebrate wins and acknowledge great work",
      color: "from-amber-400 to-orange-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transition-all duration-1000"
          style={{ 
            backgroundImage: `url(${assets.webbackgroundimage})`,
            opacity: 0.8
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-gray-900/90" />
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10 backdrop-blur-sm"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            transition: {
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }
          }}
        />
      ))}

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center px-4 py-16 lg:py-24 min-h-screen"
      >
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Feature Highlights */}
          <motion.div 
            className="space-y-8 text-white text-center lg:text-left"
            variants={itemVariants}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block">Welcome to</span>
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${features[currentFeature].color} inline-block mt-2`}>
                Insight Hub
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Empower your team with better feedback, recognition, and data-driven insights.
            </motion.p>

            <motion.div 
              className="relative h-64 md:h-80 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  }}
                  className="absolute inset-0 flex flex-col items-center lg:items-start justify-center"
                >
                  <div className="relative w-full h-full">
                    <img
                      src={features[currentFeature].image}
                      alt={features[currentFeature].alt}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent ${features[currentFeature].color.replace('from-', 'via-').replace('to-', 'to-')}/50`} />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                      <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                        {features[currentFeature].title}
                      </h3>
                      <p className="text-gray-200 mt-2 max-w-md">
                        {features[currentFeature].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Feature Indicators */}
            <motion.ul 
              className="flex justify-center lg:justify-start gap-3 mt-6"
              variants={containerVariants}
            >
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  variants={featureVariants}
                  custom={i}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    currentFeature === i ? "scale-110" : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setCurrentFeature(i)}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/30 hover:border-white/50 transition-all">
                    <img
                      src={feature.image}
                      alt={feature.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {currentFeature === i && (
                    <motion.div 
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-white"
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
            className="flex flex-col items-center space-y-6"
            variants={itemVariants}
            transition={{ delay: 0.9 }}
          >
            <motion.div 
              className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue-500/20 filter blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-indigo-500/20 filter blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2">Get Started</h2>
                <p className="text-gray-300 mb-8">Join thousands of teams improving their feedback culture</p>

                <div className="space-y-6">
                  <NavLink to="/login">
                    <motion.button
                      className={`w-full bg-gradient-to-r ${features[currentFeature].color} text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all text-lg flex items-center justify-center gap-2`}
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                    >
                      <span>Login to Insight Hub</span>
                      <motion.span
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </NavLink>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-transparent text-white/70 text-sm">
                        or
                      </span>
                    </div>
                  </div>

                  <NavLink to="/request-access">
                    <motion.button
                      className="w-full bg-white/90 hover:bg-white text-gray-900 font-semibold py-4 px-6 rounded-xl border border-white transition-all text-lg flex items-center justify-center gap-2"
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.2)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Request Access</span>
                    </motion.button>
                  </NavLink>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <motion.button
                      className="flex-1 bg-gray-800/50 hover:bg-gray-800/70 text-white py-3 px-4 rounded-lg border border-gray-700 transition-all text-sm flex items-center justify-center gap-2"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img className="h-5 w-5" src={assets.googleIcon} alt="Google" />
                      <span>Google</span>
                    </motion.button>

                    <motion.button
                      className="flex-1 bg-gray-800/50 hover:bg-gray-800/70 text-white py-3 px-4 rounded-lg border border-gray-700 transition-all text-sm flex items-center justify-center gap-2"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img className="h-5 w-5" src={assets.microsoftIcon} alt="Microsoft" />
                      <span>Microsoft</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="text-center text-white/70 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p>Trusted by teams at leading companies worldwide</p>
              <div className="flex justify-center gap-6 mt-4 opacity-80">
                <img src={assets.companyLogo1} alt="Company 1" className="h-8" />
                <img src={assets.companyLogo2} alt="Company 2" className="h-8" />
                <img src={assets.companyLogo3} alt="Company 3" className="h-8" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default HomeLogin;