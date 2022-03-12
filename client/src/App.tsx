import { FunctionComponent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpotifyProvider from "./Services/Spotify";
import UserProvider from "./Services/UserContext";

const Login: FunctionComponent = () => {
  return (
    <button className="py-2 px-4 rounded-md bg-green-600 text-white font-semibold uppercase">
      <a href="http://localhost:8080/auth/login">Log in with spotify</a>
    </button>
  );
};

const App: FunctionComponent = () => {
  return (
    <Router>
      <SpotifyProvider>
        <UserProvider>
          <Routes>
            <Route path="/home" element={<div>Home</div>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </UserProvider>
      </SpotifyProvider>
    </Router>
  );
};

export default App;
