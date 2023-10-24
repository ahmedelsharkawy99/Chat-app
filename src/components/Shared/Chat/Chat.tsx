// Packages

// Types and Schemas
import { ChatProps } from "../../../types/chatTypes";

// Data and styles
import "./chat.css";

// Functions and Hooks

// Components

const Chat: React.FC<ChatProps> = ({
  user,
  latestMessage,
  handleClick,
  container,
}) => {
  return (
    <div onClick={handleClick}>
      <div className="user__chat">
        <img src={user?.image} alt={`${user?.fullName} Pic`} loading="lazy" />
        <div className="user__chat-info">
          <span>{user?.fullName}</span>
          {container !== "Search" && <p>{latestMessage?.text}</p>}
        </div>
      </div>
    </div>
  );
};

export default Chat;
