import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Button from "./Mic-button";
import Image from "next/image";
import styles from "../styles/Interview.module.css";
import MyComponent from "./InterviewiewIsOn";

const InterviewSection = () => {
  const [showMyComponent, setShowMyComponent] = useState(false);

  const handleButtonClick = () => {
    setShowMyComponent(true);
  };

  const handleExit = () => {
    setShowMyComponent(false);
  };

  if (showMyComponent) {
    return <MyComponent handleExit={handleExit} />;
  }

//   return (
//     <div className={styles.container}>
//       <div className={styles.content}>
//         <div className={styles.leftColumn}>
//           <div className={styles.middleHeader}>
//             <div className={styles.middleTitle}>
//               Ace Your Interviews with AI
//             </div>
//             <div className={styles.middleDescription}>
//               Immerse into a revolutionary interview experience powered by AI. Get
//               real-time feedback, sharpen your skills, and stand out in your
//               next interview.
//             </div>
//             <div className={styles.welcomeMessage}>
//               <span style={{ color: "#c7c7c7", fontWeight: "bold" }}>
//                 Say Hello to your new
//               </span>{" "}
//               interview companion!
//             </div>

//             <div className={styles.middleButtonContainer}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleButtonClick}
//             style={{
//               padding: "10px 20px",
//               fontSize: "16px",
//               borderRadius: "50%",
//               transition: "all 0.3s ease",
//             }}
//           >
//             Start Interview
//           </Button>
//         </div>
//           </div>
//         </div>
//         <div className={styles.rightColumn}>
//           <Image
//             className={styles.desktopImage}
//             loading="lazy"
//             src="/bot2.png"
//             alt="Interview AI Bot"
//             width={300}
//             height={400}
//           />
//         </div>
//       </div>
//       {showMyComponent && <MyComponent handleExit={handleExit} />}
//     </div>
//   );
// };

return (
  <div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.leftColumn}>
        <div className={styles.middleHeader}>
          <div className={styles.middleTitle}>
            Ace Your Interviews with AI
          </div>
          <div className={styles.middleDescription}>
            Immerse into a revolutionary interview experience powered by AI. Get
            real-time feedback, sharpen your skills, and stand out in your
            next interview.
          </div>
          <div className={styles.welcomeMessage}>
            <span>Say Hello to your new interview companion!</span>
          </div>
          <div className={styles.middleButtonContainer}>
            <button className={styles.button} onClick={handleButtonClick}>
              Start Interview
            </button>
          </div>
        </div>
      </div>
      {/* Remove the rightColumn div and its contents */}
    </div>
    {showMyComponent && <MyComponent handleExit={handleExit} />}
  </div>
);
};

export default InterviewSection;


