import React, { useState } from 'react';

const QuizComponent = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionId, choiceId) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: choiceId }));
  };

  const calculateResults = () => {
    const correctAnswers = questions.filter(
      q => selectedAnswers[q.questionId] === q.rightChoiceId
    ).length;
    
    return {
      total: questions.length,
      correct: correctAnswers,
      percentage: Math.round((correctAnswers / questions.length) * 100)
    };
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length === questions.length) {
      setShowResults(true);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const results = calculateResults();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100">
      {!showResults ? (
        <>
          <div className="space-y-8">
            {questions.map((question) => (
              <div key={question.questionId} className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-4 text-blue-800">
                  Q{question.questionId}: {question.questionName}
                </h3>
                
                <div className="grid gap-2">
                  {question.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => handleAnswerSelect(question.questionId, choice.id)}
                      className={`p-3 rounded-lg text-left transition-all
                        ${selectedAnswers[question.questionId] === choice.id
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-white hover:bg-blue-100 text-gray-700'}
                        border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    >
                      {choice.choiceText}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length !== questions.length}
            className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-xl
              hover:bg-blue-700 transition-colors shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answers
          </button>
        </>
      ) : (
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">📊 Quiz Results</h2>
          
          <div className="bg-blue-50 p-6 rounded-xl mb-8">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {results.percentage}%
            </div>
            <div className="text-lg text-gray-600">
              {results.correct} / {results.total} Correct Answers
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {questions.map((question) => (
              <div key={question.questionId} className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="font-semibold text-blue-600">Q{question.questionId}</div>
                <div className={`text-sm ${selectedAnswers[question.questionId] === question.rightChoiceId 
                  ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedAnswers[question.questionId] === question.rightChoiceId ? '✓' : '✗'}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleRetry}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl
              hover:bg-blue-700 transition-colors shadow-lg"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;