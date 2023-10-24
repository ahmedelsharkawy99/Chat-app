import { DocumentData } from "firebase/firestore";

export type ChatProps = {
  user: DocumentData | null;
  container?: "Search" | "Chat-Container";
  latestMessage?: { text?: string };
  handleClick?: () => void;
};
