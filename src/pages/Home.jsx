import React from 'react';
import NavBar from '../components/NavBar';

const AboutMe = () => (
  <section className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 mt-8 flex flex-col items-center gap-6">
    <div className="flex flex-col md:flex-row items-center gap-8 w-full">
      {/* Profile Image */}
      <div className="flex flex-col items-center md:w-1/3">
        <img
          src="https://ui-avatars.com/api/?name=Teja&background=6D28D9&color=fff&size=128"
          alt="Teja"
          className="w-28 h-28 rounded-full border-4 border-purple-400 object-cover mb-2"
        />
        <h3 className="text-xl font-bold text-center mb-1">Teja</h3>
        <p className="text-purple-500 font-medium mb-2">Software Engineer</p>
        <div className="text-center text-sm text-gray-600">
          <p>Chennai, India</p>
          <p>teja@email.com</p>
          <p>+91 9876543210</p>
        </div>
      </div>
      {/* About Info */}
      <div className="md:w-2/3 w-full flex flex-col gap-3">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mb-2">
          About Me/About Insight Hub
        </h2>
        <p className="text-gray-700">
          Hi! I'm Teja, a passionate Software Engineer working on the Insight Hub project. I love building scalable web applications and solving real-world problems with technology. My expertise includes React, Node.js, and cloud technologies.
        </p>
        <div className="flex flex-wrap gap-3 mt-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">React</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Node.js</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">AWS</span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">JavaScript</span>
        </div>
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <div className='flex flex-col gap-5'>
      {/* NavBar component */}
      <NavBar />
      <AboutMe />
    </div>
  );
};

export default Home;