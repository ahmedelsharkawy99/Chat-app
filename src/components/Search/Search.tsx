// Packages
import { lazy, useState } from "react";
import { toast } from "react-toastify";

// Types and Schemas
import { FirebaseError } from "firebase/app";
import { DocumentData, serverTimestamp } from "firebase/firestore";

// Data and styles
import "./search.css";

// Functions and Hooks
import {
  getData,
  search,
  setData,
  updateData,
} from "../../firebase/handlers/firestore";
import useAuthContext from "../../hooks/useAuthContext/useAuthContext";

// Components
import CustomInput from "../Shared/CustomInput/CustomInput";
const Chat = lazy(() => import("../Shared/Chat/Chat"));

const Search: React.FC = () => {
  const { currentUser } = useAuthContext();
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<DocumentData | null>(null);

  const searchHandler = () => {
    try {
      search("users", "fullName", username, setUser);
    } catch (error) {
      if (error instanceof FirebaseError) toast.error(error.code);
    }
  };

  const keyDownHandler = (e: React.KeyboardEvent) =>
    e.code === "Enter" && searchHandler();

  const selectHandler = async () => {
    // Check whether group(chats in firestore) existing or not, if not create new group
    const combinedIds =
      (currentUser?.uid as string) > user?.uid
        ? currentUser?.uid + user?.uid
        : user?.uid + currentUser?.uid;

    try {
      const res = await getData("chats", combinedIds);

      if (!res.exists()) {
        // Create new group
        await setData("chats", combinedIds, { messages: [] });

        // Update Users Chats

        await updateData("userChats", currentUser?.uid as string, {
          [combinedIds + ".userInfo"]: {
            uid: user?.uid,
            fullName: user?.fullName,
            image: user?.image,
          },
          [combinedIds + ".date"]: serverTimestamp(),
        });

        await updateData("userChats", user?.uid, {
          [combinedIds + ".userInfo"]: {
            uid: currentUser?.uid,
            fullName: currentUser?.displayName,
            image: currentUser?.photoURL,
          },
          [combinedIds + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      if (error instanceof FirebaseError) toast.error(error.code);
    } finally {
      setUser(null);
      setUsername("");
    }
  };

  return (
    <div className="search">
      <div className="search__form">
        <CustomInput
          input={{
            id: "search",
            type: "text",
            placeholder: "Find a user",
            onKeyDown: keyDownHandler,
            value: username,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value),
          }}
        />
      </div>
      {user && (
        <Chat user={user} handleClick={selectHandler} container="Search" />
      )}
    </div>
  );
};

export default Search;
