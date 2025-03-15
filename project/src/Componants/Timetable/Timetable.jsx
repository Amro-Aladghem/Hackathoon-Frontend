import { useState } from 'react';

const Timetable = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!uploadedFile) {
      setError('الرجاء اختيار ملف أولاً');
      return;
    }
    if (!startDate || !startTime || !endDate || !endTime) {
      setError('الرجاء تحديد تاريخ ووقت البداية والنهاية');
      return;
    }

    setError('');
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('DateOfStart', startDate);
      formData.append('TimeOfStart', startTime);
      formData.append('DateOfEnd', endDate);
      formData.append('TimeOfEnd', endTime);
      formData.append('file', uploadedFile);

      const response = await fetch(
        'https://hackathoonproject-g4hkagbff0gygshm.germanywestcentral-01.azurewebsites.net/api/v1/tools/timetable',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('فشل في إنشاء الجدول');
      }

      const data = await response.json();
      setHtmlCode(data.htmlCode);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setError('');
    }
  };


  const createPreviewUrl = () => {
    if (!htmlCode) return '';
    const blob = new Blob([htmlCode], { type: 'text/html' });
    return URL.createObjectURL(blob);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
        {/* العنوان الرئيسي */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              AI Timetable Generator
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            ارفع ملفك وحدد الأوقات لإنشاء جدول دراسي ذكي
          </p>
        </div>

        {/* نموذج الإدخال */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* حقل اختيار الملف */}
          <div className="space-y-4">
            <label className="group relative cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
              
              <div className={`relative h-32 transition-all duration-300 ${
                isUploading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02]'
              }`}>
                <div className={`absolute inset-0 flex items-center justify-center rounded-xl border-2 border-dashed ${
                  uploadedFile ? 'border-green-100 bg-green-50' : 
                  isUploading ? 'border-gray-200 bg-gray-100' : 
                  'border-blue-100 bg-blue-50 group-hover:border-blue-300'
                }`}>
                  {!isUploading && !uploadedFile && (
                    <div className="flex flex-col items-center space-y-2 p-4">
                      <div className="p-3 bg-white rounded-full shadow-lg">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-gray-700">اضغط لرفع الملف</p>
                        <p className="text-sm text-gray-500">(PDF, DOC, TXT)</p>
                      </div>
                    </div>
                  )}

                  {uploadedFile && !isUploading && (
                    <div className="flex flex-col items-center space-y-2 p-4">
                      <div className="p-3 bg-white rounded-full shadow-lg">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <p className="font-medium text-gray-700">الملف جاهز للتحويل</p>
                    </div>
                  )}
                </div>
              </div>
            </label>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>

          {/* حقول تحديد الوقت */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">تاريخ البداية</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isUploading}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">وقت البداية</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isUploading}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">تاريخ النهاية</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isUploading}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">وقت النهاية</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isUploading}
              />
            </div>
          </div>

          {/* زر الإرسال */}
          <button
            type="submit"
            disabled={isUploading}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${
              isUploading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
            }`}
          >
            {isUploading ? 'جاري الإنشاء...' : 'إنشاء الجدول الذكي'}
          </button>
        </form>

        {/* نتائج الجدول */}
        {htmlCode && (
          <div className="space-y-4">
            <div className="text-center bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">الجدول الزمني المولد</h3>
              <iframe 
                src={createPreviewUrl()}
                className="w-full h-96 border rounded-lg"
                title="Generated Timetable"
              />
              <a
                href={createPreviewUrl()}
                download="timetable.html"
                className="mt-4 inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                تحميل الجدول
              </a>
            </div>
          </div>
        )}

        {/* المميزات */}
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <svg className="w-6 h-6 mx-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3 className="mt-2 font-medium">دقة عالية</h3>
            <p className="text-sm text-gray-600">تحويل ذكي باستخدام أحدث نماذج الذكاء الاصطناعي</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <svg className="w-6 h-6 mx-auto text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <h3 className="mt-2 font-medium">آمن تماماً</h3>
            <p className="text-sm text-gray-600">جميع الملفات محذوفة تلقائياً بعد التحويل</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <svg className="w-6 h-6 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <h3 className="mt-2 font-medium">سرعة فائقة</h3>
            <p className="text-sm text-gray-600">معالجة الملفات خلال ثوانٍ معدودة</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;