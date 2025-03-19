import { Book, BrainCircuit, Calendar, GraduationCap } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Book,
      title: "رفع الملفات",
      description: "قم برفع ملفات PDF والصور الخاصة بك",
    },
    {
      icon: BrainCircuit,
      title: "تحليل المحتوى",
      description: "سيقوم البوت بتحليل النصوص والصور بدقة",
    },
    {
      icon: GraduationCap,
      title: "تلقي الحلول",
      description: "احصل على إجابات متخصصة لكل مادة دراسية",
    },
    {
      icon: Calendar,
      title: "تنظيم الجدول",
      description: "استلم جدول دراسي مخصص بناءً على تحليل البوت",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-12">
          طريقة عمل المنصة
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              {step.icon && (
                <step.icon className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              )}
              <h3 className="text-xl font-bold text-blue-900 text-center mb-3">
                {step.title}
              </h3>
              <p className="text-blue-700 text-center">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg" dir="rtl">
          <h2 className="text-3xl font-semibold text-blue-900 mb-8">
            كيف نضمن نجاحك؟
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900">
                  تحليل دقيق للمحتوى
                </h3>
                <p className="text-blue-700">
                  نستخدم بوتات متخصصة لتحليل محتوى PDF بدقة عالية تصل إلى 98%،
                  مما يتيح لنا تحديد المحتوى الأهم واستخلاصه في جداول دراسية
                  منظمة.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900">
                  جداول دراسية ذكية
                </h3>
                <p className="text-blue-700">
                  بناء جداول دراسية بناءً على أولوياتك وأدائك
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900">
                  دعم متخصص
                </h3>
                <p className="text-blue-700">
                  إجابات دقيقة من بوتات متخصصة في كل مادة
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}