// Packages

// Types and Schemas

// Data and styles

// Functions and Hooks

// Components
import { AuthLayoutProps } from "./types/AuthLayoutTypes";

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, authTitle }) => {
  return (
    <article className="form_container">
      <section className="form_wrapper">
        <span className="logo">Chat App</span>
        <span className="title">{authTitle}</span>
        {children}
      </section>
    </article>
  );
};

export default AuthLayout;
