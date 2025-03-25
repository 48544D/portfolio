import React from "react";
import "./header.scss";
import { AppWrap } from "../../wrapper";
import { motion } from "framer-motion";
import { images } from "../../constants";

const Header = () => {
  const scaleVariants = {
    whileInView: {
      scale: [0, 1],
      opacity: [0, 1],
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row lg:mt-0 mt-28 items-center px-8">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:w-4/5">
          <div className="flex items-center gap-1 md:gap-4">
            <span className="flex text-2xl md:text-4xl justify-center items-center">
              👋
            </span>
            <h1 className="text-3xl md:text-6xl head-text flex justify-center lg:justify-start w-full text-left">
              Hello There, <br className="block lg:hidden" /> I am Haytham
            </h1>
          </div>

          <p className="text-3xl lg:ml-16 text-gray-400">Software Engineer</p>
          <p className="lg:ml-16">
            Full-Stack Engineer skilled in React, Node.js, and modern frameworks
            like Tailwind CSS. Delivered scalable solutions such as a
            Docker-powered MERN stack back-office system, driving architectural
            decisions and end-to-end development. Versatile in Angular, Spring
            Boot, and Laravel.
          </p>
        </div>
      </motion.div>

      <motion.div
        variant={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles w-fit flex"
      >
        {[
          images.react,
          images.laravel,
          images.cpp,
          images.java,
          images.node,
        ].map((circle, index) => (
          <div
            className="circle-cmp rounded-md app__flex"
            key={`circle-${index}`}
          >
            <img src={circle} alt="circle" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, "home");
