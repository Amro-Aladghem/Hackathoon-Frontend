import { useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_FUTURE_JOB_API;

export function ReviewQuestion({ questions, occupationName, SessionId }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState({ percentage: -1, message: "" });
  const [error, setError] = useState(false);

  const handleAnswerSelect = (questionId, choiceId) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
  };

  const handleSubmit = async () => {
    if (Object.keys(selectedAnswers).length === questions.length) {
      fetchResult();
    }
  };

  async function fetchResult() {
    setLoading(true);

    const questionsAnswers = Object.entries(selectedAnswers).map(
      ([questionId, choiceId]) => {
        let result = choiceId == 1 ? true : false;
        return {
          questionNumber: questionId,
          result: result,
        };
      }
    );

    try {
      const response = await axios.post(
        baseURL,
        {
          occupationName: occupationName,
          sessionId: SessionId,
          questions: questionsAnswers,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let percentage = response.data.reviewResult.result.suitablePercentage;
      const numericPercentage = parseInt(percentage.replace("%", ""), 10);

      setResult({
        ...result,
        percentage: numericPercentage,
        message: response.data.reviewResult.result.additionalNote,
      });

      setShowResults(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-blue-100">
      {isLoading ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <p>فشل التحميل</p>
      ) : !showResults ? (
        <>
          <div className="space-y-8">
            {questions.map((questionEntity) => (
              <div
                key={questionEntity.questionId}
                className="bg-blue-50 p-6 rounded-xl"
              >
                <h3 className="text-lg font-bold mb-4 text-blue-800">
                  Q{questionEntity.questionId}: {questionEntity.question}
                </h3>

                <div className="grid gap-2">
                  {questionEntity.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() =>
                        handleAnswerSelect(questionEntity.questionId, choice.id)
                      }
                      className={`p-3 rounded-lg text-left transition-all
                            ${
                              selectedAnswers[questionEntity.questionId] ===
                              choice.id
                                ? "bg-blue-500 text-white shadow-md"
                                : "bg-white hover:bg-blue-100 text-gray-700"
                            }
                            border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    >
                      {choice.id == 1 ? "نعم" : "لا"}
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
        <>
          <div className="flex justify-center w-full">
            <div className="relative size-40 ">
              <svg
                className="rotate-[135deg] size-full"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className={`stroke-current  ${
                    result.percentage >= 50 ? "text-green-200" : "text-red-500"
                  }`}
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray={`${result.percentage} 100`}
                ></circle>

                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className={`stroke-current  ${
                    result.percentage >= 50
                      ? " text-green-500 "
                      : " text-red-500"
                  } `}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${
                    (result.percentage / 100) * 100.53096
                  } 100`}
                ></circle>
              </svg>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span
                  className={`text-4xl font-bold ${
                    result.percentage >= 50 ? "text-green-500 " : "text-red-500"
                  }`}
                >
                  {result.percentage}
                </span>
                <span
                  className={`${
                    result.percentage >= 50 ? "text-green-500 " : "text-red-500"
                  }  block`}
                >
                  نسبة الملائمة
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <h2>{result.message}</h2>
          </div>
        </>
      )}
    </div>
  );
}

export default ReviewQuestion;
