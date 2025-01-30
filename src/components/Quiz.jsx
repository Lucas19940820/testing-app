import { useState, useEffect } from "react";
import { questions } from "../data/questions";
import { useNavigate } from "react-router-dom";

export default function Quiz({ setScore }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to shuffle the questions and pick 20 randomly
    const shuffleAndSelectQuestions = () => {
      const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
      return shuffledQuestions.slice(0, 20); // Pick the first 20 questions
    };

    setRandomQuestions(shuffleAndSelectQuestions());
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswers([...selectedAnswers, answer]);

    if (currentQuestion < randomQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const correctAnswers = randomQuestions.filter(
        (q, i) => q.answer === selectedAnswers[i]
      ).length;

      const score = Math.round((correctAnswers / randomQuestions.length) * 100);
      setScore(score);
      navigate("/result");
    }
  };

  return (
    <div className="quiz">
      {randomQuestions.length > 0 ? (
        <>
          <h2>{randomQuestions[currentQuestion].question}</h2>
          {randomQuestions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

export { Quiz };
