import { Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import { useAuth } from "myFirebase";
import Profile from "routes/Profile";
import Navigation from "./Navigation";

const AppRouter = () => {
  const currentUser = useAuth();

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default AppRouter;
