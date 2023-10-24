import { useContext } from "react";
import { ChatsContext } from "../../context/chatContext";

const useChatContext = () => {
  const context = useContext(ChatsContext);

  if (!context) {
    throw Error("useChatContext must be used inside an AuthContextProvider");
  }

  return context;
};

export default useChatContext;
