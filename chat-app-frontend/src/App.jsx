import { useEffect, useRef } from "react";
import Message from "./components/Message.jsx";
import MessageSender from "./components/MessageSender.jsx";
import { useUserQuery } from "./hooks/useUserQuery.js";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import { useChatQuery } from "./hooks/useChatQuery.js";
import { socket } from "./services/chatService.js";
import { useQueryClient } from "@tanstack/react-query";

const App = () => {
  const sender = useLocalStorage("sender");

  const bottomMessageRef = useRef(null);

  const queryClient = useQueryClient();

  const { data: userData } = useUserQuery(!sender);
  const { data: chatData, isLoading } = useChatQuery();

  useEffect(() => {
    if (userData && !sender) {
      window.localStorage.setItem("sender", JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    const handleChatEvent = (value) => {
      queryClient.setQueryData(["chat"], (oldData) => oldData.concat(value));
    };

    socket.on("chat", handleChatEvent);

    return () => {
      socket.off("chat", handleChatEvent);
    };
  });

  useEffect(() => {
    bottomMessageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatData]);

  if (isLoading) return <div className="bg-slate-800 h-screen"></div>;

  return (
    <div className="flex h-screen flex-col bg-slate-800">
      <div className="h-full max-w-screen-md w-full self-center px-3 overflow-y-scroll no-scrollbar">
        <div className="flex flex-col gap-4 pt-4">
          {chatData.map((data, index) => {
            return (
              <Message
                key={data.id ? data.id : index}
                isSender={data.sender === sender}
                data={data}
              />
            );
          })}
          <span ref={bottomMessageRef} />
        </div>
      </div>

      <MessageSender />
    </div>
  );
};

export default App;
