import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { NoteContextProvider } from "./Context/NoteContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider>
      <NoteContextProvider>
        <App />
      </NoteContextProvider>
    </SnackbarProvider>
  </BrowserRouter>
);
