import React from 'react';
import { Button } from '@mui/material';
import styles from '../../styles/Hero.module.css';

function Hero({ onGetStarted }) {
  return (
    <section className={styles.container}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>
          Master Your <span className={styles.titleHighlight}>Learning Journey</span>
        </h1>
        <p className={styles.description}>
          Step into a personalized learning arena where each interaction is a step towards mastery. From customizable flashcards to AI-powered interview prep, our app adapts to your evolving needs.
        </p>
        <p className={styles.description}>
          Upload materials, track your progress, and conquer challenges. Start transforming your potential into achievement.
        </p>
        <Button  
          variant="contained"
          className={styles.button}
          onClick={onGetStarted}
          aria-label="Start learning now"
        >
          Start Learning Now
        </Button>
      </div>
      {/* The rightColumn can now be removed or repurposed if needed */}
    </section>
  );
}

export default Hero;
