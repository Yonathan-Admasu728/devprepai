import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleUp, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Feature.module.css';
import Button from '@mui/material/Button';
import Image from 'next/image';

const Features = () => {
  const [showMore, setShowMore] = useState(false);
  const featureRef = useRef(null);

  const handleLearnMoreClick = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('featureItemInView');
          }
        });
      },
      { threshold: 0.5 } // Trigger when at least 50% of the item is visible
    );
      // Observing each feature item
      const featureElements = featureRef.current.children;
      Array.from(featureElements).forEach((elem) => observer.observe(elem));
  
      // Cleanup observer on unmount
      return () => observer.disconnect();
    }, []);

  const featureData = [
    {
      id: 1,
      title: 'Interactive Learning',
      description:
        'Engage with your studies through our Interactive Flashcards, transforming learning into a dynamic experience.',
      imgSrc: '/asset3 (1).png',
    },
    {
      id: 2,
      title: 'Seamless Integration',
      description:
        'Our Smart Document Conversion effortlessly turns your resources into a streamlined learning journey.',
      imgSrc: '/hw.png',
    },
    {
      id: 3,
      title: 'Realistic Simulations',
      description:
        'Experience AI-Powered Interviews that prepare you for real-world scenarios, enhancing your success.',
      imgSrc: '/world-codingwbg.png',
    },
    {
      id: 4,
      title: 'Adaptive Testing',
      description:
        'Test your knowledge with Dynamic Quizzes, tailored to match your personal learning curve.',
      imgSrc: '/high.png',
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.featureSection}>
          <div className={styles.background}></div>
          <h2 className={styles.title}>
            <span className={styles.keyColor}>Key </span>Features
          </h2>
          <p className={styles.description}>
            Power up your learning experience with tools designed for success.
          </p>
          <div className={styles.featuresGrid} ref={featureRef}>
            {featureData.map((feature, index) => (
              <div key={feature.id}  className={`${styles.featureItem} ${index % 2 === 0 ? 'featureItemLeft' : 'featureItemRight'}`}>
                <Image
                  src={feature.imgSrc}
                  alt={feature.title}
                  layout="responsive"
                  objectFit="contain"
                  width={500}
                  height={300}
                />
                <div className={styles.featureContent}>
                  <FontAwesomeIcon icon={faCheckCircle} className={styles.checkIcon} />
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <div className={styles.learnMore} onClick={handleLearnMoreClick}>
            {showMore ? 'Show Less' : 'Learn More'}
            <FontAwesomeIcon
              icon={showMore ? faAngleUp : faAngleRight}
              className={styles.learnMoreIcon}
            />
          </div> */}
        </div>
        <div className={styles.ctaButtonContainer}>
          <Button variant="contained" className={styles.ctaButton}>
            Get Started Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default Features;

