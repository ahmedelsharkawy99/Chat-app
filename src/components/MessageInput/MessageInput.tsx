// Packages
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { Timestamp, arrayUnion, serverTimestamp } from "firebase/firestore";

// Types and Schemas
import { FirebaseError } from "firebase/app";

// Data and styles
import "./messageInput.css";
import Img from "../../assets/img.png";

// Functions and Hooks
import { uploadImage } from "../../firebase/handlers/storage";
import { updateData } from "../../firebase/handlers/firestore";
import useChatContext from "../../hooks/useChatContext/useChatContext";
import useAuthContext from "../../hooks/useAuthContext/useAuthContext";

// Components
import CustomInput from "../Shared/CustomInput/CustomInput";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const { data } = useChatContext();
  const { currentUser } = useAuthContext();

  const sendHandler = async () => {
    try {
      if (img) {
        const imageUrl = await uploadImage(
          `images/chats/${data.chatId}/${uuid()}`,
          img
        );

        await updateData("chats", data.chatId, {
          messages: arrayUnion({
            id: uuid(),
            senderId: currentUser?.uid,
            date: Timestamp.now(),
            text: text,
            imageUrl: imageUrl,
          }),
        });
      } else {
        await updateData("chats", data.chatId, {
          messages: arrayUnion({
            id: uuid(),
            senderId: currentUser?.uid,
            date: Timestamp.now(),
            text: text,
          }),
        });
      }

      await updateData("userChats", currentUser?.uid as string, {
        [data.chatId + ".latestMessage"]: {
          text: text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateData("userChats", data.user?.uid, {
        [data.chatId + ".latestMessage"]: {
          text: text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      if (error instanceof FirebaseError) toast.error(error.code);
    } finally {
      setImg(null);
      setText("");
    }
  };

  return (
    <div className="message__input">
      <CustomInput
        input={{
          id: "messageText",
          type: "text",
          placeholder: "Type Something....",
          value: text,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value),
        }}
      />

      <div className="message__input-send">
        <CustomInput
          label={{
            children: <img src={Img} alt="upload Image" loading="lazy" />,
          }}
          input={{
            id: "file",
            type: "file",
            className: "hidden",
            accept: "image/*",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setImg((e.target.files as FileList)[0]),
          }}
        />
        <button onClick={sendHandler}>Send</button>
      </div>
    </div>
  );
};

export default MessageInput;
