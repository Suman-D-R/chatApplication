import "./App.css";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./components/Chat.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/chat", element: <Chat /> },
]);

function App() {
  return (
    <div className="app-container">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
