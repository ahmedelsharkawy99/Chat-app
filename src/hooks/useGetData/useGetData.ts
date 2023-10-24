import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getRealTimeData } from "../../firebase/handlers/firestore";
import useChatContext from "../useChatContext/useChatContext";

const useGetData = (
  path: string,
  identifire: string,
  deps: React.DependencyList = []
) => {
  const [collectionData, setCollectionData] = useState<DocumentData | null>(
    null
  );
  const { data } = useChatContext();

  useEffect(() => {
    if (path === "chats" && !data.chatId) return;
    getRealTimeData(path, identifire, setCollectionData);
  }, deps);

  return collectionData;
};

export default useGetData;
