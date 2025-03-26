import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./skills.scss";
import { images } from "../../constants";

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const thisYear = new Date().getFullYear();

  useEffect(() => {
    // fetch from sanity
    const queryExperiences = '*[_type == "experiences"]';
    const querySkills = '*[_type == "skills"]';

    client.fetch(queryExperiences).then((experiences) => {
      // order experiences by year
      experiences.sort((a, b) => b.year - a.year);
      setExperiences(experiences);
    });
    client.fetch(querySkills).then((skills) => {
      setSkills(skills);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        Skills & <span>Experience</span>
      </h2>
      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>

              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="app__skills-exp">
          {experiences.map((experience, index) => (
            <motion.div className="app__skills-exp-item" key={index}>
              <div className="app__skills-exp-year">
                <p className="bold-text">
                  {experience.year}{" "}
                  {experience.year == thisYear ? "(Present)" : ""}
                </p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      key={work.name}
                    >
                      <div
                        data-tooltip-id={work.name}
                        data-tooltip-content={work.desc}
                        className="app__skills-exp-work"
                      >
                        <div className="flex gap-2">
                          <h4 className="bold-text">{work.name}</h4>
                          <img
                            src={images.infoIcon}
                            alt="info-icon"
                            className="w-4"
                          />
                        </div>
                        <p className="p-text">{work.company}</p>
                      </div>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    />
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
