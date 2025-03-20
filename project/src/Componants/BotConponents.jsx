// هاض الكمبوننت مسؤول عن انه يعرض البوتات بالمسار الصحيح الخاص فيها وبالرابط الصحيح
// ﻻتحاول تعدل عليه فقط أضف المسارات الصحيحة الخاصة بالبوتات
import ChatInterface from "./ChatInterface";
import QuizMaker from "./quizMaker/Quizmaker";
import Review from "./ReviewPage/Review";
import Timetable from "./Timetable/Timetable";

const botComponents = {
  FutureSpecialization: Review,
  planner: Timetable, // بوت التخطيط
  question_bank: QuizMaker, // بوت بنك الأسئلة
  chemistry: ChatInterface, // البوتات الأربعة التي تشترك بنفس فكرة الشات
  mathematics: ChatInterface,
  physics: ChatInterface,
  history: ChatInterface,
};

export default botComponents;
