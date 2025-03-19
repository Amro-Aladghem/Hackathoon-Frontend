import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toggleButton, setToggleButton] = useState(
    location.pathname.replace("/", "")
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  useEffect(() => {
    const path = location.pathname.replace("/", "") || "home";
    setToggleButton(path);
  }, [location.pathname]);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center max-h-20">
        <Link
          to="/"
          onClick={() => setToggleButton("home")}
          className={`text-xl md:text-2xl font-bold text-gray-900`}
        >
          <div className="flex items-center gap-4">
            <img
              id="taddress-logo"
              src="/OurLogoFigure.png"
              className="max-w-[30px] max-h-[30px]"
              alt="logo"
            />
            <p>Tadrees AI</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-row-reverse gap-4 mr-4">
          <Link
            to="/home"
            className={`text-gray-700 hover:text-indigo-600 ${
              toggleButton === "home" && "active text-indigo-600"
            } font-medium`}
            onClick={() => setToggleButton("home")}
          >
            الرئيسية
          </Link>

          <Link
            to="/about"
            className={`text-gray-700 hover:text-indigo-600 ${
              toggleButton === "about" && "active text-indigo-600"
            } font-medium`}
            onClick={() => setToggleButton("about")}
          >
            حولنا
          </Link>
          <Link
            to="/how-it-works"
            className={`text-gray-700 hover:text-indigo-600 ${
              toggleButton === "how-it-works" && "active text-indigo-600"
            } font-medium`}
            onClick={() => setToggleButton("how-it-works")}
          >
            طريقة العمل
          </Link>
          <Link
            to="/contact"
            className={`text-gray-700 hover:text-indigo-600 ${
              toggleButton === "contact" && "active text-indigo-600"
            } font-medium`}
            onClick={() => setToggleButton("contact")}
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
              to="/home"
              onClick={() => {
                toggleMobileMenu();
                setToggleButton("home");
              }}
              className={`text-gray-700 hover:text-indigo-600 ${
                toggleButton === "home" && "text-indigo-600"
              } font-medium py-2`}
            >
              الرئيسية
            </Link>
            <Link
              to="/about"
              className={`text-gray-700 hover:text-indigo-600 ${
                toggleButton === "about" && "text-indigo-600"
              } font-medium py-2`}
              onClick={() => {
                toggleMobileMenu();
                setToggleButton("about");
              }}
            >
              حولنا
            </Link>
            <Link
              to="/how-it-works"
              className={`text-gray-700 hover:text-indigo-600 ${
                toggleButton === "how-it-works" && "text-indigo-600"
              } font-medium py-2`}
              onClick={() => {
                toggleMobileMenu();
                setToggleButton("how-it-works");
              }}
            >
              طريقة العمل
            </Link>
            <Link
              to="/contact"
              className={`text-gray-700 hover:text-indigo-600 ${
                toggleButton === "contact" && "text-indigo-600"
              } font-medium py-2`}
              onClick={() => {
                toggleMobileMenu();
                setToggleButton("contact");
              }}
            >
              تواصل معنا
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
