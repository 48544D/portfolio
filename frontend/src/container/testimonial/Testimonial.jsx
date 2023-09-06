import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";

import "./testimonial.scss";

const Testimonial = () => {
  const [brands, setBrands] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    // fetch from sanity
    const queryTestitemonials = '*[_type == "testimonials"]';
    const queryBrands = '*[_type == "brands"]';

    client.fetch(queryTestitemonials).then((data) => {
      setTestimonials(data);
    });
    client.fetch(queryBrands).then((data) => {
      setBrands(data);
    });
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <>
      <h2 className="head-text">Testimonials</h2>

      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={urlFor(currentTestimonial.imageUrl)} alt="testimonial" />
            <div className="app__testimonial-content">
              <motion.p
                whileInView={{ x: [-100, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5, type: "tween" }}
                className="p-text"
              >
                {currentTestimonial.feedback}
              </motion.p>
              <div>
                <h4 className="bold-text">{currentTestimonial.name}</h4>
                <h5 className="p-text">{currentTestimonial.company}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonials"),
  "testimonials",
  "app__primarybg"
);
