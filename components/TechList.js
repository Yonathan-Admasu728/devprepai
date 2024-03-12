// import React, { useState } from 'react';
// import styles from '../styles/TechList.module.css';

// const TechList = ({ slice }) => {
//   const [selectedTech, setSelectedTech] = useState(null);

//   const handleTechItemClick = (item) => {
//     setSelectedTech(item);
//   };

//   return (
//     <section className={styles.techListContainer}>
//       {/* Display the selected tech name if any */}
//       {selectedTech && (
//         <h3 className={styles.selectedTechName}>{selectedTech.tech_name}</h3>
//       )}

//       {/* Scrollable container for the first row */}
//       <div className={styles.scrollableContainer}>
//         <div className={styles.scrollableRowRight}>
//           {slice.items.map((item, index) => (
//             <span
//               key={`tech-right-${index}`}
//               className={`${styles.techItem} ${styles.techRowRight} ${selectedTech === item ? styles.techItemSelected : ''}`}
//               onClick={() => handleTechItemClick(item)}
//               tabIndex={0}
//             >
//               {item.tech_name}
//             </span>
//           ))}
//         </div>
//       </div>
      
//       {/* Scrollable container for the second row */}
//       <div className={styles.scrollableContainer}>
//         <div className={styles.scrollableRowLeft}>
//           {slice.items.map((item, index) => (
//             <span
//               key={`tech-left-${index}`}
//               className={`${styles.techItem} ${styles.techRowLeft} ${selectedTech === item ? styles.techItemSelected : ''}`}
//               onClick={() => handleTechItemClick(item)}
//               tabIndex={0}
//             >
//               {item.tech_name}
//             </span>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default React.memo(TechList);



// import React, { useEffect, useState } from 'react';
// import techNames from '../components/techList/model.json'; 
// import styles from '../styles/InfiniteScroll.module.css';

// const InfiniteScroll = () => {
//     const [isReducedMotion, setIsReducedMotion] = useState(false);

//     useEffect(() => {
//         setIsReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
//     }, []);

//     useEffect(() => {
//         if (!isReducedMotion) {
//             document.querySelectorAll(`.${styles.scroller}`).forEach((scroller) => {
//                 scroller.dataset.animated = true;
//                 const scrollerInner = scroller.querySelector(`.${styles.scrollerInner}`);
//                 Array.from(scrollerInner.children).forEach((item) => {
//                     const duplicatedItem = item.cloneNode(true);
//                     duplicatedItem.setAttribute("aria-hidden", true);
//                     scrollerInner.appendChild(duplicatedItem);
//                 });
//             });
//         }
//     }, [isReducedMotion]);

//     return (
//             <>
//                 <h1 className={styles.center}>Infinite Scroll Animation</h1>
//                 <div className={`${styles.scroller} ${styles.fast}`} data-speed="fast">
//                     <div className={styles.scrollerInner}>
//                         {/* Iterate over the techNames array and create span elements */}
//                         {techNames.map((techName, index) => (
//                             <span key={index} className={styles.techItem}>
//                                 {techName}
//                             </span>
//                         ))}
//                     </div>
//                 </div>
//             </>
//         );
//         };
        
//         export default InfiniteScroll;

import React, { useEffect, useRef, useState } from 'react';
import techNames from '../components/techList/model.json';
import styles from '../styles/InfiniteScroll.module.css';

const InfiniteScroll = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const scrollerRefLeft = useRef(null);
  const scrollerRefRight = useRef(null);

  useEffect(() => {
    if (!isReducedMotion) {
      setupScrolling(scrollerRefLeft.current, styles.scrollToLeft, 'left');
      setupScrolling(scrollerRefRight.current, styles.scrollToRight, 'right');
    }
  }, [isReducedMotion]);
  
  const setupScrolling = (scroller, animationClass, direction) => {
    if (scroller) {
      // Calculate the width of all items and duplicate them
      let totalWidth = 0;
      const items = Array.from(scroller.children);
      items.forEach(item => {
        totalWidth += item.offsetWidth;
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        scroller.appendChild(clone);
      });
      scroller.style.width = `${totalWidth * 2}px`;
  
      // Apply the scrolling animation
      scroller.classList.add(animationClass);
    }
  };
   // Function to render scrolling items
   const renderItems = () => techNames.map((techName, index) => (
    <span key={index} className={styles.techItem}>
      {techName}
    </span>
  ));

  return (
    <>
      <h1 className={styles.center}>Infinite Scroll Animation</h1>

      <div className={styles.scrollerContainer}> {/* Updated container */}
        <div className={styles.scroller} data-speed="fast">
          <div className={`${styles.scrollerInner} ${styles.scrollToLeft}`} ref={scrollerRefLeft}>
            {renderItems()}
          </div>
        </div>

        {/* Faux Scrollbar */}
        <div className={styles.fauxScrollbar} />

        <div className={styles.scroller} data-speed="fast">
          <div className={`${styles.scrollerInner} ${styles.scrollToRight}`} ref={scrollerRefRight}>
            {renderItems()}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll;





