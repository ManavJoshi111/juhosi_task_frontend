import "./style.css";
import Login from "./Components/Login";
import Details from "./Components/Details";
import ChangePassword from "./Components/ChangePassword";
import Data from "./Components/Data";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/changepassword/:id" element={<ChangePassword />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/data/:id" element={<Data />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
