import AppRouter from "./AppRouter";
import { useState } from "react";
import { authService } from "myFirebase";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
