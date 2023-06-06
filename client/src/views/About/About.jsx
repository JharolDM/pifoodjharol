import React, { useEffect, useState } from "react";
import style from "./About.module.css";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`${style.container} ${isVisible ? style.visible : ""}`}>
      {/* Título */}
      <h1 className={`${style.title} ${isVisible ? style.visible : ""}`}>
        Tenemos pereza de trabajar
      </h1>
      {/* Overlay de imagen */}
      <div className={style["image-overlay"]}>
        <img
          src="https://media.tenor.com/KTM4P3IIyb0AAAAC/garfield-lasagna.gif"
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default About;
