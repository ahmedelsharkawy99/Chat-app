// Packages

// Types and Schemas
import { DocumentData } from "firebase/firestore";

// Data and styles
import "./message.css";

// Functions and Hooks
import { formatTime } from "../../../utils/formatTime";
import useChatContext from "../../../hooks/useChatContext/useChatContext";
import useAuthContext from "../../../hooks/useAuthContext/useAuthContext";

// Components

const Message: React.FC<{ message: DocumentData }> = ({ message }) => {
  const { currentUser } = useAuthContext();
  const { data } = useChatContext();

  const imageSrc =
    message.senderId === currentUser?.uid
      ? currentUser?.photoURL
      : data?.user?.image;

  const imageAlt =
    message.senderId === currentUser?.uid
      ? currentUser?.displayName
      : data?.user?.fullName;

  return (
    <div
      className={`message ${message.senderId === currentUser?.uid && "owner"}`}
    >
      <div className="message__info">
        <img src={imageSrc} alt={imageAlt + " Pic"} loading="lazy" />
      </div>
      <div className="message__content">
        <p>{message.text}</p>
        {message.imageUrl && (
          <img src={message.imageUrl} alt={message.text} loading="lazy" />
        )}

        <small className="message__content-time">
          {formatTime(message.date.seconds * 1000)}
        </small>
      </div>
    </div>
  );
};

export default Message;
