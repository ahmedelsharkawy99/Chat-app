// Packages
import { Suspense, lazy } from "react";

// Types and Schemas

// Data and styles
import "./home.css";

// Functions and Hooks
import useChatContext from "../../hooks/useChatContext/useChatContext";

// Components
import Sidebar from "../../components/Sidebar/Sidebar";
import Spinner from "../../components/Shared/Spinner/Spinner";
const ChatContainer = lazy(
  () => import("../../components/ChatContainer/ChatContainer")
);

export default function Home() {
  const { data } = useChatContext();
  return (
    <article className="home">
      <section className="container">
        <Sidebar />
        {data.chatId && (
          <Suspense
            fallback={
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spinner width="80px" />
              </div>
            }
          >
            <ChatContainer />
          </Suspense>
        )}
      </section>
    </article>
  );
}
