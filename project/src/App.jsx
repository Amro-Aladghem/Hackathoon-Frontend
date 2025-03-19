import Header from "./Componants/Header";
import Sidebar from "./Componants/sidebar/Sidebar";
import BotRouter from "./Componants/BotRoutes";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Main from "./Componants/MainPage/Main";
import AboutUs from "./Componants/SupPages/AboutUs";
import ContactUs from "./Componants/SupPages/ContactUs";
import HowItWorks from "./Componants/SupPages/HowItWorks";
import Home from "./Componants/SupPages/Home";
import Review from "./Componants/ReviewPage/Review";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex max-sm:flex-col overflow-hidden">
          <Sidebar />
          <div className="flex-grow overflow-y-auto">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/home" element={<Home />} />
              <Route path="/bot/:botId" element={<BotRouter />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};
export default App;
