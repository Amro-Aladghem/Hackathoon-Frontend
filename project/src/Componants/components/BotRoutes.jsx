import React from "react";
import { useParams } from "react-router-dom";
import botComponents from "./BotConponents";

// هاض الكمبوننت مسؤول عن انه يعرض الكمبوننت المخصص لكل بوت ويعمل dynamic routing لكل بوت
export default function BotRouter() {
  const { botId } = useParams();
  const SelectedComponent = botComponents[botId];

  if (!SelectedComponent) {
    return <div>البوت غير موجود</div>;
  }

  return <SelectedComponent />;
}
