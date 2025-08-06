// // progressContext.tsx
// import React, { createContext, useContext, useState } from "react";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// type ProgressContextType = {
//   progress: number;
//   setProgress: (value: number) => void;
//   resetProgress: () => void;
// };

// const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [progress, setProgressState] = useState(0);

//   const setProgress = (value: number) => {
//     const clamped = Math.min(Math.max(value, 0), 100);
//     setProgressState(clamped);
//     NProgress.set(clamped / 100);
//   };

//   const resetProgress = () => {
//     setProgressState(0);
//     NProgress.done();
//   };

//   return (
//     <ProgressContext.Provider value={{ progress, setProgress, resetProgress }}>
//       {children}
//     </ProgressContext.Provider>
//   );
// };

// export const useProgress = () => {
//   const context = useContext(ProgressContext);
//   if (!context) throw new Error("useProgress must be used within a ProgressProvider");
//   return context;
// };
