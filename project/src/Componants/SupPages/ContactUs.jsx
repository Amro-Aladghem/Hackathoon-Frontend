export default function ContactUs() {
    return (
      <div className="min-h-screen bg-blue-50" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-blue-900 text-center mb-12">
            تواصل معنا
          </h1>
  
          <div>
            {/* نموذج التواصل يبقى كما هو */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-900 mb-8">
                أرسل رسالة
              </h2>
  
              <form className="space-y-6">
                <div>
                  <label className="block text-blue-900 font-medium mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
  
                <div>
                  <label className="block text-blue-900 font-medium mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
  
                <div>
                  <label className="block text-blue-900 font-medium mb-2">
                    الرسالة
                  </label>
                  <textarea
                    rows="5"
                    className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
  
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                  إرسال الرسالة
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }