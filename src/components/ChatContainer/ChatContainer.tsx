// Packages

// Types and Schemas

// Data and styles
import "./chatContainer.css";
import Cam from "../../assets/cam.png";
import Add from "../../assets/add.png";
import More from "../../assets/more.png";

// Functions and Hooks
import useChatContext from "../../hooks/useChatContext/useChatContext";

// Components
import Messages from "../Messages/Messages";
import MessageInput from "../MessageInput/MessageInput";

const ChatContainer: React.FC = () => {
  const { data } = useChatContext();
  return (
    <section className="chat__container">
      <div className="chat__conatiner-info">
        <span>{data?.user?.fullName}</span>
        <div className="chat-info__icons">
          <img src={Cam} alt="vedio call" loading="lazy" />
          <img src={Add} alt="Add friend" loading="lazy" />
          <img src={More} alt="more settings" loading="lazy" />
        </div>
      </div>
      <Messages />
      <MessageInput />
    </section>
  );
};

export default ChatContainer;
