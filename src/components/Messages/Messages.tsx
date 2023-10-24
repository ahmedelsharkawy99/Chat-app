// Packages

// Types and Schemas

// Data and styles
import "./messages.css";
import { DocumentData } from "firebase/firestore";

// Functions and Hooks
import useGetData from "../../hooks/useGetData/useGetData";
import useChatContext from "../../hooks/useChatContext/useChatContext";

// Components
import Message from "../Shared/Message/Message";

const Messages: React.FC = () => {
  const { data } = useChatContext();
  const messagesObj = useGetData("chats", data.chatId, [data.chatId]);

  return (
    <div className="messages">
      {messagesObj?.messages.map((message: DocumentData) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export default Messages;
