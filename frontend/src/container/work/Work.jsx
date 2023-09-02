import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import ReactPaginate from "react-paginate";

import "./work.scss";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [animateWorkItem, setAnimateWorkItem] = useState({ opacity: 1 });
  const [works, setWorks] = useState([]);
  const [tags, setTags] = useState([]);
  const [filterWorks, setFilterWorks] = useState([]);
  const itemsPerPage = 3;

  useEffect(() => {
    const query = '*[_type == "works"]';
    client.fetch(query).then((works) => {
      setWorks(works);
      setFilterWorks(works);
    });
    client.fetch('*[_type == "works"]{tags}').then((tags) => {
      // merge all tags and set all as the first item
      const mergeTags = [].concat.apply(
        [],
        tags.map((tag) => tag.tags)
      );
      mergeTags.unshift("All");
      // remove duplicate tags
      const uniqueTags = [...new Set(mergeTags)];
      setTags(uniqueTags);
    });
  }, []);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filterWorks.length;

    setAnimateWorkItem({ opacity: 0 });
    setTimeout(() => {
      setAnimateWorkItem({ opacity: 1 });
      setItemOffset(newOffset);
      console.log(itemOffset);
    }, 300);
  };

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setItemOffset(0);
      setAnimateCard({ y: 0, opacity: 1 });
      // selecting the first page in pagination
      document.querySelector(".pagination > li:nth-child(2) > a").click();

      if (item === "All") {
        setFilterWorks(works);
      } else {
        setFilterWorks(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  // function to manually trigger the a tag when li is clicked since react-paginate doesn't support li click
  const liClick = () => {
    // getting all li tags of the pagination
    const paginationLi = document.querySelectorAll(".pagination > li");

    // if li is clicked, trigger the a tag
    paginationLi.forEach((li) => {
      li.addEventListener("click", () => {
        li.querySelector("a").click();
      });
    });
  };

  liClick();

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filterWorks.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filterWorks.length / itemsPerPage);

  return (
    <>
      <h2 className="head-text">
        My <span>CodeCrafted</span> Creations
      </h2>

      <div className="app__work-filter">
        {tags.map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item ? "item-active" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5 }}
        className="app__work-portfolio"
      >
        <div className="app__work-portfolio-items">
          {currentItems &&
            currentItems.map((item, index) => (
              <motion.div
                animate={animateWorkItem}
                transition={{ duration: 0.3 }}
                className="app__work-item app__flex"
                key={index}
              >
                <div className="app__work-img app__flex">
                  <img src={urlFor(item.imgUrl)} alt={item.title} />

                  <motion.div
                    whileHover={{ opacity: [0, 1] }}
                    transition={{
                      duration: 0.25,
                      ease: "easeInOut",
                      staggerChildren: 0.5,
                    }}
                    className="app__work-hover app__flex"
                  >
                    <a href={item.projectLink} target="_blank" rel="noreferrer">
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.1 }}
                        className="app__flex"
                      >
                        <AiFillEye />
                      </motion.div>
                    </a>
                    <a href={item.codeLink} target="_blank" rel="noreferrer">
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.1 }}
                        className="app__flex"
                      >
                        <AiFillGithub />
                      </motion.div>
                    </a>
                  </motion.div>
                </div>

                <div className="app__work-content app__flex">
                  <h4 className="bold-text">{item.title}</h4>
                  <p className="p-text" style={{ marginTop: 10 }}>
                    {item.description}
                  </p>

                  <div className="app__work-tag app__flex">
                    <p className="p-text">{item.tags[0]}</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          containerClassName={"pagination"}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </motion.div>
    </>
  );
};

export default AppWrap(Work, "work");
