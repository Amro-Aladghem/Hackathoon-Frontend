import React from "react";
import { useParams } from "react-router-dom";
import botComponents from "./BotConponents";

export default function BotRouter() {
  const { botId } = useParams();
  const SelectedComponent = botComponents[botId];

  if (!SelectedComponent) {
    return <div>البوت غير موجود</div>;
  }

  return <SelectedComponent />;
}
