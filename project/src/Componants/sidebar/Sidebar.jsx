import React, { useEffect, useState } from "react";
import bots from "../../botsData/BotsData";
import { useNavigate, useMatch } from "react-router-dom";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobleSidebar";

export default function Sidebar() {
  const match = useMatch("/bot/:botId");
  const isMainPage = useMatch("/");
  const id = match?.params.botId;
  const navigate = useNavigate();
  const [selectedBot, setSelectedBot] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const bot = bots.find((bot) => bot.id === id);
      setSelectedBot(bot);
    } else {
      setSelectedBot(null);
    }
  }, [id]);

  const handleBotSelect = (bot) => {
    navigate(`/bot/${bot.id}`);
    setSelectedBot(bot);
    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  };

  if (isMainPage) return null;
  return (
    <>
      <MobileSidebar
        handleBotSelect={handleBotSelect}
        selectedBot={selectedBot}
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
      />
      <DesktopSidebar
        selectedBot={selectedBot}
        handleBotSelect={handleBotSelect}
      />
    </>
  );
}
