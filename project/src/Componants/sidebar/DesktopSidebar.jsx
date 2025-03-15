import { Menu, X } from "lucide-react";
import { useState } from "react";
import bots from "../../botsData/BotsData";

function DesktopSidebar({ selectedBot, handleBotSelect }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed cursor-pointer top-16 border left-4 md:block hidden bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100 transition-all"
        aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={`h-full overflow-y-auto border-r border-gray-200 bg-white flex-shrink-0 hidden md:flex transition-all duration-300 ${
          isOpen ? "w-64" : "w-0"
        }`}
      >
        <div
          className={`p-4 mt-8 ${
            isOpen ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300 w-64 overflow-hidden`}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            المساعدين المتخصصين
          </h3>
          <div className="space-y-2">
            {bots.map((bot) => (
              <div
                key={bot.id}
                className={`${bot.color} ${
                  selectedBot?.id === bot.id
                    ? `${bot.activeColor} ring-2 ring-blue-500`
                    : ""
                } border rounded-lg p-3 cursor-pointer transition-all`}
                onClick={() => handleBotSelect(bot)}
              >
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-full">{bot.icon}</div>
                  <div className="mr-3 text-right">
                    <h4 className="font-medium text-sm">{bot.name}</h4>
                    <p className="text-xs text-gray-600">{bot.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DesktopSidebar;
