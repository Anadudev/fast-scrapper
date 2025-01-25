import React from "react";

interface ChatItem {
  onSend: () => void;
  onInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  input: string;
  loading: boolean;
  range: number;
  onRange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatInput: React.FC<ChatItem> = ({
  onSend,
  onInput,
  input,
  loading,
  range,
  onRange,
}) => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between gap-2 items-center">
        <label htmlFor="">{range} words: </label>
        <input
          type="range"
          onChange={onRange}
          value={range}
          min={100}
          max={1000}
          name=""
          id=""
        />
      </div>
      <div className="flex justify-between gap-2 items-center">
        <textarea
          disabled={loading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              onSend();
            }
          }}
          onChange={onInput}
          placeholder="Type your message here..."
          value={input}
          className="w-full p-2 bg-gray-200 text-black min-h-[3rem] rounded-lg"
        ></textarea>
        <button
          disabled={loading}
          className="bg-blue-500 cursor-pointer transition all duration-500 rounded-lg text-white p-2 h-fit"
          onClick={onSend}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
