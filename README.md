# Chat App

This is a chat application built using React, TypeScript, Vite, React-Toastify, Firebase, Zod, UUID, Context API, and custom hooks.

## Features

- Real-time messaging
- User authentication
- Form validation using Zod
- Unique identifiers for users and messages using UUID
- Context API for managing application state
- Custom useForm hook for form validation

## Technologies Used

- React: A JavaScript library for building user interfaces.
- TypeScript: A statically typed superset of JavaScript that compiles to plain JavaScript.
- Vite: A fast build tool for modern web applications.
- React-Toastify: A library for displaying toast notifications in React applications.
- Firebase: A platform for building web and mobile applications.
- Zod: A TypeScript-first schema validation library.
- UUID: A library for generating unique identifiers.
- Context API: A built-in state management solution in React.
- Custom Hooks: Reusable hooks for handling common functionality.

## Installation

1. Clone the repository:

   ````
   git clone https://github.com/your-username/chat-app.git
   ```

   ````

2. Navigate to the project directory:

   ````
   cd chat-app
   ```

   ````

3. Install the dependencies:

   ````
   npm install
   ```

   ````

4. Set up Firebase:

   - Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/).
   - Obtain your Firebase configuration values (apiKey, authDomain, projectId, etc.).
   - Create a `.env` file in the root directory of the project and add your Firebase configuration values:

     ```
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     ```

5. Start the development server:

   ````
   npm run dev
   ```

   ````

6. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the app.

## Usage

1. Sign up for a new account or log in with your existing account.
2. Once logged in, you will see a list of chat rooms.
3. Select a chat room to enter and start sending/receiving messages in real-time.
4. Use the chat input at the bottom of the screen to type and send messages.
5. If you receive a new message while the app is in the background, you will be notified via a toast notification.

## Folder Structure

The folder structure of the project is as follows:

- `src/components`: Contains all the React components used in the application.
- `src/context`: Contains all the React Context used in the application to manage global state.
- `src/hooks`: Contains custom hooks, including the `useForm` hook for form validation.
- `src/firebase`: Contains the Firebase configuration and authentication logic.
- `src/models`: Contains Zod Schemas definitions used in the application.
- `src/pages`: Contains all the React Pages used in the application.
- `src/routes`: Contains all routes, Auth, and unAuth routes used in the application.
- `src/types`: Contains TypeScript type definitions used in the application.
- `src/utils`: Contains utility functions, such as form validation using Zod.
- `src/App.tsx`: The main application component.
- `src/App.css`: The main application styles.
- `src/main.tsx`: The entry point of the application.
- `src/index.css`: Global CSS styles for the application.
- `.env`: Configuration file for environment variables.
- `vite.config.ts`: Configuration file for Vite.
- `package.json`: Contains project dependencies and scripts.
- `README.md`: This file.
