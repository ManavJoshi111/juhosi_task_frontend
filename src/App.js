import "./style.css";
import Login from "./Components/Login";
import User from "./Components/User";
import Admin from "./Components/Admin";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user/:ID" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
