import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AgoraRTC from "agora-rtc-sdk-ng";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const client = AgoraRTC.createClient(clientConfig);

root.render(
  <StrictMode>
    <AgoraRTCProvider client={client}>
      <App />
    </AgoraRTCProvider>
  </StrictMode>
);
