import { ChartBarIcon, UsersIcon } from "lucide-react";
import avatar from "../../assets/avatar.jpg";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "عبدالرحمن العطار",
      role: "Front-End Developer",
      avatar: avatar,
    },
    {
      name: "عمرو الأدغم",
      role: "Back-End Developer",
      avatar: avatar,
    },
    {
      name: "محمد نائل",
      role: "Front-End Developer",
      avatar: avatar,
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* العنوان الرئيسي */}
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-12">
         ai منصة تدريس  
        </h1>

        {/* القسم الأول */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold text-blue-800 mb-6">من نحن؟</h2>
          <p className="text-blue-700 text-lg leading-relaxed mb-8">
            منصة تعليمية مبتكرة تجمع بين الذكاء الاصطناعي والخبرات التعليمية
            لتقديم حلول متكاملة للطلاب. نستخدم 6 بوتات ذكية متخصصة لتحليل
            المحتوى وتقديم الحلول المخصصة لكل طالب.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-100 p-6 rounded-xl">
              <UsersIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                فريق متخصص
              </h3>
              <p className="text-blue-700">
                خبراء في التعليم والتقنية يعملون على تطوير الحلول الأمثل
              </p>
            </div>

            <div className="bg-blue-100 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                تقنية مبتكرة
              </h3>
              <p className="text-blue-700">
                أنظمة ذكاء اصطناعي متطورة لتحليل المحتوى وتقديم الحلول
              </p>
            </div>

            <div className="bg-blue-100 p-6 rounded-xl">
              <ChartBarIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                نتائج مضمونة
              </h3>
              <p className="text-blue-700">
                تحسين أداء الطلاب بنسبة تصل إلى 70% وفق دراساتنا
              </p>
            </div>
          </div>
        </div>

        {/* قسم فريق العمل */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-semibold mb-8 text-center">فريقنا</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((item) => (
              <div key={item.name} className="text-center">
                <img
                  src={item.avatar}
                  alt={`Avatar of ${item.name}`}
                  className="bg-blue-100 h-48 w-48 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl mb-2">
                  <span className="font-semibold">{item.name}</span>
                </h3>
                <p>
                  {" "}
                  <span className="font-semibold">{item.role}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}