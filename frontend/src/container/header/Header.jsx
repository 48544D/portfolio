import React, { useState, useEffect } from "react";
import "./header.scss";
import { AppWrap } from "../../wrapper";
import { motion } from "framer-motion";
import { images } from "../../constants";
import { ComputerCanvas } from "../../components/canvas";

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

  const [showComputer, setShowComputer] = useState(false);

  // show computer canvas after 1s
  useEffect(() => {
    setTimeout(() => {
      setShowComputer(true);
    }, 1100);

    return () => {
      setShowComputer(false);
    };
  }, []);

  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello there, I am</p>
              <h1 className="head-text">Haytham</h1>
            </div>
          </div>

          <div className="tag-cmp app__flex">
            <p className="p-text">Web Developer</p>
            <p className="p-text">Software Engineer</p>
            <p className="p-text">Computer Science Student</p>
          </div>
        </div>
      </motion.div>

      <div className="app__header-img">
        {showComputer && <ComputerCanvas />}
      </div>

      <motion.div
        variant={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {[images.react, images.laravel, images.cpp].map((circle, index) => (
          <div className="circle-cmp app__flex" key={`circle-${index}`}>
            <img src={circle} alt="circle" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, "home");
