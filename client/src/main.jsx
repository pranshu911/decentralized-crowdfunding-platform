import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Goerli } from "@thirdweb-dev/chains";

import { StateContextProvider } from "./context";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider // Client ID for authentication (replace with your own).
    clientId={import.meta.env.VITE_CLIENT_ID}
    // Set the active blockchain chain as Goerli
    activeChain={Goerli}
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
