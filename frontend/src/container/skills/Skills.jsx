import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import ReactTooltip from "react-tooltip";
import { AppWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./skills.scss";

const Skills = () => {
  // const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // fetch from sanity
    // const queryExperiences = '*[_type == "experiences"]';
    const querySkills = '*[_type == "skills"]';

    // client.fetch(queryExperiences).then((experiences) => {
    //   setExperiences(experiences);
    // });
    client.fetch(querySkills).then((skills) => {
      setSkills(skills);
    });
  });

  return (
    <>
      <h2 className="head-text">Skills & Experience</h2>
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
                // style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>

              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(Skills, "skills");
