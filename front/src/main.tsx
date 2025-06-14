import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from 'aws-amplify';
import App from "./App";
import amplifyConfig from "./amplifyConfig"; // ✅ Gen 2 の正しい設定ファイルをインポート


console.log("✅ Amplify Config Loaded:", amplifyConfig); // Debug 用ログ


try {
  Amplify.configure(amplifyConfig as any);
  console.log("Amplify Config Loaded Successfully");
} catch (error) {
  console.error("Amplify Configuration Error:", error);
}


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
