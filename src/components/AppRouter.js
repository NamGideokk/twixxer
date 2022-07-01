import { Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Profile from "routes/Profile";
import Auth from "routes/Auth/Auth";
import Message from "routes/Message";
import Bookmark from "routes/Bookmark";
import Preparation from "common/preperation/Preparation";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/explore" element={<Preparation />} />
        <Route path="/notifications" element={<Preparation />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/bookmarks" element={<Bookmark />} />
        <Route path="/lists" element={<Preparation />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default AppRouter;
