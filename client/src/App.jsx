import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import DeleteUser from "./pages/DeleteUser";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>
        <Route path="/delete" element={<DeleteUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
