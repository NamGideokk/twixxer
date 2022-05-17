import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../routes/Home";
import Profile from "routes/Profile";
import Auth from "routes/Auth";
import Message from "routes/Message";
import Bookmark from "routes/Bookmark";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/bookmarks" element={<Bookmark />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default AppRouter;
