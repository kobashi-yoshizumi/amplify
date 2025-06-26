import React, { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "aws-amplify/auth"; // ✅ Cognito認証
import { generateClient } from "aws-amplify/api"; // ✅ Amplify API
import { withAuthenticator } from "@aws-amplify/ui-react";
import { listRecords } from "./graphql/queries";
import "@aws-amplify/ui-react/styles.css";

type Record = {
  id: string;
  title: string;
  content: string;
};

const client = generateClient();

const App: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [user, setUser] = useState<{ username: string }>({ username: "Guest" });

  useEffect(() => {
    const fetchUserAndRecords = async () => {
      try {
        // ✅ 認証済みユーザーを取得
        const authUser = await getCurrentUser();
        setUser({ username: authUser.username });

        // ✅ Cognito 認証を使用して GraphQL API を呼び出す
        const response = await client.graphql({
          query: listRecords,
          authMode: "userPool", // ✅ これだけでOK
        });

        if ('data' in response && response.data?.listRecords) {
          setRecords(response.data.listRecords);
        }
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchUserAndRecords();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1>Welcome {user.username}!</h1>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
        onClick={() => { void signOut(); }}
      >
        Logout
      </button>

      <h2>Records</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {records.map((record) => (
          <li key={record.id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
            <h3>{record.title}</h3>
            <p>{record.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withAuthenticator(App, {
  signUpAttributes: ["email"],
});
