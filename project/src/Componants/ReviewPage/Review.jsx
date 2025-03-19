import ReviewQuestion from "./ReviewQuestions";
import { useState } from "react";
import axios from 'axios';

const baseURL="https://hackathoonproject-g4hkagbff0gygshm.germanywestcentral-01.azurewebsites.net/api/v1/tools/review"

export function Review()
{
    const [occupationName,setOccupationName] =useState("");
    const [sesstionId,setSessionId] = useState("");
    const [questions,setQuestions] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    async function handleSubmit(e) {
       e.preventDefault();
       if(!occupationName)
       {
        setError("يجب ادخال اسم المهنة");
        return;
       }

       setLoading(true);

       const form = new FormData();
       form.append("OccupationName",occupationName);

       try
       {
            const response = await axios.post(baseURL,form,{
                    header:{
                        'Content-Type': 'multipart/form-data'
                    }
                });
            
            setQuestions([...questions, ...response.data.questions.result]);
            setSessionId(response.data.sessionId);
            setError(null);
       }
       catch
       {
           setError("فشل تحميل الأختبار الرجاء المحاولة مرة أخرى");
       }
       finally
       {
        setLoading(false);
       }
    }


    return (
          
        <div style={{direction:'rtl'}} className="max-w-4xl mx-auto p-6 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl mb-8 border border-blue-100">
        <h2 className="text-2xl font-bold mb-12 text-center text-blue-600">
          ✨ Career Path Review AI ✨<br></br>
         <span className="text-indigo-600"> ✨تحقق اذا كان المجال الدراسي أو المهنة مناسبة لك ام لا✨</span>
        </h2>
        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            اسم المهنة أو المجال الدراسي
          </label>
          <input
            type="text"
            value={occupationName}
            onChange={(e) =>setOccupationName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading||questions.length>0}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl 
            hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              </svg>
              Generating...
            </span>
          ) : 'بدء الأختبار'}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}
      </form>

      {questions.length > 0 && <ReviewQuestion questions={questions} occupationName={occupationName} SessionId={sesstionId} />}
    </div>

    );
}

export default Review;