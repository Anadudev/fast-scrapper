import React from "react";

interface ChatItem {
  onSend: () => void;
  onInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  input: string;
  loading: boolean;
}

const ChatInput: React.FC<ChatItem> = ({ onSend, onInput, input, loading }) => {
  return (
    <div className="flex justify-between p-4 gap-2 items-center">
      <textarea
      disabled={loading}
        onChange={onInput}
        placeholder="Type your message here..."
        value={input}
        name=""
        className="w-full p-2 bg-gray-200 text-black min-h-[3rem] rounded-lg"
        id=""
      ></textarea>
      <button disabled={loading} className="bg-blue-500 cursor-pointer transition all duration-500 rounded-lg text-white p-2 h-fit" onClick={onSend}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
