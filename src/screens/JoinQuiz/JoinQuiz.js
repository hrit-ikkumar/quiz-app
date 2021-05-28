import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./JoinQuiz.css";

const JoinQuiz = () => {
  const [valid, setValid] = useState("false");
  const [code, setCode] = useState("");

  const handleJoinQuiz = () => {
    if (code.length) setValid("attempt-quiz");
  };
  if (valid !== "false") return <Redirect push to={`/${valid}/${code}`} />;
  return (
    <div id="join-quiz">
      <div id="join-quiz-div">
        <div id="logo-name">
          <b style={{ fontweight: 600 }}>Quiz</b>App
        </div>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          id="q-code"
          type="text"
          placeholder="Enter Quiz Code"
          autoFocus
          onKeyPress={(event) => {
            if (event.key === "Enter") handleJoinQuiz();
          }}
        />
        <button className="join-button" onClick={handleJoinQuiz}>
          Join Quiz
        </button>
      </div>
    </div>
  );
};

export default JoinQuiz;
