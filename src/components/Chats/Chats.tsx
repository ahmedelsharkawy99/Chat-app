// Packages

// Types and Schemas

// Data and styles
import { DocumentData } from "firebase/firestore";

// Functions and Hooks
import useGetData from "../../hooks/useGetData/useGetData";
import useAuthContext from "../../hooks/useAuthContext/useAuthContext";
import useChatContext from "../../hooks/useChatContext/useChatContext";

// Components
import Chat from "../Shared/Chat/Chat";

const Chats: React.FC = () => {
  const { currentUser } = useAuthContext();
  const { dispatch } = useChatContext();
  const chats = useGetData("userChats", currentUser?.uid as string);

  const selectHandler = (user: DocumentData) => {
    dispatch({
      type: "CHANGE_USER",
      payload: {
        user: user,
        currentUser: currentUser,
      },
    });
  };

  return (
    <div className="chats">
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <Chat
              key={chat[0]}
              user={chat[1].userInfo}
              latestMessage={chat[1].latestMessage}
              handleClick={selectHandler.bind(null, chat[1].userInfo)}
            />
          ))}
    </div>
  );
};

export default Chats;
