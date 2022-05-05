import { Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Profile from "routes/Profile";
import Mobile from "routes/Mobile";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mobile" element={<Mobile />} />
      </Routes>
    </>
  );
};

export default AppRouter;
