import { Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import { useAuth } from "myFirebase";
import Profile from "routes/Profile";

const AppRouter = () => {
  const currentUser = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default AppRouter;
