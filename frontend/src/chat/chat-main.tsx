import React from "react";
import ChatInput from "./components/chat-input";
// type Props = {}
import axios from "axios";
import Markdown from "react-markdown";

const ChatMain = () => {
  const [chat, setChat] = React.useState<{
    query: string;
    response: string | null | undefined;
  } | null>(null);
  const [chatInput, setChatInput] = React.useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatInput(e.target.value);
  };
  const [loading, setLoading] = React.useState<boolean>(false);
  // React.useEffect(() => {
  //   onSend();
  // }, []);

  const onSend = () => {
    if (chatInput === "") {
      window.alert("Please enter a message");
      return;
    }
    setLoading(true);
    axios
      .post("http://localhost:8000/ai-chat", {
        message: chatInput,
      })
      .then((response) => {
        setChat(response.data);
        setChatInput("");
        console.log(response.data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => {
        window.alert("An error occurred. Please try again later.");
        console.log(error);
      });
  };

  return (
    <div className="h-screen w-full flex-1">
      <div className="text-xl text-center bg-black h-14 p-3 overflow-hidden ">
        This should be the chat title
      </div>
      <div className="">
        <div className="overflow-auto h-full max-h-[calc(100vh-9rem)] hide-scrollbar min-h-[calc(100vh-9rem)] bg-gray-900 ">
          {
            // chatItems.map((item, index) => (
            <div
              // key={index}
              className="p-4 py-12 overflow-auto h-full max-w-[60rem] mx-auto"
            >
              <div className="flex flex-col">
                <div className="flex justify-end">
                  <div className="bg-blue-900 text-white p-2 rounded-lg m-2 max-w-[40rem]">
                    {chat?.query}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="p-4 bg-gray-800 text-gray-200 p-2 rounded-lg m-2 max-w-[40rem]">
                    <Markdown>{chat?.response}</Markdown>
                  </div>
                </div>
              </div>
            </div>
            // ))
          }
        </div>
        <ChatInput
          onSend={onSend}
          loading={loading}
          onInput={handleChange}
          input={chatInput}
        />
      </div>
    </div>
  );
};

export default ChatMain;
