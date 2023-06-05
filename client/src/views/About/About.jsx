import React, { useEffect, useState } from "react";
import style from "./About.module.css";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`${style.container} ${isVisible ? style.visible : ""}`}>
      <h1 className={`${style.title} ${isVisible ? style.visible : ""}`}>
        Tenemos pereza de trabajar
      </h1>
    </div>
  );
};

export default About;
