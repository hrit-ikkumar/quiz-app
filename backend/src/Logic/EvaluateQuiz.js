const EvaluateQuiz = (quizQuestions, attemptedQuestions) => {
  let score = 0;
  attemptedQuestions.forEach((question) => {
    const realQues = quizQuestions.find((x) => x.id === question.id);
    const correctOptions = realQues.options.filter((op) => op.isCorrect);
    // Error for Quiz with no correct answers
    if (correctOptions.length < 1) return 0;

    const attemptedOptions = question.selectedOptions;
    if (realQues.optionType === "check") {
      const weightage = 1 / correctOptions.length;
      let qScore = 0;
      if (correctOptions.length < question.selectedOptions.length) {
        qScore -=
          (question.selectedOptions.length - correctOptions.length) * weightage;
      }
      question.selectedOptions.forEach((selectedOp) => {
        const correct = correctOptions.find((op) => op.text === selectedOp);
        if (correct !== undefined) qScore += weightage;
      });
      qScore < 0 ? (score += 0) : (score += qScore);
      console.log("Score : ", score);
    } else if (realQues.optionType === "radio") {
      if (correctOptions[0].text === attemptedOptions[0]) {
        score++;
      }
    }
  });
  return score === 0 ? score : score.toFixed(2);
};

module.exports = EvaluateQuiz;
