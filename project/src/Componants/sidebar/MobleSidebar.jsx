import { Menu, X } from "lucide-react";
import bots from "../../botsData/BotsData";

const MobileSidebar = ({
  handleBotSelect,
  selectedBot,
  setIsMenuOpen,
  isMenuOpen,
}) => (
  <div className="h-fit border-r border-gray-200 bg-white w-full flex flex-col relative md:hidden">
    <div className="px-4 pt-4 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-gray-600" />
          ) : (
            <Menu className="w-5 h-5 text-gray-600" />
          )}
        </button>
        {!selectedBot && (
          <h3 className="text-lg font-semibold text-gray-800 text-right">
            المساعدين المتخصصين
          </h3>
        )}
      </div>

      {isMenuOpen && (
        <div className="block">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {bots.map((bot) => (
              <div
                key={bot.id}
                className={`${bot.color} ${
                  selectedBot?.id === bot.id ? "ring-2 ring-blue-500" : ""
                } border rounded-lg p-2 sm:p-3 cursor-pointer transition-all hover:shadow-md`}
                onClick={() => handleBotSelect(bot)}
              >
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-full border">
                    {bot.icon}
                  </div>
                  <div className="mr-2 sm:mr-3 text-right">
                    <h4 className="font-medium text-xs sm:text-sm">
                      {bot.name}
                    </h4>
                    <p className="text-xs text-gray-600 hidden sm:block">
                      {bot.type}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default MobileSidebar;
