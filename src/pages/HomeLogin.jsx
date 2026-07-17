import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";

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

const STATS = [
  { label: "Appreciations sent", value: "1.2k+" },
  { label: "Active teams", value: "48" },
  { label: "Avg. response time", value: "<2h" },
];

const HomeLogin = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      Icon: ChatBubbleLeftRightIcon,
      title: "Real-time Feedback",
      description: "Instant team feedback sharing",
      color: "from-cyan-400 to-blue-500"
    },
    {
      Icon: ShieldCheckIcon,
      title: "Secure Environment",
      description: "Encrypted communication",
      color: "from-violet-400 to-fuchsia-500"
    },
    {
      Icon: ChartBarIcon,
      title: "Actionable Insights",
      description: "Data-driven improvements",
      color: "from-emerald-400 to-teal-500"
    },
    {
      Icon: HandRaisedIcon,
      title: "Peer Recognition",
      description: "Celebrate team wins",
      color: "from-amber-400 to-orange-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient glow background */}
      <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-violet-600/25 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float-slower" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-float-slow" />

      <Motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center px-4 py-12 lg:py-24 min-h-screen"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Section - Feature Highlights */}
          <Motion.div
            className="space-y-6 lg:space-y-8 text-center lg:text-left"
            variants={itemVariants}
          >
            <Motion.span
              className="chip bg-white/5 border-white/10 text-slate-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              ✨ A fresh way to celebrate your team
            </Motion.span>

            <Motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="hidden lg:block">Welcome to</span>
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${features[currentFeature].color} inline-block mt-0 lg:mt-2 transition-all duration-700`}>
                Rewards Sphere
              </span>
            </Motion.h1>

            <Motion.p
              className="text-base md:text-lg text-slate-400 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Better feedback. Better teams. Recognize great work the moment it happens.
            </Motion.p>

            <Motion.div
              className="relative h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden glass-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                {(() => {
                  const ActiveIcon = features[currentFeature].Icon;
                  return (
                    <Motion.div
                      key={currentFeature}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${features[currentFeature].color}`} />
                      <div
                        className="absolute inset-0 opacity-25"
                        style={{
                          backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Motion.div
                          className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-[0_0_40px_-8px_rgba(255,255,255,0.5)]"
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                        >
                          <ActiveIcon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                        </Motion.div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-left">
                        <h3 className="text-xl lg:text-2xl font-bold text-white">
                          {features[currentFeature].title}
                        </h3>
                        <p className="text-slate-100/90 text-sm lg:text-base">
                          {features[currentFeature].description}
                        </p>
                      </div>
                    </Motion.div>
                  );
                })()}
              </AnimatePresence>
            </Motion.div>

            <Motion.ul
              className="flex justify-center lg:justify-start gap-3 mt-4 lg:mt-6"
              variants={containerVariants}
            >
              {features.map((feature, i) => (
                <Motion.li
                  key={i}
                  variants={featureVariants}
                  custom={i}
                  className={`relative cursor-pointer transition-all duration-200 ${
                    currentFeature === i ? "scale-110" : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => setCurrentFeature(i)}
                  whileHover={{ y: -3 }}
                >
                  <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-lg overflow-hidden border-2 border-white/10 hover:border-white/30 transition-all bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                    <feature.Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  {currentFeature === i && (
                    <Motion.div
                      className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-300"
                      layoutId="featureIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Motion.li>
              ))}
            </Motion.ul>

            <Motion.div
              className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 pt-2"
              variants={itemVariants}
            >
              {STATS.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <p className="text-xl md:text-2xl font-bold gradient-text">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </Motion.div>
          </Motion.div>

          {/* Right Section - Get Started Card */}
          <Motion.div
            className="flex flex-col items-center space-y-6 w-full"
            variants={itemVariants}
            transition={{ delay: 0.5 }}
          >
            <Motion.div
              className="w-full max-w-sm lg:max-w-md glass-panel rounded-2xl p-6 lg:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">Get Started</h2>

              <div className="space-y-5">
                <NavLink to="/login">
                  <Motion.button
                    className={`btn-primary w-full py-3 lg:py-4`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                  >
                    <span>Login</span>
                    <Motion.span
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      →
                    </Motion.span>
                  </Motion.button>
                </NavLink>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-transparent text-slate-500 text-sm">or</span>
                  </div>
                </div>

                <NavLink to="/requestuser">
                  <Motion.button
                    className="btn-secondary w-full py-3 lg:py-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Request Access</span>
                  </Motion.button>
                </NavLink>

                <NavLink to="/about">
                  <button className="w-full text-center text-sm text-slate-400 hover:text-cyan-300 transition-colors pt-1">
                    Learn more about Rewards Sphere →
                  </button>
                </NavLink>
              </div>
            </Motion.div>
          </Motion.div>
        </div>
      </Motion.main>
    </div>
  );
};

export default HomeLogin;
