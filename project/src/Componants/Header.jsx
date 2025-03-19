import { BrainCircuit, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header  className="bg-white shadow">
      <div  className="container mx-auto px-8 py-4 flex justify-between items-center max-h-20">
        <Link to="/" className="text-xl md:text-2xl font-bold text-gray-900">
          <div className="flex items-center gap-4">
            <img id="taddress-logo" src="/OurLogo.png"   />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-row-reverse gap-4 mr-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            الرئيسية
          </Link>
          <Link
            to="/bot/physics"
            className="text-indigo-600 hover:text-blue-600 font-medium"
          >
            البوتات التعليمية
          </Link>
          <Link
            to="/tools/quizmaker"
            className="text-indigo-600 hover:text-blue-600 font-medium"
          >
            صانع الأمتحانات
          </Link>
          <Link
            to="/tools/timetable"
            className="text-indigo-600 hover:text-blue-600 font-medium"
          >
            المخطط الزمني
          </Link>
          <Link
            to="/tools/review"
            className="text-indigo-600 hover:text-blue-600 font-medium"
          >
            اختبار التقييم
          </Link>
          <Link
            to="/aboutus"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            حولنا
          </Link>
          <Link
            to="/how-it-works"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            طريقة العمل
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            تواصل معنا
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-md">
          <nav className="flex flex-col space-y-2 pb-3">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 font-medium py-2"
            >
              الرئيسية
            </Link>
            <Link
            to="/bot/physics"
            className="text-indigo-600 hover:text-blue-600 font-medium py-2"
          >
            البوتات التعليمية
          </Link>
          <Link
            to="/tools/quizmaker"
            className="text-indigo-600 hover:text-blue-600 font-medium py-2"
          >
            صانع الأمتحانات
          </Link>
          <Link
            to="/tools/timetable"
            className="text-indigo-600 hover:text-blue-600 font-medium py-2"
          >
            المخطط الزمني
          </Link>
            <Link
              to="/aboutus"
              className="text-gray-700 hover:text-indigo-600 font-medium py-2"
            >
              حولنا
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 font-medium py-2"
            >
              طريقة العمل
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-indigo-600 font-medium py-2"
            >
              تواصل معنا
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
