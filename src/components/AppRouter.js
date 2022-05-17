import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../routes/Home";
import Profile from "routes/Profile";
import Auth from "routes/Auth";
import Message from "routes/Message";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/message" element={<Message />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default AppRouter;
