import React, { useEffect, useState, useRef } from "react";
import { Upload, Send, AlertCircle, Image } from "lucide-react";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { Sendata } from "../services/Sendata";
import bots from "../botsData/BotsData";
import { useParams } from "react-router-dom";

export default function ChatInterface() {
  const messagesEndRef = useRef(null);
  const { botId } = useParams();
  const selectedBot = bots.find((bot) => bot.id === botId);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  // وظيفتها ان تعيد قيمة الرسائل إلى القيمة الافتراضية عند تغيير البوت المحدد
  useEffect(() => {
    setMessages([]);
    setIsFirstTime(true);
    setUploadedFile(null);
    setSessionId("");
  }, [selectedBot]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // وظيفتها ان تقوم بعمل تركيز على حقل الإدخال اذا قام المستخدم بالضغط على أي زر بالكيبورد ما عدا حقول الإدخال
  useEffect(() => {
    const handleKeyDown = () => {
      if (
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
      ) {
        inputRef.current.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "" && !uploadedFile) return;

    // إضافة رسالة المستخدم فوراً
    const newUserMessage = {
      sender: "user",
      content: inputMessage,
      file: uploadedFile,
      timestamp: new Date(),
    };

    // إضافة رسالة مؤقتة للبوت (للتحميل)
    const temporaryBotMessage = {
      sender: "bot",
      content: "",
      isLoading: true,
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage, temporaryBotMessage]);
    setInputMessage("");
    setUploadedFile(null);
    setIsLoading(true);
    setError(null);

    try {
      const response = await Sendata(
        selectedBot.api,
        uploadedFile,
        inputMessage,
        isFirstTime,
        sessionId
      );

      setIsFirstTime(false);
      setSessionId(response.responseMessageDTO.sessionId);

      // تحديث رسائل الدردشة باستبدال الرسالة المؤقتة برسالة حقيقية
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = {
          sender: "bot",
          content: response.responseMessageDTO.message,
          timestamp: new Date(),
          isLoading: false,
        };
        return newMessages;
      });
    } catch (err) {
      console.error("Error sending data:", err);
      // Error handling
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages[newMessages.length - 1] = {
          sender: "bot",
          content:
            "حدث خطأ أثناء الاتصال. السيرفر مشغول حالياً، يرجى المحاولة مرة أخرى لاحقاً.",
          timestamp: new Date(),
          isError: true,
        };
        return newMessages;
      });
      setError("السيرفر مشغول حالياً، يرجى المحاولة مرة أخرى لاحقاً.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedFile(file);
    } else {
      alert("الرجاء إرفاق صورة صحيحة");
    }
  };

  const isPdfBot =
    selectedBot.id === "planner" || selectedBot.id === "question-bank";

  return (
    <div className="flex flex-col h-full" dir="rtl">
      {/* Chat header */}
      <div className="border-b border-gray-200 p-4 flex items-center">
        <div className="bg-white p-2 rounded-full border">
          {selectedBot.icon}
        </div>
        <div className="mr-3">
          <h2 className="font-semibold">{selectedBot.name}</h2>
          <p className="text-sm text-gray-600">{selectedBot.type}</p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {/* Welcome message */}
        <div className="bg-gray-100 rounded-lg p-4 max-w-3xl mx-auto text-right">
          <h3 className="font-medium text-lg mb-2">
            مرحباً بك في {selectedBot.name}
          </h3>
          <p>{selectedBot.description}</p>
          {isPdfBot && (
            <p className="mt-2 text-sm text-gray-600">
              لبدء المحادثة، يرجى رفع ملف PDF للتحليل
            </p>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 max-w-3xl mx-auto text-right flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        {/* Message bubbles */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.sender === "user"
                ? "bg-blue-50 mr-auto"
                : message.isError
                ? "bg-red-50 ml-auto"
                : `bg-white ${selectedBot.textColor} ml-auto`
            } rounded-lg p-4 px-8 max-w-3xl shadow-sm border text-right`}
          >
            {message.file && (
              <div className="bg-gray-100 p-2 rounded mb-2 text-sm">
                <img
                  src={URL.createObjectURL(message.file)}
                  alt={message.file.name}
                  className="max-w-full h-auto"
                />
              </div>
            )}

            {message.isLoading ? (
              <div className="space-y-2">
                <div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded-lg"></div>
                <div className="animate-pulse bg-gray-200 h-4 w-3/4 rounded-lg"></div>
                <div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded-lg"></div>
              </div>
            ) : (
              <Markdown remarkPlugins={[remarkBreaks]}>
                {message.content.replace(/\\n/g, "\n")}
              </Markdown>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </p>
            <div ref={messagesEndRef} />
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 p-4">
        {uploadedFile && (
          <div className="bg-blue-50 p-2 rounded mb-2 flex justify-between items-center">
            <button
              className="text-red-500 text-sm"
              onClick={() => setUploadedFile(null)}
            >
              إلغاء
            </button>
            <span className="text-sm">{uploadedFile.name}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className={`${
              isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } cursor-pointer text-white p-2 rounded-full transition-colors`}
          >
            <Send className="w-5 h-5" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`اكتب رسالتك إلى ${selectedBot.name}...`}
            className="flex-grow border border-gray-300 rounded-full py-2 px-4 text-right focus:ring-2 focus:ring-blue-300 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            disabled={isLoading}
          />
          {isPdfBot ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="pdf-upload"
                disabled={isLoading}
              />
              <label
                htmlFor="pdf-upload"
                className={`${
                  isLoading
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200 cursor-pointer"
                } p-2 rounded-full transition-colors`}
              >
                <Upload className="w-5 h-5 text-gray-600" />
              </label>
            </>
          ) : (
            <>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileUpload}
                className="hidden"
                id="image-upload"
                disabled={isLoading}
              />
              <label
                htmlFor="image-upload"
                className={`${
                  isLoading
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-200 cursor-pointer"
                } p-2 rounded-full transition-colors`}
              >
                <Image className="w-5 h-5 text-gray-600" />
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
