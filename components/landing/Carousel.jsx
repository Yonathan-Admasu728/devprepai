import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../styles/Carousel.module.css";
import TestimonialCard from "./TestimonialCard";

const TestimonialCarousel = ({ testimonials }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "100px",
    beforeChange: (current, next) => setActiveSlide(next),
    customPaging: function (i) {
      return (
        <button>
          <span className={i === activeSlide ? styles.dotActive : styles.dot}></span>
        </button>
      );
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: false,
        },
      },
    ],
  };

  const getSlideClass = (index) =>
    index === activeSlide
      ? `${styles.slide} ${styles.activeSlide}`
      : styles.slide;

  return (
    <div className={styles.carouselWrapper}>
      <h1>Hear it from your peers</h1>
      <span>Join the ranks of satisfied users who have achieved their goals with DevPrepAI. Your journey to success starts here.</span>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.id} className={getSlideClass(index)}>
            <TestimonialCard
              isActive={index === activeSlide}
              avatar={testimonial.profileImage}
              name={testimonial.authorName}
              role={testimonial.authorRole}
              content={testimonial.content}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialCarousel;
