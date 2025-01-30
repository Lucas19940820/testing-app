import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./components/UserForm";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { useState } from "react";

function App() {
  const [userDetails, setUserDetails] = useState({});
  const [score, setScore] = useState(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<UserForm setUserDetails={setUserDetails} />}
        />
        <Route path="/quiz" element={<Quiz setScore={setScore} />} />
        <Route
          path="/result"
          element={<Result userDetails={userDetails} score={score} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
