import React from "react";
import {
  Book,
  BookOpen,
  BrainCircuit,
  Calculator,
  Star,
  Users,
} from "lucide-react";

export default function Home() {
  return (
    <div className="container px-4 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">المساعد الأكاديمي الذكي</h1>
          <p className="text-xl mb-6">
            استخدم الذكاء الاصطناعي لتحسين دراستك وفهم المواد العلمية بشكل أفضل
          </p>
          <div className="flex justify-center space-x-8 mb-6">
            <div className="flex flex-col items-center">
              <BookOpen className="w-8 h-8 mb-2" />
              <span>تحليل المستندات</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 mb-2" />
              <span>مساعدة متخصصة</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 mb-2" />
              <span>التعلم المخصص</span>
            </div>
          </div>
          <p className="text-blue-100 text-sm">
            اختر أحد المساعدين من القائمة في الأعلى للبدء
          </p>
        </div>
      </div>
      <section className="mt-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-right">
          الميزات الرئيسية
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-end">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Book className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-2 text-right">
              تحليل ملفات PDF
            </h4>
            <p className="text-gray-600 text-right">
              حول مستنداتك إلى مواد تعليمية منظمة وبنوك أسئلة.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-end">
              <div className="bg-indigo-100 p-3 rounded-full">
                <BrainCircuit className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-2 text-right">
              خبرة في المواد الدراسية
            </h4>
            <p className="text-gray-600 text-right">
              احصل على مساعدة متخصصة في الكيمياء والرياضيات والفيزياء من خلال
              المساعدين المخصصين.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-end">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Calculator className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <h4 className="text-xl font-semibold mb-2 text-right">
              التعلم التفاعلي
            </h4>
            <p className="text-gray-600 text-right">
              تفاعل مع المساعدين لحل المشكلات وتعزيز فهمك.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
