import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.ts";
// import { ProgressProvider } from "./context/progressContext.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <ProgressProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </ProgressProvider> */}
  </Provider>
);
