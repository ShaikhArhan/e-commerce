// import { lazy } from "react";

// export const lazys = (factory) => {
//     return lazy(() =>
//         new Promise((resolve) => {
//             setTimeout(() => {
//                 factory().then(resolve);
//             }, 1000); // delay of 1 second
//         })
//     );
// }

import { lazy } from "react";

export const lazys = <T extends React.ComponentType<T>>(
  factory: () => Promise<{ default: T }>
) => {
  return lazy(() => {
    return new Promise<{ default: T }>((resolve) => {
      setTimeout(() => {
        factory().then(resolve);
      }, 1200); // 1.2 second delay
    });
  });
};
