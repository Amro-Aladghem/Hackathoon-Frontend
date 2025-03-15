import {
  Atom,
  Beaker,
  Book,
  BrainCircuit,
  Calculator,
  Scroll,
} from "lucide-react";
// ﻻتعدل عليه ﻷنه مابفرق معك بأي شيء
const bots = [
  {
    id: "planner",
    name: "التخطيط الدراسي",
    type: "تحليل PDF",
    description: "يحلل ملفات PDF لإنشاء خطط دراسية ومسارات تعليمية منظمة.",
    icon: <Book className="w-6 h-6 text-blue-600 md:w-5 md:h-5" />,
    color: "bg-blue-100",
    hoverColor: "hover:bg-blue-200",
    activeColor: "bg-blue-300",
    textColor: "text-blue-900",
    api: import.meta.env.VITE_PLANNER_API, // تأكد من اسم الapi الموجود في ملف .env
  },
  {
    id: "question_bank",
    name: "الاختبارات",
    type: "تحليل PDF",
    description: "يستخرج ويولد أسئلة من مستندات PDF لاختبار الفهم.",
    icon: <BrainCircuit className="w-6 h-6 text-purple-600 md:w-5 md:h-5" />,
    color: "bg-purple-100",
    hoverColor: "hover:bg-purple-200",
    activeColor: "bg-purple-300",
    textColor: "text-purple-900",
    api: import.meta.env.VITE_QUESTION_API, // تأكد من اسم الapi الموجود في ملف .env
  },
  {
    id: "chemistry",
    name: "الكيمياء",
    type: "كيمياء",
    description:
      "يوفر تفسيرات للمفاهيم الكيميائية والتفاعلات والهياكل الجزيئية.",
    icon: <Beaker className="w-6 h-6 text-green-600 md:w-5 md:h-5" />,
    color: "bg-green-100",
    hoverColor: "hover:bg-green-200",
    activeColor: "bg-green-300",
    textColor: "text-green-900",
    api: import.meta.env.VITE_CHEMISTRY_API,
  },
  {
    id: "mathematics",
    name: "الرياضيات",
    type: "رياضيات",
    description:
      "يحل ويشرح المسائل الرياضية من الحساب الأساسي إلى التفاضل والتكامل المتقدم.",
    icon: <Calculator className="w-6 h-6 text-red-600 md:w-5 md:h-5" />,
    color: "bg-red-100",
    hoverColor: "hover:bg-red-200",
    activeColor: "bg-red-300",
    textColor: "text-red-900",
    api: import.meta.env.VITE_MATH_API,
  },
  {
    id: "physics",
    name: "الفيزياء",
    type: "فيزياء",
    description: "يشرح مفاهيم الفيزياء، يحل المسائل، ويصور الظواهر الفيزيائية.",
    icon: <Atom className="w-6 h-6 text-amber-600 md:w-5 md:h-5" />,
    color: "bg-amber-100",
    hoverColor: "hover:bg-amber-200",
    activeColor: "bg-amber-300",
    textColor: "text-amber-900",
    api: import.meta.env.VITE_PHYSICS_API,
  },
  {
    id: "history",
    name: "التاريخ",
    type: "تاريخ",
    description:
      "يقدم معلومات وتحليلات عن الأحداث التاريخية والحضارات والشخصيات البارزة.",
    icon: <Scroll className="w-6 h-6 text-indigo-600 md:w-5 md:h-5" />,
    color: "bg-indigo-100",
    hoverColor: "hover:bg-indigo-200",
    activeColor: "bg-indigo-300",
    textColor: "text-indigo-900",
    api: import.meta.env.VITE_HISTORY_API,
  },
];

export default bots;
