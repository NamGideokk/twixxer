import AppRouter from "./AppRouter";
import { LanguageContext } from "context/LanguageContext";
import { useState } from "react";

function App() {
  const [isKor, setIsKor] = useState(true);

  return (
    <>
      <LanguageContext.Provider value={{ isKor, setIsKor }}>
        <AppRouter />
      </LanguageContext.Provider>
    </>
  );
}

export default App;
