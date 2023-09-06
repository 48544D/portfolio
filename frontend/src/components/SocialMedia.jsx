import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
// import { FaFacebookF } from "react-icons/fa";

const SocialMedia = () => {
  const linkToGit = () => {
    window.open("https://github.com/48544D");
  };

  const linkToLinkedin = () => {
    window.open("https://www.linkedin.com/in/aaraba-haytham-1684a1233/");
  };

  return (
    <div className="app__social">
      <div onClick={linkToGit}>
        <BsGithub />
      </div>
      <div onClick={linkToLinkedin}>
        <BsLinkedin />
      </div>
    </div>
  );
};

export default SocialMedia;
