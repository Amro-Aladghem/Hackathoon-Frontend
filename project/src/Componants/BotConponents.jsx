// هاض الكمبوننت مسؤول عن انه يعرض البوتات بالمسار الصحيح الخاص فيها وبالرابط الصحيح
// ﻻتحاول تعدل عليه فقط أضف المسارات الصحيحة الخاصة بالبوتات
import ChatInterface from "./ChatInterface";
import PlannerComponent from "./PlannerComponent"; // هون حط المسار الصحيح تبع بوت التخطيط
import QuestionBankComponent from "./QuestionBankComponent"; // هون حط المسار الصحيح تبع بوت بنك الأسئلة

const botComponents = {
  planner: PlannerComponent, // بوت التخطيط
  question_bank: QuestionBankComponent, // بوت بنك الأسئلة
  chemistry: ChatInterface, // البوتات الأربعة التي تشترك بنفس فكرة الشات
  mathematics: ChatInterface,
  physics: ChatInterface,
  history: ChatInterface,
};

export default botComponents;
