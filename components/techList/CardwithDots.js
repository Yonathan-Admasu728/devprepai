// CardWithDots.js
import styles from '../../styles/CardWithDots.module.css';

const CardWithDots = ({ title, color }) => {
    const gridSize = 12;
    const minSize = 1;
    const maxSize = 8;
  
    let dots = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const distanceFromCenterRow = Math.abs(row - (gridSize / 2 - 0.5));
        const distanceFromCenterCol = Math.abs(col - (gridSize / 2 - 0.5));
        const distanceFromCenter = Math.sqrt(distanceFromCenterRow ** 2 + distanceFromCenterCol ** 2);
  
        const normalizedDistance = distanceFromCenter / (gridSize / 2 * Math.sqrt(2));
        const size = maxSize - (normalizedDistance * (maxSize - minSize));
  
        dots.push(
          <div
            key={`row-${row}-dot-${col}`}
            className={styles.dot}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color, // Apply color to dots
            }}
          />
        );
      }
    }
    return (
        <div className={styles.card}>
         <h1 className={styles.title} style={{ color }}>{title}</h1>
          <div className={styles.grid}>
            {dots} {/* Render the dots array directly */}
          </div>
        </div>
      );
    };


  
  export default CardWithDots;
  