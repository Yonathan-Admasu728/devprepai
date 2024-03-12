import React, { useEffect, useRef, useState } from "react";
import { MdCircle } from "react-icons/md";
import dynamic from "next/dynamic";
import styles from "../styles/TechList.module.css";

// Ensure GSAP is dynamically imported
const gsap = dynamic(() => import("gsap"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

// Bounded Component
const Bounded = React.forwardRef(
  ({ as: Comp = "section", className, children, ...restProps }, ref) => {
    const finalClassName = `${styles.bounded} ${styles.boundedMd} ${
      styles.boundedLg
    } ${className || ""}`;
    return (
      <Comp ref={ref} className={finalClassName} {...restProps}>
        <div className={styles.container}>{children}</div>
      </Comp>
    );
  }
);
Bounded.displayName = "Bounded";

// Wrap the Bounded component with React.memo
const BoundedMemo = React.memo(Bounded);
BoundedMemo.displayName = "Bounded";

// Heading Component
const Heading = ({ as: Comp = "h1", className, children, size = "lg" }) => {
  const sizeClass = {
    xl: styles.xl,
    lg: styles.lg,
    md: styles.md,
    sm: styles.sm,
  }[size];
  const finalClassName = `${styles.heading} ${sizeClass} ${className || ""}`;
  return <Comp className={finalClassName}>{children}</Comp>;
};

// Wrap the Heading component with React.memo
const HeadingMemo = React.memo(Heading);

// TechList Component
const TechList = ({ slice }) => {
  const component = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const repetitions = 8;

  useEffect(() => {
    let techRows;
    let gsapAnimations = [];
  
    // Dynamically import GSAP
    import("gsap").then(({ gsap }) => {
      techRows = component.current.querySelectorAll(`.${styles.techRow}`);
  
      // Set initial styles or state
      techRows.forEach((row) => {
        row.style.width = `${slice.items.length * repetitions * 200}px`;
      });
  
      // Define GSAP animations with different directions for odd and even rows
      techRows.forEach((row, index) => {
        // Even rows go right, odd rows go left
        let direction = index % 2 === 0 ? 1 : -1;
        const totalWidth = row.scrollWidth; // Total width of the scrolling content
        const containerWidth = component.current.offsetWidth; // Width of the container
  
        const tl = gsap.timeline({ 
          paused: isPaused, 
          repeat: -1, // Repeat indefinitely
          yoyo: true, // Go back and forth
          onRepeat: () => {
            // Reverse the direction each time the animation repeats
            direction *= -1;
          }
        });
  
        // Move to the end and back to the start
        tl.to(row, {
          x: direction * (totalWidth - containerWidth),
          duration: 60,
          ease: "none",
          force3D: true
        }).to(row, {
          x: 0,
          duration: 60,
          ease: "none",
          force3D: true
        });
  
        gsapAnimations.push(tl);
      });
  
      // Start animations
      gsapAnimations.forEach(tl => tl.play());
  
      // Add event listeners
      techRows.forEach(row => {
        row.addEventListener("mouseenter", () => setIsPaused(true));
        row.addEventListener("mouseleave", () => setIsPaused(false));
  
        row.addEventListener('click', (e) => {
          // Handle click only if it's on a techItem
          if (e.target.matches(`.${styles.techItem}`)) {
            const item = slice.items.find(item => item.tech_name === e.target.textContent);
            handleTechItemClick(item);
          }
        });
  
        row.querySelectorAll(`.${styles.techItem}`).forEach(item => {
          item.addEventListener('focus', () => setIsPaused(true));
          item.addEventListener('blur', () => setIsPaused(false));
        });
      });
    });
  
    // Cleanup function
    return () => {
      // Remove event listeners
      if (techRows) {
        techRows.forEach(row => {
          row.removeEventListener("mouseenter", () => setIsPaused(true));
          row.removeEventListener("mouseleave", () => setIsPaused(false));
  
          row.removeEventListener('click', handleTechItemClick);
  
          row.querySelectorAll(`.${styles.techItem}`).forEach(item => {
            item.removeEventListener('focus', () => setIsPaused(true));
            item.removeEventListener('blur', () => setIsPaused(false));
          });
        });
      }
  
      // Kill GSAP animations
      gsapAnimations.forEach(tl => tl.kill());
    };
  }, [isPaused, slice.items.length, slice.items]); // Removed slice.items from dependencies because it's not used directly in the effect
  
  
  
  
  



  // Function to handle click
  const handleTechItemClick = (item) => {
    setSelectedTech(item);
    setIsPaused(true); // This will pause the animation
  };
  
  

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.wrapper}
      ref={component}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Bounded as="div">
        <Heading size="xl" className={styles.heading} as="h2">
          Find flashcard on any of these topics
        </Heading>
      </Bounded>

      {selectedTech && (
  <div className="techDetails">
    <h3>{selectedTech.tech_name}</h3>
    {/* Render more details here */}
  </div>
)}

      {Array.from({ length: 4 }).map((_, rowIndex) => (
  <div key={rowIndex} className={styles.techRow}>
    {Array.from({ length: repetitions }).map((_, repIndex) => {
      return slice.items.map((item, itemIndex) => {
        // Determine if the item is highlighted or grayed out
        const isHighlighted = repIndex === itemIndex;
        const isGrayedOut = repIndex === itemIndex - 1 || repIndex === itemIndex + 1;

        return (
          <React.Fragment key={`${rowIndex}-${itemIndex}-${repIndex}`}>
            <span
              className={`${styles.techItem} ${isGrayedOut ? styles.grayedOut : ''}`}
              style={{
                color: isHighlighted ? item.tech_color : 'inherit',
              }}
              onClick={() => handleTechItemClick(item)}
            >
              {item.tech_name}
            </span>
            {isHighlighted && (
              <MdCircle
                className={styles.circleIcon}
                style={{ color: item.tech_color }}
              />
            )}
          </React.Fragment>
        );
      });
    })}
  </div>
))}

    </section>
  );
};

// After the TechList component is defined, wrap it with React.memo
const TechListMemo = React.memo(TechList);

export default TechListMemo;
