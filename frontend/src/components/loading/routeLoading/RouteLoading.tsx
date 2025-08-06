// import { useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";

// export const RouteLoading = () => {
//   const location = useLocation();
//   const prevPath = useRef(location.pathname);

//   useEffect(() => {
//     if (prevPath.current !== location.pathname) {
//       NProgress.configure({ showSpinne: false });
//       NProgress.start();
// NProgress.set(0.1);
//       // This allows time for new route components to mount
//       const doneTimer = setTimeout(() => {
//         NProgress.done();
//       }, 500); // can be adjusted or dynamically tied to actual loading

//       prevPath.current = location.pathname;
//       return () => clearTimeout(doneTimer);
//     }
//   }, [location]);

//   return null;
// };

// components/NProgressHandler.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

export const RouteLoading = () => {
  const location = useLocation();
  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    NProgress.start();

    // Slight delay to simulate loading
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [location.pathname]);

  return null;
};
