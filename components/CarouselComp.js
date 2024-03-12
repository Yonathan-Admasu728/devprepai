import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import styles from "../styles/CarouselComponent.module.css";
import CardWithDots from './techList/CardwithDots';

const CarouselComponent = ({
  techData = [],
  animationDelay = 50,
  renderFrameworkPreview,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animateContent, setAnimateContent] = useState(false);
  const [touchPosition, setTouchPosition] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  const colors = ["orange", "gold", "violet", "purple", "blue", "hotpink", "lightcoral", "brown", "yellow"];

  const carouselRef = useRef(null);
  const animationTimeoutRef = useRef(null);

  useEffect(() => {
    setSelectedThumbnail(techData[currentSlide]);
  }, [currentSlide, techData]);

  const pauseAnimation = useCallback(() => {
    setAnimateContent(false);
    clearTimeout(animationTimeoutRef.current);
  }, []);

  const resumeAnimation = useCallback(() => {
    animationTimeoutRef.current = setTimeout(() => {
      setAnimateContent(true);
    }, 4000); // Resume after 4 seconds of inactivity
  }, []);

  useEffect(() => {
    const handleInteractionStart = (e) => {
      if (e.target.closest(`.${styles.frameworkPreviewContainer}`)) {
        pauseAnimation();
      }
    };

    const handleInteractionEnd = (e) => {
      if (e.target.closest(`.${styles.frameworkPreviewContainer}`)) {
        resumeAnimation();
      }
    };

    const carousel = carouselRef.current;
    carousel.addEventListener('mouseenter', handleInteractionStart);
    carousel.addEventListener('mouseleave', handleInteractionEnd);
    carousel.addEventListener('touchstart', handleInteractionStart);
    carousel.addEventListener('touchend', handleInteractionEnd);

    return () => {
      carousel.removeEventListener('mouseenter', handleInteractionStart);
      carousel.removeEventListener('mouseleave', handleInteractionEnd);
      carousel.removeEventListener('touchstart', handleInteractionStart);
      carousel.removeEventListener('touchend', handleInteractionEnd);
      clearTimeout(animationTimeoutRef.current);
    };
  }, [pauseAnimation, resumeAnimation]);

  const updateThumbnails = useCallback(() => {
    if (animateContent) {
      setCurrentSlide((prev) => (prev + 1) % techData.length);
    }
  }, [techData.length, animateContent]);

  useEffect(() => {
    const interval = setInterval(updateThumbnails, 3000);
    return () => clearInterval(interval);
  }, [updateThumbnails]);

  const changeSlide = useCallback((increment) => {
    setCurrentSlide((prev) => (prev + increment + techData.length) % techData.length);
    setAnimateContent(false);
    setTimeout(() => setAnimateContent(true), animationDelay);
  }, [techData.length, animationDelay]);

  const handleTouchStart = useCallback((e) => {
    setTouchPosition(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (touchPosition != null) {
      const diff = touchPosition - e.touches[0].clientX;
      if (Math.abs(diff) > 5) {
        changeSlide(diff > 0 ? 1 : -1);
        setTouchPosition(null);
      }
    }
  }, [touchPosition, changeSlide]);

  const renderThumbnails = useMemo(() => {
    const thumbnails = [];
    for (let i = 0; i < 4; i++) { // Always want to render four thumbnails
      const techDataIndex = (currentSlide + i) % techData.length;
      const colorIndex = techDataIndex % colors.length;
      const item = techData[techDataIndex];
      const currentColor = colors[colorIndex];
  
      thumbnails.push(
        <div key={`${item.frameworkKey}-${techDataIndex}`} className={styles.thumbnailItem} onClick={() => setCurrentSlide(techDataIndex)}>
          <CardWithDots title={item.frameworkKey} color={currentColor} />
        </div>
      );
    }
    return thumbnails;// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, techData]);

  return (
    <div className={styles.carousel} ref={carouselRef}>
      <div className={styles.thumbnailContainer} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
        {renderThumbnails}
      </div>

      {selectedThumbnail && (
        <div className={`${styles.frameworkPreviewContainer} ${animateContent ? styles.previewContentAnimate : styles.previewContent}`}>
          {renderFrameworkPreview(selectedThumbnail.frameworkKey)}
        </div>
      )}

      <div className={styles.arrows}>
        <button onClick={() => changeSlide(-1)} className={styles.arrowLeft} aria-label="Previous slide">&lt;</button>
        <button onClick={() => changeSlide(1)} className={styles.arrowRight} aria-label="Next slide">&gt;</button>
      </div>

      <div className={styles.time} style={{ width: animateContent ? "0%" : "100%" }}></div>
    </div>
  );
};

export default CarouselComponent;






