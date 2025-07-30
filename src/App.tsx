import { useEffect, useState } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { useAppDispatch } from "./hook/reduxHook";
import { decodeToken } from "./redux/thunk/decodeToken";

function App() {
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string>(
    localStorage.getItem("user-auth")!
  );
  // const token: string | null = localStorage.getItem("user-auth");

  useEffect(() => {
    decodeTokenData();
  }, [token]);

  const decodeTokenData = async () => {
    if (token) {
      await dispatch(decodeToken(token));
    }
  };

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
