import React, { useEffect, useState } from "react";
import "./LoadingBar.css";

export const LoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let interval: number;

    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.floor(Math.random() * 40) + 5;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsVisible(false), 300);
            return 100;
          }
          return next;
        });
      }, 150);
    }

    return () => clearInterval(interval);
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div className="loading-container">
      <div className="pixel-loader-container">
        <div className="pixel-text">LOADING</div>
        <div className="pixel-bar-wrapper">
          <div className="pixel-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="pixel-text">{progress}%</div>
      </div>
    </div>
  );
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import "./LoadingBar.css";
// import { useProgress } from "../../context/progressContext";

// export const LoadingBar = () => {
//     const { progress } = useProgress();

//   if (progress >= 100) return null;

//   return (
//     <div className="pixel-loader-container" style={{position:"absolute"}}>
//       <div className="pixel-text">LOADING</div>
//       <div className="pixel-bar-wrapper">
//         <div className="pixel-bar" style={{ width: `${progress}%` }} />
//       </div>
//       <div className="pixel-text">{progress}%</div>
//     </div>
//   );
// };
