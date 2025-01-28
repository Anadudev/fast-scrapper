import React from "react";
import ChatInput from "./components/chat-input";
// type Props = {}
import axios from "axios";
import Markdown from "react-markdown";

interface ChatType {
  query: string;
  response: string | null | undefined;
}

const ChatMain = () => {
  const [chatItems, setChatItems] = React.useState<{
    title: string;
    chat: ChatType[];
  } | null>(null);
  const [chatInput, setChatInput] = React.useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatInput(e.target.value);
  };
  const [loading, setLoading] = React.useState<boolean>(false);
  const [range, setRange] = React.useState<number>(1000);
  // React.useEffect(() => {
  //   onSend();
  // }, []);

  const handleRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange(parseInt(e.target.value));
  };

  const onSend = () => {
    if (chatInput.trim() === "") {
      return;
    }
    setLoading(true);
    axios
      // .post("http://localhost:8000/ai-chat", {
      .post("https://feminai.onrender.com/ai-chat", {
        message: chatInput,
        context: JSON.stringify(chatItems?.chat),
        title: chatItems ? false : true,
        token: range,
      })
      .then((response) => {
        // console.log(response.data);
        setChatItems({
          title: chatItems?.title ?? response.data.title,
          chat: [...(chatItems?.chat ?? []), response.data.chat],
        });
        setChatInput("");
        // window.scrollTo(0, document.body.scrollHeight);
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
        {chatItems?.title ?? "Chatbot"}
      </div>
      <div className="">
        <div className="overflow-auto h-full max-h-[calc(100vh-12rem)] hide-scrollbar min-h-[calc(100vh-12rem)] bg-gray-900 ">
          {chatItems ? (
            chatItems?.chat?.map((item, index) => (
              <div
                key={index}
                className="px-4 py-12 overflow-auto h-full max-w-[60rem] mx-auto"
              >
                <div className="flex flex-col">
                  <div className="flex justify-end">
                    <div className="bg-blue-900 text-white p-2 rounded-lg m-2 max-w-[40rem]">
                      {item?.query}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="p-4 bg-gray-800 text-gray-200 rounded-lg m-2 max-w-[40rem]">
                      <Markdown>{item?.response}</Markdown>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex  h-[calc(100vh-12rem)] max-w-[60rem] justify-start items-center w-full">
              <div className="p-4 text-center text-gray-200 rounded-lg m-auto">
                <h1 className="text-2xl">Hello world!</h1>
                <p>Start a conversation with the chatbot.</p>
              </div>
            </div>
          )}
        </div>
        <ChatInput
          onSend={onSend}
          loading={loading}
          onInput={handleChange}
          input={chatInput}
          range={range}
          onRange={handleRange}
        />
      </div>
    </div>
  );
};

export default ChatMain;
