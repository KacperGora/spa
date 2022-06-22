import { useState } from "react";
import { SliderData } from "./dataSlider";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import "./Slider.css";

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const slides = SliderData;

  const length = slides.length;
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  setTimeout(() => {
    nextSlide();
  }, 3000);
  return (
    <section className="slider">
      <FaArrowCircleLeft className="left" onClick={prevSlide} />

      {SliderData.map((slider, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img
                src={slider.image}
                alt="on of slider item"
                className="image"
              />
            )}
          </div>
        );
      })}
      <FaArrowCircleRight className="right" onClick={nextSlide} />
    </section>
  );
};

export default Slider;
