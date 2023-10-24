import { User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import React, { createContext, useReducer } from "react";

type ACTIONTYPE = {
  type: "CHANGE_USER";
  payload: {
    user: DocumentData;
    currentUser: User | null;
  };
};

type INITIAL_STATETYPE = {
  chatId: string;
  user: DocumentData | null;
};

type ChatState = {
  data: INITIAL_STATETYPE;
  dispatch: React.Dispatch<ACTIONTYPE>;
};

export const ChatsContext = createContext<ChatState | null>(null);

const INITIAL_STATE: INITIAL_STATETYPE = {
  chatId: "",
  user: null,
};

const chatsReducer = (state: INITIAL_STATETYPE, action: ACTIONTYPE) => {
  switch (action.type) {
    default:
      return state;

    case "CHANGE_USER":
      return {
        user: action.payload.user,
        chatId:
          action.payload.currentUser &&
          action.payload.currentUser.uid > action.payload.user.uid
            ? action.payload.currentUser.uid + action.payload.user?.uid
            : action.payload.user?.uid + action.payload?.currentUser?.uid,
      };
  }
};

const ChatsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(chatsReducer, INITIAL_STATE);
  return (
    <ChatsContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatsContext.Provider>
  );
};

export default ChatsContextProvider;
