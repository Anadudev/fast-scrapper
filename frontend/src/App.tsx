import "./App.css";
import ChatMain from "./chat/chat-main";
import Sidenav from "./components/sidenav";

function App() {
  return (
    <div className="flex">
      <Sidenav />
      <ChatMain />
    </div>
  );
}

export default App;
